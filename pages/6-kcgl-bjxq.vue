<template>
<div>
    <Header/>
  <div class="mainer">
    <div class="wrap">
      <LeftNav />
      <div class="page_right">
        <div class="crumbs">
          <p>
            <a ondragstart="return false" href="javascript:void(0)">{{coursename}}</a> >
            <a href="javascript:void(0)" ondragstart="return false">选课管理</a> >
            <a class="on" href="javascript:void(0)" ondragstart="return false">19计算机1班</a>
            <span>
              <a href="javascript:void(0)" ondragstart="return false" @click="back">
                <em>返回</em>
              </a>
            </span>
          </p>
        </div>
        <div class="page_tab">
          <div class="title">
            <div class="title_search">
              <input type="text" v-model="keywords" placeholder="请输入学生姓名/学号/手机号码">
              <a ondragstart="return false" href="javascript:void(0)" @click="search"></a>
            </div>
            <div class="title_btn">
              <span>
                <label :class="checkde?'on':''" @click="getTermCourseClassStudentList">仅显示未提交期末考试的学生</label>
              </span>
              <span>
                <a ondragstart="return false" class="a2" @click="winhref">导出名单</a>
                <!-- <a class="a2" href="javascript:void(0)" @click="funexport">导出名单</a> -->
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
                    <a ondragstart="return false" href="javascript:void(0)" @click="funYcxs(item)">移出</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pageSize" v-if="total > 10">
            <el-pagination
              layout="prev, pager, next"
              :current-page="page"
              @current-change="getpage"
              :total="total"
            ></el-pagination>
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
</div>
</template>
<script>
import Ycxs from "@/components/ycxs";
import Header from "@/components/Header";
import LeftNav from "@/components/left_nav";
import domainName from "@/config/main";
export default {
  components: {
    Ycxs,
    Header,
    LeftNav
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
      ifsearch:false,
      page:1,
      pageSize:10,
      total:0,
      isExam:1,
      coursename:'',
    };
  },
  mounted() {
    const that = this;
    that.courseid = this.$route.query.courseid;
    that.termid = this.$route.query.termid;
    that.classid = this.$route.query.classid;
    that.coursename = this.$route.query.title;

    that.TermCourseClassStudentList();
  },
  methods: {
    winhref() {
      const that = this;
      let arr = "" + this.$route.query.classid;
      if(that.checkde){
        that.isExam = 0
      }else{
        that.isExam = 1
      }
        window.location.href =
          // "http://qasschoolapi.lumibayedu.com/student/termCourseClassStudentExport?termId=" +
          domainName + "/student/termCourseClassStudentExport?termId=" +
          that.termid +
          "&courseId=" +
          that.courseid +
          "&classId=" +
          arr +
          "&keywords=" +
          that.keywords +
          "&isExam=" +
          that.isExam +
          "&schoolId=" + 
          this.$store.getters.user.schoolId;
    },
    getpage(e){
      const that = this
      that.page=e
      that.TermCourseClassStudentList();
    },
    //获取指定学期课程班级学生统计列表
    TermCourseClassStudentList() {
      const that = this;
      let params = {
        courseId: that.courseid,
        termId: that.termid,
        classId: that.classid,
        isExam: that.checkde ? "0" : "1",
        keywords: that.keywords,
        page:that.page,
        pageSize:that.pageSize,
      };
      this.utils.api.TermCourseClassStudentList(params).then(res => {
        if (res.code == 20200) {
          if (that.ifsearch) {
            if (res.data.list.length < 1) {
              that.$message.error("当前搜索无结果");
              that.ifsearch = !that.ifsearch
            }
          }
          that.courseselection = res.data.list;
          that.total = res.data.total
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
    //显示未提交
    getTermCourseClassStudentList() {
      const that = this;
      that.checkde = !that.checkde;
      that.page = 1
      that.TermCourseClassStudentList();
    },
    search() {
      const that = this;
      that.ifsearch = true
      that.page = 1
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
