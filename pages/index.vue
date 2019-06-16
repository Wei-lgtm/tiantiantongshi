<template>
  <div>
    <Header />
    <nuxt-child></nuxt-child>
  </div>
</template>
<script>
import Header from '@/components/Header'
export default {
  async asyncData(context){
    console.log(context)
  },
  components:{
		Header
  },
  mounted(){
		if(!sessionStorage.getItem('SUCCESS')){
			this.$router.push("/login")
		}else{
			let userInfo = JSON.parse(aesDecrypt(sessionStorage.getItem('SUCCESS'),'abc'))
			if(userInfo.token != sessionStorage.getItem('token')){
				//token值不相等  有问题
				//this.$router.push("/login")
			}else{
				this.$store.commit("setUserInfo",userInfo)
			}
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
