<template>
	<div class="modal modal_dcxx" v-if="showDcxx">
			<div class="fp_modal">
					<div class="cell">
							<div class="modal_cont">
									<div class="close" @click="close()"></div>
									<div class="modal_tit">
											<h3><img src="img/icon43.png">督促学习</h3>
									</div>
									<div class="mod_dcxx">
											<div class="tit">
													<p><span>督促学生：</span>已选择的学生</p>
											</div>
											<div class="tab">
													<div class="list">
															<span>请输入通知标题</span>
															<input type="text">
													</div>
													<div class="list">
															<span>请输入通知内容</span>
															<textarea>同学，你的《金融通识课》学习进度已经落后，有挂科风险，请及时学习课程哦~</textarea>
													</div>
													<div class="mod_btn">
															<a class="a1" href="#">发送通知</a><a href="#">取消</a>
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
		props:['showDcxx'],
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
				this.$emit("update:showDcxx", false);
			}
    }
  }
</script>
<style lang="scss" scoped>

</style>
