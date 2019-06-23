<template>
  <div class="page_login">
    <div class="cell">
      <div class="log_box">
        <div class="logo">
          <img src="@/assets/img/logo.png">
        </div>
        <div class="log_chg">
          <nuxt-link to="/login">账号密码登录</nuxt-link>
        </div>
        <div class="clear"></div>
        <div class="tab">
          <div class="item">
            <span class="span1"></span>
            <div class="div_inp">
              <input class="inp_mob" v-model="mobile" type="text" maxlength="11" placeholder="请输入手机号">
            </div>
            <div class="clear"></div>
          </div>
          <div class="item">
            <div class="div_inp">
              <input class="inp_pwd" v-model="verification" type="text" placeholder="请输入验证码">
            </div>
            <div class="mob_yzm">
              <a href="javascript:void(0)" @click="SendSms">{{zt?'获取验证码':time}}</a>
            </div>
            <div class="clear"></div>
          </div>
          <div class="log_tips">
            <p></p>
          </div>
        </div>
        <div class="btn">
          <a class="btn_login" href="#" @click="login()">立即登录</a>
        </div>
        <div class="rem_pwd">
          <label>
            <input type="checkbox">记住密码
          </label>
          <a href="#">忘记密码</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { aesDecrypt } from "@/utils/crypto";
import { clearInterval } from "timers";
export default {
  components: {},
  data() {
    return {
      mobile: "", //手机号i
      enter: true,
      verification: "",
      time: "5 s",
      zt: true
    };
  },
  watch: {
    mobile: function(newval,oldval) {
      console.log(!/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(newval))
      if (!newval) return;
      if (!/^\d+$|^\d+[.]?\d+$/.test(newval)) {
        this.mobile= "";
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
      that.$router.push("/");
      return false;
    }
    let params = {
      clientRequestKey:
        "afe47c1353594eb90c63e8d5778eee64f239b166fa48747ff410427f27b87e4c"
    };
    this.utils.api.ApplyAccessToken(params).then(res => {
      if (res.code == 20200) {
        that.$store.commit("setTokeno", res.data.accessToken);
      } else {
        // that.$message.error(res.msg);
      }
    });
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        that.login();
      }
    };
  },
  methods: {
    login() {
      const that = this;
      let params = {
        mobile: that.mobile,
        code: that.verification
      };
      if (!that.mobile) {
        return false;
      }
      if (!that.verification) {
        return false;
      }
      if (that.enter) {
        that.enter = false;
        this.utils.api.SmsLogin(params).then(res => {
          that.enter = true;
          if (res.code == 20200 && res.data.userType == 4) {
            that.$store.commit("setUserInfo", res.data);
            that.$store.commit("setTokeno", res.data.token);
            that.$message.success("登陆成功");
            setTimeout(function() {
              that.$router.push("/");
            }, 1000);
          } else {
            that.$message.error(res.msg);
          }
        });
      }
    },
    SendSms() {
      const that = this;
      let regular = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
      if (that.zt) {
        if (regular.test(that.mobile)) {
          let params = {
            mobile: that.mobile
          };
          this.utils.api.SendSms(params).then(res => {
            if (res.code == 20200) {
              that.$message.success("发送成功！");
              that.zt = false;
              let s = 5;
              let mobcode = setInterval(function() {
                s--;
                that.time = s + " s";
                if (s <= 0) {
                  that.zt = true;
                  that.time = "5 s";
                  window.clearInterval(mobcode);
                }
              }, 1000);
            } else {
            }
          });
        } else {
          that.$message.error("请输入正确的手机号");
        }
      }
    }
  },
  head(){
    return {
      title:'天天通识-手机验证码登录'
    }
  }
};
</script>
<style>
.page_login {
  background: url("~assets/img/bg.jpg") no-repeat center center;
  background-size: cover;
}
</style>
