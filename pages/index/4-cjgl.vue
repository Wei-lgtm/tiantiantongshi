<template>
  <div class="mainer">
    <div class="wrap">
      <div class="page_left">
        <ul>
          <li><nuxt-link to="/"><span>我的课程</span></nuxt-link></li>
          <li><nuxt-link to="/2-kcjd"><span>课程进度</span></nuxt-link></li>
          <li><nuxt-link to="/3-zyks"><span>作业考试</span></nuxt-link></li>
          <li class="on"><nuxt-link to="/4-cjgl"><span>成绩管理</span></nuxt-link></li>
          <li><nuxt-link to="/5-xjgl"><span>学籍管理</span></nuxt-link></li>
          <li><nuxt-link to="/6-kcgl"><span>课程管理</span></nuxt-link></li>
          <li><nuxt-link to="/7-jsgl"><span>教师管理</span></nuxt-link></li>
          <li><nuxt-link to="/8-jgsz"><span>学校设置</span></nuxt-link></li>
        </ul>
      </div>
      <div class="page_right">
        <div class="course_sel">
          <span @click="showToggle()">{{cname.courseName}}</span>
          <div class="drop" v-show="dropshow">
            <ul>
              <li
                v-for="(item,index) in courseList"
                :key="index"
                @click="fungetRate(item.courseId,item.termId,item.courseName)"
              >{{item.courseName}}</li>
            </ul>
          </div>
        </div>
        <div class="chart">
          <div class="left">
            <div class="tit">
              <h3>成绩总览</h3>
              <div class="clear"></div>
            </div>
            <div class="achievement_zl">
              <div class="data">
                <p>开始：<span>2019/03/21  14:30:00</span></p>
                <p>结束：<span>2019/03/21  16:30:00</span></p>
              </div>
              <div class="list">
                <ul>
                  <li><p>参与人数：{{summaryList.studentTotal}}</p></li>
                  <li><p>及格人数：{{summaryList.passStudentTotal}}</p></li>
                  <li><p>未及格人数：{{summaryList.flunkStudentTotal}}</p></li>
                </ul>
                <ul>
                  <li><p>平均成绩：{{summaryList.avgScore}}</p></li>
                  <li><p>最高成绩：{{summaryList.maxScore}}</p></li>
                  <li><p>最低成绩：{{summaryList.minScore}}</p></li>
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
              <img src="@/assets/img/tb3.jpg" />
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="page_tab">
          <div class="title">
            <h3>详情</h3>
            <div class="title_search">
              <input type="text" placeholder="请输入学生姓名\学号" /><a href="#"></a>
            </div>
            <div class="title_btn">
              <span><a class="a1" href="#">督促学习</a></span><span><a class="a2" href="#">导出名单</a></span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="tab_box tab_box1">
            <table cellpadding="0" cellspacing="0">
              <thead>
              <tr>
                <th>学号</th>
                <th>学生姓名</th>
                <th>班级</th>
                <th>学习进度</th>
                <th>平时作业</th>
                <th>期末成绩</th>
                <th>补考分数</th>
                <th>总成绩</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in achievementList" :key="index">
                <td>{{item.studentNo}}</td>
                <td>{{item.studentName}}</td>
                <td>{{item.className}}</td>
                <td>{{item.progressPercent}}</td>
                <td>{{item.exercisesScore}}</td>
                <td>{{item.examScore}}</td>
                <td>{{item.makeUpExamScore}}</td>
                <td><a href="#">{{item.score}}</a></td>
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
      courseList: [], //課程列表
      achievementList: [], //成绩列表
      cname: [],
      dropshow: false,
      summaryList:[],//成绩汇总列表
    };
  },
  mounted() {
    const that = this;
    that.getRecommendIndex();
  },
  methods: {
    //学期课程综合成绩汇总
    getAchievementSummary() {
      const that = this;
      let params = {
        courseId: that.cname.courseId,
        termId: that.cname.termId
      };
      this.utils.api.AchievementSummary(params).then(res => {
        if (res.code == 20200) {
          that.summaryList = res.data;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    //学期课程学生成绩列表
    getListofAchievements() {
      const that = this;
      let params = {
        courseId: that.cname.courseId,
        termId: that.cname.termId
      };
      this.utils.api.ListofAchievements(params).then(res => {
        if (res.code == 20200) {
          that.achievementList = res.data.list;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    //课程列表
    getRecommendIndex() {
      const that = this;
      this.utils.api.RecommendIndex().then(res => {
        if (res.code == 20200) {
          that.courseList = JSON.parse(JSON.stringify(res.data)); //课程
          that.cname = res.data[0];
          that.getListofAchievements();
          that.getAchievementSummary();
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    showToggle() {
      this.dropshow = !this.dropshow;
    },
    //选择班级重新加载
    fungetRate(cid, tid, cname) {
      const that = this;
      let params = {
        courseId: cid,
        termId: tid
      };
      this.utils.api.ListofAchievements(params).then(res => {
        if (res.code == 20200) {
          that.achievementList = res.data.list;
          that.cname.courseName = cname;
          this.dropshow = !this.dropshow;
        } else {
          that.$message.error(res.msg);
        }
      });
      this.utils.api.AchievementSummary(params).then(res => {
        if (res.code == 20200) {
          that.summaryList = res.data;
        } else {
          that.$message.error(res.msg);
        }
      });
    }
  },
  head() {
    return {
      title: "天天通识-成绩管理"
    };
  }
}
</script>
<style>

</style>
