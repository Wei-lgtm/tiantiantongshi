<template>
    <div class="modal modal_fstz" v-if="showFstz">
        <div class="fp_modal">
            <div class="cell">
                <div class="modal_cont">
                    <div class="close" @click="close()"></div>
                    <div class="modal_tit">
                        <h3><img src="@/assets/img/icon42.png" />发送通知</h3>
                    </div>
                    <div class="mod_dcxx">
                        <div class="send_notice">
                            <div class="sel">
                                <h4>发送通知到：<span><em>选择班级</em></span></h4>
                                <div class="drop">
                                    <div class="box">
                                        <div class="sel_course">
                                            <h4>课程</h4>
                                            <div class="list">
                                                <ul>
                                                    <li>金融通识课_2019年秋季</li>
                                                    <li class="on">金融通识课_2019年秋季</li>
                                                    <li>金融通识课_2019年秋季</li>
                                                    <li>金融通识课_2019年秋季</li>
                                                    <li>金融通识课_2019年秋季</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="sel_class">
                                            <div class="top">
                                                <div class="search">
                                                    <input type="text" placeholder="查询班级" /><a href="#"></a>
                                                </div>
                                                <div class="sel_all">
                                                    <label>全部班级</label>
                                                </div>
                                            </div>
                                            <div class="list">
                                                <ul>
                                                    <li><label>19级计算机1班</label></li>
                                                    <li><label>19级计算机1班</label></li>
                                                    <li><label>19级计算机1班</label></li>
                                                    <li><label>19级计算机1班</label></li>
                                                    <li><label>19级计算机1班</label></li>
                                                    <li><label>19级计算机1班</label></li>
                                                    <li><label>19级计算机1班</label></li>
                                                    <li><label>19级计算机1班</label></li>
                                                    <li><label>19级计算机1班</label></li>
                                                    <li><label>19级计算机1班</label></li>
                                                    <li><label>19级计算机1班</label></li>
                                                    <li><label>19级计算机1班</label></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="clear"></div>
                                    </div>
                                    <div class="sel_btn">
                                        <a class="a1" href="#">确定</a><a href="#">取消</a>
                                    </div>
                                </div>
                            </div>
                            <div class="sel_yx">
                                <h4><span>已选择6个班级</span></h4>
                                <div class="list">
                                    <ul>
                                        <li>19级计算机1班</li>
                                        <li>19级计算机1班</li>
                                        <li>19级计算机1班</li>
                                        <li>19级计算机1班</li>
                                        <li>19级计算机1班</li>
                                    </ul>
                                    <div class="clear"></div>
                                </div>
                            </div>
                        </div>
                        <div class="tab">
                            <div class="list">
                                <span>请输入通知标题</span>
                                <input type="text" />
                            </div>
                            <div class="list">
                                <span>请输入通知内容</span>
                                <textarea></textarea>
                            </div>
                            <div class="mod_btn">
                                <a class="a1" href="#">发送通知</a><a href="#">取消</a>
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
		props:['showFstz'],
    components: {
            
    },
    data() {
      return {
          
      }
    },
    mounted() {

    },
    methods: {
			close(){
				this.$emit("update:showFstz", false);
            }
    }
  }
</script>
<style lang="scss" scoped>

</style>
