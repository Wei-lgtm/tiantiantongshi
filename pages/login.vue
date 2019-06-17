<template>
  <div class="page_login">
    <div class="cell">
      <div class="log_box">
        <div class="logo">
          <img src="@/assets/img/logo.png" />
        </div>
        <div class="log_chg">
          <a href="login-mob.html">手机验证码登录>></a>
        </div>
        <div class="clear"></div>
        <div class="tab">
          <div class="item">
            <span class="span1"></span>
            <div class="div_inp">
              <input class="inp_mob" v-model="mobile" type="text" placeholder="请输入用户名/手机号" />
            </div>
            <div class="clear"></div>
          </div>
          <div class="item">
            <span class="span2"></span>
            <div class="div_inp">
              <input class="inp_pwd" v-model="password" type="password" placeholder="请输入密码" />
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
          <label><input type="checkbox" />记住密码</label><a href="#">忘记密码</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {

    },
    data() {
      return {
        mobile: "",//手机号i
        password: "" //密码
      }
    },
    mounted() {
      const that = this
      let params = { "clientRequestKey":"afe47c1353594eb90c63e8d5778eee64f239b166fa48747ff410427f27b87e4c" }
      this.utils.api.ApplyAccessToken(params).then(res => {
        if(res.code == 20200){
          that.$store.commit('setTokeno',res.data.accessToken)
        }else{
          that.$message.error(res.msg)
        }
      })
    },
    methods: {
      login(){
        const that = this
        let params = { 
          mobile: that.mobile, 
          password: that.password 
        }
        this.utils.api.usernameLogin(params).then(res => {
          if (res.code == 20200 && res.userType==4) {
            that.$store.commit('setUserInfo',res.data)
            that.$store.commit('setTokeno',res.data.token)
            that.$message.success("登陆成功")
            setTimeout(function(){
              that.$router.push("/")
            },1000)
          } else {
            that.$message.error(res.msg)
          }
        })
      }
    }
  }
</script>
<style>
.page_login{
  background:url('~assets/img/bg.jpg') no-repeat center center; 
  background-size:cover;
}
</style>
