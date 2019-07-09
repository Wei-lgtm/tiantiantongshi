<template>
  <div>
    <Header/>
    <div class="mainer">
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
          <div class="chart">
            <div class="left">
              <div class="tit">
                <h3>成绩总览</h3>
                <div class="clear"></div>
              </div>
              <div class="achievement_zl">
                <!-- <div class="data">
                <p>开始：<span>2019/03/21  14:30:00</span></p>
                <p>结束：<span>2019/03/21  16:30:00</span></p>
                </div>-->
                <div class="list">
                  <ul>
                    <li>
                      <p>参与人数：{{summaryList.studentTotal || 0}}</p>
                    </li>
                    <li>
                      <p>及格人数：{{summaryList.passStudentTotal || 0}}</p>
                    </li>
                    <li>
                      <p>未及格人数：{{summaryList.flunkStudentTotal || 0}}</p>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <p>平均成绩：{{summaryList.avgScore || 0}}</p>
                    </li>
                    <li>
                      <p>最高成绩：{{summaryList.maxScore || 0}}</p>
                    </li>
                    <li>
                      <p>最低成绩：{{summaryList.minScore || 0}}</p>
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
              <img src="@/assets/img/tb3.jpg" />
            </div>
            </div>-->
            <div class="clear"></div>
          </div>
          <div class="page_tab">
            <div class="title">
              <h3>详情</h3>
              <div class="title_search">
                <input type="text" v-model="keywords" placeholder="请输入学生姓名\学号">
                <a ondragstart="return false" href="javascript:void(0)" @click="search"></a>
              </div>
              <div class="title_btn">
                <span>
                  <a ondragstart="return false" class="a1" href="javascript:void(0)" @click="showKhbz=true">考核标准</a>
                </span>
                <span v-if="achievementList.length > 0">
                  <a ondragstart="return false" class="a2" href="javascript:void(0)" @click="funexport">导出名单</a>
                </span>
              </div>
              <div class="clear"></div>
            </div>
            <div class="tab_box tab_box1 cjgl_tab">
              <table cellpadding="0" cellspacing="0">
                <thead>
                  <tr>
                    <th>学号</th>
                    <th>学生姓名</th>
                    <th>班级</th>
                    <th>学习进度（%）</th>
                    <th>平时作业</th>
                    <th>期末成绩</th>
                    <th>补考分数</th>
                    <th>
                      总成绩
                      <div class="cj_tips">
                        <div class="drop">
                          <div class="box">
                            <h3>结课前：</h3>
                            <h4>总成绩=学习进度+学习行为+平时作业+期末考试</h4>
                            <p>教师可以在成绩发布前修改得分</p>
                            <h3>
                              结课后：
                              <span>不及格的学生参加补考</span>
                            </h3>
                            <p>补考成绩 ≥ 60 分，最终得分取60分</p>
                            <p>补考成绩 < 60 分，最终得分取成绩最高分</p>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="achievementList.length > 0">
                    <tr v-for="(item,index) in achievementList" :key="index">
                      <td>{{item.studentNo}}</td>
                      <td>{{item.studentName}}</td>
                      <td>{{item.className}}</td>
                      <td>{{item.progressPercent}}</td>
                      <td>{{item.exercisesScore}}</td>
                      <td>{{item.examScore}}</td>
                      <td>{{item.makeUpExamScore}}</td>
                      <td>
                        <a
                          href="javascript:void(0);"
                          ondragstart="return false"
                          @click="bjcjShow(item.studentId,item.score)"
                        >{{item.score}}</a>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td colspan="8">
                        <div class="data_default">
                          <img src="@/assets/img/curriculum_default.png">
                        </div>
                      </td>
                    </tr>
                  </template>
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
        <khbz :showKhbz.sync="showKhbz" :assessmentlist.sync="assessmentlist"/>
        <!--成绩管理-编辑成绩-->
        <div class="modal modal_bjcj" v-show="bjcj">
          <div class="fp_modal">
            <div class="cell">
              <div class="modal_cont">
                <div class="close" @click="close"></div>
                <div class="modal_tit">
                  <h3>
                    <img src="@/assets/img/icon44.png">编辑成绩
                  </h3>
                </div>
                <div class="mod_cjgl">
                  <div class="mod_tip">
                    <p>课程未结课，当前成绩不是最终成绩，请谨慎调整成绩！</p>
                  </div>
                  <div class="tab">
                    <h4>
                      <span class="flt">当前成绩</span>
                      <span>课程加分&nbsp;&nbsp;&nbsp;</span>
                      <span class="frt">最终得分</span>
                    </h4>
                    <div class="cjgl_web">
                      <span class="flt">{{score}}</span>
                      +
                      <input
                        type="text"
                        v-model="extras"
                        maxlength="5"
                        @keyup.enter="TermCourseScoreEdit"
                        @input="oninput"
                      >
                      =
                      <span class="frt">
                        {{Number(Number(score)+ Number(extras))}}
                        <em>分</em>
                      </span>
                    </div>
                  </div>
                  <div class="ht30"></div>
                  <div class="mod_btn">
                    <a class="a1" ondragstart="return false" href="javascript:void(0)" @click="TermCourseScoreEdit()">确定</a>
                    <a href="javascript:void(0)" ondragstart="return false" @click="close">取消</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Khbz from "@/components/khbz";
