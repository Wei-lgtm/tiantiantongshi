<template>
  <div class="mainer" v-loading="load">
    <div class="wrap">
      <div class="page_left">
        <ul>
          <li>
            <nuxt-link to="/">
              <span>我的课程</span>
            </nuxt-link>
          </li>
          <li class="on">
            <nuxt-link to="/2-kcjd">
              <span>课程进度</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/3-zyks">
              <span>作业考试</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/4-cjgl">
              <span>成绩管理</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/5-xjgl">
              <span>学籍管理</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/6-kcgl">
              <span>课程管理</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/7-jsgl">
              <span>教师管理</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/8-jgsz">
              <span>学校设置</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="page_right">
        <div class="course_sel">
          <span>陈志武教授金融通识课_2019年秋季</span>
        </div>
        <div class="chart">
          <div class="left">
            <div class="tit">
              <h3>学习总进度</h3>
              <span>当前计划进度：11%</span>
              <div class="clear"></div>
            </div>
            <div class="chart_pie">
              <v-chart :options="pie"/>
            </div>
          </div>
          <div class="right">
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
          </div>
          <div class="clear"></div>
        </div>
        <div class="page_tab">
          <div class="title">
            <h3>详情</h3>
            <div class="title_search">
              <input type="text" placeholder="请输入学生姓名\学号">
              <a href="#"></a>
            </div>
            <div class="title_btn">
              <span>
                <a class="a1" href="#">督促学习</a>
              </span>
              <span>
                <a class="a2" href="#">导出名单</a>
              </span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="tab_box tab_box1">
            <div class="tab_box_cha">
              <ul>
                <li class="on">
                  <label>
                    <span>全部学生</span>
                  </label>
                </li>
                <li>
                  <label>
                    <span>快于计划</span>
                  </label>
                </li>
                <li>
                  <label>
                    <span>慢于计划</span>
                  </label>
                </li>
                <li>
                  <label>
                    <span>
                      学习进度低于
                      <font>20%</font>%
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
                  <label>选择</label>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in classList" :key="index">
                <td>
                  <a href="#">{{item.studentNo}}</a>
                </td>
                <td>{{item.studentName}}</td>
                <td>{{item.progressPercent}}%</td>
                <td>{{item.playtimes}}</td>
                <td>{{item.note}}</td>
                <td>{{item.lastlogin}}</td>
                <td>
                  <label></label>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import Dcxx from "@/components/dcxx";
import echarts from "echarts";
export default {
  components: {
    Dcxx
  },
  data() {
    return {
      courseid:0,
      termid:0,
      classid:0,
      classList:[],
      type:1,
      load:false,
      progresslsit: [],
      pie: {},
      LearnTrendslist:[],
      datatime:'',
    };
  },
  mounted() {
    const that = this;
    that.courseid = that.$route.query.courseid
    that.termid = that.$route.query.termid
    that.classid = that.$route.query.classid

    that.classCourseReportDetail()
    that.LearnProgress();
  },
  methods: {
    //班级学习进度报表
    classCourseReportDetail() {
      const that = this;
      let params={
        courseId:that.courseid,
        termId:that.termid,
        classId:that.classid,
        type:that.type
      }
      that.load=true
      this.utils.api.ClassCourseReportDetail(params).then(res => {
        that.load=false
        if (res.code == 20200) {
          that.classList = res.data; //课程
        }else{
          that.$message.error(res.msg)
        }
      });
    },
    LearnProgress() {
      const that = this;
      let params = {
        courseId: that.courseid,
        termId: that.termid,
        classId:that.classid
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
            graphic:{
              type:'text',
              left:'center',
              top:'center',
              z:2,
              zlevel:100,
              style:{
                text:'选修人数\n'+ res.data.total,
                x:100,
                y:100,
                textAlign:'center',
                fill:'#999',
                width:30,
                height:30
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
  },
  head(){
    return {
      title:'天天通识-课程进度'
    }
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
