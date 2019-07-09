<template>
  <div>
    <Header />
    <div class="mainer">
      <div class="wrap">
        <LeftNav />
        <div class="page_right">
          <div class="page_tit">
            <h3>教师管理</h3>
          </div>
          <div class="page_tab">
            <div class="title">
              <div class="title_edit">
                <a ondragstart="return false" href="javascript:void(0)" @click="showTjjs=true">
                  <span class="span1"></span>
                  <em>添加辅导老师</em>
                </a>
                <a
                  ondragstart="return false"
                  href="javascript:void(0)"
                  @click="funShowScjs"
                  v-if="teachersList.length > 0"
                >
                  <span class="span2"></span>
                  <em>删除所选老师</em>
                </a>
              </div>
              <div class="title_btn" v-if="teachersList.length > 0">
                <span>
                  <a
                    ondragstart="return false"
                    class="a2"
                    href="javascript:void(0)"
                    @click="funexport"
                  >导出名单</a>
                </span>
              </div>
              <div class="clear"></div>
            </div>
            <div class="tab_box tab_box1">
              <table cellpadding="0" cellspacing="0">
                <thead>
                  <tr>
                    <th>教师姓名</th>
                    <th>手机号码</th>
                    <th>工号</th>
                    <th>最后上线时间</th>
                    <th>
                      <label :class="selAll?'on':''" @click="funselAll">选择</label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="teachersList.length > 0">
                    <tr
                      v-for="(item,index) in teachersList"
                      :key="index"
                      @click="item.check = !item.check"
                    >
                      <td>{{item.realname}}</td>
                      <td>{{item.mobile}}</td>
                      <td>{{item.jobNum}}</td>
                      <td>{{item.lastlogin}}</td>
                      <td>
                        <label :class="item.check?'on':''"></label>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td colspan="5">
                        <div class="data_default">
                          <img src="@/assets/img/curriculum_default.png" />
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <div class="pageSize">
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
        <tjjs :showTjjs.sync="showTjjs" :onsubmit="ListofTeachers" />
        <scjs :showScjs.sync="showScjs" :selList.sync="selList" :onsubmit="ListofTeachers" />
      </div>
    </div>
  </div>
</template>
<script>
import Tjjs from "@/components/tjjs";
import Scjs from "@/components/scjs";
import Header from "@/components/Header";
import LeftNav from "@/components/left_nav";
export default {
  components: {
    Tjjs,
    Scjs,
    Header,
    LeftNav
  },
  data() {
    return {
      teachersList: [], //教师列表
      showTjjs: false,
      showScjs: false,
      selAll: false,
      selList: [],
      total: 0,
      page: 1,
      pageSize: 10
    };
  },
  mounted() {
    const that = this;

    that.ListofTeachers();
  },
  methods: {
    //教师列表
    ListofTeachers() {
      const that = this;
      let params = {
        page: that.page,
        pageSize: that.pageSize
      };
      this.utils.api.ListofTeachers(params).then(res => {
        if (res.code == 20200) {
          that.selAll = false;
          for (let i = 0; i < res.data.list.length; i++) {
            res.data.list[i].check = false;
          }
          that.teachersList = res.data.list;
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
      that.ListofTeachers();
    },
    funselAll() {
      const that = this;
      that.selAll = !that.selAll;
      for (let i = 0; i < that.teachersList.length; i++) {
        that.teachersList[i].check = that.selAll;
      }
    },
    funShowScjs() {
      const that = this;
      let selList = [];
      for (let i = 0; i < that.teachersList.length; i++) {
        if (that.teachersList[i].check) {
          selList.push(that.teachersList[i].id);
        }
      }
      that.selList = selList;
      that.showScjs = true;
    },
    //教师信息导出
    funexport() {
      const that = this;
      let arr = "";
      if (!that.selAll)
        that.teachersList.map(item => {
          if (item.check) {
            arr += "," + item.id;
          }
        });
      arr = arr.slice(1);
      let params = {
        teacherIds: arr
      };
      this.utils.api.ExportTeacher(params).then(res => {
        const content = res;
        const blob = new Blob([content], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        const fileName = "教师信息.xlsx";
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
      title: "天天通识-教师管理"
    };
  }
};
</script>
<style>
</style>
