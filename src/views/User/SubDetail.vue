<template>
  <div class="container sub-detail">
    <div class="sub-list">
      <div class="sub-item" v-for="(value,key,index) in prestoreInputs">
        <span>{{indexList[index]}}分润</span>
        <!-- <p>{{item}}</p> -->
        <input type="number" v-model="prestoreInputs[key]" />
      </div>
    </div>
    <div class="btn-box">
      <div class="submit-btn" @click="submit()">完成</div>
    </div>
  </div>

</template>

<script>
let iconSuccess = require('@/assets/icon-success.png');
export default {
  data() {
    return {
      loading: false,
      finished: false,
      listData: [],
      pageNum: 0,
      pageSize: 20,
      userInfo:{
        prestoreList:[]
      },
      indexList:['他的','二级','三级','四级','五级','六级','七级','八级','九级','十级'],
      prestoreInputs:{
        prestore1:1,
        prestore2:1,
        prestore3:1,
        prestore4:1,
        prestore5:1,
        prestore6:1,
        prestore7:1,
        prestore8:1,
        prestore9:1,
      }
    }
  },
  created() {
    
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      let params = {
        token: this.$store.state.token,
        userId: this.$route.query.id
      }
      this.$http.post('subordinate/info',params).then(res=>{
        if(res.retCode ==0){
          for (const key in res.data) {
            if (res.data.hasOwnProperty(key)) {
              if(key.includes('prestore')){
                this.prestoreInputs[key] = res.data[key]
              }
            }
          }
          this.userInfo = res.data;

        }
      })
    },
    // 提交分润
    submit(){
      let params = {
        token: this.$store.state.token,
        userId: this.$route.query.id,
      }
      for (const key in this.prestoreInputs) {
        if (this.prestoreInputs.hasOwnProperty(key)) {
          params[key] = parseFloat(this.prestoreInputs[key]) || 0
        }
      }
      this.$http.post('subordinate/update',params).then(res=>{
        if(res.retCode==0){
          this.$toast({ duration: 2000, forbidClick: true,icon: iconSuccess,  message: "保存成功" });
          this.getUserInfo();
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
.sub-detail {
  padding: 30px;
  padding-bottom: 110px;
  overflow-y: auto;
  .sub-item {
    display: flex;
    height: 100px;
    background: $dark;
    align-items: center;
    border-radius: 6px;
    padding: 0 30px;
    margin-bottom: 15px;
    span {
      font-size: 24px;
      flex: 1;
    }
    input {
      border: 2px solid $yellow;
      font-size: 24px;
      color: $yellow;
      height: 60px;
      line-height: 60px;
      width: 120px;
      border-radius: 6px;
      text-align: center;
    }
  }
  .btn-box {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #181819;
    padding: 30px 30px;
    z-index: 9;
    .submit-btn {
      background: $yellow;
      font-size: 24px;
      text-align: center;
      height: 80px;
      line-height: 80px;
      color: $black;
      font-weight: bold;
      border-radius: 10px;
    }
  }
}
</style>