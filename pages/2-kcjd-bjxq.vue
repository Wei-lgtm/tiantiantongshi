<template>
  <div>
    <Header />
    <div class="mainer" v-loading="load">
      <div class="wrap">
        <LeftNav />
        <div class="page_right page_kcjd_r">
          <div class="crumbs">
            <p>
              <a href="javascript:void(0)" ondragstart="return false">{{cname}}</a> >
              <select v-model="classname" @change="funchag">
                <option
                  :value="item.classId"
                  v-for="(item,index) in bjlist"
                  :key="index"
                >{{item.className}}</option>
              </select>
            </p>
          </div>
          <div class="chart">
            <div class="left">
              <div class="tit">
                <h3>学习总进度</h3>
                <span>当前计划进度：{{progresslsit.planProgress?progresslsit.planProgress:'0'}}%</span>
                <div class="clear"></div>
              </div>
              <div class="chart_pie">
                <v-chart :options="pie" />
              </div>
            </div>
            <!-- <div class="right">
            <div class="tit">
              <h3>学习趋势</h3>
              <span>
                <em>
                  <a href="#">本周</a>
                </em>
                <em>
                  <a href="#">本月</a>
                </em>
                <em>
                  <a href="#">最近十五天</a>
                </em>
              </span>
              <div class="clear"></div>
            </div>
            <div class="chart_line">
              <img src="@/assets/img/tb2.jpg">
            </div>
            </div>-->
            <div class="clear"></div>
          </div>
          <div class="page_tab">
            <div class="title">
              <h3>详情</h3>
              <!-- <div class="title_search">
              <input type="text" placeholder="请输入学生姓名\学号">接口差关键词字段
              <a href="#"></a>
              </div>-->
              <div class="title_btn">
                <span>
                  <a
                    class="a1"
                    href="javascript:void(0);"
                    @click="funshowdcxx"
                    ondragstart="return false"
                  >督促学习</a>
                </span>
                <span>
                  <a class="a2" @click="winhref" ondragstart="return false">导出名单</a>
                </span>
              </div>
              <div class="clear"></div>
            </div>
            <div class="tab_box tab_box1">
              <div class="tab_box_cha">
                <ul>
                  <li :class="type==1?'on':''" @click="funtype(1)">
                    <label>
                      <span>全部学生</span>
                    </label>
                  </li>
                  <li :class="type==2?'on':''" @click="funtype(2)">
                    <label>
                      <span>快于计划</span>
                    </label>
                  </li>
                  <li :class="type==3?'on':''" @click="funtype(3)">
                    <label>
                      <span>慢于计划</span>
                    </label>
                  </li>
                  <li :class="type==4?'on':''" @click="funtype(4)">
                    <label>
                      <span>
                        学习进度低于
                        <font>
                          <input type="text" @keyup.enter="funtype(4)" v-model="percent" />%
                        </font>
                      </span>
                    </label>
                  </li>
                </ul>
                <div class="clear"></div>
              </div>
              <table cellpadding="0" cellspacing="0">
                <thead>
                  <tr>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>学习进度</th>
                    <th>累计学时</th>
                    <th>笔记数</th>
                    <th>最后登录时间</th>
                    <th>
                      <label :class="setAll?'on':''" @click="funSetAll">选择</label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item,index) in classList"
                    :key="index"
                    @click="item.checked = !item.checked"
                  >
                    <td>{{item.studentNo}}</td>
                    <td>{{item.studentName}}</td>
                    <td>{{item.progressPercent}}%</td>
                    <td>{{item.playtimes}}</td>
                    <td>{{item.note}}</td>
                    <td>{{item.lastlogin}}</td>
                    <td>
                      <label :class="item.checked?'on':''"></label>
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
        <dcxx :showDcxx.sync="showDcxx" :dcxxtype="2" :studentIds="studentIds" />
      </div>
    </div>
  </div>
