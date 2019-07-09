<template>
  <div class="modal modal_tjjs" v-if="showTjjs">
    <div class="fp_modal">
      <div class="cell">
        <div class="modal_cont">
          <div class="close" @click="close()"></div>
          <div class="modal_tit">
            <h3>添加教师</h3>
          </div>
          <div class="mod_tjjs">
            <ul>
              <li>
                <span>
                  <i>*</i>教师姓名：
                </span>
                <div class="web">
                  <input type="text" v-model="teacherName">
                </div>
                <div class="clear"></div>
              </li>
              <li>
                <span>
                  <i>*</i>手机号码：
                </span>
                <div class="web">
                  <input type="text" maxlength="11" v-model="mobile">
                </div>
                <div class="clear"></div>
              </li>
              <li>
                <span>
                  <i>*</i>工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：
                </span>
                <div class="web">
                  <input type="text" v-model="jobNum">
                </div>
                <div class="clear"></div>
              </li>
              <li>
                <span>
                  <i>*</i>默认密码：
                </span>
                <div class="web">
                  <input type="password" v-model="password" autocomplete="new-password">
                </div>
                <div class="clear"></div>
              </li>
            </ul>
            <div class="mod_btn">
              <a ondragstart="return false" class="a1" href="javascript:void(0)" @click="funAddTeacher">确定</a>
              <a ondragstart="return false" href="javascript:void(0)" @click="close()">取消</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["showTjjs", "onsubmit"],
  components: {},
  data() {
    return {
      teacherName: "", //教师姓名
      mobile: "", //教师手机号
      jobNum: "", //工号
      password: "" //密码
    };
  },
  watch: {
    mobile: function(newval, oldval) {
      if (!newval) return;
      if (!/^\d+$|^\d+[.]?\d+$/.test(newval)) {
        this.mobile = "";
      }
    }
  },
  mounted() {

  },
  methods: {
    close() {
      this.$emit("update:showTjjs", false);
    },
    funAddTeacher() {
      const that = this;
      if (!that.teacherName) {
        that.$message.error("请输入教师姓名！");
        return false;
      }
      if (!that.mobile) {
        that.$message.error("请输入教师手机号！");
        return false;
      }
      if (!that.jobNum) {
        that.$message.error("请输入教师工号！");
        return false;
      }
      if (that.password.length < 6) {
        that.$message.error("密码最小6位！");
        return false;
      }
      let params = {
        teacherName: that.teacherName,
        mobile: that.mobile,
        jobNum: that.jobNum,
        password: that.password
      };
      this.utils.api.AddTeacher(params).then(res => {
        if (res.code == 20200) {
          that.$message.success("添加成成功！");
          this.$emit("update:showTjjs", false);
          that.teacherName = "";
          that.mobile = "";
          that.jobNum = "";
          that.password = "";
          that.onsubmit();
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
