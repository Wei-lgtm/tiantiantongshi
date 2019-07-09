<template>
  <div class="modal modal_jxjh" v-if="showJxjh">
    <div class="fp_modal">
      <div class="cell">
        <div class="modal_cont">
          <div class="close" @click="close()"></div>
          <div class="modal_tit">
            <h3>
              <img src="@/assets/img/icon10-1.png">教学计划
            </h3>
          </div>
          <div class="mod_jxjh">
            <div class="tit">
              <span>{{courseName}}</span>
            </div>
            <div class="jxjh_list">
              <div class="line"></div>
              <ul>
                <li>
                  <label class="lbl1"></label>
                  <div class="box">
                    <h3>开始学习</h3>
                    <p>{{assessmentlist.studyStartTime}}</p>
                  </div>
                </li>
                <li class="on">
                  <label class="lbl1"></label>
                  <div class="list">
                    <span></span>
                    <div class="text">
                      <label class="lbl_jt"></label>
                      <label class="lbl_line"></label>
                      <div class="jxjh_list_web">
                        <p v-for="(item,index) in lessonlist" :key="index">{{item.lessonName}}</p>
                      </div>
                      <div class="pageSize" v-if="total > 10">
                        <el-pagination
                        class="page-pagination"
                          layout="prev, pager, next"
                          :current-page="page"
                          @current-change="getpage"
                          :total="total"
                        ></el-pagination>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <label class="lbl1"></label>
                  <div class="box">
                    <h3>结束学习</h3>
                    <p>{{assessmentlist.studyEndTime}}</p>
                  </div>
                </li>
                <li>
                  <label class="lbl1"></label>
                  <div class="box">
                    <h3>期末考试</h3>
                    <p>
                      {{assessmentlist.examStartTime}}
                      <br>
                      {{assessmentlist.examEndTime}}
                    </p>
                  </div>
                </li>
                <li>
                  <label class="lbl1"></label>
                  <div class="box">
                    <h3>结课</h3>
                    <p>{{assessmentlist.finishCourseTime}}</p>
                  </div>
                </li>
              </ul>
              <span class="span_txt">End</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["showJxjh", "assessmentlist", "courseName", "courseid"],
  components: {},
  data() {
    return {
      page: 1,
      pageSize: 10,
      lessonlist:[],
      total:0,
      showPageSize:false,
    };
  },
  mounted() {},
  watch: {
    showJxjh:function(newVal,oldVal){
      this.TeachingPlan()
    },
  },
  methods: {
    close() {
      const that = this
      this.$emit("update:showJxjh", false);
      that.page=1
    },
    getpage(e) {
      const that = this;
      that.page = e;
      that.TeachingPlan();
    },
    TeachingPlan(){
      const that = this
      let lessonparams = {
        courseId: that.courseid,
        page: that.page,
        pageSize: that.pageSize,
      };
      this.utils.api.teachingPlan(lessonparams).then(res => {
        if (res.code == 20200) {
          that.lessonlist = res.data.list;
          that.total = res.data.total
        } else {
          that.$message.error(res.msg);
        }
      });
    },
  }
};
</script>
<style lang="scss" scoped>
.pageSize{
  margin-top: 10px;
  & /deep/ .page-pagination{
    li{
      margin-top: 0;
    }
  }
}
</style>