</template>
<script>
import Dcxx from "@/components/dcxx";
import echarts from "echarts";
import Header from "@/components/Header";
import LeftNav from "@/components/left_nav";
import domainName from "@/config/main";
export default {
  components: {
    Dcxx,
    Header,
    LeftNav
  },
  data() {
    return {
      showDcxx: false,
      courseid: 0,
      termid: 0,
      classid: 0,
      classList: [],
      type: 1,
      load: false,
      progresslsit: [],
      pie: {},
      LearnTrendslist: [],
      datatime: "",
      cname: "",
      classname: "",
      bjlist: [],
      checked: false,
      setAll: false,
      studentIds: [],
      percent: "20",
      percentlist: [],
      page: 1,
      pageSize: 10,
      total: 0
    };
  },
  watch: {
    percent: function(newval, oldval) {
      if (!newval) return;
      if (!/^([1-9]\d?|100)$/.test(newval)) {
        this.$message.error("请输入1-100之间的数字！");
        this.percent = "20";
      }
    }
  },
  mounted() {
    const that = this;
    that.courseid = that.$route.query.courseid;
    that.termid = that.$route.query.termid;
    that.classid = that.$route.query.classid;
    that.classname = that.$route.query.classid;
    that.cname = that.$route.query.cname;

    that.classCourseReportDetail();
    that.LearnProgress();
    that.Ratelearning();

    that.$store.commit("setTermId", that.termid);
    that.$store.commit("setCourseId", that.courseid);
  },
  methods: {
    winhref() {
      const that = this;
      let arr = "";
      if (!that.setAll) {
        that.classList.map(item => {
          if (item.checked) {
            arr += "," + item.studentId;
          }
        });
      }
      arr = arr.slice(1);
      window.location.href =
        // "http://qasschoolapi.lumibayedu.com/course/classCourseReportDetailExport?termId=" +
        domainName + "/course/classCourseReportDetailExport?termId=" +
        that.termid +
        "&courseId=" +
        that.courseid +
        "&classId=" +
        that.classid +
        "&type=" +
        that.type +
        "&percent=" +
        that.percent +
        "&studentIds=" +
        arr +
        "&schoolId=" +
        this.$store.getters.user.schoolId;
    },
    getpage(e) {
      const that = this;
      that.page = e;
      that.classCourseReportDetail();
    },
    //班级学习进度报表
    classCourseReportDetail() {
      const that = this;
      let params = {
        courseId: that.courseid,
        termId: that.termid,
        classId: that.classid,
        type: that.type,
        page: that.page,
        pageSize: that.pageSize
      };
      if (that.type == 4) {
        params.percent = that.percent;
      }
      that.load = true;
      this.utils.api.ClassCourseReportDetail(params).then(res => {
        that.load = false;
        if (res.code == 20200) {
          // res.data.map(item => {
          //   item.checked = false;
          // });
          for (let i = 0; i < res.data.list.length; i++) {
            res.data.list[i].checked = false;
          }
          that.classList = res.data.list; //课程
          if (that.setAll == true) {
            for (let i = 0; i < that.classList.length; i++) {
              that.classList[i].checked = true;
            }
          }
          that.total = res.data.total;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    funSetAll() {
      const that = this;
      that.setAll = !that.setAll;
      for (let i = 0; i < that.classList.length; i++) {
        that.classList[i].checked = that.setAll;
      }
    },
    //获取班级列表
    Ratelearning() {
      const that = this;
      let params = {
        courseId: that.courseid,
        termId: that.termid
      };
      this.utils.api.ratelearning(params).then(res => {
        if (res.code == 20200) {
          that.bjlist = res.data;
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
    //学习总进度
    LearnProgress() {
      const that = this;
      let params = {
        courseId: that.courseid,
        termId: that.termid,
        classId: that.classid
      };
      this.utils.api.LearnProgress(params).then(res => {
        if (res.code == 20200) {
          that.progresslsit = res.data;
          let serdata = [];
          serdata.push({ value: res.data.faster, name: "快于计划" });
          serdata.push({ value: res.data.slower, name: "慢于计划" });
          serdata.push({ value: res.data.noLearn, name: "没有学习" });
          let piedata = {
            title: {
              text: "",
              x: "center"
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            graphic: {
              type: "text",
              left: "center",
              top: "center",
              z: 2,
              zlevel: 100,
              style: {
                text: "选修人数\n" + res.data.total,
                x: 100,
                y: 100,
                textAlign: "center",
                fill: "#999",
                width: 30,
                height: 30
              }
            },
            color: ["#8dcfcb", "#33b0ff", "#ff9934"],
            legend: {
              orient: "horizontal",
              x: "center",
              y: "bottom",
              data: ["快于计划", "慢于计划", "没有学习"]
            },
            series: [
              {
                name: "学习总进度",
                type: "pie",
                radius: ["35%", "50%"],
                center: ["50%", "50%"],
                data: serdata,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                },
                labelLine: {
                  normal: {
                    show: true, // show设置线是否显示，默认为true，可选值：true ¦ false
                    length: 10,
                    length2: 10
                  }
                },
                label: {
                  normal: {
                    position: "outer", // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                    // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                    // {a}指series.name  {b}指series.data的name
                    // {c}指series.data的value  {d}%指这一部分占总数的百分比
                    formatter: "{d}% {c}人 "
                  }
                }
              }
            ]
          };
          that.pie = piedata;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    funchag() {
      const that = this;
      that.page = 1;
      that.classid = that.classname;
      that.LearnProgress();
      that.classCourseReportDetail();
    },
    funtype(index) {
      const that = this;
      that.type = index;
      if (that.percent == "") {
        that.$message.error("搜索进度不能为空");
        that.percent = "20";
        return false;
      }
      if (that.percent == "0") {
        that.$message.error("搜索进度不能小于1");
        return false;
      }
      that.classCourseReportDetail();
    },
    //督促学习
    funshowdcxx() {
      const that = this;
      let arr = [];
      // that.classList.map(item => {
      //   if (item.checked) {
      //     arr.push(item.studentId);
      //   }
      // });
      for (let i = 0; i < that.classList.length; i++) {
        if (that.classList[i].checked) {
          arr.push(that.classList[i].studentId);
        }
      }
      that.studentIds = arr;
      if (that.studentIds.length < 1) {
        that.$message.error("请选择学生");
        return false;
      } else {
        that.showDcxx = true;
      }
    }
  },
  head() {
    return {
      title: "天天通识-课程进度"
    };
  }
};
</script>
<style>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>
