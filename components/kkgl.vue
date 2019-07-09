<template>
  <div class="modal modal_kkgl" v-if="showKkgl">
        <div class="fp_modal">
            <div class="cell">
                <div class="modal_cont">
                    <div class="close" @click="close()"></div>
                    <div class="modal_tit">
                        <h3><img src="@/assets/img/icon45.png" />开课管理</h3>
                    </div>
                    <div class="mod_kkgl">
                    <div class="mod_kkg_top">
                      <div class="course_sel">
                        <div class="course_sel_name">学期：</div>
                        <span @click="showToggle()">{{kkglcname.termName || ""}}</span>
                        <div class="clear"></div>
                        <div class="cdrop" v-show="cdropShow">
                          <ul>
                            <li v-for="(item,index) in sterlist" :key="index" @click="fungetRate(item.id,item.termName)">{{item.termName}}</li>
                          </ul>
                        </div>
                      </div>
                        <div class="semester">
                            <p><em><a ondragstart="return false" href="javascript:void(0);" @click="dropShow=true">添加</a></em></p>
                            <div class="drop" v-if="dropShow">
                                <div class="box">
                                    <div class="drop_close" @click="fundropShow"></div>
                                    <div class="semester_add">
                                        <input type="text" placeholder="请输入添加的学期" v-model="content" /><a ondragstart="return false" href="javascript:void(0)" @click="TermAdd()">确定</a>
                                    </div>
                                    <div class="semester_tab">
                                        <h4>学期列表</h4>
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <th>学期名称</th>
                                                <th>类型</th>
                                                <th>操作</th>
                                            </tr>
                                            <tr v-for="(item,index) in sterlist" :key="index">
                                                <td>{{item.termName}}</td>
                                                <td>自定义</td>
                                                <td><a ondragstart="return false" href="javascript:void(0)" @click="funDelTerm(item.id)">删除</a></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="clear"></div>
                        </div>
                        <div class="open_course">
                            <h3>开设课程：</h3>
                            <div class="list">
                                <ul>
                                    <li 
                                    v-for="(item,index) in authorizedCourses" 
                                    :key="index" 
                                    :class="item.check || item.checked?'on':''"  
                                    @click="item.check = !item.check">
                                        <div class="img">
                                            <img :src="item.thumb" />
                                            <label></label>
                                        </div>
                                        <div class="web">
                                            <h4>{{item.courseName}}</h4>
                                            <p>{{item.teacherName}}</p>
                                        </div>
                                    </li>
                                </ul>
                                <div class="clear"></div>
                            </div>
                        </div>
                        <div class="mod_btn">
                            <a ondragstart="return false" class="a1" href="javascript:void(0)" @click="CourseAccredit">确定</a><a ondragstart="return false" href="javascript:void(0)" @click="close()">取消</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ["showKkgl","semesterList","cname","onsubmit","ongetindex"],
  components: {},
  data() {
    return {
			authorizedCourses:[],//课程
      addsemester: [], //学期列表
      selAll:false,
      dropShow:false,
      cdropShow:false,
      content:'',
      sterlist:[],
      termcourse:[],
      kkglcname:{},
      termid:0,
      arr1:[]
    };
  },
  watch:{
    semesterList:function(newVal,oldVal){
      this.sterlist = newVal
    },
    cname:function(newVal,oldVal){
      this.kkglcname=newVal
    },
    termId:function(newVal,oldVal){
      this.termid=newVal
    },
    termCourse:function(newVal,oldVal){
      this.termcourse=newVal
    },
    showKkgl:function(newVal,oldVal){
      this.CourseAccreditList()
    },
  },
  mounted() {
    const that = this
    that.sterlist = that.semesterList
  },
  methods: {
    fundropShow(){
      const that = this
      that.dropShow = false
      that.content=""
    },
    close() {
      this.$emit("update:showKkgl", false);
    },
    showToggle() {
      this.cdropShow = !this.cdropShow;
    },
    //学期列表
    funGetIndex(){
      const that = this
      this.utils.api.GetIndex().then(res =>{
        if(res.code==20200){
          that.sterlist = res.data
          if(res.data.length > 0){
            that.kkglcname = that.sterlist[0]
          }else{
            that.kkglcname ={
              id:0,
              termName:'',
            }
          }
        }else{
          that.$message.error(res.msg)
        }
      })
    },
    //添加学期
    TermAdd(){
      const that = this
      if(!that.content){
        that.$message.error('请输入添加的学期名')
        return false;
      }
      let params = {
        termName:that.content
      }
      this.utils.api.TermAdd(params).then(res =>{
        if(res.code==20200){
          that.content=''
          that.$message.success('添加成功！')
          that.funGetIndex()
          that.ongetindex()
        }else{
          that.$message.error(res.msg)
        }
      })
    },
    //删除学期
    funDelTerm(tid){
      const that = this
      let params = {
        termId:tid,
      }
      this.utils.api.Remove(params).then(res =>{
        if(res.code==20200){
          that.$message.success('删除成功！')
          that.funGetIndex()
          that.ongetindex()
        }else{
          that.$message.error(res.msg)
        }
      })
    },
    //学校已授权课程列表
    CourseAccreditList(){
      const that = this
      this.utils.api.CourseAccreditList().then(res => {
        if(res.code == 20200){
          let arr=[]
          that.arr1 = that.$store.getters.termCourse
          for(let i=0;i<that.arr1.length;i++){
            arr.push(that.arr1[i].courseId)
          }
          for(let i=0;i<res.data.list.length;i++){
            if(arr.indexOf(res.data.list[i].courseId)>-1){
              res.data.list[i].check=true
              res.data.list[i].checked=true
            }else{
              res.data.list[i].check=false
            }
          }
          that.authorizedCourses = res.data.list//学校已授权课程
        }else{
          that.$message.error(res.msg)
        }
      })
    },
    //选择学期重新加载
    fungetRate(tid, tname) {
      const that = this;
      that.termid = tid
      that.TermCourseList()
      
      that.cname.termName = tname;
      that.cname.id=tid;
      this.cdropShow = !this.cdropShow;
    },
    //学期选课课程列表
    TermCourseList(){
      const that = this
      let params = {
        termId:that.termid
      }
      this.utils.api.TermCourseList(params).then(res => {
          if (res.code == 20200) {
            that.termcourse = res.data.list;
            that.$store.commit('setTermCourse',that.termcourse)
            that.CourseAccreditList();
          } else {
          that.$message.error(res.msg);
        }
      });
    },
    //学期课程授权
    CourseAccredit(){
      const that = this
      if(that.termid==0){
        that.termid = that.$store.getters.termId
      }
      let cidlist=[]
      for(let i=0;i<that.authorizedCourses.length;i++){
        if(!that.authorizedCourses[i].checked){
          if(that.authorizedCourses[i].check){
            cidlist.push(that.authorizedCourses[i].courseId)
          }
        }
      }
      if(cidlist.length < 1){
        that.$message.error('请选择需要添加的课程！')
        return false;
      }
      let params = {
        termId : that.termid,
        courseIds:cidlist
      }
      
      this.utils.api.CourseAccredit(params).then(res => {
        if(res.code == 20200){
          that.close();
          that.$message.success('课程添加成功！')
          that.onsubmit()
        }else{
          that.$message.error(res.msg)
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