import Header from "@/components/Header";
import LeftNav from "@/components/left_nav";
export default {
  components: {
    Khbz,
    Header,
    LeftNav
  },
  data() {
    return {
      showKhbz: false,
      courseList: [], //課程列表
      achievementList: [], //成绩列表
      cname: [],
      dropshow: false,
      summaryList: [], //成绩汇总列表
      dateFormatType: 1,
      assessmentlist: [],
      extras: 0,
      bjcj: false,
      score: 0,
      studentId: 0,
      termid: 0,
      courseid: 0,
      coursedata: [],
      finalScore: 0,
      nodata: false,
      keywords: "",
      page: 1,
      pageSize: 10,
      pageEnable: 1,
      total: 0,
      ifsearch: false,
      coursename: ""
    };
  },
  mounted() {
    const that = this;
    that.getRecommendIndex();
  },
  methods: {
    oninput(e) {
      // 通过正则过滤小数点后两位
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
    },
    close() {
      const that = this;
      that.bjcj = false;
      that.extras = 0;
    },
    //学期课程学生成绩导出
    funexport() {
      const that = this;
      let params = {
        termId: that.termid,
        courseId: that.courseid,
        keywords: that.keywords
      };
      this.utils.api.TermCourseStudentScoreExport(params).then(res => {
        const content = res;
        const blob = new Blob([content], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        const fileName = "学期课程学生成绩.xlsx";
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
    //考核标准
    assessmentCriteria() {
      const that = this;
      let params = {
        termId: that.cname.termId,
        courseId: that.cname.courseId,
        dateFormatType: that.dateFormatType
      };
      this.utils.api.assessmentCriteria(params).then(res => {
        if (res.code == 20200) {
          that.assessmentlist = res.data;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    bjcjShow(sid, score) {
      const that = this;
      that.score = score;
      that.studentId = sid;
      that.bjcj = true;
    },
    //学期课程学生成绩编辑
    TermCourseScoreEdit() {
      const that = this;
      if (that.extras == 0) {
        that.$message.error("请填写课程加分值");
        return false;
      }
      if (that.extras > 100) {
        that.$message.error("课程加分值不能超过100!");
        return false;
      }
      let params = {
        termId: that.coursedata.termId,
        courseId: that.coursedata.courseId,
        studentId: that.studentId,
        extras: that.extras
      };
      this.utils.api.TermCourseScoreEdit(params).then(res => {
        if (res.code == 20200) {
          that.$message.success("编辑成功！");
          that.bjcj = false;
          that.extras = 0;
          that.getListofAchievements();
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    search() {
      const that = this;
      that.ifsearch = true;
      that.page = 1;
      that.getListofAchievements();
    },
    //学期课程学生成绩列表
    getListofAchievements() {
      const that = this;
      let params = {
        courseId: that.cname.courseId,
        termId: that.cname.termId,
        keywords: that.keywords,
        page: that.page,
        pageSize: that.pageSize,
        pageEnable: that.pageEnable
      };
      that.termid = that.cname.termId;
      that.courseid = that.cname.courseId;
      this.utils.api.ListofAchievements(params).then(res => {
        if (res.code == 20200) {
          if (that.ifsearch) {
            if (res.data.list.length < 1) {
              that.$message.error("当前搜索无结果");
              that.ifsearch = !that.ifsearch;
            }
          }
          that.achievementList = res.data.list;
          that.total = res.data.total;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    getpage(e) {
      const that = this;
      that.page = e;
      that.getListofAchievements();
    },
    //课程列表
    getRecommendIndex() {
      const that = this;
      this.utils.api.RecommendIndex().then(res => {
        if (res.code == 20200) {
          that.courseList = JSON.parse(JSON.stringify(res.data)); //课程
          if (JSON.stringify(res.data).length < 1) {
            that.nodata = true;
          } else {
            that.cname = res.data[0];
            that.coursedata = res.data[0];
            that.courseid = res.data[0].courseId;
            that.termid = res.data[0].termId;
            that.coursename = res.data[0].courseName;
            that.getListofAchievements();
            that.getAchievementSummary();
            that.assessmentCriteria();
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
    //选择班级重新加载
    fungetRate(cid, tid, cname) {
      const that = this;
      that.courseid = cid;
      that.termid = tid;
      that.coursename = cname;
      that.page = 1;
      let params = {
        courseId: cid,
        termId: tid,
        keywords: that.keywords,
        page: that.page,
        pageSize: that.pageSize,
        pageEnable: that.pageEnable
      };
      this.utils.api.ListofAchievements(params).then(res => {
        if (res.code == 20200) {
          that.achievementList = res.data.list;
          that.total = res.data.total;
          that.cname.courseName = cname;
          that.cname.termId = tid;
          that.cname.courseId = cid;
          that.coursedata.termId = tid;
          that.coursedata.courseId = cid;
          that.assessmentCriteria();
          this.dropshow = !this.dropshow;
        } else {
          // that.$message.error(res.msg);
        }
      });
      this.utils.api.AchievementSummary(params).then(res => {
        if (res.code == 20200) {
          that.summaryList = res.data;
        } else {
          // that.$message.error(res.msg);
        }
      });
    }
  },
  head() {
    return {
      title: "天天通识-成绩管理"
    };
  }
};
</script>
<style lang="scss" scoped>
.mod_cjgl .tab .cjgl_web {
  & /deep/ .el-input-number {
    width: 132px;
    vertical-align: middle;
    margin: 0 9px;
    input {
      margin: 0;
    }
  }
}
</style>

