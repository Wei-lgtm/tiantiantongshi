<template>
  <div class="mainer">
    <div class="wrap">
      <div class="page_left">
        <ul>
          <li><nuxt-link to="/"><span>我的课程</span></nuxt-link></li>
          <li class="on"><nuxt-link to="/2-kcjd"><span>课程进度</span></nuxt-link></li>
          <li><nuxt-link to="/3-zyks"><span>作业考试</span></nuxt-link></li>
          <li><nuxt-link to="/4-cjgl"><span>成绩管理</span></nuxt-link></li>
          <li><nuxt-link to="/5-xjgl"><span>学籍管理</span></nuxt-link></li>
          <li><nuxt-link to="/6-kcgl"><span>课程管理</span></nuxt-link></li>
          <li><nuxt-link to="/7-jsgl"><span>教师管理</span></nuxt-link></li>
          <li><nuxt-link to="/8-jgsz"><span>学校设置</span></nuxt-link></li>
        </ul>
      </div>
      <div class="page_right">
        <div class="course_sel">
          <span>陈志武教授金融通识课_2019年秋季</span>
        </div>
        <div class="chart">
          <div class="left">
            <div class="tit">
              <h3>学习总进度</h3>
              <span>当前计划进度：11%</span>
              <div class="clear"></div>
            </div>
            <div class="chart_pie">
              <img src="@/assets/img/tb1.jpg" />
            </div>
          </div>
          <div class="right">
            <div class="tit">
              <h3>学习趋势</h3>
              <span><em><a href="#">本周</a></em><em><a href="#">本月</a></em><em><a href="#">最近十五天</a></em></span>
              <div class="clear"></div>
            </div>
            <div class="chart_line">
              <img src="@/assets/img/tb2.jpg" />
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="page_tab">
          <div class="title">
            <h3>详情</h3>
            <div class="title_search">
              <input type="text" placeholder="请输入班级" /><a href="#"></a>
            </div>
            <div class="title_btn">
              <span><a class="a1" href="#" @click="showDcxx=true">督促学习</a></span><span><a class="a2" href="#">导出名单</a></span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="tab_box">
            <table cellpadding="0" cellspacing="0">
              <thead>
                <tr>
                  <th>班级名称</th>
                  <th>学校</th>
                  <th>辅导老师</th>
                  <th>选修人数</th>
                  <th>班级平均<br />进度(%）</th>
                  <th>快于计划</th>
                  <th>慢于计划</th>
                  <th>没有学习</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><a href="2-kcjd-bjxq.html">19级计算机1班</a></td>
                  <td>中南大学</td>
                  <td>筱筱</td>
                  <td>1000</td>
                  <td>80.0%</td>
                  <td>450</td>
                  <td>590</td>
                  <td>21</td>
                </tr>
                <tr>
                  <td><a href="2-kcjd-bjxq.html">19级计算机2班</a></td>
                  <td>中南大学</td>
                  <td>陈志武</td>
                  <td>1000</td>
                  <td>89.0%</td>
                  <td>1000</td>
                  <td>780</td>
                  <td>98</td>
                </tr>
                <tr>
                  <td><a href="2-kcjd-bjxq.html">19级计算机3班</a></td>
                  <td>中南林业科技大学</td>
                  <td>筱筱</td>
                  <td>980</td>
                  <td>92.0%</td>
                  <td>980</td>
                  <td>80</td>
                  <td>111</td>
                </tr>
                <tr>
                  <td><a href="2-kcjd-bjxq.html">19级计算机4班</a></td>
                  <td>中南林业科技大学</td>
                  <td>李小明</td>
                  <td>980</td>
                  <td>98.0%</td>
                  <td>600</td>
                  <td>80</td>
                  <td>321</td>
                </tr>
                <tr>
                  <td><a href="2-kcjd-bjxq.html">19级计算55班</a></td>
                  <td>中南林业科技大学</td>
                  <td>小一</td>
                  <td>123</td>
                  <td>90.0%</td>
                  <td>600</td>
                  <td>980</td>
                  <td>23</td>
                </tr>
                <tr>
                  <td><a href="2-kcjd-bjxq.html">19级计算机4班</a></td>
                  <td>中南林业科技大学</td>
                  <td>李小明</td>
                  <td>980</td>
                  <td>98.0%</td>
                  <td>600</td>
                  <td>80</td>
                  <td>321</td>
                </tr>
                <tr>
                  <td><a href="2-kcjd-bjxq.html">19级计算55班</a></td>
                  <td>中南林业科技大学</td>
                  <td>小一</td>
                  <td>123</td>
                  <td>90.0%</td>
                  <td>600</td>
                  <td>980</td>
                  <td>23</td>
                </tr>
                <tr>
                  <td><a href="2-kcjd-bjxq.html">19级计算机4班</a></td>
                  <td>中南林业科技大学</td>
                  <td>李小明</td>
                  <td>980</td>
                  <td>98.0%</td>
                  <td>600</td>
                  <td>80</td>
                  <td>321</td>
                </tr>
                <tr>
                  <td><a href="2-kcjd-bjxq.html">19级计算55班</a></td>
                  <td>中南林业科技大学</td>
                  <td>小一</td>
                  <td>123</td>
                  <td>90.0%</td>
                  <td>600</td>
                  <td>980</td>
                  <td>23</td>
                </tr>
                <tr>
                  <td><a href="2-kcjd-bjxq.html">19级计算机4班</a></td>
                  <td>中南林业科技大学</td>
                  <td>李小明</td>
                  <td>980</td>
                  <td>98.0%</td>
                  <td>600</td>
                  <td>80</td>
                  <td>321</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="clear"></div>
      <dcxx :showDcxx.sync="showDcxx"/>
    </div>
  </div>
</template>
<script>
import Dcxx from '@/components/dcxx'
export default {
	components:{
		Dcxx
  },
  data(){
    return {
      showDcxx:false
    }
  }
}
</script>
<style>

</style>
