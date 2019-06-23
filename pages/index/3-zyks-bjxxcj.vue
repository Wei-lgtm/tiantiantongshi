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
          <li class="on">
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
          <li>
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
            <a href="#">陈志武教授金融通识课_2019年秋季</a> >
            <a href="#">期末考试</a>
            <span>
              <a href="#">
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
          <div class="right">
            <div class="tit">
              <h3>成绩人数分布</h3>
              <div class="clear"></div>
            </div>
            <div class="chart_bar">
              <img src="~/assets/img/tb3.jpg">
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="page_tab">
          <div class="title">
            <h3>成绩</h3>
            <div class="title_search">
              <input type="text" placeholder="请输入学生姓名\学号">
              <a href="#"></a>
            </div>
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
                    <nuxt-link :to="{path:'3-zyks-sjxsxq',query:{termid:item.termId,courseid:item.courseId,lessonid:item.lessonId,assessid:item.assessId,studentid:item.studentId,title:title}}">
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
</template>
<script>
export default {
  components: {},
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

    that.TermCourseExamScoreStudentList();
  },
  methods: {
    //试卷列表
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
        } else {
          that.$message.error(res.msg);
        }
      });
      this.utils.api.TermCourseExamScoreStudentCollect(params).then(res => {
        if (res.code == 20200) {
          that.acsummary = res.data;
        } else {
          that.$message.error(res.msg);
        }
      });
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
