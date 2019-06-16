<template>
  <div class="mainer">
    <div class="wrap">
      <div class="page_left">
        <ul>
          <li><nuxt-link to="/"><span>我的课程</span></nuxt-link></li>
          <li><nuxt-link to="/2-kcjd"><span>课程进度</span></nuxt-link></li>
          <li><nuxt-link to="/3-zyks"><span>作业考试</span></nuxt-link></li>
          <li><nuxt-link to="/4-cjgl"><span>成绩管理</span></nuxt-link></li>
          <li><nuxt-link to="/5-xjgl"><span>学籍管理</span></nuxt-link></li>
          <li><nuxt-link to="/6-kcgl"><span>课程管理</span></nuxt-link></li>
          <li><nuxt-link to="/7-jsgl"><span>教师管理</span></nuxt-link></li>
          <li class="on"><nuxt-link to="/8-jgsz"><span>学校设置</span></nuxt-link></li>
        </ul>
      </div>
      <div class="page_right">
        <div class="page_tit">
          <h3>机构设置</h3>
        </div>
        <div class="mechanism">
          <div class="img">
            <img src="@/assets/img/img7.png" />
          </div>
          <div class="web">
            <div class="list">
              <p>学校logo：<img src="@/assets/img/img8.png" /><span>请使用60*60的jpg/png格式的图片</span></p>
            </div>
            <div class="list">
              <p>学校名称：<input type="text" placeholder="天天通识" /></p>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="mechanism_btn">
          <a href="#">确认</a><a class="a1" href="#">取消</a>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>

export default {
	components:{
		
	}
}
</script>
<style>

</style>
