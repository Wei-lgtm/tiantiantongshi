<template>
  <div class="page_left">
          <ul>
            <template v-for="(item,index) in navlist">
            <li :key="index" :class="item.inURL.indexOf($route.path) > -1 ? 'on':''" v-if="$store.getters.user.isAdmin >= item.role">
              <nuxt-link :to="{path:item.url}" ondragstart="return false">
                <span>{{item.title}}</span>
              </nuxt-link>
            </li>
            </template>
          </ul>
        </div>
</template>
<script>
import { aesDecrypt } from "@/utils/crypto";
export default {
  name: "LeftNav",
  data(){
    return {
      navlist:[
        {url:'/myCourse',title:'我的课程',role:0,inURL:['/myCourse','/myCourse/']},
        {url:'/2-kcjd',title:'课程进度',role:0,inURL:['/2-kcjd','/2-kcjd/','/2-kcjd-bjxq','/2-kcjd-bjxq/']},
        {url:'/3-zyks',title:'作业考试',role:0,inURL:['/3-zyks','/3-zyks/','/3-zyks-bjxxcj','/3-zyks-bjxxcj/','/3-zyks-ckcj','/3-zyks-ckcj/']},
        {url:'/4-cjgl',title:'成绩管理',role:0,inURL:['/4-cjgl','/4-cjgl/']},
        {url:'/5-xjgl',title:'学籍管理',role:1,inURL:['/5-xjgl','/5-xjgl/']},
        {url:'/6-kcgl',title:'课程管理',role:1,inURL:['/6-kcgl','/6-kcgl/','/6-kcgl-bjxq','/6-kcgl-bjxq/','/6-kcgl-kcsz','/6-kcgl-kcsz/','/6-kcgl-xkgl','/6-kcgl-xkgl/']},
        {url:'/7-jsgl',title:'教师管理',role:1,inURL:['/7-jsgl','/7-jsgl/']},
        {url:'/8-jgsz',title:'学校设置',role:1,inURL:['/8-jgsz','/8-jgsz/']},
      ]
    };
  },
  mounted() {
    const that = this;
    
  },
  methods: {
    
  }
};
</script>
<style lang="scss" scoped>
</style>
