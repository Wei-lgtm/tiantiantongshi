<template>
  <div class="mainer">
    <div class="wrap">
      <div class="page_left">
        <ul>
          <li>
            <nuxt-link to="/">
              <span>我的课程</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/2-kcjd">
              <span>课程进度</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/3-zyks">
              <span>作业考试</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/4-cjgl">
              <span>成绩管理</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/5-xjgl">
              <span>学籍管理</span>
            </nuxt-link>
          </li>
          <li class="on">
            <nuxt-link to="/6-kcgl">
              <span>课程管理</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/7-jsgl">
              <span>教师管理</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/8-jgsz">
              <span>学校设置</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="page_right">
        <div class="crumbs">
          <p>
            <a href="#">{{coursename}}</a> >
            <a class="on" href="#">课程设置</a>
            <span>
              <a href="javascript:void(0)" @click="back">
                <em>返回</em>
              </a>
            </span>
          </p>
        </div>
        <div class="course_design">
          <div class="item">
            <h3>基本设置</h3>
            <div class="sourse_form_btn">
              <a href="javascript:void(0)" @click="TermCoursePlanEdit()">确定</a>
              <nuxt-link to="/6-kcgl" class="a1">取消</nuxt-link>
            </div>
            <div class="sourse_form">
              <div class="list">
                <p>
                  课&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;程：
                  <span>{{coursename}}</span>
                </p>
              </div>
              <div class="list">
                <div class="list_web">
                  学习时间：
                  <el-date-picker v-model="studyStartTime" type="date" placeholder="选择日期"></el-date-picker>
                  <!--<input type="text" placeholder="请选择时间" v-model="studyStartTime" />-->
                  <em>至</em>
                  <el-date-picker v-model="studyEndTime" type="date" placeholder="选择日期"></el-date-picker>
                  <!-- <input type="text" placeholder="请选择时间" v-model="studyEndTime" /> -->
                </div>
              </div>
              <div class="list">
                <div class="list_web">
                  期末考试：
                  <el-date-picker v-model="examStartTime" type="date" placeholder="选择日期"></el-date-picker>
                  <!-- <input type="text" placeholder="请选择时间" v-model="examStartTime" /> -->
                  <em>至</em>
                  <el-date-picker v-model="examEndTime" type="date" placeholder="选择日期"></el-date-picker>
                  <!-- <input type="text" placeholder="请选择时间" v-model="examEndTime" /> -->
                </div>
              </div>
              <div class="list">
                <div class="list_web">
                  结课时间：
                  <el-date-picker v-model="finishCourseTime" type="date" placeholder="选择日期"></el-date-picker>
                  <!-- <input type="text" placeholder="请选择时间" v-model="finishCourseTime" /> -->
                </div>
              </div>
              <div class="list">
                <div class="list_web">
                  补考时间：
                  <el-date-picker
                    v-model="resitExamStartTime"
                    type="date"
                    :disabled="prohibit"
                    placeholder="选择日期"
                  ></el-date-picker>
                  <!-- <input type="text" placeholder="请选择时间" v-model="resitExamStartTime" /> -->
                  <em>至</em>
                  <el-date-picker
                    v-model="resitExamEndTime"
                    type="date"
                    :disabled="prohibit"
                    placeholder="选择日期"
                  ></el-date-picker>
                  <!-- <input type="text" placeholder="请选择时间" v-model="resitExamEndTime" /> -->
                </div>
                <label @click="funprohibit" :class="prohibit?'on':''">不允许补考</label>
              </div>
            </div>
          </div>
          <div class="item">
            <h3>考核设置</h3>
            <div class="sourse_form sourse_form1">
              <div class="list">
                <p>课程总分：100分（在线学习+习题+考试）</p>
              </div>
              <div class="list">
                <p>
                  在线学习：占
                  <input type="text" placeholder="请输入分值" v-model="onlineStudyRate">分
                  <span>期末考试前，观看完全部课程视频，可以得满分。</span>
                </p>
                <div class="line"></div>
              </div>
              <div class="list">
                <p>
                  习&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题：占
                  <input type="text" placeholder="请输入分值" v-model="exercisesRate">分
                  <span>期末考试前，完成所有课后习题，成绩按每课的平均分计算，未做题目计0分。</span>
                </p>
                <div class="line"></div>
              </div>
              <div class="list">
                <p>
                  考&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;试：占
                  <input type="text" placeholder="请输入分值" v-model="examRate">分
                  <span>考试成绩将取所有考试成绩的平均分值，未做题目计0分。</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      termid: 0, //学期id
      courseid: 0, //课程id
      coursename: "", //课程名
      courseList: [], //课程计划
      studyStartTime: "", //学习开始时间
      studyEndTime: "", //学习结束时间
      examStartTime: "", //期末考试开始时间
      examEndTime: "", //期末考试结束时间
      finishCourseTime: "", //结课时间
      resitExamStartTime: "", //补考开始时间
      resitExamEndTime: "", //补考结束时间
      allowedResitExam: 0, //是否允许补考 0:否 1:是
      onlineStudyRate: 0, //在线学习分值比例
      exercisesRate: 0, //作业分值比例
      examRate: 0, //考试分值比例
      prohibit: false
    };
  },
  mounted() {
    const that = this;
    that.termid = this.$route.query.termid;
    that.courseid = this.$route.query.courseid;
    that.coursename = this.$route.query.coursename;

    that.AssessmentCriteria();
  },
  methods: {
    AssessmentCriteria() {
      const that = this;
      let assessmentparams = {
        termId: that.termid,
        courseId: that.courseid
      };
      this.utils.api.assessmentCriteria(assessmentparams).then(res => {
        if (res.code == 20200) {
          that.courseList = res.data; //课程计划
          that.studyStartTime = res.data.studyStartTime;
          that.studyEndTime = res.data.studyEndTime;
          that.examStartTime = res.data.examStartTime;
          that.examEndTime = res.data.examEndTime;
          that.finishCourseTime = res.data.finishCourseTime;
          that.resitExamStartTime = res.data.resitExamStartTime;
          that.resitExamEndTime = res.data.resitExamEndTime;
          that.allowedResitExam = res.data.allowedResitExam;
          that.onlineStudyRate = res.data.onlineStudyRate;
          that.exercisesRate = res.data.exercisesRate;
          that.examRate = res.data.examRate;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    funprohibit() {
      const that = this;
      that.prohibit = !that.prohibit;
      that.resitExamStartTime = "";
      that.resitExamEndTime = "";
    },
    TermCoursePlanEdit() {
      const that = this;
      let params = {
        planId: that.courseList.id,
        termId: that.termid,
        courseId: that.courseid,
        studyStartTime: that.studyStartTime,
        studyEndTime: that.studyEndTime,
        examStartTime: that.examStartTime,
        examEndTime: that.examEndTime,
        finishCourseTime: that.finishCourseTime,
        resitExamStartTime: that.resitExamStartTime,
        resitExamEndTime: that.resitExamEndTime,
        allowedResitExam: that.prohibit ? "0" : "1",
        onlineStudyRate: that.onlineStudyRate,
        exercisesRate: that.exercisesRate,
        examRate: that.examRate
      };
      console.log(params);
      this.utils.api.TermCoursePlanEdit(params).then(res => {
        if (res.code == 20200) {
          that.$message.success("保存成功！");
        } else {
          that.$message.error('请输入完整信息');
        }
      });
    },
    back(){
      this.$router.go(-1)
    }
  },
  head() {
    return {
      title: "天天通识-课程管理"
    };
  }
};
</script>
<style>
</style>
