<template>
  <div class="mainer">
    <div class="wrap">
      <div class="page_left">
        <ul>
          <li><nuxt-link to="/"><span>我的课程</span></nuxt-link></li>
          <li><nuxt-link to="/2-kcjd"><span>课程进度</span></nuxt-link></li>
          <li><nuxt-link to="/3-zyks"><span>作业考试</span></nuxt-link></li>
          <li><nuxt-link to="/4-cjgl"><span>成绩管理</span></nuxt-link></li>
          <li><nuxt-link to="/5-xjgl"><span>学籍管理</span></nuxt-link></li>
          <li class="on"><nuxt-link to="/6-kcgl"><span>课程管理</span></nuxt-link></li>
          <li><nuxt-link to="/7-jsgl"><span>教师管理</span></nuxt-link></li>
          <li><nuxt-link to="/8-jgsz"><span>学校设置</span></nuxt-link></li>
        </ul>
      </div>
      <div class="page_right">
        <div class="course_sel">
          <span @click="showToggle()">{{cname.termName}}</span>
          <div class="drop" v-show="dropshow">
            <ul>
              <li
                v-for="(item,index) in semesterList"
                :key="index"
                @click="fungetRate(item.id,item.termName)"
              >{{item.termName}}</li>
            </ul>
          </div>
        </div>
        <div class="kcgl_add">
          <a href="javascript:void(0)" @click="showKkgl=true">添加学期课程</a>
        </div>
        <div class="kc_list kcgl_list">
          <ul>
            <li v-for="(item,index) in termCourse" :key="index">
              <div class="box">
                <div class="img">
                  <a href="#">
                    <img :src="item.thumb" />
                  </a>
                </div>
                <div class="web">
                  <h3><a href="#">{{item.courseName}}</a></h3>
                  <div class="kcgl_text">
                    <p><span class="span1">日期：<em>{{item.courseStartTime}}-- {{item.courseEndTime}}</em></span><span class="span2">教师：<em>{{item.teacherName}}</em></span></p>
                    <h4>辅导老师：{{item.coachTeacherName}} | 学时：{{item.allLesson}} | 选修人数：{{item.studentTotal}} | 未上课人数：{{item.notStudyStudentTotal}}</h4>
                  </div>
                </div>
                <div class="clear"></div>
                <div class="kc_btn">
                  <ul>
                    <li>
                      <nuxt-link :to="{path:'6-kcgl-kcsz',query:{termid:item.termId,courseid:item.courseId,coursename:item.courseName}}">
                        <span class="span6"></span>
                        <p>课程设置</p>
                      </nuxt-link>
                    </li>
                    <li>
                      <nuxt-link :to="{path:'6-kcgl-xkgl',query:{termid:item.termId,courseid:item.courseId,coursename:item.courseName}}">
                        <span class="span7"></span>
                        <p>选课管理</p>
                      </nuxt-link>
                    </li>
                    <li>
                      <a href="javascript:void(0)" @click="RemoveTermCourse(item.termId,item.courseId)">
                        <span class="span8"></span>
                        <p>删 除</p>
                      </a>
                    </li>
                  </ul>
                  <div class="clear"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="clear"></div>
      <kkgl :showKkgl.sync="showKkgl" :semesterList.sync="semesterList" :cname.sync="cname" :onsubmit="TermCourseList"/>
    </div>
  </div>
</template>
<script>
import Kkgl from '@/components/kkgl'
export default {
	components:{
		Kkgl,
  },
  data() {
    return {
      semesterList: [], //学期列表
      termCourse: [], //学期选课课程列表
      cname: [],
      dropshow: false,
      cnametext:'',
      showKkgl:false,
      termId:0,
    };
  },
  mounted() {
    const that = this;
    that.GetIndex();
  },
  methods: {
    //学期列表
    GetIndex() {
      const that = this;
      this.utils.api.GetIndex().then(res => {
        if (res.code == 20200) {
          that.semesterList = JSON.parse(JSON.stringify(res.data)) //学期
          that.cname = res.data[0];
          that.termId = res.data[0].id
          that.$store.commit('setTermId',that.termId)
          that.TermCourseList()
        } else {
          that.$message.error(res.msg);
        }
      });
      
    },
    //学期选课课程列表
    TermCourseList(){
      const that = this
      let params = {
        termId:that.termId
      }
      this.utils.api.TermCourseList(params).then(res => {
          if (res.code == 20200) {
            that.termCourse = res.data.list;
            that.$store.commit('setTermCourse',that.termCourse)
          } else {
          that.$message.error(res.msg);
        }
      });
    },
    showToggle() {
      this.dropshow = !this.dropshow;
    },
    //选择学期重新加载
    fungetRate(tid, tname) {
      const that = this;
      that.termId = tid
      that.TermCourseList()
      that.cname.termName = tname;
      that.cname.id=tid;
      this.dropshow = !this.dropshow;
    },
    RemoveTermCourse(tid,cid){
      const that = this
      let params = {
        termId:tid,
        courseId:cid,
      }
      this.utils.api.RemoveTermCourse(params).then(res => {
        if(res.code==20200){
          that.$message.success('删除成功！')
          that.TermCourseList()
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
}
</script>
<style>

</style>
