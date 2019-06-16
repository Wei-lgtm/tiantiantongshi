<template>
  <div>
    <Header />
    <nuxt-child></nuxt-child>
  </div>
</template>
<script>
import Header from '@/components/Header'
import {aesDecrypt} from '@/utils/crypto'
export default {
  async asyncData(context){
    
  },
  components:{
		Header
  },
  mounted(){
		if(!sessionStorage.getItem('SUCCESS')){
			this.$router.push("/login")
		}else{
			let userInfo = JSON.parse(aesDecrypt(sessionStorage.getItem('SUCCESS'),'abc'))
			this.$store.commit("setUserInfo",userInfo)
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
