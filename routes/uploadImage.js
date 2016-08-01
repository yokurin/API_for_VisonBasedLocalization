var async = require("async");
var express = require('express');
var router = express.Router();
var moment = require('moment');
var multipart = require('connect-multiparty');
var exec = require('child_process').exec;

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

	var _isDateDirExists;
	var _isUuidDirExists;

	fs.watchFile(dir + '/results.txt', function (curr, prev) {
		console.log("curr\n", curr);
		console.log("prev\n", prev);
		fs.readFile(dir + '/results.txt', 'utf8', function(err, data){
			if (err) {
				console.log("err", err);
			}

			console.log("run_result\n", JSON.parse(data));
			newResults = JSON.parse(data);
			return res.status(200).send({
				"message": "success",
				"results": JSON.parse(data),
				"errors": []
			});
		});
	});

	// Confirm UUID and Date Directory Promise async.js
	async.series([
		function(next) {
			console.log("data\n", req.body);
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
			dirpathUuid = dir + '/uploads/images/' + date + '/' + uuid;
			filepath = dir + '/uploads/images/' + date + '/' + uuid + '/image.jpg';
			runCommand = 'python ' + dir + '/localization/localization.py' + ' ' + filepath + ' ' + oldResults.position.x + ' ' + oldResults.position.y + ' ' + oldResults.direction + ' ' + oldResults.reliability + ' ' + oldResults.radius;
			fs.exists(dirpathDate, function(isDateDirExists) {
				_isDateDirExists = isDateDirExists;
				if (!isDateDirExists) {
					fs.mkdir(dirpathDate, function(err) {
						if(err) {
							console.log(err);
							return res.status(500).send({
								message: 'Internal Server Error. \n Failed mkdir date',
								error: [
									{

									}
								]
							});
						}
					});
				}
				next();
			});
	  },
	  function(next) {
			fs.exists(dirpathUuid, function(isUuidDirExists) {
				_isUuidDirExists = isUuidDirExists;
				if (!isUuidDirExists) {
					fs.mkdir(dirpathUuid, function(err) {
						if(err) {
							console.log(err);
							return res.status(500).send({
								message: 'Internal Server Error. \n Failed mkdir uuid',
								error: [
									{

									}
								]
							});
						}
					});
				}
				next();
			});
	  },
		function(next) {
			fs.readFile(req.files.image.path, function (err, data) {
				if(err) {
					return res.status(500).send({
						message: 'Internal Server Error. \n Failed Read File',
						error: [
							{
								error: err
							}
						]
					});
				}
				fs.writeFile(filepath, data, function (err) {
					if(err){
						return res.status(500).send({
							message: 'Internal Server Error. \n Failed Write File',
							error: [
								{
									error: err
								}
							]
						});
					}
		        });
		    });
			next();
		},
		function(next) {
			console.log(consoleColorgreen+"Run Command:\n"+consoleColorreset,runCommand);
			exec(runCommand, function(err, stdout, stderr) {
				console.log("python results: \n", stdout);
				// json 格納
				//newResults = stdout;
				newResults = JSON.parse(stdout);
				if(err){
					console.log("err:\n", err);
					return res.status(500).send({
						message: 'Internal Server Error. ',
						error: [
							{
								type: "exec error",
								error: err
							}
						]
					});
				}
				if(stderr){
					console.log("stderr:\n", stderr);
					return res.status(500).send({
						message: 'Internal Server Error. ',
						error: [
							{
								type: "python error",
								error: stderr
							}
						]
					});
				}
			});
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
	});

});


module.exports = router;
