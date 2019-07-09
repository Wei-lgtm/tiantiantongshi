<template>
  <div class="page_login">
    <div class="cell">
      <div class="log_box">
        <div class="logo">
          <img src="@/assets/img/logo.png" />
        </div>
        <div class="log_chg">
          <nuxt-link ondragstart="return false" to="/mobile_login">手机验证码登录</nuxt-link>
        </div>
        <div class="clear"></div>
        <div class="tab">
          <div class="item">
            <span class="span1"></span>
            <div class="div_inp">
              <input
                class="inp_mob"
                @keyup.enter="login"
                v-model="mobile"
                type="text"
                placeholder="请输入用户名/手机号"
                maxlength="11"
              />
            </div>
            <div class="clear"></div>
          </div>
          <div class="item">
            <span class="span2"></span>
            <div class="div_inp">
              <input
                class="inp_pwd"
                @keyup.enter="login"
                v-model="password"
                type="password"
                placeholder="请输入密码"
                maxlength="20"
              />
            </div>
            <div class="clear"></div>
          </div>
          <div class="log_tips">
            <p></p>
          </div>
        </div>
        <div class="btn">
          <a
            ondragstart="return false"
            class="btn_login"
            href="javascript:void(0)"
            @click="login()"
          >立即登录</a>
        </div>
        <!-- <div class="rem_pwd">
          <label>
            <input type="checkbox">记住密码
          </label>
          <a href="#">忘记密码</a>
        </div>-->
      </div>
    </div>
    <div class="footer">
      <p>©湖南贝湾教育科技有限公司 版权所有 | 湘ICP备18024560号-1</p>
    </div>
  </div>
</template>
<script>
import { aesDecrypt } from "@/utils/crypto";
export default {
  components: {},
  data() {
    return {
      mobile: "", //手机号i
      password: "", //密码
      isclick: true
    };
  },
  watch: {
    mobile: function(newval, oldval) {
      if (!newval) return;
      if (!/^\d+$|^\d+[.]?\d+$/.test(newval)) {
        this.mobile = "";
      }
    }
  },
  mounted() {
    const that = this;
    if (sessionStorage.getItem("SUCCESS")) {
      let userInfo = JSON.parse(
        aesDecrypt(sessionStorage.getItem("SUCCESS"), "abc")
      );
      that.$store.commit("setUserInfo", userInfo);
      that.$router.push("/myCourse");
      return false;
    }
    let params = {
      clientRequestKey:
        "afe47c1353594eb90c63e8d5778eee64f239b166fa48747ff410427f27b87e4c"
    };
    this.utils.api.ApplyAccessToken(params).then(res => {
      if (res.code == 20200) {
        that.$store.commit("setTokeno", res.data.accessToken);
        that.$store.commit("setTokenbool", true);
        that.$store.commit("setLoginbool", true);
      } else {
        // that.$message.error(res.msg);
      }
    });
    // document.onkeydown = function(e) {
    //   var key = window.event.keyCode;
    //   if (key == 13) {
    //     that.login();
    //   }
    // };
  },
  methods: {
    login() {
      const that = this;
      if (that.isclick) {
        let params = {
          mobile: that.mobile,
          password: that.password
        };
        if (!that.mobile) {
          that.$message.error("请输入用户名/手机号！");
          return false;
        }
        if (!that.password) {
          that.$message.error("请输入密码！");
          return false;
        }
        this.utils.api.usernameLogin(params).then(res => {
          if (res.code == 20200 && res.data.userType != 4) {
            that.$message.error("请使用教师账号登录！");
            return false;
          }
          if (res.code == 20106) {
            that.$message.error("身份验证信息已过期，请重新登录");
            return false;
          }
          if (res.code == 20200 && res.data.userType == 4) {
            that.isclick = false;
            that.$store.commit("setUserInfo", res.data);
            that.$store.commit("setTokeno", res.data.token);
            that.$message.success("登陆成功");
            setTimeout(function() {
              that.$router.push("/myCourse");
            }, 1000);
          } else {
            that.$message.error(res.msg);
          }
        });
      }
    }
  },
  head() {
    return {
      title: "天天通识-账号密码登录"
    };
  }
};
</script>
<style lang="scss" scoped>
.page_login {
  background: url("~assets/img/bg.jpg") no-repeat center center;
  background-size: cover;
}
</style>