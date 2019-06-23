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
        <div class="task_list">
          <ul>
            <li v-for="(item,index) in testList" :key="index">
              <h3>
                {{item.title}}
                <span>(卷面分：{{item.paperScore}})</span>
              </h3>
              <p>
                开始：
                <span>{{item.startTime}}</span>
                <em>题目数量：{{item.questionTotal}}</em>
              </p>
              <p>
                结束：
                <span>{{item.endTime}}</span>
                <em>已交/应交：{{item.answerStudentTotal}}/{{item.studentTotal}}</em>
              </p>
              <div class="kc_btn">
                <ul>
                  <li>
                    <nuxt-link :to="{path: '3-zyks-ckcj',query:{courseid:item.courseId,termid:item.termId,lessonid:item.lessonId,assessid:item.assessId,title:item.title,coursename:cname.courseName}}">
                      <span class="span3"></span>
                      <p>查看成绩</p>
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link  :to="{path: '3-zyks-sj',query:{courseid:item.courseId,termid:item.termId,lessonid:item.lessonId,assessid:item.assessId,title:item.title}}">
                      <span class="span4"></span>
                      <p>试卷预览</p>
                    </nuxt-link>
                  </li>
                  <li>
                    <a href="#">
                      <span class="span5"></span>
                      <p>导出成绩</p>
                    </a>
                  </li>
                </ul>
                <div class="clear"></div>
              </div>
            </li>
          </ul>
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
      testList: [], //试卷列表
      cname: [],
      dropshow: false,
    };
  },
  mounted() {
    const that = this;
    that.getRecommendIndex();
  },
  methods: {
    //试卷列表
    gettestpaperLlist() {
      const that = this;
      let params = {
        courseId: that.cname.courseId,
        termId: that.cname.termId
      };
      this.utils.api.testpaperLlist(params).then(res => {
        if (res.code == 20200) {
          that.testList = res.data.list;
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
          that.gettestpaperLlist();
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    showToggle() {
      this.dropshow = !this.dropshow;
    },
    //选择课程重新加载
    fungetRate(cid, tid, cname) {
      const that = this;
      let params = {
        courseId: cid,
        termId: tid
      };
      this.utils.api.testpaperLlist(params).then(res => {
        if (res.code == 20200) {
          that.testList = res.data.list;
          that.cname.courseName = cname;
          this.dropshow = !this.dropshow;
        } else {
          that.$message.error(res.msg);
        }
      });
    }
  },
  head() {
    return {
      title: "天天通识-作业考试"
    };
  }
};
</script>
<style>
</style>
