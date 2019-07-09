<template>
  <div>
    <Header/>
    <div class="mainer">
      <div class="wrap">
        <LeftNav/>
        <div class="page_right">
          <div class="crumbs">
            <p>
              <a href="javascript:void(0)" ondragstart="return false">{{coursename}}</a> >
              <a class="on" href="javascript:void(0)" ondragstart="return false">选课管理</a>
              <span>
                <a href="javascript:void(0)" @click="back" ondragstart="return false">
                  <em>返回</em>
                </a>
              </span>
            </p>
          </div>
          <div class="page_tab">
            <div class="title">
              <div class="title_search">
                <input type="text" v-model="seaclass" @keyup.enter="search" placeholder="查询班级">
                <a href="javascript:void(0)" ondragstart="return false" @click="search"></a>
              </div>
              <div class="title_btn">
                <span>
                  <a class="a3" href="javascript:void(0)" ondragstart="return false" @click="funshowsz">设置辅导老师</a>
                </span>
                <span>
                  <a class="a4" ondragstart="return false" href="javascript:void(0)">
                    导入选课信息
                    <el-upload
                      class="upload-demo"
                      ref="upload"
                      action
                      :on-change="fileChange"
                      :show-file-list="false"
                      :auto-upload="false"
                      :multiple="false"
                    >
                      <el-button size="small" type="primary" class="glyphicon glyphicon-import"></el-button>
                      <div slot="tip" class="el-upload__tip"></div>
                    </el-upload>
                  </a>
                </span>
                <span>
                  <a ondragstart="return false" class="a2" @click="winhref">导出选课信息</a>
                  <!--"'http://qasschoolapi.lumibayedu.com/student/termCourseStudentExport?termId='+termid+'&courseId='+courseid+'&classIds='+arr2+''"-->
                </span>
              </div>
              <div class="clear"></div>
            </div>
            <div class="tab_box tab_box2">
              <table cellpadding="0" cellspacing="0">
                <thead>
                  <tr>
                    <th>班级名称</th>
                    <th>辅导老师</th>
                    <th>选修人数</th>
                    <th>
                      平均学习
                      <br>进度（%）
                    </th>
                    <th>
                      期末考试
                      <br>完成率（%）
                    </th>
                    <th>
                      补考完
                      <br>成率（%）
                    </th>
                    <th>
                      <label :class="selAll?'on':''" @click="funselAll">选择</label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item,index) in courseselection"
                    :key="index"
                    @click="item.check = !item.check"
                  >
                    <td>
                      <nuxt-link
                       ondragstart="return false"
                        :to="{path:'/6-kcgl-bjxq',query:{courseid:courseid,termid:termid,classid:item.classId,title:title}}"
                      >{{item.className}}</nuxt-link>
                    </td>
                    <td>{{item.teacherName}}</td>
                    <td>{{item.studentTotal}}</td>
                    <td>{{item.learningRate}}</td>
                    <td>{{item.examCompleteRate}}</td>
                    <td>{{item.resitExamCompleteRate}}</td>
                    <td>
                      <label :class="item.check?'on':''"></label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="clear"></div>
        <div class="modal modal_szfdls" v-show="showsz">
          <div class="fp_modal">
            <div class="cell">
              <div class="modal_cont">
                <div class="close" @click="showsz=false"></div>
                <div class="modal_tit">
                  <h3>设置辅导教师</h3>
                </div>
                <div class="mod_tjjs">
                  <ul>
                    <li>
                      <span>辅导老师：</span>
                      <div class="web web_sel">
                        <select v-model="teacherid">
                          <option
                            :value="item.id"
                            v-for="(item,index) in teacherslist"
                            :key="index"
                          >{{item.realname}} {{item.mobile}}</option>
                        </select>
                      </div>
                      <div class="clear"></div>
                    </li>
                  </ul>
                  <div class="mod_btn">
                    <a ondragstart="return false" class="a1" href="javascript:void(0)" @click="funSetClassCoachTeacher">确定</a>
                    <a ondragstart="return false" href="javascript:void(0)" @click="showsz=false">取消</a>
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
import Header from "@/components/Header";
import LeftNav from "@/components/left_nav";
import domainName from "@/config/main";
export default {
  components: {
    Header,
    LeftNav
  },
  data() {
    return {
      courseselection: [], //选课列表
      courseid: 0,
      termid: 0,
      selAll: false,
      seaclass: "",
      showsz: false,
      teacherslist: [],
      teacherid: 0,
      coursename: "",
      ifsearch: false,
      form: {
        file: ""
      },
      batchSerialNo: "",
      arr2: "",
      title:'',
      termname:'',
      kpage:1,
    };
  },
  mounted() {
    const that = this;
    that.courseid = this.$route.query.courseid;
    that.termid = this.$route.query.termid;
    that.coursename = this.$route.query.coursename;
    that.title = this.$route.query.coursename;
    that.termname = this.$route.query.termname;
    that.kpage = this.$route.query.page;

    that.GetCourseClassReport();
    that.ListofTeachers();
  },
  methods: {
    winhref() {
      const that = this;
      let arr = "";
      that.courseselection.map(item => {
        if (item.check) {
          arr += "," + item.classId ;
        }
      });
      if (arr.length < 1) {
        that.$message.error("请选择班级！");
        return false;
      } else {
        arr = arr.slice(1)
        window.location.href =
          // "http://qasschoolapi.lumibayedu.com/student/termCourseStudentExport?termId=" +
          domainName + "/student/termCourseStudentExport?termId=" +
          that.termid +
          "&courseId=" +
          that.courseid +
          "&classIds=" +
          arr +
          "&schoolId=" + 
          this.$store.getters.user.schoolId;
      }
    },
    //学期课程学生选课导入
    fileChange(file) {
      const that = this;
      if (
        file.raw.type ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        that.form.file = file.raw;
        var fd = new FormData();
        fd.append("export_student", that.form.file);
        this.utils.api.TermCourseExportStudent(fd).then(res => {
          if (res.code == 20200) {
            that.batchSerialNo = res.data.batchSerialNo;
            let courseid = that.courseid;
            let termid = that.termid;
            setTimeout(function() {
              that.$router.push({
                path: "drxkxx",
                query: {
                  batchSerialNo: that.batchSerialNo,
                  courseid: courseid,
                  termid: termid
                }
              });
            }, 1000);
          } else {
            if (res.msg == "Undefined index: student_name") {
              that.$message.error("表格缺少 *学生姓名 栏");
              return false;
            }
            if (res.msg == "Undefined index: mobile") {
              that.$message.error("表格缺少 *手机 栏");
              return false;
            }
            if (res.msg == "Undefined index: student_no") {
              that.$message.error("表格缺少 *学号 栏");
              return false;
            }
            if (res.msg == "Undefined index: class_name") {
              that.$message.error("表格缺少 *班级 栏");
              return false;
            }
            if (res.msg == "Undefined index: school_year") {
              that.$message.error("表格缺少 *年级 栏");
              return false;
            } else {
              that.$message.error(res.msg);
            }

            //
          }
        });
      } else {
        that.$message.error("只能上传.xlsx格式文件");
      }
    },
    //获取指定学期课程班级选课汇总列表
    GetCourseClassReport() {
      const that = this;
      let params = {
        courseId: that.courseid,
        termId: that.termid,
        className: that.seaclass
      };
      this.utils.api.GetCourseClassReport(params).then(res => {
        if (res.code == 20200) {
          that.selAll = false;
          for (let i = 0; i < res.data.list.length; i++) {
            res.data.list[i].check = false;
          }
          if (that.ifsearch) {
            if (res.data.list.length < 1) {
              that.$message.error("当前搜索无结果");
              that.ifsearch = !that.ifsearch;
            }
          }
          that.courseselection = res.data.list;
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
    funselAll() {
      const that = this;
      that.selAll = !that.selAll;
      for (let i = 0; i < that.courseselection.length; i++) {
        that.courseselection[i].check = that.selAll;
      }
    },
    back() {
      const that = this
      that.$store.commit("setKtermName", that.termname);
      that.$store.commit("setKtermId", this.$route.query.termid);
      that.$store.commit("setKpage", that.kpage);
      this.$router.go(-1);
    },
    search() {
      const that = this;
      that.ifsearch = true;
      that.page = 1;
      that.GetCourseClassReport();
    },
    ListofTeachers() {
      const that = this;
      this.utils.api.ListofTeachers().then(res => {
        if (res.code == 20200) {
          that.teacherslist = res.data.list;
          that.teacherid = res.data.list[0].id;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    funshowsz() {
      const that = this;
      let arr = [];
      that.courseselection.map(item => {
        if (item.check) {
          arr.push(item.classId);
        }
      });
      if (arr.length < 1) {
        that.$message.error("请选择班级！");
        return false;
      } else {
        that.showsz = true;
      }
    },
    //
    funSetClassCoachTeacher() {
      const that = this;
      let arr = [];
      that.courseselection.map(item => {
        if (item.check) {
          arr.push(item.classId);
        }
      });
      if (arr.length < 1) {
        that.$message.error("请选择班级！");
        return false;
      }
      let params = {
        termId: this.$route.query.termid,
        courseId: this.$route.query.courseid,
        classIds: arr,
        teacherId: that.teacherid
      };
      this.utils.api.SetClassCoachTeacher(params).then(res => {
        if (res.code == 20200) {
          that.$message.success("设置成功！");
          that.showsz = false;
          that.GetCourseClassReport();
        } else {
          that.$message.error(res.msg);
        }
      });
    }
  },
  head() {
    return {
      title: "天天通识-课程管理"
    };
  }
};
</script>
<style lang="scss" scoped>
.title_btn {
  & /deep/ .upload-demo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    .el-upload {
      width: 100%;
      .el-button--small,
      .el-button--small.is-round {
        width: 100%;
        vertical-align: top;
      }
    }
  }
}
</style>

