<template>
  <div class="mainer">
    <div class="wrap">
      <div class="page_left">
        <ul>
          <li class="on">
            <nuxt-link to="/">
              <span>我的课程</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/2-kcjd">
              <span>课程进度</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/3-zyks">
              <span>作业考试</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/4-cjgl">
              <span>成绩管理</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/5-xjgl">
              <span>学籍管理</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/6-kcgl">
              <span>课程管理</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/7-jsgl">
              <span>教师管理</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/8-jgsz">
              <span>学校设置</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="page_right">
        <div class="page_tit">
          <h3>我的课程</h3>
        </div>
        <div class="kc_list">
          <ul>
            <li v-for="(item,index) in courseList" :key="index">
              <template v-if="index<showIndex">
                <div class="box">
                  <div class="img">
                    <nuxt-link :to="{path:'/1-ktxq',query:{id:item.courseId}}">
                      <img :src="item.thumb">
                    </nuxt-link>
                  </div>
                  <div class="web">
                    <h3>
                      <nuxt-link :to="{path:'/1-ktxq',query:{id:item.courseId}}">{{item.courseName}}</nuxt-link>
                    </h3>
                    <h4>{{item.studyStartTime}}--{{item.studyEndTime}}</h4>
                    <div class="kc_jxjd">
                      <p>
                        教学进度：
                        <font>{{item.progress}}%</font>
                      </p>
                      <div class="progress_bar">
                        <span :style="'width:'+item.progress+'%;'"></span>
                      </div>
                    </div>
                  </div>
                  <div class="clear"></div>
                  <div class="kc_btn">
                    <ul>
                      <li>
                        <a
                          href="javascript:void(0)"
                          @click="funShowKhbz(item.courseName,item.termId,item.courseId)"
                        >
                          <!--showKhbz=true-->
                          <span class="span1"></span>
                          <p>考核标准</p>
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          @click="funShowJxjh(item.courseName,item.termId,item.courseId)"
                        >
                          <!--showJxjh=true-->
                          <span class="span2"></span>
                          <p>教学计划</p>
                        </a>
                      </li>
                    </ul>
                    <div class="clear"></div>
                  </div>
                </div>
              </template>
            </li>
          </ul>
        </div>
        <div class="kc_list_chg">
          <label :class="showzk?'on':''">
            <span @click="showMycourse">{{showzk?'收起':'展开全部'}}</span>
          </label>
        </div>
        <div class="notice">
          <div class="change">
            <div class="change_list notice_change_list">
              <ul>
                <li :class="noticeIndex==1?'on':''" @click="noticeTabs(1)">全部通知</li>
                <li :class="noticeIndex==2?'on':''" @click="noticeTabs(2)">课程通知</li>
                <li :class="noticeIndex==3?'on':''" @click="noticeTabs(3)">系统通知</li>
              </ul>
              <div class="clear"></div>
              <div class="send_out" @click="showFstz=true">
                <label></label>
                <span>发送通知</span>
              </div>
            </div>
            <div class="change_tab">
              <div class="change_item">
                <div class="course_notice">
                  <ul>
                    <li v-for="(item,index) in noticelist" :key="index">
                      <h3>{{item.title}}</h3>
                      <p>{{item.content}}</p>
                      <h4>
                        {{item.addTimeFormat}}
                        <span>来源：{{item.addUserId}}</span>
                      </h4>
                    </li>
                    <!-- <li>
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
                    </li>-->
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="clear"></div>
      <khbz :showKhbz.sync="showKhbz" :assessmentlist.sync="assessmentlist"/>
      <jxjh
        :showJxjh.sync="showJxjh"
        :assessmentlist.sync="assessmentlist"
        :lessonlist.sync="lessonlist"
        :courseName.sync="courseName"
      />
      <fstz :showFstz.sync="showFstz" :courseList.sync="courseList" :onsubmit="SystemMessage" />
    </div>
  </div>
</template>
<script>
import Khbz from "@/components/khbz";
import Jxjh from "@/components/jxjh";
import Fstz from "@/components/fstz";
export default {
  components: {
    Khbz,
    Jxjh,
    Fstz
  },
  data() {
    return {
      courseList: [], //课程
      noticeIndex: 1, //通知tab状态
      showKhbz: false,
      showJxjh: false,
      showFstz: false,
      showIndex: 4,
      page: 1, //页码
      pagesize: 10, //分页大小
      type: 1, //消息类型
      showzk: false,

      noticelist: [], //消息列表
      dateFormatType: 0, //日期格式类型
      assessmentlist: [], //考核标准列表
      lessonlist: [], //教学计划课堂列表
      courseName: [] //课程名
    };
  },
  mounted() {
    const that = this;
    this.utils.api.RecommendIndex().then(res => {
      if (res.code == 20200) {
        that.courseList = res.data; //课程
      } else {
        // that.$message.error(res.msg)
      }
    });

    let params = {
      page: that.page,
      pagesize: that.pagesize,
      type: that.type
    };

    this.utils.api.systemMessage(params).then(res => {
      if (res.code == 20200) {
        that.noticelist = res.data.list;
      } else {
        // that.$message.error(res.msg)
      }
    });
  },
  methods: {
    noticeTabs(index) {
      const that = this;
      that.noticeIndex = index;
      that.type = index;
      that.SystemMessage()
    },
    SystemMessage(){
      const that = this
      let params = {
        page: that.page,
        pagesize: that.pagesize,
        type: that.type
      };

      this.utils.api.systemMessage(params).then(res => {
        if (res.code == 20200) {
          that.noticelist = res.data.list;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    showMycourse() {
      const that = this;
      if (!that.showzk) {
        that.showIndex = that.courseList.length;
        that.showzk = !that.showzk;
      } else {
        that.showzk = !that.showzk;
        that.showIndex = 4;
      }
    },
    funShowKhbz(cname, tid, cid) {
      const that = this;
      let assessmentparams = {
        termId: tid,
        courseId: cid,
        dateFormatType: that.dateFormatType
      };
      this.utils.api.assessmentCriteria(assessmentparams).then(res => {
        if (res.code == 20200) {
          that.showKhbz = true;
          that.assessmentlist = res.data;
        } else {
          that.$message.error(res.msg);
        }
      });
    },

    funShowJxjh(cname, tid, cid) {
      const that = this;
      let assessmentparams = {
        termId: tid,
        courseId: cid,
        dateFormatType: that.dateFormatType
      };
      let lessonparams = {
        courseId: cid,
        page: 1,
        pageSize: 10,
        pageEnable: 1
      };
      that.courseName = cname;
      this.utils.api.assessmentCriteria(assessmentparams).then(res => {
        if (res.code == 20200) {
          that.showJxjh = true;
          that.assessmentlist = res.data;
        } else {
          that.$message.error(res.msg);
        }
      });
      this.utils.api.teachingPlan(lessonparams).then(res => {
        if (res.code == 20200) {
          that.lessonlist = res.data.list;
        } else {
          that.$message.error(res.msg);
        }
      });
    }
  },
  head() {
    return {
      title: "天天通识-我的课程"
    };
  }
};
</script>
<style>
</style>
