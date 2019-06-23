<template>
  <div class="modal modal_fstz" v-if="showFstz">
    <div class="fp_modal">
      <div class="cell">
        <div class="modal_cont">
          <div class="close" @click="close()"></div>
          <div class="modal_tit">
            <h3>
              <img src="@/assets/img/icon42.png">发送通知
            </h3>
          </div>
          <div class="mod_dcxx">
            <div class="send_notice">
              <div class="sel">
                <h4>
                  发送通知到：
                  <span @click="dropShow=true">
                    <em>选择班级</em>
                  </span>
                </h4>
                <div class="drop" v-if="dropShow">
                  <div class="box">
                    <div class="sel_course">
                      <h4>课程</h4>
                      <div class="list">
                        <ul>
                          <li
                            v-for="(item,index) in courseList"
                            :key="index"
                            @click="funclassAcquisition(item.courseId,item.termId)"
                          >{{item.courseName}}</li>
                        </ul>
                      </div>
                    </div>
                    <div class="sel_class">
                      <div class="top">
                        <div class="search">
                          <input type="text" placeholder="查询班级">
                          <a href="#"></a>
                        </div>
                        <div class="sel_all">
                          <label :class="selAll?'on':''" @click="funselAll">全部班级</label>
                        </div>
                      </div>
                      <div class="list">
                        <ul>
                          <li
                            v-for="(item,index) in classList"
                            :key="index"
                            :class="item.check?'on':''"
                          >
                            <label @click="item.check = !item.check">{{item.class_name}}</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="clear"></div>
                  </div>
                  <div class="sel_btn">
                    <a class="a1" href="javascript:void(0)" @click="funyx">确定</a>
                    <a href="javascript:void(0)" @click="dropShow=false">取消</a>
                  </div>
                </div>
              </div>
              <div class="sel_yx">
                <h4>
                  <span>已选择{{classnamelist.length}}个班级</span>
                </h4>
                <div class="list">
                  <ul>
                    <li v-for="(item,index) in classnamelist" :key="index">
                      {{item.class_name}}
                      <i @click="delclassname(index)"></i>
                    </li>
                  </ul>
                  <div class="clear"></div>
                </div>
              </div>
            </div>
            <div class="tab">
              <div class="list">
                <span>请输入通知标题</span>
                <input type="text" v-model="title">
              </div>
              <div class="list">
                <span>请输入通知内容</span>
                <textarea v-model="content"></textarea>
              </div>
              <div class="mod_btn">
                <a class="a1" href="javascript:void(0)" @click="funfstz">发送通知</a>
                <a href="javascript:void(0)" @click="close">取消</a>
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
  props: ["showFstz", "courseList", "onsubmit"],
  components: {},
  data() {
    return {
      classList: [], //班级列表
      selAll: false,
      curserid: "",
      termid: "",
      title: "",
      content: "",
      dropShow: false,
      classnamelist: []
    };
  },
  mounted() {},
  methods: {
    close() {
      const that = this;
      this.$emit("update:showFstz", false);
      that.title = "";
      that.content = "";
      that.classnamelist = [];
    },
    //选修某学期课程的班级列表
    funclassAcquisition(cid, tid) {
      const that = this;
      let params = {
        courseId: cid,
        termId: tid
      };
      that.curserid = cid;
      that.termid = tid;
      that.utils.api.classroomList(params).then(res => {
        if (res.code == 20200) {
          that.selAll = false;
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].check = false;
          }
          that.classList = res.data;
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    funselAll() {
      const that = this;
      that.selAll = !that.selAll;
      for (let i = 0; i < that.classList.length; i++) {
        that.classList[i].check = that.selAll;
      }
    },
    funfstz() {
      const that = this;
      let selList = [];
      for (let i = 0; i < that.classnamelist.length; i++) {
        selList.push(that.classList[i].id);
      }
      if (!that.curserid && !that.termid && selList.length < 1) {
        that.$message.error("请选择班级");
        return false;
      }
      if (!that.title) {
        that.$message.error("请填写通知标题");
        return false;
      }
      if (!that.content) {
        that.$message.error("请填写通知内容");
        return false;
      }
      let params = {
        courseId: that.curserid,
        termId: that.termid,
        title: that.title,
        content: that.content,
        classIds: selList
      };
      this.utils.api.AddTermCourseClassMessage(params).then(res => {
        if (res.code == 20200) {
          that.$message.success("发送成功！");
          that.close();
          that.onsubmit();
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    funyx() {
      const that = this;
      for (let i = 0; i < that.classList.length; i++) {
        if (that.classList[i].check) {
          that.classnamelist.push(that.classList[i]);
        }
      }
      that.dropShow = false;
    },
    delclassname(index) {
      const that = this;
      that.classnamelist.splice(index, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
