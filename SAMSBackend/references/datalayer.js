////************************************************************* */
//////////////////// API Version 2 STARTS HERE/////////////////////
////************************************************************* */

var reqDataBase = require("./database");


var reqConfig = require("../config/config");

var mDBName = reqConfig.Database;


//////////////////////////////////////RESET PASSWORD//////////////////////////////////////


/**********************************************************/
/**********CUSTOM RESPONSE SENDER FUNCTION ****************/
/**********************************************************/
module.exports.SendResponse = function (success, res, result) {
  if (success) {
    res.send(JSON.stringify({ success: true, result }));
  } else {

    res.send({ success: false, result });
  }
};

module.exports.GetCourseInfo = function (pData, pCallback) {
  let sp = "CALL " + mDBName + ".sp_get_course_details(?)";
  reqDataBase.query(sp, [pData], pCallback);
};

module.exports.GetBatchInfo = function (pCallback) {
  let sp = "CALL " + mDBName + ".sp_get_batch_details()";
  reqDataBase.query(sp,  pCallback);
};

module.exports.GetDepartmentInfo = function (pCallback) {
  let sp = "CALL " + mDBName + ".sp_get_dept_details()";
  reqDataBase.query(sp, pCallback);
};

module.exports.GetStudentInfo = function (pCallback) {
  let sp = "CALL " + mDBName + ".sp_get_student_details()";
  reqDataBase.query(sp, pCallback);
};


module.exports.AddStudentInfo = function (pData,pCallback) {
  let sp = "CALL " + mDBName + ".sp_put_student_details(?)";
  reqDataBase.query(sp, [JSON.stringify(pData)],pCallback);
};

module.exports.DeleteStudentInfo = function (pData,pCallback) {
  let sp = "CALL " + mDBName + ".sp_delete_student_details(?)";
  reqDataBase.query(sp, [pData.studentId],pCallback);
};