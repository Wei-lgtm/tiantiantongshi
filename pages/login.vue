<template>
  <div class="page_login" style="background:url(@assets/img/bg.jpg) no-repeat center center; background-size:cover;">
    <div class="cell">
      <div class="log_box">
        <div class="logo">
          <img src="img/logo.png" />
        </div>
        <div class="log_chg">
          <a href="login-mob.html">手机验证码登录>></a>
        </div>
        <div class="clear"></div>
        <div class="tab">
          <div class="item">
            <span class="span1"></span>
            <div class="div_inp">
              <input class="inp_mob" v-modal="mobile" type="text" placeholder="请输入用户名/手机号" />
            </div>
            <div class="clear"></div>
          </div>
          <div class="item">
            <span class="span2"></span>
            <div class="div_inp">
              <input class="inp_pwd" v-modal="password" type="password" placeholder="请输入密码" />
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
        mobile: "",//广告
        password: "" //类目
      }
    },
    methods() {
      function login() { 
      const that = this
      let parnms = { mobile: that.mobile, password: that.password }
      this.utils.api.usernameLogin(parnms).then(res => {
        console.log(res)
        if (res.code == 20200) {
          that.adList = res.data.ad//广告
          that.categoryList = res.data.category//类目
          that.teacherList = res.data.teacher//教师
          that.newsList = res.data.news//资讯
          that.courseList = res.data.course//课程
          that.topicList = res.data.topic//话题
        } else {
          this.$message.error(res.msg)
        }
      })
      }
    },
    methods: {

    }
  }
</script>
<style>
</style>
