<template>
  <div class="modal modal_ycxs" v-if="showYcxs">
        <div class="fp_modal">
            <div class="cell">
                <div class="modal_cont">
                    <div class="close" @click="close()"></div>
                    <div class="modal_tit">
                        <h3>移出学生</h3>
                    </div>
                    <div class="mod_scjs">
                        <div class="web">
                            <p>确定移出 {{ycxsitem.studentName}} ？</p>
                        </div>
                        <div class="mod_btn">
                            <a class="a1" href="javascript:void(0)" @click="TermCourseClassStudentRemove">确定</a><a href="javascript:void(0)" @click="close()">取消</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ["showYcxs" , "ycxsitem" , "onsubmit"],
  components: {},
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  methods: {
    close() {
      this.$emit("update:showYcxs", false);
    },
    //
    TermCourseClassStudentRemove(){
      const that=this;
      let classId = this.$route.query.classid
      let params={
        termId:that.ycxsitem.termId,
        courseId:that.ycxsitem.courseId,
        classId:classId,
        id:that.ycxsitem.id,
      }
      this.utils.api.TermCourseClassStudentRemove(params).then(res =>{
        if(res.code==20200){
          that.$message.success('删除成功！')
          that.close();
          that.onsubmit()
        }else{
          that.$message.error(res.msg)
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
