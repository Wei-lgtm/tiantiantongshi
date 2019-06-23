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
            <a href="#">陈志武教授金融通识课_2019年秋季</a> >
            <a href="#">选课管理</a> >
            <a class="on" href="#">19计算机1班</a>
            <span>
              <a href="javascript:void(0)" @click="back">
                <em>返回</em>
              </a>
            </span>
          </p>
        </div>
        <div class="page_tab">
          <div class="title">
            <div class="title_search">
              <input type="text" v-model="keywords" placeholder="请输入学生姓名/学号/手机号码">
              <a href="javascript:void(0)" @click="search"></a>
            </div>
            <div class="title_btn">
              <span>
                <label :class="checkde?'on':''" @click="getTermCourseClassStudentList">仅显示未提交期末考试的学生</label>
              </span>
              <span>
                <a class="a2" href="#">导出名单</a>
              </span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="tab_box tab_box2">
            <table cellpadding="0" cellspacing="0">
              <thead>
                <tr>
                  <th>学号</th>
                  <th>学生姓名</th>
                  <th>手机号码</th>
                  <th>学习进度</th>
                  <th>期末考试</th>
                  <th>补考成绩</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in courseselection" :key="index">
                  <td>{{item.studentNo}}</td>
                  <td>{{item.studentName}}</td>
                  <td>{{item.mobile}}</td>
                  <td>{{item.studyProgress}}</td>
                  <td>{{item.isExamName}}</td>
                  <td>{{item.resitExamScore}}</td>
                  <td>
                    <a href="javascript:void(0)" @click="funYcxs(item)">移出</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="clear"></div>
      <ycxs
        :showYcxs.sync="showYcxs"
        :ycxsitem.sync="ycxsitem"
        :onsubmit="TermCourseClassStudentList"
      />
    </div>
  </div>
</template>
<script>
import Ycxs from "@/components/ycxs";
export default {
  components: {
    Ycxs
  },
  data() {
    return {
      courseselection: [], //选课列表
      courseid: 0,
      termid: 0,
      classid: 0,
      showYcxs: false,
      ycxsitem: {},
      checkde: false,
      keywords: "",
    };
  },
  mounted() {
    const that = this;
    that.courseid = this.$route.query.courseid;
    that.termid = this.$route.query.termid;
    that.classid = this.$route.query.classid;

    that.TermCourseClassStudentList();
  },
  methods: {
    //获取指定学期课程班级学生统计列表
    TermCourseClassStudentList() {
      const that = this;
      let params = {
        courseId: that.courseid,
        termId: that.termid,
        classId: that.classid,
        isExam: that.checkde ? "0" : "1",
        keywords: that.keywords
      };
      this.utils.api.TermCourseClassStudentList(params).then(res => {
        if (res.code == 20200) {
          that.courseselection = res.data.list;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    //显示未提交
    getTermCourseClassStudentList() {
      const that = this;
      that.checkde = !that.checkde;
      that.TermCourseClassStudentList();
    },
    search() {
      const that = this;
      that.TermCourseClassStudentList();
    },
    funYcxs(item) {
      const that = this;
      that.ycxsitem = item;
      that.showYcxs = true;
    },
    back() {
      const that = this;
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
