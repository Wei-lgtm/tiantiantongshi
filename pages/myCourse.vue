<template>
  <div>
    <Header/>
    <div class="mainer">
      <div class="wrap">
        <LeftNav/>
        <div class="page_right">
          <div class="page_tit">
            <h3>我的课程</h3>
          </div>
          <div v-if="courseList.length > 0">
            <div class="kc_list">
              <ul>
                <li v-for="(item,index) in courseList" :key="index">
                  <template v-if="index < showIndex">
                    <div class="box">
                      <div class="img">
                        <nuxt-link ondragstart="return false" :to="{path:'/1-ktxq',query:{id:item.courseId}}">
                          <img :src="item.thumb">
                        </nuxt-link>
                      </div>
                      <div class="web">
                        <h3>
                          <nuxt-link
                           ondragstart="return false"
                            :to="{path:'/1-ktxq',query:{id:item.courseId}}"
                          >{{item.courseName}}</nuxt-link>
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
                              ondragstart="return false"
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
                              ondragstart="return false"
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
          </div>
          <div v-else>
            <div class="data_default">
              <img src="@/assets/img/curriculum_default.png">
            </div>
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
              <div class="change_tab" v-if="noticelist.length > 0">
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
                    </ul>
                  </div>
                  <div class="pageSize">
                    <el-pagination
                      layout="prev, pager, next"
                      :current-page="page"
                      @current-change="getpage"
                      :total="total"
                    ></el-pagination>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="data_default">
                  <img src="@/assets/img/curriculum_default.png">
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
          :courseName.sync="courseName"
          :courseid.sync="courseid"
        />
        <fstz :showFstz.sync="showFstz" :courseList.sync="courseList" :onsubmit="SystemMessage"/>
      </div>
    </div>
  </div>
</template>
<script>
import Khbz from "@/components/khbz";
import Jxjh from "@/components/jxjh";
import Fstz from "@/components/fstz";
import Header from "@/components/Header";
import LeftNav from "@/components/left_nav";
export default {
  components: {
    Khbz,
    Jxjh,
    Fstz,
    Header,
    LeftNav
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
      total: 0,
      courseid: 0,
      lessontotal: 0,
      nodata: false,

      noticelist: [], //消息列表
      dateFormatType: 1, //日期格式类型
      assessmentlist: [], //考核标准列表
      lessonlist: [], //教学计划课堂列表
      courseName: [] //课程名
    };
  },
  mounted() {
    const that = this;

    that.RecommendIndex();
    that.SystemMessage();
  },
  methods: {
    RecommendIndex() {
      const that = this;
      this.utils.api.RecommendIndex().then(res => {
        if (res.code == 20200) {
          that.courseList = res.data; //课程
        } else {
          // that.$message.error(res.msg)
        }
      });
    },
    noticeTabs(index) {
      const that = this;
      that.noticeIndex = index;
      that.page = 1;
      that.type = index;
      that.SystemMessage();
    },
    SystemMessage() {
      const that = this;
      let params = {
        page: that.page,
        pagesize: that.pagesize,
        type: that.type
      };
      this.utils.api.systemMessage(params).then(res => {
        if (res.code == 20200) {
          that.noticelist = res.data.list;
          that.total = res.data.total;
        }
        if (res.code == 20106) {
          that.$message.error("身份验证信息已过期，请重新登录");
          setTimeout(function() {
              that.$router.push("/");
            }, 1000);
        }
        if (res.code == 20201) {
          that.$message.error(res.msg);
          setTimeout(function() {
              that.$router.push("/");
            }, 1000);
        }
        else {
          // that.$message.error(res.msg);
        }
      });
    },
    getpage(e) {
      const that = this;
      that.page = e;
      that.SystemMessage();
    },
    //点击展开收起
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
    //考核标准
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
    //教学计划
    funShowJxjh(cname, tid, cid) {
      const that = this;
      let assessmentparams = {
        termId: tid,
        courseId: cid,
        dateFormatType: that.dateFormatType
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
      that.courseid = cid;
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
