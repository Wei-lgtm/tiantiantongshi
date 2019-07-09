<template>
  <div class="modal modal_dcxx" v-if="showDcxx">
    <div class="fp_modal">
      <div class="cell">
        <div class="modal_cont">
          <div class="close" @click="close"></div>
          <div class="modal_tit">
            <h3>
              <img src="@/assets/img/icon43.png">督促学习
            </h3>
          </div>
          <div class="mod_dcxx">
            <div class="tit" v-if="dcxxtype == 2">
              <p>
                <span>督促学生：</span>已选择的学生
              </p>
            </div>
            <div class="tit" v-if="dcxxtype == 1">
              <p>
                <span>督促学生：</span>学习进度低于
                <select v-model="listid">
                  <option
                    v-for="(item,index) in progresslist.list"
                    :key="index"
                    :value="item"
                    v-if="item"
                  >{{item}}%(计划进度)</option>
                </select>
              </p>
            </div>
            <div class="tab">
              <div class="list">
                <span>请输入通知标题</span>
                <input type="text" v-model="title">
              </div>
              <div class="list">
                <span>请输入通知内容</span>
                <textarea v-model="content">同学，你的《金融通识课》学习进度已经落后，有挂科风险，请及时学习课程哦~</textarea>
              </div>
              <div class="mod_btn">
                <a ondragstart="return false" class="a1" href="javascript:void(0)" @click="SendNotifications">发送通知</a>
                <a ondragstart="return false" href="javascript:void(0)" @click="close">取消</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["showDcxx", "dcxxtype", "studentIds"],
  components: {},
  data() {
    return {
      title: "",
      content: "",
      percent: "",
      progresslist: [],
      listid: ""
    };
  },
  mounted() {
    const that = this;
  },
  watch: {
    showDcxx: function(val) {
      if (val) {
        this.CourseProgressList();
      }
    }
  },
  methods: {
    close() {
      const that = this;
      this.$emit("update:showDcxx", false);
      that.title = "";
      that.content = "";
    },
    CourseProgressList() {
      const that = this;
      let params = {
        courseId: that.$store.getters.courseId,
        termId: that.$store.getters.termId
      };
      this.utils.api.CourseProgressList(params).then(res => {
        if (res.code == 20200) {
          that.progresslist = res.data;
          that.listid = res.data.list[1];
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    SendNotifications() {
      const that = this;
      let params = {
        courseId: that.$store.getters.courseId,
        termId: that.$store.getters.termId,
        type: that.dcxxtype + "",
        title: that.title,
        content: that.content
      };
      if (that.dcxxtype == 1) {
        params.percent = that.listid;
      }
      if (that.dcxxtype == 2) {
        params.studentIds = that.studentIds;
      }
      if (!that.title) {
        that.$message.error("请输入通知标题");
        return false;
      }
      if (!that.content) {
        that.$message.error("请输入通知内容");
        return false;
      }
      this.utils.api.AddMessage(params).then(res => {
        if (res.code == 20200) {
          that.$message.success("发送成功！");
          that.close();
          that.title = "";
          that.content = "";
        } else {
          that.$message.error(res.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
