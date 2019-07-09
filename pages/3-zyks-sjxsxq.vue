<template>
<div>
    <Header/>
  <div class="mainer">
    <div class="wrap">
      <div class="test_paper">
        <div class="tit tit1">
          <h3>{{title}}</h3>
          <p>
            <span>卷面总分：100</span>
            <span>题目数量：{{tcsapList.questionTotal}}</span>
          </p>
          <h4>
            <span>学生姓名：{{tcsapList.studentName}}</span>
            <span>提交时间：{{tcsapList.updateTime}}</span>
            <span>总得分：{{tcsapList.score}}</span>
          </h4>
        </div>
        <div class="subject subject_stu">
          <div class="item" v-for="(item,index) in subjectlist" :key="index">
            <h3>{{index == 0 ? '一' : '二' }}、【{{item.list[0].questionTypeName}}】</h3>
            <div class="list" v-for="(items,indexs) in item.list" :key="indexs">
              <div class="text">
                <p>
                  {{items.subject}}
                </p>
              </div>
              <div :class="items.questionType ==0 ? 'lab_rad':'lab_chk'">
                <ul>
                  <li
                    v-for="(i) in items.optionItem.options"
                    :key="i.id"
                    :class="items.answerOption.indexOf(i.id) > -1 ? 'on':''"
                  >
                    <label>{{i.optionNumber}}. {{i.optionTitle}}</label>
                  </li>
                </ul>
              </div>
              <div class="answer">
                <p>
                  <span
                    :class="JSON.stringify(items.answerOption)==JSON.stringify(items.optionItem.correctOption.optionId) ?'span1':'span2'"
                  >你的答案：</span>
                  <template v-for="(z) in items.optionItem.options">
                    <label
                      :key="z.id"
                      v-if="items.answerOption.indexOf(z.id) > -1"
                      :class="JSON.stringify(items.answerOption)==JSON.stringify(items.optionItem.correctOption.optionId) ?'':'lb1'"
                    >{{z.optionNumber}}</label>
                  </template>
                  <em>正确答案：</em>
                  <label v-for="(i) in items.optionItem.correctOption.optionNumber" :key="i">{{i}}</label>
                </p>
                <p>
                  <span>答案解析：</span>
                  {{items.analysis}}
                </p>
              </div>
            </div>
          </div>
          <div class="end">
            <p>
              <span>end</span>
            </p>
          </div>
        </div>
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
      tcsapList: [], //试卷列表
      courseid: 0,
      termid: 0,
      lessonid: 0,
      assessid: 0,
      studentid: 0,
      title: "",
      subjectlist:[],

      Singlechoicetopic: [], //单选题
      Multipletopics: [] //多选题
    };
  },
  mounted() {
    const that = this;
    that.courseid = this.$route.query.courseid;
    that.termid = this.$route.query.termid;
    that.lessonid = this.$route.query.lessonid;
    that.assessid = this.$route.query.assessid;
    that.studentid = this.$route.query.studentid;
    that.title = this.$route.query.title;

    that.TermCourseStudentAnswerPaper();
  },
  methods: {
    //试卷列表
    TermCourseStudentAnswerPaper() {
      const that = this;
      let params = {
        courseId: that.courseid,
        termId: that.termid,
        lessonId: that.lessonid,
        assessId: that.assessid,
        studentId: that.studentid
      };
      this.utils.api.TermCourseStudentAnswerPaper(params).then(res => {
        if (res.code == 20200) {
          that.tcsapList = res.data;
          that.subjectlist = res.data.examPaper
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
        } else {
          // that.$message.error(res.msg);
        }
      });
    }
  },
  head() {
    return {
      title: "天天通识-作业考试"
    };
  }
};
</script>
<style>
</style>
