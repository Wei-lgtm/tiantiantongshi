<template>
<div>
    <Header/>
  <div class="mainer">
    <div class="wrap">
      <LeftNav />
      <div class="page_right">
        <div class="page_tit">
          <h3>机构设置</h3>
        </div>
        <div class="mechanism">
          <div class="img">
            <img :src="userinfo.logo?userinfo.logo:defImg">
            <!-- <img src="@/assets/img/img7.png" /> -->
          </div>
          <div class="web">
            <div class="list">
              <!-- <p>学校logo：<img src="@/assets/img/img8.png" /><span>请使用60*60的jpg/png格式的图片</span></p> -->

              <div class="load_web">
                学校logo：
                <el-upload
                  class="avatar-uploader"
                  action
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span>请使用60*60的jpg/png格式的图片</span>
              </div>
            </div>
            <div class="list">
              <p>
                学校名称：
                <input type="text" v-model="schollName">
              </p>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="mechanism_btn">
          <a ondragstart="return false" href="javascript:void(0)" @click="SchoolEdit">确认</a>
          <a ondragstart="return false" class="a1" href="javascript:void(0)" @click="remove">取消</a>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</div>
</template>
<script>
import Header from "@/components/Header";
import LeftNav from "@/components/left_nav";
export default {
  components: {
    Header,
    LeftNav
  },
  data() {
    return {
      userinfo: [], //教师信息
      schollName: "",
      defImg: require("../assets/img/img7.png"),
      imageUrl: "",
      upimg:'',
      filelist:[],
      
    };
  },
  mounted() {
    const that = this;
    that.GetLoginUserInfo();
  },
  methods: {
    //获取登录用户关联的教师信息
    GetLoginUserInfo() {
      const that = this;
      this.utils.api.GetLoginUserInfo().then(res => {
        if (res.code == 20200) {
          that.userinfo = res.data;
          that.schollName = res.data.schoolName;
          that.$store.commit("setUser", res.data);
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
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const that = this
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // return isJPG && isLt2M;
      var fd = new FormData()
      fd.append("fileName",file);
      this.utils.api.Upimages(fd).then(res => {
        if(res.code == 20200){
          that.upimg = res.data.url
        }
      })
    },
    SchoolEdit(){
      const that = this
      if(!that.schollName){
         that.$message.error('请填写学校名称！')
        return false;
       }
       if(!that.upimg){
         that.$message.error('请选择上传图片！')
         return false;
       }
      let params = {
        schoolName:that.schollName,
        logo:that.upimg
      }
      this.utils.api.SchoolEdit(params).then(res => {
        if(res.code == 20200){
          that.$message.success('上传成功！')
          that.GetLoginUserInfo();
        }else{
          that.$message.error(res.msg)
        }
      })
    },
    remove(){
      const that = this
      that.imageUrl=''
      that.upimg=''
      that.GetLoginUserInfo()
    }
  },
  head() {
    return {
      title: "天天通识-学校设置"
    };
  }
};
</script>
<style lang="scss" scoped>
.load_web {
  line-height: 36px;
  font-size: 16px;
  & /deep/ .avatar-uploader {
    display: inline-block;
    width: 90px;
    height: 90px;
    vertical-align: top;
    overflow: hidden;
    background: url("~assets/img/img8.png") no-repeat center center;
    cursor: pointer;
    .el-upload{
      width: 90px;
      height: 90px;
    }
    i::before {
      content: "";
    }
    img{
      height: 90px;
      width: 90px;
    }
  }
  span {
    font-size: 14px;
    color: #b7c9dc;
    display: inline-block;
    vertical-align: bottom;
    margin-left: 10px;
  }
}
</style>

