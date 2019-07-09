<template>
  <div>
    <Header />
    <div class="mainer">
      <div class="wrap">
        <LeftNav />
        <div class="page_right">
          <div class="course_sel">
            <span @click="showToggle()">{{coursename}}</span>
            <div class="drop" v-show="dropshow">
              <ul>
                <li
                  v-for="(item,index) in courseList"
                  :key="index"
                  @click="fungetRate(item)"
                >{{item.courseName ? item.courseName :''}}</li>
                <!--item.courseId,item.termId,item.courseName-->
              </ul>
            </div>
          </div>
          <div class="chart">
            <div class="left">
              <div class="tit">
                <h3>学习总进度</h3>
                <span>当前计划进度：{{progresslsit.planProgress?progresslsit.planProgress:'0'}}%</span>
                <div class="clear"></div>
              </div>
              <div class="chart_pie" v-if="courseList.length > 0">
                <v-chart :options="pie" />
              </div>
              <div class="chart_pie" v-else>
                <div class="data_default data_default1">
                  <img src="@/assets/img/curriculum_default.png" />
                </div>
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
              <v-chart :options="line"/>
              <div id="linechar" :style="{width:'100%',height:'100%'}"></div>
              <img src="@/assets/img/tb2.jpg">
            </div>
            </div>-->
            <div class="clear"></div>
          </div>
          <div class="page_tab">
            <div class="title">
              <h3>详情</h3>
              <div class="title_search">
                <input type="text" v-model="classname" placeholder="请输入班级" />
                <a href="javascript:void(0)" @click="search" ondragstart="return false"></a>
              </div>
              <div class="title_btn" v-if="classProgress.length > 0">
                <span>
                  <a
                    class="a1"
                    href="javascript:void(0)"
                    @click="showDcxx=true"
                    ondragstart="return false"
                  >督促学习</a>
                </span>
                <span>
                  <a class="a2" @click="winhref" ondragstart="return false">导出名单</a>
                </span>
              </div>
              <div class="clear"></div>
            </div>
            <div class="tab_box">
              <table cellpadding="0" cellspacing="0">
                <thead>
                  <tr>
                    <th>班级名称</th>
                    <th>辅导老师</th>
                    <th>选修人数</th>
                    <th>
                      班级平均
                      <br />进度(%）
                    </th>
                    <th>快于计划</th>
                    <th>慢于计划</th>
                    <th>没有学习</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="classProgress.length > 0">
                    <tr v-for="(item,index) in classProgress" :key="index">
                      <td>
                        <nuxt-link
                          ondragstart="return false"
                          :to="{path:'/2-kcjd-bjxq',query:{courseid:item.courseId,termid:item.termId,classid:item.classId,classname:item.className,cname:cname.courseName,}}"
                        >{{item.className}}</nuxt-link>
                      </td>
                      <td>{{item.teacherName}}</td>
                      <td>{{item.studentTotal}}</td>
                      <td>{{item.learningRate}}</td>
                      <td>{{item.faster}}</td>
                      <td>{{item.slower}}</td>
                      <td>{{item.noLearn}}</td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td colspan="7">
                        <div class="data_default">
                          <img src="@/assets/img/curriculum_default.png" />
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="clear"></div>
        <dcxx :showDcxx.sync="showDcxx" :dcxxtype="1" />
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
      courseList: [], //課程列表
      classProgress: [], //班级进度列表
      courseScheduleLlist: [], //课程总进度列表
      dropshow: false,
      cname: [],
      progresslsit: [],
      pie: {},
      LearnTrendslist: [],
      classname: "",
      nodata: false,
      termid: 0,
      courseid: 0,
      coursename: ""
    };
  },
  mounted() {
    const that = this;
    that.getRecommendIndex();
  },
  methods: {
    winhref() {
      const that = this;
      window.location.href =
        domainName + "/course/classCourseReportExport?termId=" +
        that.termid +
        "&courseId=" +
        that.courseid +
        "&className=" +
        that.classname +
        "&schoolId=" +
        this.$store.getters.user.schoolId;
    },
    search() {
      const that = this;
      that.getRatelearning();
    },
    //班级学习进度
    getRatelearning() {
      const that = this;
      let params = {
        courseId: that.cname.courseId,
        termId: that.cname.termId,
        className: that.classname
      };
      this.utils.api.ratelearning(params).then(res => {
        if (res.code == 20200) {
          that.classProgress = res.data;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    //课程总进度
    getcourseSchedule() {
      const that = this;
      let params = {
        courseId: that.cname.courseId,
        termId: that.cname.termId
      };
      this.utils.api.courseSchedule(params).then(res => {
        if (res.code == 20200) {
          that.courseScheduleLlist = res.data;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    //课程列表
    getRecommendIndex() {
      const that = this;
      this.utils.api.RecommendIndex().then(res => {
        if (res.code == 20200) {
          that.courseList = JSON.parse(JSON.stringify(res.data)); //课程
          that.cname = res.data[0];
          that.termid = res.data[0].termId;
          that.courseid = res.data[0].courseId;
          that.coursename = res.data[0].courseName;
          that.getRatelearning();
          that.getcourseSchedule();
          that.LearnProgress();
          that.LearnTrends();
          that.$store.commit("setCourseId", that.cname.courseId);
          that.$store.commit("setTermId", that.cname.termId);
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
        }
      });
    },
    showToggle() {
      this.dropshow = !this.dropshow;
    },
    //选择班级重新加载
    fungetRate(item) {
      //cid, tid, cname
      const that = this;
      that.termid = item.termId;
      that.courseid = item.courseId;
      that.coursename = item.courseName;
      that.$store.commit("setCourseId", item.courseId);
      that.$store.commit("setTermId", item.termId);
      let params = {
        courseId: item.courseId,
        termId: item.termId
      };
      //班级学习进度
      this.utils.api.ratelearning(params).then(res => {
        if (res.code == 20200) {
          that.classProgress = res.data;
          that.cname = item;
          this.dropshow = !this.dropshow;
          that.LearnProgress();
          that.LearnTrends();
        } else {
          // that.$message.error(res.msg);
        }
      });
    },
    //学习总进度
    LearnProgress() {
      const that = this;
      let params = {
        courseId: that.cname.courseId,
        termId: that.cname.termId
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
    //学习趋势
    LearnTrends() {
      const that = this;
      let params = {
        courseId: that.cname.courseId,
        termId: that.cname.termId,
        type: 2
      };
      this.utils.api.LearnTrends(params).then(res => {
        if (res.code == 20200) {
          that.LearnTrendslist = res.data;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    getLineChart() {
      const that = this;
      var myChart = echarts.init(document.getElementById("linechar"));
      myChart.setOption({
        xAxis: {
          type: "category",
          data: ["0", "6H", "9H", "12H", "15H", "18H", "24H"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [1, 3, 4, 7, 4, 6, 9],
            type: "line"
          }
        ]
      });
    }
  },
  created() {
    
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
