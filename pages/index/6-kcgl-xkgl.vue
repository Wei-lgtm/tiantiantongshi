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
          <li>
            <nuxt-link to="/5-xjgl">
              <span>学籍管理</span>
            </nuxt-link>
          </li>
          <li class="on">
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
        <div class="crumbs">
          <p>
            <a href="#">{{coursename}}</a> >
            <a class="on" href="#">选课管理</a>
            <span>
              <a href="javascript:void(0)" @click="back">
                <em>返回</em>
              </a>
            </span>
          </p>
        </div>
        <div class="page_tab">
          <div class="title">
            <div class="title_search">
              <input type="text" v-model="seaclass" placeholder="查询班级">
              <a href="javascript:void(0)" @click="search"></a>
            </div>
            <div class="title_btn">
              <span>
                <a class="a3" href="javascript:void(0)" @click="funshowsz">设置辅导老师</a>
              </span>
              <span>
                <a class="a4" href="#">导入选课信息</a>
              </span>
              <span>
                <a class="a2" href="#">导出选课信息</a>
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
                    <br>进度
                  </th>
                  <th>
                    期末考试
                    <br>完成率
                  </th>
                  <th>
                    补考完
                    <br>成率
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
                      :to="{path:'6-kcgl-bjxq',query:{courseid:courseid,termid:termid,classid:item.classId}}"
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
                        <option :value="item.id" v-for="(item,index) in teacherslist" :key="index">{{item.realname}} {{item.mobile}}</option>
                      </select>
                    </div>
                    <div class="clear"></div>
                  </li>
                </ul>
                <div class="mod_btn">
                  <a class="a1" href="javascript:void(0)" @click="funSetClassCoachTeacher">确定</a>
                  <a href="javascript:void(0)" @click="showsz=false">取消</a>
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
export default {
  components: {},
  data() {
    return {
      courseselection: [], //选课列表
      courseid: 0,
      termid: 0,
      selAll: false,
      seaclass: "",
      showsz:false,
      teacherslist:[],
      teacherid:0,
      coursename:''
    };
  },
  mounted() {
    const that = this;
    that.courseid = this.$route.query.courseid;
    that.termid = this.$route.query.termid;
    that.coursename = this.$route.query.coursename;

    that.GetCourseClassReport();
    that.ListofTeachers();
  },
  methods: {
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
          that.courseselection = res.data.list;
        } else {
          that.$message.error(res.msg);
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
      this.$router.go(-1);
    },
    search() {
      const that = this;
      that.GetCourseClassReport();
    },
    ListofTeachers(){
      const that = this
      this.utils.api.ListofTeachers().then(res => {
        if(res.code == 20200){
          that.teacherslist = res.data.list
          that.teacherid=res.data.list[0].id
        }else{
          that.$message.error(res.msg)
        }
      })
    },
    funshowsz(){
      const that = this
      let arr = []
      that.courseselection.map(item => {
        if(item.check){
          arr.push(item.classId)
        }
      })
      if(arr.length < 1){
        that.$message.error('请选择班级！')
        return false;
      }else{
          that.showsz=true
      }
    },
    //
    funSetClassCoachTeacher(){
      const that = this
      let arr = []
      that.courseselection.map(item => {
        if(item.check){
          arr.push(item.classId)
        }
      })
      if(arr.length < 1){
        that.$message.error('请选择班级！')
        return false;
      }
      let params = {
        termId:this.$route.query.termid,
        courseId:this.$route.query.courseid,
        classIds:arr,
        teacherId:that.teacherid
      }
      this.utils.api.SetClassCoachTeacher(params).then(res => {
        if(res.code == 20200){
          that.$message.success('设置成功！')
          that.showsz=false
          that.GetCourseClassReport()
        }else{
          that.$message.error(res.msg)
        }
      })
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
