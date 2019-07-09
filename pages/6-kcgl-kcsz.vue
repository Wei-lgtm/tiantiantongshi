<template>
  <div>
    <Header />
    <div class="mainer">
      <div class="wrap">
        <LeftNav />
        <div class="page_right">
          <div class="crumbs">
            <p>
              <a href="javascript:void(0)" ondragstart="return false">{{coursename}}</a> >
              <a class="on" href="javascript:void(0)" ondragstart="return false">课程设置</a>
              <span>
                <a href="javascript:void(0)" ondragstart="return false" @click="back">
                  <em>返回</em>
                </a>
              </span>
            </p>
          </div>
          <div class="course_design">
            <div class="item">
              <h3>基本设置</h3>
              <div class="sourse_form_btn">
                <a
                  ondragstart="return false"
                  href="javascript:void(0)"
                  @click="TermCoursePlanEdit()"
                >确定</a>
                <nuxt-link ondragstart="return false" to="/6-kcgl" class="a1">取消</nuxt-link>
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
                    <input type="text" placeholder="请输入分值" v-model="onlineStudyRate" />分
                    <span>期末考试前，观看完全部课程视频，可以得满分。</span>
                  </p>
                  <div class="line"></div>
                </div>
                <div class="list">
                  <p>
                    习&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题：占
                    <input
                      type="text"
                      placeholder="请输入分值"
                      v-model="exercisesRate"
                    />分
                    <span>期末考试前，完成所有课后习题，成绩按每课的平均分计算，未做题目计0分。</span>
                  </p>
                  <div class="line"></div>
                </div>
                <div class="list">
                  <p>
                    考&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;试：占
                    <input
                      type="text"
                      placeholder="请输入分值"
                      v-model="examRate"
                    />分
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
  </div>
</template>
<script>
import Header from "@/components/Header";
import LeftNav from "@/components/left_nav";
export default {
  components: {
    Header,
    LeftNav
  },
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
      prohibit: false,
      termname:'',
      kpage:1,
    };
  },
  mounted() {
    const that = this;
    that.termid = this.$route.query.termid;
    that.courseid = this.$route.query.courseid;
    that.coursename = this.$route.query.coursename;
    that.termname = this.$route.query.termname;
    that.kpage = this.$route.query.page;

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
          if (res.data.allowedResitExam == 0) {
            that.prohibit = true;
          }
          that.onlineStudyRate = res.data.onlineStudyRate;
          that.exercisesRate = res.data.exercisesRate;
          that.examRate = res.data.examRate;
        }
        if (res.code == 20106) {
          that.$message.error("身份验证信息已过期，请重新登录");
          setTimeout(function() {
            that.$router.push("/");
          }, 1000);
        }
        if (res.code == 20201) {
          that.$message.error(res.msg);
          setTimeout(function() {
            that.$router.push("/");
          }, 1000);
        } else {
          // that.$message.error(res.msg);
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
      if (!that.prohibit && !that.resitExamStartTime) {
        that.$message.error("请选择补考开始时间");
        return false;
      }
      if (!that.prohibit && !that.resitExamEndTime) {
        that.$message.error("请选择补考结束时间");
        return false;
      }
      if (!that.studyStartTime) {
        that.$message.error("请选择学习开始时间");
        return false;
      }
      if (!that.studyEndTime) {
        that.$message.error("请选择学习结束时间");
        return false;
      }
      if (!that.examStartTime) {
        that.$message.error("请选择期末考试开始时间");
        return false;
      }
      if (!that.examEndTime) {
        that.$message.error("请选择期末考试结束时间");
        return false;
      }
      if (!that.finishCourseTime) {
        that.$message.error("请选择结课时间");
        return false;
      }
      if (!that.onlineStudyRate) {
        that.$message.error("请填写在线学习分值");
        return false;
      }
      if (!that.exercisesRate) {
        that.$message.error("请填写习题分值");
        return false;
      }
      if (!that.examRate) {
        that.$message.error("请填写考试分值");
        return false;
      }
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
      this.utils.api.TermCoursePlanEdit(params).then(res => {
        if (res.code == 20200) {
          that.$message.success("保存成功！");
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    back() {
      const that = this
      that.$store.commit("setKtermName", that.termname);
      that.$store.commit("setKtermId", this.$route.query.termid);
      that.$store.commit("setKpage", that.kpage);
      this.$router.go(-1);
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
