<template>
  <div class="mainer">
    <div class="wrap">
      <div class="page_left">
        <ul>
          <li><nuxt-link to="/"><span>我的课程</span></nuxt-link></li>
          <li><nuxt-link to="/2-kcjd"><span>课程进度</span></nuxt-link></li>
          <li><nuxt-link to="/3-zyks"><span>作业考试</span></nuxt-link></li>
          <li class="on"><nuxt-link to="/4-cjgl"><span>成绩管理</span></nuxt-link></li>
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
              <h3>成绩总览</h3>
              <div class="clear"></div>
            </div>
            <div class="achievement_zl">
              <div class="data">
                <p>开始：<span>2019/03/21  14:30:00</span></p>
                <p>结束：<span>2019/03/21  16:30:00</span></p>
              </div>
              <div class="list">
                <ul>
                  <li><p>参与人数：500</p></li>
                  <li><p>及格人数：300</p></li>
                  <li><p>未及格人数：100</p></li>
                </ul>
                <ul>
                  <li><p>平均成绩：300</p></li>
                  <li><p>最高成绩：100</p></li>
                  <li><p>最低成绩：0</p></li>
                </ul>
                <div class="clear"></div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="tit">
              <h3>成绩人数分布</h3>
              <div class="clear"></div>
            </div>
            <div class="chart_bar">
              <img src="img/tb3.jpg" />
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="page_tab">
          <div class="title">
            <h3>详情</h3>
            <div class="title_search">
              <input type="text" placeholder="请输入学生姓名\学号" /><a href="#"></a>
            </div>
            <div class="title_btn">
              <span><a class="a1" href="#">督促学习</a></span><span><a class="a2" href="#">导出名单</a></span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="tab_box tab_box1">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <th>学号</th>
                <th>学生姓名</th>
                <th>班级</th>
                <th>学习进度</th>
                <th>平时作业</th>
                <th>期末成绩</th>
                <th>补考分数</th>
                <th>总成绩</th>
              </tr>
              <tr>
                <td>10009</td>
                <td>陈志武</td>
                <td>19级计算机1班</td>
                <td>10.0%</td>
                <td>98</td>
                <td>98</td>
                <td>78</td>
                <td><a href="#">98</a></td>
              </tr>
              <tr>
                <td>10009</td>
                <td>陈志武</td>
                <td>19级计算机1班</td>
                <td>10.0%</td>
                <td>98</td>
                <td>98</td>
                <td>78</td>
                <td><a href="#">98</a></td>
              </tr>
              <tr>
                <td>10009</td>
                <td>陈志武</td>
                <td>19级计算机1班</td>
                <td>10.0%</td>
                <td>98</td>
                <td>98</td>
                <td>78</td>
                <td><a href="#">98</a></td>
              </tr>
              <tr>
                <td>10009</td>
                <td>陈志武</td>
                <td>19级计算机1班</td>
                <td>10.0%</td>
                <td>98</td>
                <td>98</td>
                <td>78</td>
                <td><a href="#">98</a></td>
              </tr>
              <tr>
                <td>10009</td>
                <td>陈志武</td>
                <td>19级计算机1班</td>
                <td>10.0%</td>
                <td>98</td>
                <td>98</td>
                <td>78</td>
                <td><a href="#">98</a></td>
              </tr>
              <tr>
                <td>10009</td>
                <td>陈志武</td>
                <td>19级计算机1班</td>
                <td>10.0%</td>
                <td>98</td>
                <td>98</td>
                <td>78</td>
                <td><a href="#">98</a></td>
              </tr>
              <tr>
                <td>10009</td>
                <td>陈志武</td>
                <td>19级计算机1班</td>
                <td>10.0%</td>
                <td>98</td>
                <td>98</td>
                <td>78</td>
                <td><a href="#">98</a></td>
              </tr>
              <tr>
                <td>10009</td>
                <td>陈志武</td>
                <td>19级计算机1班</td>
                <td>10.0%</td>
                <td>98</td>
                <td>98</td>
                <td>78</td>
                <td><a href="#">98</a></td>
              </tr>
              <tr>
                <td>10009</td>
                <td>陈志武</td>
                <td>19级计算机1班</td>
                <td>10.0%</td>
                <td>98</td>
                <td>98</td>
                <td>78</td>
                <td><a href="#">98</a></td>
              </tr>
            </table>
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
		
	}
}
</script>
<style>

</style>
