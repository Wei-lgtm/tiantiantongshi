<template>
  <div class="modal modal_scjs" v-if="showScjs">
        <div class="fp_modal">
            <div class="cell">
                <div class="modal_cont">
                    <div class="close" @click="close()"></div>
                    <div class="modal_tit">
                        <h3>删除教师</h3>
                    </div>
                    <div class="mod_scjs">
                        <div class="web">
                            <p>确定删除所选老师？</p>
                        </div>
                        <div class="mod_btn">
                            <a class="a1" href="javascript:void(0)" @click="funDelTeacher">确定</a><a href="javascript:void(0)" @click="close()">取消</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ["showScjs" , "selList" , "onsubmit"],
  components: {},
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  methods: {
    close() {
      this.$emit("update:showScjs", false);
    },
    funDelTeacher(){
      const that=this;
      if(that.selList.length<1){
        that.$message.error('请选择要删除的教师！')
        that.close();
        return false;
      }
      let params={
        teacherId:that.selList,
      }
      this.utils.api.DelTeacher(params).then(res =>{
        if(res.code==20200){
          that.$message.success('删除成功！')
          this.$emit("update:showScjs", false);
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
