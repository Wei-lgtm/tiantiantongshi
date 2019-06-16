<template>
  <div class="header">
		<div class="logo">
			<a href="#">
				<img src="@/assets/img/logo1.png" />
			</a>
		</div>
		<div class="frt">
			<div class="h_user">
				<div class="img">
						<img :src="this.$store.getters.userInfo.face ? this.$store.getters.userInfo.face : '@/assets/img/img1.png'" />
				</div>
				<div class="web">
						<p>hi,{{this.$store.getters.userInfo.nickname || ''}}</p>
				</div>
				<div class="clear"></div>
			</div>
			<div class="h_btn">
				<ul>
					<li><span class="span1"></span></li>
					<li><span class="span2"></span></li>
				</ul>
				<div class="clear"></div>
			</div>
			<div class="clear"></div>
		</div>
		<div class="clear"></div>
	</div>
</template>
<script>
import { aesDecrypt } from '@/utils/crypto'
export default {
	name:"Header"
}
</script>
<style lang="scss" scoped>

</style>
