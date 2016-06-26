var express = require('express');
var router = express.Router();
var moment = require('moment')
var model = require('../model');

/* POST UUID FOR LOGIN. */
router.post('/', function(req, res, next) {
	var data = req.body;
	var uuid = data.uuid || "";
	var canRun = true;

	if(uuid == '') {
		return res.status(400).send({
			"message": "please send require param",
			"errors": [
				{
					"resource": "Issue",
					"field": "",
					"code": "missing_field"
				}
  			]
  		});
	}

	model.select('*').from('users').where('uuid', uuid)
	.update({
		last_logined: moment().format('YYYY-MM-DD HH:mm:ss'),
	})
	.then(function(rows){
		//console.log("rows\n", rows);
		if (rows >= 1) {
			console.log("Found this uuid, Updated login_time");
			return res.status(200).send({
				"message": "success",
				"canRun": canRun,
				"errors": []
	  		});
		} else {
			model.insert(
			{
				uuid: data.uuid,
				last_logined: moment().format('YYYY-MM-DD HH:mm:ss')
			}).into('users')
			.then(function(rows) {
				console.log(rows);
			})
			.catch(function(err) {
				console.log("insertError");
				console.log(err);
			});
			console.log("Not Found this uuid, Insert new user");
			return res.status(200).send({
				"message": "success",
				"canRun": canRun,
				"errors": []
	  		});
		}
	})
	.catch(function(err){
		console.log("connectError");
		console.log(err)
		return res.status(500).send({
			"message": "Internal Server Error.",
			"errors": []
  		});
	});

});


module.exports = router;
