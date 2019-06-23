<template>
  <div class="header">
    <div class="logo">
      <a href="#">
        <img src="@/assets/img/logo1.png">
      </a>
    </div>
    <div class="frt">
      <div class="h_user">
        <div class="img">
          <img
            :src="this.$store.getters.userInfo.face ? this.$store.getters.userInfo.face : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560861166328&di=67ecc8a91af613a173069a7d89b9b943&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171030%2F26ed195281334ba4b1752394b60eb29a.jpeg'"
          >
        </div>
        <div class="web">
          <p>hi,{{this.$store.getters.userInfo.nickname || ''}}</p>
        </div>
        <div class="clear"></div>
      </div>
      <div class="h_btn">
        <ul>
          <li>
            <span class="span2" @click="funLoginOut"></span>
          </li>
        </ul>
        <div class="clear"></div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
import { aesDecrypt } from "@/utils/crypto";
export default {
  name: "Header",
  methods: {
    funLoginOut() {
      const that = this;
      this.utils.api.LoginOut().then(res => {
        if (res.code == 20200) {
          sessionStorage.clear()
          setTimeout(function() {
            // window.onbeforeunload = function(e) {
            //   var storage = window.sessionStorage;
            //   storage.clear();
            // };
            that.$router.push("/login");
          }, 1000);
        } else {
          that.$message.error(res.msg);
        }
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
</style>
