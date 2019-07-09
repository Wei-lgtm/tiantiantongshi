<template>
  <div>
    <Header/>
    <div class="mainer">
      <div class="wrap">
        <LeftNav/>
        <div class="page_right">
          <div class="page_tab">
            <div class="title">
              <h3>详情</h3>
              <div class="title_search">
                <input type="text" v-model="keyword" placeholder="请输入学生姓名\学号">
                <a ondragstart="return false" href="javascript:void(0)" @click="search"></a>
              </div>
              <div class="title_btn">
                <span>
                  <a ondragstart="return false" class="a4" href="javascript:void(0)">
                    导入学生信息
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
                <span v-if="studentstatusList.length > 0">
                  <a ondragstart="return false" class="a2" href="javascript:void(0)" @click="funexport">导出学生信息</a>
                </span>
              </div>
              <div class="clear"></div>
            </div>
            <div class="tab_box tab_box1">
              <table cellpadding="0" cellspacing="0">
                <thead>
                  <tr>
                    <th>学号</th>
                    <th>学生姓名</th>
                    <th>年级</th>
                    <th>学生班级</th>
                    <th>手机号码</th>
                    <th>性别</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="studentstatusList.length > 0">
                    <tr v-for="(item,index) in studentstatusList" :key="index">
                      <td>{{item.studentNo}}</td>
                      <td>{{item.studentName}}</td>
                      <td>{{item.schoolYear}}</td>
                      <td>{{item.className}}</td>
                      <td>{{item.mobile}}</td>
                      <td>{{item.sex}}</td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td colspan="6">
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
        <div class="modal modal_xjdrsb" v-if="showXjdrsb">
          <div class="fp_modal">
            <div class="cell">
              <div class="modal_cont">
                <div class="close" @click="close()"></div>
                <div class="modal_tit">
                  <h3>导入失败信息</h3>
                </div>
                <div class="mod_drsb">
                  <div class="drsb_tab">
                    <table cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <th>学号</th>
                          <th>姓名</th>
                          <th>班级</th>
                          <th>年级</th>
                          <th>手机号码</th>
                          <th>性别</th>
                          <th>失败原因</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item,index) in faillist" :key="index">
                          <td>{{item.studentinfo.studentNo}}</td>
                          <td>{{item.studentinfo.studentName}}</td>
                          <td>{{item.studentinfo.className}}</td>
                          <td>{{item.studentinfo.schoolYear}}</td>
                          <td>{{item.studentinfo.mobile}}</td>
                          <td>{{item.studentinfo.sex}}</td>
                          <td>
                            <span>{{item.msg}}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="mod_btn">
                    <a ondragstart="return false" class="a1" href="javascript:void(0)" @click="close()">确定</a>
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
export default {
  components: {
    Header,
    LeftNav
  },
  data() {
    return {
      studentstatusList: [], //学籍列表
      dropshow: false,
      keyword: "",
      total: 0,
      page: 1,
      pageSize: 10,
      form: {
        file: ""
      },
      fileList: [],
      faillist: [],
      showXjdrsb: false
    };
  },
  mounted() {
    const that = this;

    that.SchoolRollManagement();
  },
  methods: {
    //学生信息
    funexport() {
      const that = this;
      this.utils.api.ExportStudent().then(res => {
        const content = res;
        const blob = new Blob([content], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        const fileName = "学生信息.xlsx";
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
    close() {
      const that = this;
      that.showXjdrsb = false;
      that.SchoolRollManagement();
    },
    //学生信息导入
    fileChange(file) {
      const that = this;
      if (
        file.raw.type ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        that.form.file = file.raw;
        var fd = new FormData();
        fd.append("export_student", that.form.file);
        this.utils.api.StudentImport(fd).then(res => {
          if (res.code == 20200) {
            if (res.data.errormsg.length < 1) {
              that.$message.success("导入成功！");
              that.SchoolRollManagement();
            } else {
              that.faillist = res.data.errormsg;
              that.showXjdrsb = true;
            }
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
            if (res.msg == "Undefined index: sex") {
              that.$message.error("表格缺少 *性别 栏");
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
    SchoolRollManagement() {
      const that = this;
      //学籍管理
      let params = {
        keyword: that.keyword,
        page: that.page,
        pageSize: that.pageSize
      };
      this.utils.api.SchoolRollManagement(params).then(res => {
        if (res.code == 20200) {
          that.studentstatusList = res.data.list;
          that.total = res.data.total;
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
    getpage(e) {
      const that = this;
      that.page = e;
      that.SchoolRollManagement();
    },
    search() {
      const that = this;
      that.page = 1;
      that.SchoolRollManagement();
    }
  },
  head() {
    return {
      title: "天天通识-学籍管理"
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
