import request from '~/utils/request'
import request2 from '~/utils/request2'

const api = {
  //获取授权token
  ApplyAccessToken(params) {
    return request.post('/index/applyAccessToken', params)
  },
  //课程列表
  RecommendIndex() {
    return request2.post('/course/courseList')
  },
  //用户登陆
  usernameLogin(params) {
    return request.post('/user/usernameLogin', params)
  },
  //手机验证码登录
  SmsLogin(params) {
    return request.post('/user/smsLogin', params)
  },
  //手机验证码发送
  SendSms(params) {
    return request.post('/user/sendSms', params)
  },
   //用户退出
   LoginOut() {
    return request.post('/user/loginOut')
  },
  //系统消息
  systemMessage(params) {
    return request2.post('/message/messageList', params)
  },
  //考核标准
  assessmentCriteria(assessmentparams) {
    return request2.post('/course/getTermCoursePlan', assessmentparams)
  },
  //教学计划课堂列表
  teachingPlan(lessonparams) {
    return request2.post('/course/getLessonList', lessonparams)
  },
  //选修某学期课程的班级列表
  classroomList(params) {
    return request2.post('/course/termCourseClassList', params)
  },
  //班级学习进度
  ratelearning(params) {
    return request2.post('/course/classCourseReport', params)
  },
  //试卷列表
  testpaperLlist(params) {
    return request2.post('/exam/termCourseExamPaperList', params)
  },
  //学习总进度
  courseSchedule(params) {
    return request2.post('/course/learnProgress', params)
  },
  //学期课程学生成绩列表
  ListofAchievements(params) {
    return request2.post('/transcript/termCourseStudentScoreList', params)
  },
  //学期课程综合成绩汇总
  AchievementSummary(params) {
    return request2.post('/transcript/termCourseCollect', params)
  },
  //学籍管理
  SchoolRollManagement(params) {
    return request2.post('/student/studentList',params)
  },
  //课程管理-学期选课课程列表
  TermCourseList(params) {
    return request2.post('/course/termCourseList', params)
  },
  //教师列表
  ListofTeachers() {
    return request2.post('/teacher/teacherList')
  },
  //发送通知
  AddTermCourseClassMessage(params) {
    return request2.post('/message/addTermCourseClassMessage', params)
  },
  //指定课堂详情
  GetLessonDetail(params) {
    return request.post('/course/getLessonDetail', params)
  },
  //班级学习进度报表
  ClassCourseReportDetail(params) {
    return request2.post('/course/classCourseReportDetail', params)
  },
   //课程考试成绩按班级列表
   TermCourseExamScoreClassCollect(params) {
    return request2.post('/exam/termCourseExamScoreClassCollect', params)
  },
  //课程考试成绩-学生列表
  TermCourseExamScoreStudentList(params) {
   return request2.post('/exam/termCourseExamScoreStudentList', params)
 },
 //获取指定学期课程学生考试试卷记录
 TermCourseStudentAnswerPaper(params) {
  return request2.post('/exam/termCourseStudentAnswerPaper', params)
},
//获取试卷试题内容
GetExamPaper(params) {
  return request2.post('/exam/getExamPaper', params)
},
//学期课程考试试卷题目分析
GetExamPaperAnswerReport(params) {
  return request2.post('/exam/getExamPaperAnswerReport', params)
},
//学期课程学生成绩总汇总报表
TermCourseExamScoreReport(params) {
  return request2.post('/exam/termCourseExamScoreReport', params)
},
//学期课程班级内页-左学生成绩统计
TermCourseExamScoreStudentCollect(params) {
  return request2.post('/exam/termCourseExamScoreStudentCollect', params)
},
//获取指定学期课程班级选课汇总列表
GetCourseClassReport(params) {
  return request2.post('/term/getCourseClassReport', params)
},
//获取指定学期课程班级学生统计列表
TermCourseClassStudentList(params) {
  return request2.post('/student/termCourseClassStudentList', params)
},
//指定学期课程班级批量设置辅导老师
SetClassCoachTeacher(params) {
  return request2.post('/schoolTeacher/setClassCoachTeacher', params)
},
//学期列表
GetIndex() {
  return request2.post('/term/index')
},
//新增学期
TermAdd(params) {
  return request2.post('/term/add', params)
},
//删除学期
Remove(params) {
  return request2.post('/term/remove', params)
},
//学校已授权课程列表
CourseAccreditList(params) {
  return request2.post('/course/courseAccreditList', params)
},
//学期课程授权
CourseAccredit(params) {
  return request2.post('/term/courseAccredit', params)
},
//新增教师
AddTeacher(params) {
  return request2.post('/teacher/addTeacher', params)
},
//删除教师
DelTeacher(params) {
  return request2.post('/teacher/delTeacher', params)
},
//学期课程班级学生移出
TermCourseClassStudentRemove(params) {
  return request2.post('/student/termCourseClassStudentRemove', params)
},
//指定学期课程教学计划编辑保存
TermCoursePlanEdit(params) {
  return request2.post('/course/termCoursePlanEdit', params)
},
//学习课程总进度
LearnProgress(params) {
  return request2.post('/course/learnProgress', params)
},
//学习趋势
LearnTrends(params) {
  return request2.post('/course/learnTrends', params)
},
//删除指定学期课程
RemoveTermCourse(params) {
  return request2.post('/course/removeTermCourse', params)
},
//获取登录用户关联的教师信息
GetLoginUserInfo() {
  return request2.post('/user/getLoginUserInfo')
},
//图片上传服务
Upimages(params) {
  return request2.post('/upload/images', params)
},
//学校名与logo信息编辑
SchoolEdit(params) {
  return request2.post('/school/edit', params)
},
}

export default api
