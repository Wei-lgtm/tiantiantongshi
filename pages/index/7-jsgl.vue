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
          <li class="on"><nuxt-link to="/7-jsgl"><span>教师管理</span></nuxt-link></li>
          <li><nuxt-link to="/8-jgsz"><span>学校设置</span></nuxt-link></li>
        </ul>
      </div>
      <div class="page_right">
        <div class="page_tit">
          <h3>教师管理</h3>
        </div>
        <div class="page_tab">
          <div class="title">
            <div class="title_edit">
              <a href="javascript:void(0)"  @click="showTjjs=true"><span class="span1"></span><em>添加辅导老师</em></a><a href="javascript:void(0)" @click="funShowScjs"><span class="span2"></span><em>删除所选老师</em></a>
            </div>
            <div class="title_btn">
              <span><a class="a2" href="#">导出名单</a></span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="tab_box tab_box1">
            <table cellpadding="0" cellspacing="0">
              <thead>
              <tr>
                <th>教师姓名</th>
                <th>手机号码</th>
                <th>工号</th>
                <th>最后上线时间</th>
                <th><label :class="selAll?'on':''" @click="funselAll">选择</label></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in teachersList" :key="index" @click="item.check = !item.check">
                <td>{{item.realname}}</td>
                <td>{{item.mobile}}</td>
                <td>{{item.jobNum}}</td>
                <td>{{item.lastlogin}}</td>
                <td><label :class="item.check?'on':''"></label></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="clear"></div>
      <tjjs :showTjjs.sync="showTjjs" :onsubmit="ListofTeachers" />
      <scjs :showScjs.sync="showScjs" :selList.sync="selList" :onsubmit="ListofTeachers" />
    </div>
  </div>
</template>
<script>
import Tjjs from '@/components/tjjs'
import Scjs from '@/components/scjs'
export default {
	components:{
    Tjjs,
    Scjs,
  },
  data() {
    return {
      teachersList:[],//教师列表
      showTjjs:false,
      showScjs:false,
      selAll:false,
      selList:[],
    };
  },
  mounted() {
    const that = this;

    
    that.ListofTeachers();
  },
  methods:{
    //教师列表
    ListofTeachers(){
      const that = this
      this.utils.api.ListofTeachers().then(res => {
        if (res.code == 20200) {
          that.selAll=false
          for(let i=0;i<res.data.list.length;i++){
            res.data.list[i].check = false
          }
          that.teachersList = res.data.list;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    funselAll(){
      const that=this;
      that.selAll=!that.selAll
      for(let i=0; i<that.teachersList.length;i++){
        that.teachersList[i].check=that.selAll
      }
    },
    funShowScjs(){
      const that=this;
      let selList = []
      for(let i=0; i<that.teachersList.length;i++){
        if(that.teachersList[i].check){
          selList.push(that.teachersList[i].id)
        }
      }
      that.selList=selList
      that.showScjs=true
    }
  },
  head() {
    return {
      title: "天天通识-教师管理"
    };
  }
}
</script>
<style>

</style>
