<template>
  <div class="mainer">
    <div class="wrap">
      <div class="page_left">
        <ul>
          <li class="on"><nuxt-link to="/"><span>我的课程</span></nuxt-link></li>
          <li><nuxt-link to="/2-kcjd"><span>课程进度</span></nuxt-link></li>
          <li><nuxt-link to="/3-zyks"><span>作业考试</span></nuxt-link></li>
          <li><nuxt-link to="/4-cjgl"><span>成绩管理</span></nuxt-link></li>
          <li><nuxt-link to="/5-xjgl"><span>学籍管理</span></nuxt-link></li>
          <li><nuxt-link to="/6-kcgl"><span>课程管理</span></nuxt-link></li>
          <li><nuxt-link to="/7-jsgl"><span>教师管理</span></nuxt-link></li>
          <li><nuxt-link to="/8-jgsz"><span>学校设置</span></nuxt-link></li>
        </ul>
      </div>
      <div class="page_right">
        <div class="page_tit">
          <h3>我的课程</h3>
        </div>
        <div class="kc_list">
          <ul>
            <li v-for="(item,index) in courseList" :key="item.id">
              <div class="box">
                <div class="img">
									<nuxt-link :to="{path:'/1-ktxq',query:{id:item.id}}">
										<img :src="item.coverImg" />
									</nuxt-link>
                </div>
                <div class="web">
                  <h3>
										<nuxt-link :to="{path:'/1-ktxq',query:{id:item.id}}">
											{{item.courseName}}
										</nuxt-link>
									</h3>
                  <h4>2019/03/21--2019/09/08</h4>
                  <div class="kc_jxjd">
                    <p>教学进度：<font>50%</font></p>
                    <div class="progress_bar"><span style="width:50%;"></span></div>
                  </div>
                </div>
                <div class="clear"></div>
                <div class="kc_btn">
                  <ul>
                    <li>
                      <a href="#">
                        <span class="span1"></span>
                        <p>考核标准</p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span class="span2"></span>
                        <p>教学计划</p>
                      </a>
                    </li>
                  </ul>
                  <div class="clear"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="kc_list_chg"><label><span>展开全部</span></label></div>
        <div class="notice">
          <div class="change">
            <div class="change_list notice_change_list">
              <ul>
                <li class="on">全部通知</li>
                <li>课程通知</li>
                <li>系统通知</li>
              </ul>
              <div class="clear"></div>
              <div class="send_out">
                <label></label><span>发送通知</span>
              </div>
            </div>
            <div class="change_tab">
              <div class="change_item">
                <div class="course_notice">
                  <ul>
                    <li>
                      <h3>深圳大学孙忠梅教授及其团队有关慕课（MOOCs）建设专题报告资料</h3>
                      <p>请各学院根据《青岛大学通识教育选修课程归属建议一览表》（见附件1），结合本学院实际情况，对同意课程归属建议的进行确认；对不同意课程归属建议的，需说明理由。表格需由学院负责人签字，并加盖公章，于6月3日15:00前报送通识教育与课程建设办公室（办公楼106室），同时发送电子稿至qdukcb@163.com。</p>
                      <h4>2019/03/21  18:00<span>来源：小小</span></h4>
                    </li>
                    <li>
                      <h3>青岛大学通识教育规范</h3>
                      <div class="img_box">
                        <ul>
                          <li><img src="@/assets/img/img2.jpg" /></li>
                          <li><img src="@/assets/img/img5.jpg" /></li>
                          <li><img src="@/assets/img/img6.jpg" /></li>
                        </ul>
                        <div class="clear"></div>
                      </div>
                      <p>请各学院根据《青岛大学通识教育选修课程归属建议一览表》（见附件1），结合本学院实际情况，对同意课程归属建议的进行确认；对不同意课程归属建议的，需说明理由。表格需由学院负责人签字，并加盖公章，于6月3日15:00前报送通识教育与课程建设办公室（办公楼106室），同时发送电子稿至qdukcb@163.com。</p>
                      <h4>2019/03/21  18:00<span>来源：小小</span></h4>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="change_item none">
                <div class="course_notice">
                  <ul>
                    <li>
                      <h3>深圳大学孙忠梅教授及其团队有关慕课（MOOCs）建设专题报告资料</h3>
                      <p>请各学院根据《青岛大学通识教育选修课程归属建议一览表》（见附件1），结合本学院实际情况，对同意课程归属建议的进行确认；对不同意课程归属建议的，需说明理由。表格需由学院负责人签字，并加盖公章，于6月3日15:00前报送通识教育与课程建设办公室（办公楼106室），同时发送电子稿至qdukcb@163.com。</p>
                      <h4>2019/03/21  18:00<span>来源：小小</span></h4>
                    </li>
                    <li>
                      <h3>青岛大学通识教育规范</h3>
                      <div class="img_box">
                        <ul>
                          <li><img src="@/assets/img/img2.jpg" /></li>
                          <li><img src="@/assets/img/img5.jpg" /></li>
                          <li><img src="@/assets/img/img6.jpg" /></li>
                        </ul>
                        <div class="clear"></div>
                      </div>
                      <p>请各学院根据《青岛大学通识教育选修课程归属建议一览表》（见附件1），结合本学院实际情况，对同意课程归属建议的进行确认；对不同意课程归属建议的，需说明理由。表格需由学院负责人签字，并加盖公章，于6月3日15:00前报送通识教育与课程建设办公室（办公楼106室），同时发送电子稿至qdukcb@163.com。</p>
                      <h4>2019/03/21  18:00<span>来源：小小</span></h4>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="change_item none">
                <div class="course_notice">
                  <ul>
                    <li>
                      <h3>深圳大学孙忠梅教授及其团队有关慕课（MOOCs）建设专题报告资料</h3>
                      <p>请各学院根据《青岛大学通识教育选修课程归属建议一览表》（见附件1），结合本学院实际情况，对同意课程归属建议的进行确认；对不同意课程归属建议的，需说明理由。表格需由学院负责人签字，并加盖公章，于6月3日15:00前报送通识教育与课程建设办公室（办公楼106室），同时发送电子稿至qdukcb@163.com。</p>
                      <h4>2019/03/21  18:00<span>来源：小小</span></h4>
                    </li>
                    <li>
                      <h3>青岛大学通识教育规范</h3>
                      <div class="img_box">
                        <ul>
                          <li><img src="@/assets/img/img2.jpg" /></li>
                          <li><img src="@/assets/img/img5.jpg" /></li>
                          <li><img src="@/assets/img/img6.jpg" /></li>
                        </ul>
                        <div class="clear"></div>
                      </div>
                      <p>请各学院根据《青岛大学通识教育选修课程归属建议一览表》（见附件1），结合本学院实际情况，对同意课程归属建议的进行确认；对不同意课程归属建议的，需说明理由。表格需由学院负责人签字，并加盖公章，于6月3日15:00前报送通识教育与课程建设办公室（办公楼106室），同时发送电子稿至qdukcb@163.com。</p>
                      <h4>2019/03/21  18:00<span>来源：小小</span></h4>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>

export default {
	components:{
		
	},
	data(){
		return {
			adList:[],//广告
			categoryList:[],//类目
			teacherList:[],//教师
			newsList:[],//资讯
			courseList:[],//课程
			topicList:[],//话题
		}
	},
	mounted(){
		const that = this
		this.utils.api.RecommendIndex().then(res => {
			console.log(res)
			if(res.code == 20200){
				that.adList = res.data.ad//广告
				that.categoryList = res.data.category//类目
				that.teacherList = res.data.teacher//教师
				that.newsList = res.data.news//资讯
				that.courseList = res.data.course//课程
				that.topicList = res.data.topic//话题
			}else{
				this.$message.error(res.msg)
			}
		})
	},
	methods:{

	}
}
</script>
<style>

</style>
