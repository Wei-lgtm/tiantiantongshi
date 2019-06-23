<template>
  <div class="mainer">
        <div class="wrap">
            <div class="test_paper">
                <div class="tit tit1">
                    <h3>{{title}}</h3>
                    <p><span>卷面总分：{{tcsapList.paperScore}}</span><span>题目数量：{{tcsapList.questionTotal}}</span></p>
                    <h4><span>参与人数：{{tcsapList.studentTotal}}</span><span>已交人数：{{tcsapList.answerStudentTotal}}</span><span>未交人数：{{tcsapList.noAnswerStudentTotal}}</span></h4>
                </div>
                <div class="subject">
                    <div class="item">
                        <h3>一、【单选题】<span>（总分20分，共1小题）</span></h3>
                        <div class="list" v-for="(item,index) in Singlechoicetopic" :key="index">
                            <div class="left">
                                <div class="text">
                                    <p><font>{{index+1}}.</font>{{item.subject}}</p>
                                </div>
                                <div class="lab_rad">
                                    <ul>
                                        <li v-for="(i) in item.optionItem.options" :key="i.id" :class="item.optionItem.correctOption.optionId.indexOf(i.id) > -1 ? 'on':''">
                                          <label>{{i.optionNumber}}. {{i.optionTitle}}</label>
                                        </li>
                                    </ul>
                                </div>
                                <div class="answer">
                                  <p>
                                    <span >正确答案：</span>
                                    <label v-for="(i) in item.optionItem.correctOption.optionNumber" :key="i">{{i}}</label>
                                  </p>
                                  <p>
                                    <span>答案解析：</span>{{item.analysis}}</p>
                                </div>
                            </div>
                            <div class="right">
                                <img src="~/assets/img/tb4.jpg" />
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <div class="item">
                        <h3>二、【多选题】<span>（总分20分，共2小题）</span></h3>
                        <div class="list" v-for="(item,index) in Multipletopics" :key="index">
                            <div class="left">
                                <div class="text">
                                    <p><font>{{index+1}}.</font>{{item.subject}}</p>
                                </div>
                                <div class="lab_rad">
                                    <ul>
                                        <li v-for="(i) in item.optionItem.options" :key="i.id" :class="item.optionItem.correctOption.optionId.indexOf(i.id) > -1 ? 'on':''">
                                          <label>{{i.optionNumber}}. {{i.optionTitle}}</label>
                                        </li>
                                    </ul>
                                </div>
                                <div class="answer">
                                  <p>
                                    <span >正确答案：</span>
                                    <label v-for="(i) in item.optionItem.correctOption.optionNumber" :key="i">{{i}}</label>
                                  </p>
                                  <p>
                                    <span>答案解析：</span>{{item.analysis}}</p>
                                </div>
                            </div>
                            <div class="right">
                                <img src="~/assets/img/tb4.jpg" />
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <div class="end">
                        <p><span>end</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      tcsapList : [], //试卷列表
      courseid: 0,
      termid: 0,
      lessonid: 0,
      assessid: 0,
      title:'',
      
      Singlechoicetopic:[],//单选题
      Multipletopics:[],//多选题
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
        assessId: that.assessid,
      };
      this.utils.api.GetExamPaperAnswerReport(params).then(res => {
        if (res.code == 20200) {
          that.tcsapList = res.data;
          for(let i=0;i<res.data.examPaper.length;i++){
            if(res.data.examPaper[i].questionType==0){
              that.Singlechoicetopic.push(res.data.examPaper[i])
            }
            if(res.data.examPaper[i].questionType==1){
              that.Multipletopics.push(res.data.examPaper[i])
            }
          }
        } else {
          that.$message.error(res.msg);
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
