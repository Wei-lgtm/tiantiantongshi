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
              <img src="@/assets/img/tb3.jpg">
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="page_tab">
          <div class="title">
            <h3>详情</h3>
            <div class="title_search">
              <input type="text" placeholder="请输入班级">
              <a href="#"></a>
            </div>
            <div class="title_cj_btn">
              <nuxt-link :to="{path:'3-zyks-tmfxsj',query:{courseid:courseid,termid:termid,lessonid:lessonid,assessid:assessid,title:title}}">
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
                    <nuxt-link :to="{path:'3-zyks-bjxxcj',query:{classid:item.classId,courseid:courseid,termid:termid,lessonid:lessonid,assessid:assessid,title:title}}">
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
</template>
<script>
export default {
  components: {},
  data() {
    return {
      classtestList: [], //试卷列表
      courseid:0,
      termid:0,
      lessonid:0,
      assessid:0,
      title:'',
      coursename: '',
      acsummary:[]//成绩汇总
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

    that.TermCourseExamScoreClassCollect();
  },
  methods: {
    //试卷列表
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
        } else {
          that.$message.error(res.msg);
        }
      });
      this.utils.api.TermCourseExamScoreReport(params).then(res => {
        if (res.code == 20200) {
          that.acsummary = res.data;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
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
