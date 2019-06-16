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
              <input class="inp_mob" type="text" placeholder="请输入用户名/手机号" />
            </div>
            <div class="clear"></div>
          </div>
          <div class="item">
            <span class="span2"></span>
            <div class="div_inp">
              <input class="inp_pwd" type="text" placeholder="请输入密码" />
            </div>
            <div class="clear"></div>
          </div>
          <div class="log_tips">
            <p></p>
          </div>
        </div>
        <div class="btn">
          <a class="btn_login" href="#">立即登录</a>
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

    }
  }
</script>
<style>
</style>
