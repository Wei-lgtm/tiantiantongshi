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
              <img src="@/assets/img/tb3.jpg">
            </div>
          </div> -->
          <div class="clear"></div>
        </div>
        <div class="page_tab">
          <div class="title">
            <h3>详情</h3>
            <!-- <div class="title_search">
              <input type="text" placeholder="请输入班级">接口差关键词字段
              <a href="#"></a>
            </div> -->
            <div class="title_cj_btn">
              <nuxt-link ondragstart="return false" :to="{path:'/3-zyks-tmfxsj',query:{courseid:courseid,termid:termid,lessonid:lessonid,assessid:assessid,title:title}}">
                题目分析
              </nuxt-link>
            </div>
            <div class="clear"></div>
          </div>
          <div class="tab_box">
            <table cellpadding="0" cellspacing="0">
              <thead>
                <tr>
                  <th>班级名称</th>
                  <th>辅导老师</th>
                  <th>已交</th>
                  <th>未交</th>
                  <th>参与人数</th>
                  <th>最高成绩</th>
                  <th>平均成绩</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in classtestList" :key="index">
                  <td>
                    <nuxt-link ondragstart="return false" :to="{path:'/3-zyks-bjxxcj',query:{classid:item.classId,courseid:courseid,termid:termid,lessonid:lessonid,assessid:assessid,title:title,coursename:coursename}}">
                      {{item.className}}
                    </nuxt-link>
                  </td>
                  <td>{{item.teacherName}}</td>
                  <td>{{item.answerStudentTotal}}</td>
                  <td>{{item.noAnswerStudentTotal}}</td>
                  <td>{{item.studentTotal}}</td>
                  <td>{{item.maxScore}}</td>
                  <td>{{item.avgScore}}</td>
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
      classtestList: [], //试卷列表
      courseid:0,
      termid:0,
      lessonid:0,
      assessid:0,
      title:'',
      coursename: '',
      acsummary:[],//成绩汇总
      page:1,
    };
  },
  mounted() {
    const that = this;
    that.courseid = this.$route.query.courseid
    that.termid = this.$route.query.termid
    that.lessonid = this.$route.query.lessonid
    that.assessid = this.$route.query.assessid
    that.title = this.$route.query.title
    that.coursename = this.$route.query.coursename
    that.page = this.$route.query.page

    that.TermCourseExamScoreClassCollect();
  },
  methods: {
    //课程考试成绩按班级列表
    TermCourseExamScoreClassCollect() {
      const that = this;
      let params = {
        courseId:that.courseid,
        termId:that.termid,
        lessonId:that.lessonid,
        assessId:that.assessid
      };
      this.utils.api.TermCourseExamScoreClassCollect(params).then(res => {
        if (res.code == 20200) {
          that.classtestList = res.data.list;
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
      //学期课程学生成绩总汇总报表
      this.utils.api.TermCourseExamScoreReport(params).then(res => {
        if (res.code == 20200) {
          that.acsummary = res.data;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    back(){
      const that = this
      that.$store.commit("setEtermId", that.termid);
      that.$store.commit("setEcourseId", that.courseid);
      that.$store.commit("setCourseName", that.coursename);
      that.$store.commit("setPage", that.page);
      this.$router.go(-1);
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
