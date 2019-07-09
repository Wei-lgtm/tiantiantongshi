<template>
<div>
    <Header/>
  <div class="mainer">
    <div class="wrap">
      <div class="test_paper">
        <div class="tit tit1">
          <h3>{{title}}</h3>
          <p>
            <span>卷面总分：{{tcsapList.paperScore}}</span>
            <span>题目数量：{{tcsapList.questionTotal}}</span>
          </p>
          <h4>
            <span>参与人数：{{tcsapList.studentTotal}}</span>
            <span>已交人数：{{tcsapList.answerStudentTotal}}</span>
            <span>未交人数：{{tcsapList.noAnswerStudentTotal}}</span>
          </h4>
        </div>
        <div class="subject">
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
                    :class="items.optionItem.correctOption.optionId.indexOf(i.id) > -1 ? 'on':''"
                  >
                    <label>{{i.optionNumber}}. {{i.optionTitle}}</label>
                  </li>
                </ul>
              </div>
              <div class="answer">
                <p>
                  <span>正确答案：</span>
                  <label v-for="(i) in items.optionItem.correctOption.optionNumber" :key="i">{{i}}</label>
                </p>
                <p>
                  <span>答案解析：</span>
                  {{items.analysis}}
                </p>
              </div>
              <div class="clear"></div>
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
    that.title = this.$route.query.title;

    that.GetExamPaperAnswerReport();
  },
  methods: {
    //试卷列表
    GetExamPaperAnswerReport() {
      const that = this;
      let params = {
        courseId: that.courseid,
        termId: that.termid,
        lessonId: that.lessonid,
        assessId: that.assessid
      };
      this.utils.api.GetExamPaperAnswerReport(params).then(res => {
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
