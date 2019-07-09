<template>
  <div class="header">
    <div class="logo">
      <nuxt-link ondragstart="return false" :to="{path:'/'}">
        <img :src="this.$store.getters.user.logo ? this.$store.getters.user.logo : faceImg" />
        {{this.$store.getters.user.schoolName}}
        <span>教学管理平台</span>
      </nuxt-link>
    </div>
    <div class="frt">
      <div class="h_user">
        <div class="img">
          <img :src="this.$store.getters.user.face ? this.$store.getters.user.face : faceImg" />
        </div>
        <div class="web">
          <p>hi,{{this.$store.getters.user.teacherName || ''}}</p>
        </div>
        <div class="clear"></div>
      </div>
      <div class="h_btn">
        <ul>
          <li>
            <span class @click="funLoginOut">退出</span>
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
  data() {
    return {
      user: [],
      defImg: require("../assets/img/logo2.png"),
      faceImg: require("../assets/img/face.png"),
      isclick: true
    };
  },
  computed: {
    tokenbool() {
      return this.$store.getters.tokenbool;
      // Or return basket.getters.fruitsCount
      // (depends on your design decisions).
    },
    loginbool() {
      return this.$store.getters.loginbool;
    }
  },
  watch: {
    tokenbool: function(newval) {
      if (!newval) {
        sessionStorage.clear();
        this.$router.push("/");
      }
    },
    loginbool: function(newval) {
      if (!newval) {
        sessionStorage.clear();
        this.$router.push("/");
      }
    }
  },
  mounted() {
    const that = this;
    that.GetLoginUserInfo();
  },
  methods: {
    funLoginOut() {
      const that = this;
      if (that.isclick) {
        this.utils.api.LoginOut().then(res => {
          if (res.code == 20200) {
            that.isclick = false;
            sessionStorage.clear();
            setTimeout(function() {
              that.$router.push("/");
            }, 1000);
          } else {
            that.$message.error(res.msg);
          }
        });
      }
    },
    //获取登录用户关联的教师信息
    GetLoginUserInfo() {
      const that = this;
      this.utils.api.GetLoginUserInfo().then(res => {
        if (res.code == 20200) {
          that.user = res.data;
          that.$store.commit("setUser", res.data);
        } else {
          // that.$message.error(res.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
