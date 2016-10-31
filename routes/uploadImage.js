var async = require("async");
var express = require('express');
var router = express.Router();
var moment = require('moment');
var multipart = require('connect-multiparty');
var exec = require('child_process').exec;
var child_process = require('child_process');

var fs = require('fs');

var model = require('../model');

var multipartMiddleware = multipart();
/* POST Image */
router.post('/', multipartMiddleware, function(req, res, _next) {

	var consoleColorgreen = '\u001b[32m';
	var consoleColorreset   = '\u001b[0m';

	console.log(consoleColorgreen+"uuid:"+consoleColorreset + req.body.uuid);
	console.log(consoleColorgreen+"image"+consoleColorreset,req.files.image);

	var date = moment().format('YYYY-MM-DD');
	var time = moment().format('HH_mm_ss');
	var dir = process.cwd();
	var uuid;
	var image;
	var dirpathDate = dir + '/uploads/images/' + date;
	var dirpathUuid;
	var filepath;
	var runCommand;
	var newResults;
	var oldResults;

	async.series([
		function(next) {
			console.log("request_body_data:\n", req.body);
			if(!req.body.uuid || !req.files.image) {
				return res.status(500).send({
					message: 'no parameter uuid or image',
					error: []
				});
			}
			uuid = req.body.uuid;
			image = req.files.image.path;
			if(!req.body.results) {
				oldResults = {
				    position: {
				    	x: 0,
							y: 0
						},
				    direction: 0,
				    reliability: 0,
				    radius: 0
				};
			} else {
				oldResults = JSON.parse(req.body.results);
			}
			next();
		},
	  function(next) {
			filepath = dir + '/uploads/images/image.jpg';
			runCommand = 'python ' + dir + '/localization/localization.py' + ' ' + filepath + ' ' + oldResults.position.x + ' ' + oldResults.position.y + ' ' + oldResults.direction + ' ' + oldResults.reliability + ' ' + oldResults.radius;

			next();
	  },
		function(next) {
			console.log("read_write");
			//var data = fs.readFileSync(req.files.image.path);
			fs.writeFileSync(filepath, req.files.image.path);

			next();
		}
	], function complete(err, results) {
		//console.log('results\n', results);
		if(err){
			return res.status(500).send({
				message: 'Internal Server Error. on complete',
				error: [
					{
						error: err
					}
				]
			});
		}
		console.log(consoleColorgreen+"Run Command:\n"+consoleColorreset,runCommand);
		// run unix command
		newResults = child_process.execSync(runCommand, {
			timeout: 12000, // ms
			encoding: 'utf8' // encoding stdout code
		});
		console.log(newResults);
		return res.status(200).send({
			"message": "success",
			"results": JSON.parse(newResults),
			"errors": []
		});
	});
});

module.exports = router;
	// Confirm UUID and Date Directory Promise async.js
	// fs.exists(dirpathDate, function(isDateDirExists) {
	// 	if(!isDateDirExists) {
	// 		fs.mkdir(dirpathDate, function(err) {
	// 			fs.exists(dirpathUuid, function(isUuidDirExists) {
	// 				if (!isUuidDirExists) {
	// 					fs.mkdir(dirpathUuid, function(err) {
	// 						fs.writeFile(filepath, buffer, function(err) {
	// 							if(err) {
	// 								console.log(err);
	// 								return res.status(500).send({
	// 									message: 'Internal Server Error.',
	// 									error: [
	// 										{
	//
	// 										}
	// 									]
	// 								});
	// 							}
	// 						});
	// 					});
	// 				} else {
	// 					fs.writeFile(filepath, buffer, function(err) {
	// 						if(err) {
	// 							console.log(err);
	// 							return res.status(500).send({
	// 								message: 'Internal Server Error.',
	// 								error: [
	// 									{
	//
	// 									}
	// 								]
	// 							});
	// 						}
	// 					});
	// 				}
	// 			});
	//
	// 			return res.status(200).send({
	// 				"message": "success",
	// 				"errors": []
	// 			});
	// 		});
	// 	} else {
	// 		fs.exists(dirpathUuid, function(isUuidDirExists) {
	// 			if (!isUuidDirExists) {
	// 				fs.mkdir(dirpathUuid, function(err) {
	// 					fs.writeFile(filepath, buffer, function(err) {
	// 						if(err) {
	// 							console.log(err);
	// 							return res.status(500).send({
	// 								message: 'Internal Server Error.',
	// 								error: [
	// 									{
	//
	// 									}
	// 								]
	// 							});
	// 						}
	// 					});
	// 				});
	// 			} else {
	// 				fs.writeFile(filepath, buffer, function(err) {
	// 					if(err) {
	// 						console.log(err);
	// 						return res.status(500).send({
	// 							message: 'Internal Server Error.',
	// 							error: [
	// 								{
	//
	// 								}
	// 							]
	// 						});
	// 					}
	// 				});
	// 			}
	// 		});
	//
	// 		return res.status(200).send({
	// 			"message": "success",
	// 			"errors": []
	// 		});
	// 	}
	// });
//
//
// });
//

// module.exports = router;
