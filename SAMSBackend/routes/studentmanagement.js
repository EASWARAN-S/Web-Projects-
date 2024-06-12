
var reqExpress = require('express');
var reqRouter = reqExpress.Router();
var reqDataLayer = require('../references/datalayer');



/** To get Course details */
reqRouter.post('/getCourseInfo', function (pReq, pRes, next) {
  var data = pReq.body.dept;

  reqDataLayer.GetCourseInfo(data, function (pErr, pRows) {
    if (pErr) {
      reqDataLayer.SendResponse(false, pRes, "false");
    }
    else {
      reqDataLayer.SendResponse(true, pRes, pRows[0]);
    }
  });

});


/** To get Department details */
reqRouter.get('/getDepartmentInfo', function (pReq, pRes, next) {

  reqDataLayer.GetDepartmentInfo(function (pErr, pRows) {
    if (pErr) {
      reqDataLayer.SendResponse(false, pRes, "false");
    }
    else {
      reqDataLayer.SendResponse(true, pRes, pRows[0]);
    }

  });
});


/** To get Batch details */

reqRouter.get('/getBatchInfo', function (pReq, pRes, next) {

  reqDataLayer.GetBatchInfo(function (pErr, pRows) {
    if (pErr) {
      reqDataLayer.SendResponse(false, pRes, "false");
    }
    else {
      reqDataLayer.SendResponse(true, pRes, pRows[0]);
    }

  });
});


/** To get Student details */
reqRouter.get('/getStudentInfo', function (pReq, pRes, next) {

  reqDataLayer.GetStudentInfo(function (pErr, pRows) {
    if (pErr) {
      reqDataLayer.SendResponse(false, pRes, "false");
    }
    else {
      reqDataLayer.SendResponse(true, pRes, pRows[0]);
    }

  });
});

/** To add/update Student details */
reqRouter.post('/putStudentInfo', function (pReq, pRes, next) {
var pData =pReq.body;
  reqDataLayer.AddStudentInfo(pData,function (pErr, pRows) {
    if (pErr) {
      reqDataLayer.SendResponse(false, pRes, "false");
    }
    else {
      reqDataLayer.SendResponse(true, pRes, pRows[0]);
    }

  });
});

/** To delete Student details */
reqRouter.post('/deleteStudentInfo', function (pReq, pRes, next) {
  var pData =pReq.body;
    reqDataLayer.DeleteStudentInfo(pData,function (pErr, pRows) {
      if (pErr) {
        reqDataLayer.SendResponse(false, pRes, "false");
      }
      else {
        reqDataLayer.SendResponse(true, pRes, pRows[0]);
      }
  
    });
  });
  

module.exports = reqRouter;