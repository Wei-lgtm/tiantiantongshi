<template>
<div>
    <Header/>
  <div class="mainer">
    <div class="wrap">
      <LeftNav />
      <div class="page_right">
        <div class="crumbs">
          <p>
            <a href="javascript:void(0)" ondragstart="return false">{{coursename}}</a> >
            <a href="javascript:void(0)" ondragstart="return false">{{title}}</a>
            <span>
              <a href="javascript:void(0)" @click="back" ondragstart="return false">
                <em>返回</em>
              </a>
            </span>
          </p>
        </div>
        <div class="chart">
          <div class="left">
            <div class="tit">
              <h3>题目数量：{{acsummary.questionTotal}}</h3>
              <div class="clear"></div>
            </div>
            <div class="achievement_zl">
              <div class="list">
                <ul>
                  <li>
                    <p>参与人数：{{acsummary.studentTotal}}</p>
                  </li>
                  <li>
                    <p>已交人数：{{acsummary.answerStudentTotal}}</p>
                  </li>
                  <li>
                    <p>未交人数：{{acsummary.noAnswerStudentTotal}}</p>
                  </li>
                </ul>
                <ul>
                  <li>
                    <p>平均成绩：{{acsummary.avgScore}}</p>
                  </li>
                  <li>
                    <p>最高成绩：{{acsummary.maxScore}}</p>
                  </li>
                  <li>
                    <p>最低成绩：{{acsummary.minScore}}</p>
                  </li>
                </ul>
                <div class="clear"></div>
              </div>
            </div>
          </div>
          <!-- <div class="right">
            <div class="tit">
              <h3>成绩人数分布</h3>
              <div class="clear"></div>
            </div>
            <div class="chart_bar">
              <img src="~/assets/img/tb3.jpg">
            </div>
          </div> -->
          <div class="clear"></div>
        </div>
        <div class="page_tab">
          <div class="title">
            <h3>成绩</h3>
            <!-- <div class="title_search">
              <input type="text" placeholder="请输入学生姓名\学号">接口差关键词字段
              <a href="#"></a>
            </div> -->
            <div class="clear"></div>
          </div>
          <div class="tab_box tab_box1">
            <table cellpadding="0" cellspacing="0">
              <thead>
                <tr>
                  <th>学号</th>
                  <th>学生姓名</th>
                  <th>上交时间</th>
                  <th>成绩</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in stutestList" :key="index">
                  <td>{{item.studentNo}}</td>
                  <td>{{item.studentName}}</td>
                  <td>{{item.updateTime}}</td>
                  <td>{{item.score}}</td>
                  <td>
                    <nuxt-link ondragstart="return false" :to="{path:'/3-zyks-sjxsxq',query:{termid:item.termId,courseid:item.courseId,lessonid:item.lessonId,assessid:item.assessId,studentid:item.studentId,title:title}}">
                      详情
                    </nuxt-link>
                  </td>
                </tr>
              </tbody>
            </table>
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
      stutestList: [], //试卷列表
      courseid: 0,
      termid: 0,
      lessonid: 0,
      assessid: 0,
      classid:0,
      title:'',
      acsummary:[],
      coursename:'',
    };
  },
  mounted() {
    const that = this;
    that.courseid = this.$route.query.courseid;
    that.termid = this.$route.query.termid;
    that.lessonid = this.$route.query.lessonid;
    that.assessid = this.$route.query.assessid;
    that.classid = this.$route.query.classid;
    that.title = this.$route.query.title;
    that.coursename = this.$route.query.coursename;

    that.TermCourseExamScoreStudentList();
  },
  methods: {
    //课程考试成绩-学生列表
    TermCourseExamScoreStudentList() {
      const that = this;
      let params = {
        courseId: that.courseid,
        termId: that.termid,
        lessonId: that.lessonid,
        assessId: that.assessid,
        classId:that.classid
      };
      this.utils.api.TermCourseExamScoreStudentList(params).then(res => {
        if (res.code == 20200) {
          that.stutestList = res.data.list;
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
      //学期课程班级内页-左学生成绩统计
      this.utils.api.TermCourseExamScoreStudentCollect(params).then(res => {
        if (res.code == 20200) {
          that.acsummary = res.data;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    back(){
      this.$router.go(-1)
    }
  },
  head(){
    return {
      title:'天天通识-作业考试'
    }
  }
};
</script>
<style>
</style>
