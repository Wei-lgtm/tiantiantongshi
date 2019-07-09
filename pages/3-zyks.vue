<template>
  <div>
    <Header/>
    <div class="mainer" v-loading="load">
      <div class="wrap">
        <LeftNav/>
        <div class="page_right">
          <div class="course_sel">
            <span @click="showToggle()">{{coursename}}</span>
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
          <div>
            <div class="task_list" v-if="testList.length > 0">
              <ul>
                <template v-for="(item,index) in testList">
                  <li :key="index">
                    <h3>
                      <em>{{item.title}}</em>
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
                    <div class="kc_btn" v-if="item.questionTotal > 0">
                      <ul>
                        <li>
                          <nuxt-link
                           ondragstart="return false"
                            :to="{path: '/3-zyks-ckcj',query:{courseid:item.courseId,termid:item.termId,lessonid:item.lessonId,assessid:item.assessId,title:item.title,coursename:cname.courseName,page,page}}"
                          >
                            <span class="span3"></span>
                            <p>查看成绩</p>
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link
                           ondragstart="return false"
                            :to="{path: '/3-zyks-sj',query:{courseid:item.courseId,termid:item.termId,lessonid:item.lessonId,assessid:item.assessId,title:item.title}}"
                          >
                            <span class="span4"></span>
                            <p>试卷预览</p>
                          </nuxt-link>
                        </li>
                        <li>
                          <a href="javascript:void(0)" @click="funexport(item.termId,item.courseId,item.lessonId,item.assessId,item.title)">
                            <span class="span5"></span>
                            <p>导出成绩</p>
                          </a>
                        </li>
                      </ul>
                      <div class="clear"></div>
                    </div>
                  </li>
                </template>
              </ul>
            </div>
            <div class="task_list" v-else>
              <div class="data_default">
                <img src="@/assets/img/curriculum_default.png">
              </div>
            </div>
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
      courseList: [], //課程列表
      testList: [], //试卷列表
      cname: [],
      dropshow: false,
      nodata: false,
      page: 1,
      pageSize: 10,
      total: 0,
      coursename: "",
      load: false,

      courseid: 0,
      termid: 0
    };
  },
  mounted() {
    const that = this;
    that.courseid = that.$store.getters.ecourseId === 0 ? 0 : that.$store.getters.ecourseId
    that.coursename = that.$store.getters.courseName === '' ? '' : that.$store.getters.courseName
    that.termid = that.$store.getters.etermId === 0 ? 0 : that.$store.getters.etermId
    that.page = that.$store.getters.page === 1 ? 1 : parseInt(that.$store.getters.page)
    that.getRecommendIndex();
  },
  methods: {
    //指定学期课程试卷导出学生成绩
    funexport(tid,cid,lid,aid,stitle) {
      const that = this;
      let params = {
        termId: tid,
        courseId: cid,
        lessonId: lid,
        assessId:aid
      };
      this.utils.api.TermCourseExamPaperScoreExport(params).then(res => {
        const content = res;
        const blob = new Blob([content], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        const fileName = "试卷-" + stitle + "-学生成绩.xlsx";
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    getpage(e) {
      const that = this;
      that.page = e;
      that.gettestpaperLlist();
    },
    //试卷列表
    gettestpaperLlist() {
      const that = this;
      let params = {
        courseId: that.courseid,
        termId: that.termid,
        page: that.page,
        pageSize: that.pageSize
      };
      this.utils.api.testpaperLlist(params).then(res => {
        if (res.code == 20200) {
          that.testList = res.data.list;
          that.total = res.data.total;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    //课程列表
    getRecommendIndex() {
      const that = this;
      that.load = true;
      this.utils.api.RecommendIndex().then(res => {
        that.load = false;
        if (res.code == 20200) {
          that.courseList = JSON.parse(JSON.stringify(res.data)); //课程
          if (res.data.length < 1) {
            that.nodata = true;
          } else {
            that.cname = res.data[0];
            that.courseid = that.$store.getters.ecourseId === 0 ? res.data[0].courseId : that.$store.getters.ecourseId;
            that.termid =that.$store.getters.etermId === 0 ? res.data[0].termId : that.$store.getters.etermId;
            that.coursename = that.$store.getters.courseName === '' ? res.data[0].courseName : that.$store.getters.courseName;
            that.cname.courseName = that.$store.getters.courseName === '' ? res.data[0].courseName : that.$store.getters.courseName;
            that.gettestpaperLlist();
          }
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
    showToggle() {
      this.dropshow = !this.dropshow;
    },
    //选择课程重新加载
    fungetRate(cid, tid, cname) {
      const that = this;
      that.page = 1;
      that.courseid = cid;
      that.termid = tid;
      that.coursename = cname;
      that.cname.courseName = cname;
      this.dropshow = !this.dropshow;
      let params = {
        courseId: that.courseid,
        termId: that.termid,
        page: that.page,
        pageSize: that.pageSize
      };
      that.gettestpaperLlist();
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
