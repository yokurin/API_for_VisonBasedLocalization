var express = require('express');
var router = express.Router();
var moment = require('moment')
var model = require('../model');

/* POST data FOR アンケート. */
router.post('/', function(req, res, next) {
	var data = req.body;
	var uuid = data.uuid || "";

	if(uuid == '' || data.name == '') {
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
	var d = {
		uuid: String(data.uuid),
		name: String(data.name),
		sex: String(data.sex),
		useful: parseInt(data.useful),
		joyful: parseInt(data.joyful),
		opinion: String(data.opinion)
	};

	model.insert(d).into('form')
	.then(function(rows) {
		console.log(rows);
	})
	.catch(function(err) {
		console.log("insertError");
		console.log(err);
	});

	console.log("Insert new answer");
	return res.status(200).send({
		"message": "success",
		"errors": []
	});
});


module.exports = router;
