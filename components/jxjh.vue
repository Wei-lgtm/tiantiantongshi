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
                            <span>陈志武教授金融通识课</span>
                        </div>
                        <div class="jxjh_list">
                            <div class="line"></div>
                            <ul>
                                <li>
                                    <label class="lbl1"></label>
                                    <div class="box">
                                        <h3>开始学习</h3>
                                        <p>2019/03/21  08:00:00</p>
                                    </div>
                                </li>
                                <li class="on">
                                    <label class="lbl1"></label>
                                    <div class="list">
                                        <span></span>
                                        <div class="text">
                                            <label class="lbl_jt"></label>
                                            <label class="lbl_line"></label>
                                            <p><span>第一讲：</span>Excel高级经济管理数据处理</p>
                                            <p><span>第二讲：</span>世界经济与大国战略</p>
                                            <p><span>第三讲：</span>金融与投资理财</p>
                                            <p><span>第四讲：</span>金融与投资理财</p>
                                            <p><span>第五讲：</span>Excel高级经济管理数据处理</p>
                                            <p><span>第六讲：</span>世界经济与大国战略</p>
                                            <p><span>第七讲：</span>金融与投资理财</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <label class="lbl1"></label>
                                    <div class="box">
                                        <h3>结束学习</h3>
                                        <p>2019/03/21  08:00:00</p>
                                    </div>
                                </li>
                                <li>
                                    <label class="lbl1"></label>
                                    <div class="box">
                                        <h3>期末考试</h3>
                                        <p>2019/03/21 <br /> 08:00:00-10:00:00</p>
                                    </div>
                                </li>
                                <li>
                                    <label class="lbl1"></label>
                                    <div class="box">
                                        <h3>结课</h3>
                                        <p>2019/03/21</p>
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
		props:['showJxjh'],
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
