<template>
    <div class="modal modal_jxjh" v-if="showJxjh">
        <div class="fp_modal">
            <div class="cell">
                <div class="modal_cont">
                    <div class="close" @click="close()"></div>
                    <div class="modal_tit">
                        <h3><img src="@/assets/img/icon10-1.png" />教学计划</h3>
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
                                            <p v-for="(item,index) in lessonlist" :key="index">{{item.lessonName}}</p>
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
                                        <p>{{assessmentlist.examStartTime}} <br /> {{assessmentlist.examEndTime}}</p>
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
		props:['showJxjh',"assessmentlist","lessonlist","courseName"],
    components: {
			
    },
    data() {
      return {

      }
    },
    mounted() {
        
    },
    methods: {
			close(){
				this.$emit("update:showJxjh", false);
			}
    }
  }
</script>
<style lang="scss" scoped>

</style>
