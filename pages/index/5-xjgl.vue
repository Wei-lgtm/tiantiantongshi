<template>
  <div class="mainer">
    <div class="wrap">
      <div class="page_left">
        <ul>
          <li>
            <nuxt-link to="/">
              <span>我的课程</span>
            </nuxt-link>
          </li>
          <li>
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
          <li class="on">
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
        <div class="page_tab">
          <div class="title">
            <h3>详情</h3>
            <div class="title_search">
              <input type="text" v-model="keyword" placeholder="请输入学生姓名\学号">
              <a href="javascript:void(0)" @click="search"></a>
            </div>
            <div class="title_btn">
              <span>
                <a class="a4" href="#">导入学生信息</a>
              </span>
              <span>
                <a class="a2" href="#">导出学生信息</a>
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
                <tr v-for="(item,index) in studentstatusList" :key="index">
                  <td>{{item.studentNo}}</td>
                  <td>{{item.studentName}}</td>
                  <td>{{item.schoolYear}}</td>
                  <td>{{item.className}}</td>
                  <td>{{item.mobile}}</td>
                  <td>{{item.sex}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pageSize">
          <el-pagination layout="prev, pager, next" :current-page="page" @current-change="getpage" :total="total"></el-pagination>
          </div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      courseList: [], //課程列表
      studentstatusList: [], //学籍列表
      cname: [],
      dropshow: false,
      cnametext: "",
      keyword: "",
      total:0,
      page:1,
      pageSize:10,
    };
  },
  mounted() {
    const that = this;
    that.getRecommendIndex();

    that.SchoolRollManagement();
  },
  methods: {
    //课程列表
    getRecommendIndex() {
      const that = this;
      this.utils.api.RecommendIndex().then(res => {
        if (res.code == 20200) {
          that.courseList = res.data; //课程
          that.cname = res.data[0];
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    showToggle() {
      this.dropshow = !this.dropshow;
    },
    funCname(cname) {
      const that = this;
      that.cname.courseName = cname;
      this.dropshow = !this.dropshow;
    },
    SchoolRollManagement() {
      const that = this;
      //学籍管理
      let params = {
        keyword: that.keyword,
        page:that.page,
        pageSize:that.pageSize
      };
      this.utils.api.SchoolRollManagement(params).then(res => {
        if (res.code == 20200) {
          that.studentstatusList = res.data.list;
          that.total=res.data.total
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    getpage(e){
      const that = this
      that.page=e
      that.SchoolRollManagement();
    },
    search(){
      const that = this
      that.page=1
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
<style>
</style>
