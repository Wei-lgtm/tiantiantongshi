<template>
  <div>
    <Header />
    <div class="mainer">
      <div class="course_det">
        <div class="box">
          <div class="l_nav">
            <h3>目录</h3>
            <div class="list">
              <ul>
                <li
                  v-for="(item,index) in lessonlist"
                  :key="index"
                  :class="lessonId==item.lessonId?'on':''"
                >
                  <a
                    href="javascript:void(0)"
                    @click="funGetLessonDetail(item.lessonId)"
                    ondragstart="return false"
                  >
                    <p>{{((page-1) * 10)+(index+1)}}. {{item.lessonName}}</p>
                  </a>
                </li>
              </ul>
            </div>
            <div class="pageSize" v-if="total > 10">
              <el-pagination
                layout="prev, pager, next"
                :current-page="page"
                @current-change="getpage"
                :total="total"
              ></el-pagination>
            </div>
          </div>
          <div class="line"></div>
          <div class="r_main det_r_main">
            <h3>
              {{courseDetails.lessonName}}
              <a
                href="javascript:void(0)"
                v-on:click="back"
                ondragstart="return false"
              >返回</a>
            </h3>
            <div class="vedio">
              <video
                width="100%"
                :src="courseDetails.fileUrl ? courseDetails.fileUrl:courseDetails.audioUrl"
                controls="controls"
                controlslist="nodownload"
                autoplay="autoplay"
                :poster="courseDetails.audioPic"
              ></video>
            </div>
            <div class="web">
              <div class="text">
                <h4>
                  <span class="span1">讲稿</span>
                </h4>
                <div :class="detjgWebHeight?'':'det_web'" v-html="detjgWeb"></div>
                <label
                  @click="showdetjgWeb"
                  v-if="detjgzk"
                >【{{detjgWebHeight?'收起':'展开'}}】</label>
              </div>
              <div class="text">
                <h4>
                  <span class="span2">延伸阅读</span>
                </h4>
                <div :class="detysWebHeight?'':'det_web'" v-html="detysWeb"></div>
                <label
                  @click="showdetysWeb"
                  v-if="detyszk"
                >【{{detysWebHeight?'收起':'展开'}}】</label>
              </div>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
export default {
  components: {
    Header
  },
  data() {
    return {
      courseid: "",
      lessonlist: [],
      lessonId: 0,
      courseDetails: [],
      detysWebHeight: false,
      detjgWebHeight: false,
      page: 1,
      pageSize: 10,
      total: 0,
      detjgWeb: "",
      detysWeb: "",
      detjgzk:false,
      detyszk:false,
    };
  },
  mounted() {
    const that = this;
    that.courseid = that.$route.query.id;
    that.getTeachingPlan();
  },
  methods: {
    getTeachingPlan() {
      const that = this;
      let lessonparams = {
        courseId: that.courseid,
        page: that.page,
        pageSize: that.pageSize
      };
      //教学计划课堂列表
      this.utils.api.teachingPlan(lessonparams).then(res => {
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
        if (res.code == 20200) {
          that.lessonlist = res.data.list;
          if (res.data.list.length > 0) {
            that.lessonId = res.data.list[0].lessonId;
            that.getLessonDetail();
            that.total = res.data.total;
          }
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    getpage(e) {
      const that = this;
      that.page = e;
      that.getTeachingPlan();
    },
    getLessonDetail() {
      const that = this;
      let params = {
        lessonId: that.lessonId,
        isEncryption: 0
      };
      this.utils.api.GetLessonDetail(params).then(res => {
        if (res.code == 20200) {
          that.detjgWebHeight = false;
          that.detysWebHeight = false;
          that.detjgzk = false
          that.detyszk = false
          that.courseDetails = res.data;
          if (that.courseDetails.textUrl.replace(/<[^>]+>/g, "").length > 190) {
            that.detjgzk = true
            that.detjgWeb = that.courseDetails.textUrl.replace(/<[^>]+>/g, "").slice(0, 190) + "...";
          } else {
            that.detjgWeb = that.courseDetails.textUrl;
          }
          if (that.courseDetails.read.replace(/<[^>]+>/g, "").length > 190) {
            that.detyszk = true
            that.detysWeb = that.courseDetails.read.replace(/<[^>]+>/g, "").slice(0, 190) + "...";
          } else {
            that.detysWeb = that.courseDetails.read;
          }
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    showdetjgWeb() {
      const that = this;
      if (!that.detjgWebHeight) {
        that.detjgWebHeight = !that.detjgWebHeight;
        that.detjgWeb = that.courseDetails.textUrl;
      } else {
        that.detjgWebHeight = !that.detjgWebHeight;
        that.detjgWeb = that.courseDetails.textUrl.replace(/<[^>]+>/g, "").slice(0, 190) + "...";
      }
    },
    showdetysWeb() {
      const that = this;
      if (!that.detysWebHeight) {
        that.detysWebHeight = !that.detysWebHeight;
        that.detysWeb = that.courseDetails.read;
      } else {
        that.detysWebHeight = !that.detysWebHeight;
        that.detysWeb = that.courseDetails.read.replace(/<[^>]+>/g, "").slice(0, 190) + "...";
      }
    },
    funGetLessonDetail(lid) {
      const that = this;
      that.courseDetails.fileUrl = "";
      that.lessonId = lid;
      that.getLessonDetail();
    },
    back() {
      this.$router.go(-1);
    }
  },
  head() {
    return {
      title: "天天通识-我的课程"
    };
  }
};
</script>
<style lang="scss" scoped>
.det_web {
  max-height: 84px;
  line-height: 28px;
  font-size: 16px;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
}
</style>


