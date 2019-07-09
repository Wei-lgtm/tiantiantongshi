<template>
  <div>
    <Header/>
    <div class="mainer">
      <div class="wrap">
        <div class="page_right">
          <div class="crumbs">
            <p>
              <a ondragstart="return false" href="javascript:void(0)">陈志武教授金融通识课_2019年秋季</a> &gt;
              <a ondragstart="return false" class="on" href="#">选课设置</a>
            </p>
          </div>
          <div class="kcgl_add">
            <a ondragstart="return false" href="javascript:void(0)" @click="funexport">下载验证失败的名单</a>
            <a ondragstart="return false" href="javascript:void(0)" @click="SaveTermCourseExportStudent">提交验证通过的名单</a>
          </div>
          <div class="page_tab">
            <div class="tab_box tab_box3 tp0">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <th>学生姓名</th>
                  <th>年级</th>
                  <th>学生班级</th>
                  <th>手机号码</th>
                  <th>学号</th>
                  <th>导入验证</th>
                </tr>
                <tr v-for="(item,index) in datalist" :key="index">
                  <td>{{item.studentName}}</td>
                  <td>{{item.schoolYear}}</td>
                  <td>{{item.className}}</td>
                  <td>{{item.mobile}}</td>
                  <td>{{item.studentNo}}</td>
                  <td>
                    <span
                      :class="item.status ==1?'span1':'span2'"
                    >{{item.status ==1 ?'通过':item.errorMsg}}</span>
                  </td>
                </tr>
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
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
export default {
  components: {
    Header
  },
  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 10,
      batchSerialNo: "", //上传批号
      datalist: [], //结果集
      courseid: 0,
      termid: 0,
      savelist: {}
    };
  },
  mounted() {
    const that = this;
    that.batchSerialNo = this.$route.query.batchSerialNo;
    that.courseid = this.$route.query.courseid;
    that.termid = this.$route.query.termid;

    that.TermCourseExportStudentList();
  },
  methods: {
    getpage(e) {
      const that = this;
      that.page = e;
      that.TermCourseExportStudentList();
    },
    //查看指定批号导入学期课程学生选课记录列表
    TermCourseExportStudentList() {
      const that = this;
      let params = {
        batchSerialNo: that.batchSerialNo,
        page: that.page,
        pageSize: that.pageSize
      };
      this.utils.api.TermCourseExportStudentList(params).then(res => {
        if (res.code == 20200) {
          that.datalist = res.data.list;
          that.total = res.data.total;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    //提交验证通过名单
    SaveTermCourseExportStudent() {
      const that = this;
      let params = {
        batchSerialNo: that.batchSerialNo,
        termId: that.termid,
        courseId: that.courseid
      };
      this.utils.api.SaveTermCourseExportStudent(params).then(res => {
        if (res.code == 20200) {
          that.savelist = res.data;
          that.$message.success(res.msg);
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    //下载学期课程学生选课错误列表
    funexport() {
      const that = this;

      let params = {
        batchSerialNo: that.batchSerialNo
      };
      this.utils.api.DownTermCourseExportFailStudentList(params).then(res => {
        const content = res;
        const blob = new Blob([content], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
        const fileName = '学期课程学生选课错误列表.xlsx';
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
    }
  },
  head() {
    return {
      title: "天天通识-导入选课信息"
    };
  }
};
</script>
<style lang="scss" scoped>
.kcgl_add {
  & /deep/ .el_onloda {
    background: #8dcfcb;
    border: none;
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    margin-left: 16px;
    vertical-align: top;
    padding: 0 14px;
  }
}
</style>

