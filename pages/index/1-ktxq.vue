<template>
  <div class="mainer">
    <div class="course_det">
      <div class="box">
        <div class="l_nav">
          <h3>目录</h3>
          <div class="list">
            <ul>
              <li v-for="(item,index) in lessonlist" :key="index" :class="lessonId==item.lessonId?'on':''">
                <a href="javascript:void(0)" @click="funGetLessonDetail(item.lessonId)">
                  <p>{{index+1}}. {{item.lessonName}}</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="line"></div>
        <div class="r_main">
          <h3>{{courseDetails.lessonName}}<a href="javascript:void(0)" v-on:click="back">返回</a></h3>
          <div class="vedio">
            <video width="100%" :src="courseDetails.fileUrl" controls="controls" preload="preload" ></video>
          </div>
          <div class="web">
            <div class="text">
              <h4>
                <span class="span1">讲稿</span>
              </h4>
              <div :class="detjgWebHeight?'':'det_web'" v-html="courseDetails.textUrl"></div>
              <label @click="detjgWebHeight=!detjgWebHeight">【{{detjgWebHeight?'收起':'展开'}}】</label>
            </div>
            <div class="text">
              <h4>
                <span class="span2">延伸阅读</span>
              </h4>
              <div :class="detysWebHeight?'':'det_web'" v-html="courseDetails.read"></div>
              <label @click="detysWebHeight=!detysWebHeight">【{{detysWebHeight?'收起':'展开'}}】</label>
            </div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      courseid: "",
      lessonlist:[],
      lessonId:0,
      courseDetails:[],
      detysWebHeight:false,
      detjgWebHeight:false,
    };
  },
  mounted() {
    const that = this;
    that.courseid = that.$route.query.id;
    that.getTeachingPlan()
  },
  methods: {
    getTeachingPlan() {
      const that = this;
      let lessonparams = {
        courseId: that.courseid
      };
      //教学计划课堂列表
      this.utils.api.teachingPlan(lessonparams).then(res => {
        if(res.code==20200){
          that.lessonlist=res.data.list
          if(res.data.list.length>0){
            that.lessonId=res.data.list[0].lessonId
            that.getLessonDetail();
          }
        }else{
          that.$message.error(res.msg)
        }
      });
    },
    getLessonDetail(){
      const that = this;
      let params={
        lessonId:that.lessonId,
        isEncryption:0
      }
      this.utils.api.GetLessonDetail(params).then(res =>{
        if(res.code==20200){
          that.courseDetails=res.data
        }else{
          that.$message.error(res.msg)
        }
      })
    },
    funGetLessonDetail(lid){
      const that = this
      that.lessonId = lid
      that.getLessonDetail()
    },
    back(){
      this.$router.go(-1);
    }
  },
  head(){
    return {
      title:'天天通识-我的课程'
    }
  }
};
</script>
<style>
</style>
