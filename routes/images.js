var express = require('express');
var router = express.Router();

var async = require("async");
var fs = require('fs');

/* GET images page. */
// router.get('/', function(req, res, next) {
//     //console.log(req);
//     var dir = process.cwd();
// 	  var imagesPath = dir + '/uploads/images/';
//     var uuidsList = []; // for present view
//     var eachImagesList = []; // for present view
//     var isUuid = false;
//     var uuid;
//     var imagesPathList = fs.readdirSync(imagesPath); // return array
//
//     imagesPathList.forEach(function(val,index,ar){
//     	var path = String(imagesPath + val);
//     	try{
//     		var st = fs.statSync(path);
//     		if (st.isDirectory(path)){
//                 uuidsList.push(val);
//                 console.log(uuidsList);
//     		}
//     	}
//     	catch(e){
//     		console.log("error:"+e.message);
//     	}
//     });
//
//     if (req.query.uuid) {
//         if(checkUuid(req.query.uuid)){
//             uuid = req.query.uuid;
//             isUuid = true;
//             var uuidPath = imagesPath + uuid;
//             var uuidPathList = fs.readdirSync(uuidPath); // return array
//             uuidPathList.forEach(function(val,index,ar){
//             	var path = String(uuidPath+ '/' + val);
//             	try{
//             		var st = fs.statSync(path);
//             		if (st.isFile(path)){
//                         eachImagesList.push(val);
//                         console.log(eachImagesList);
//             		}
//             	}
//             	catch(e){
//             		console.log("error:"+e.message);
//             	}
//             });
//         }else{
//             selected = null
//         }
//     }
//
//     // check get param uuidリストに含まれているか
//     function checkUuid(uuid){
//         var isHasUuid = false;
//         uuidsList.forEach(function(val,index,ar){
//             if(uuid === val)
//                 isHasUuid = true;
//         });
//         return isHasUuid;
//     }
//
//     res.render('images', {
//         title: '画像一覧',
//         uuids: uuidsList,
//         selected: uuid,
//         isUuid: isUuid,
//         images: eachImagesList
//     });
// });

/* GET images page. */
router.get('/', function(req, res, next) {
    //console.log(req);
    var dir = process.cwd();
	  var imagesDirPath = dir + '/uploads/images/';
    var datesList = []; // for present view
    var uuidsList = []; // for present view
    var eachImagesList = []; // for present view
    var isUuid = false;
    var isDate = false;
    var uuid = null;
    var date = null;
    var imagesDirPathList = fs.readdirSync(imagesDirPath); // return array

    // Get Date Folder List
    imagesDirPathList.forEach(function(val,index,ar){
        datesList.push(val);
        uuidsList[val] = [];
        // Get UUID Folder List
        var path = String(imagesDirPath + val);
        var dateDirPathList = fs.readdirSync(path);
        dateDirPathList.forEach(function(v,i,a){
            uuidsList[val].push(v);
        });
    });

    if(req.query.date) {
        date = req.query.date;
    }

    if (req.query.uuid && req.query.date) {
        uuid = req.query.uuid;
        date = req.query.date;
        isUuid = true;
        isDate = true;
        var lastPath = imagesDirPath + date + '/' + uuid;
        var lastPathList = fs.readdirSync(lastPath); // return array
        lastPathList.forEach(function(val,index,ar){
            eachImagesList.push(val);
        });
    }



    // check get param uuidリストに含まれているか
    // function checkUuid(uuid){
    //     var isHasUuid = false;
    //     uuidsList.forEach(function(val,index,ar){
    //         if(uuid === val)
    //             isHasUuid = true;
    //     });
    //     return isHasUuid;
    // }
    res.render('images', {
        title: '画像一覧',
        datesList: datesList,
        uuidsList: uuidsList[date],
        selectedUuid: uuid,
        selectedDate: date,
        isUuid: isUuid,
        isDate: isDate,
        imagesList: eachImagesList
    });
});


module.exports = router;
