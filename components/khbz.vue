<template>
  <div class="modal modal_khbz" v-if="showKhbz">
    <div class="fp_modal">
      <div class="cell">
        <div class="modal_cont">
          <div class="close" @click="close()"></div>
          <div class="modal_tit">
            <h3>
              <img src="@/assets/img/icon9-1.png">考核标准
              <span>
                课程总分：
                <font>100</font>
              </span>
            </h3>
          </div>
          <div class="mod_khbz">
            <ul>
              <li>
                <span>在线学习：</span>
                <div class="web">
                  <p>
                    占<font>{{assessmentlist.onlineStudyRate}}</font>分
                    <em>期末考试前，观看完全部课程视频，可以得满分。</em>
                  </p>
                  <h4>在线学习得分 = 课程实际学习平均得分/课程在线学习总分 * 权值（80 分）</h4>
                </div>
                <div class="clear"></div>
              </li>
              <li>
                <span>作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业：</span>
                <div class="web">
                  <p>
                    占<font>{{assessmentlist.exercisesRate}}</font>分
                    <em>期末考试前，完成所有课后习题有机会得满分，未做题目计0分。</em>
                  </p>
                  <h4>作业得分 = 课程习题实际得分/课程习题总分 * 权值（10 分）</h4>
                </div>
                <div class="clear"></div>
              </li>
              <li>
                <span>考&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;试：</span>
                <div class="web">
                  <p>
                    占<font>{{assessmentlist.examRate}}</font>分
                    <em>考试成绩将取所有考试成绩的平均分值，未做题目计0分。</em>
                  </p>
                  <h4>考试得分 = 课程考试实际得分/课程考试总分 * 权值（10 分）</h4>
                </div>
                <div class="clear"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["showKhbz", "assessmentlist"],//assessmentlist是传进来的数据  循环这个
  components: {},
  data() {
    return {};
  },
  mounted() {
    
  },
  methods: {
    close() {
      this.$emit("update:showKhbz", false);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
