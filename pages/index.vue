<template>
  <div>
    <Header />
    <nuxt-child></nuxt-child>
  </div>
</template>
<script>
import Header from '@/components/Header'
export default {
  components:{
		Header
  },
  mounted(){
    
  }
}
</script>

<style lang="scss" scoped>

</style>
