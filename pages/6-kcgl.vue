<template>
  <div>
    <Header />
    <div class="mainer">
      <div class="wrap">
        <LeftNav />
        <div class="page_right">
          <div class="course_sel">
            <span @click="showToggle()">{{termName}}</span>
            <div class="drop" v-show="dropshow">
              <ul>
                <li
                  v-for="(item,index) in semesterList"
                  :key="index"
                  @click="fungetRate(item.id,item.termName)"
                >{{item.termName}}</li>
              </ul>
            </div>
          </div>
          <div class="kcgl_add">
            <a ondragstart="return false" href="javascript:void(0)" @click="showKkgl=true">添加学期课程</a>
          </div>
          <div class="kc_list kcgl_list" v-if="termCourse.length > 0">
            <ul>
              <li v-for="(item,index) in termCourse" :key="index">
                <div class="box">
                  <div class="img">
                    <a ondragstart="return false" href="javascript:void(0)">
                      <img :src="item.thumb" />
                    </a>
                  </div>
                  <div class="web">
                    <h3>
                      <a ondragstart="return false" href="javascript:void(0)">{{item.courseName}}</a>
                    </h3>
                    <div class="kcgl_text">
                      <p>
                        <span class="span1">
                          日期：
                          <em>{{item.courseStartTime}}-- {{item.courseEndTime}}</em>
                        </span>
                        <span class="span2">
                          教师：
                          <em>{{item.teacherName}}</em>
                        </span>
                      </p>
                      <h4>辅导老师：{{item.coachTeacherName}} | 学时：{{item.allLesson}} | 选修人数：{{item.studentTotal}} | 未上课人数：{{item.notStudyStudentTotal}}</h4>
                    </div>
                  </div>
                  <div class="clear"></div>
                  <div class="kc_btn">
                    <ul>
                      <li>
                        <nuxt-link
                          ondragstart="return false"
                          :to="{path:'/6-kcgl-kcsz',query:{termid:item.termId,courseid:item.courseId,coursename:item.courseName,termId:item.termId,termname:item.termName,page:page}}"
                        >
                          <span class="span6"></span>
                          <p>课程设置</p>
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link
                          ondragstart="return false"
                          :to="{path:'/6-kcgl-xkgl',query:{termid:item.termId,courseid:item.courseId,coursename:item.courseName,termname:item.termName,page:page}}"
                        >
                          <span class="span7"></span>
                          <p>选课管理</p>
                        </nuxt-link>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          ondragstart="return false"
                          @click="RemoveTermCourse(item.termId,item.courseId)"
                        >
                          <span class="span8"></span>
                          <p>删 除</p>
                        </a>
                      </li>
                    </ul>
                    <div class="clear"></div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="pageSize" v-if="total > 10">
              <el-pagination
                layout="prev, pager, next"
                :current-page="page"
                @current-change="getpage"
                :total="total"
              ></el-pagination>
            </div>
          </div>
          <div class="kc_list kcgl_list" v-else>
            <div class="data_default">
              <img src="@/assets/img/curriculum_default.png" />
            </div>
          </div>
        </div>
        <!-- <div class="page_right" v-else><p class="nodata">暂无数据</p></div> -->
        <div class="clear"></div>
        <kkgl
          :showKkgl.sync="showKkgl"
          :semesterList.sync="semesterList"
          :cname.sync="cname"
          :termId.sync="termId"
          :onsubmit="TermCourseList"
          :ongetindex="GetIndex"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Kkgl from "@/components/kkgl";
import Header from "@/components/Header";
import LeftNav from "@/components/left_nav";
export default {
  components: {
    Kkgl,
    Header,
    LeftNav
  },
  data() {
    return {
      semesterList: [], //学期列表
      termCourse: [], //学期选课课程列表
      cname: [],
      dropshow: false,
      cnametext: "",
      showKkgl: false,
      termId: 0,
      nodata: false,
      page: 1,
      pageSize: 10,
      total: 0,
      termName: "",
      courseid: 0,
      kpage: 1
    };
  },
  mounted() {
    const that = this;
    that.termName =
      that.$store.getters.ktermName === "" ? "" : that.$store.getters.ktermName;
    that.termId =
      that.$store.getters.ktermId === 0 ? 0 : that.$store.getters.ktermId;
    that.terName =
      that.$store.getters.kpage === 1 ? 1 : that.$store.getters.kpage;

    that.GetIndex();
  },
  methods: {
    //学期列表
    GetIndex() {
      const that = this;
      this.utils.api.GetIndex().then(res => {
        if (res.code == 20200) {
          that.semesterList = JSON.parse(JSON.stringify(res.data)); //学期
          if (res.data.length < 0) {
            that.nodata = true;
            that.cname = {
              id: 0,
              termName: ""
            };
          } else {
            that.cname = res.data[0];
            that.termName = that.$store.getters.ktermName === "" ? res.data[0].termName : that.$store.getters.ktermName;
            that.termId = that.$store.getters.ktermId === 0 ? res.data[0].id : that.$store.getters.ktermId;
            that.page = that.$store.getters.kpage === 1 ? that.page : that.$store.getters.kpage;
            that.$store.commit("setTermId", that.termId);
            that.TermCourseList();
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
    //学期选课课程列表
    TermCourseList() {
      const that = this;
      let params = {
        termId: that.termId,
        page: that.page,
        pageSize: that.pageSize
      };
      this.utils.api.TermCourseList(params).then(res => {
        if (res.code == 20200) {
          that.termCourse = res.data.list;
          that.total = res.data.total;
          that.$store.commit("setTermCourse", that.termCourse);
        } else {
          // that.$message.error(res.msg);
        }
      });
    },
    showToggle() {
      this.dropshow = !this.dropshow;
    },
    //选择学期重新加载
    fungetRate(tid, tname) {
      const that = this;
      that.termId = tid;
      that.TermCourseList();
      that.cname.termName = tname;
      that.termName = tname;
      that.cname.id = tid;
      this.dropshow = !this.dropshow;
    },
    RemoveTermCourse(tid, cid) {
      const that = this;
      let params = {
        termId: tid,
        courseId: cid
      };
      this.utils.api.RemoveTermCourse(params).then(res => {
        if (res.code == 20200) {
          that.$message.success("删除成功！");
          that.TermCourseList();
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    getpage(e) {
      const that = this;
      that.page = e;
      that.TermCourseList();
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
