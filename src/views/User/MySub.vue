<template>
  <div class="container my-sub">
    <p class="sub-title">我的直接下属</p>
    <van-list class="sub-list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
      <div class="sub-item" v-for="(item,index) in listData" @click="jumpLink(item)">
        <span>{{item.userNick}}</span>
        <img src="../../assets/icon-down.png" alt="">
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      listData: [],
      pageNum: 0,
      pageSize: 20,
    }
  },
  created(){
    this.$store.commit("setPageTitle","设置");
  },
  methods: {
    // 获取列表
    getList() {
      this.loading = true;
      var params = {
        token: this.$store.state.token,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      }
      this.$http.post('subordinate/list',params).then(res=>{
        this.loading = false;
        if(res.retCode==0){
          this.listData = this.listData.concat(res.data);
          this.pageNum++;
          if (res.data.length < this.pageSize) {
            this.finished = true;
          }
        }
      })
    },
    // 跳转详情
    jumpLink(item){
      this.$router.push({
        path:'/layout/SubDetail',
        query:{
          id:item.userId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
.my-sub {
  padding: 30px;
  .sub-title {
    font-size: 24px;
  }
  .sub-list {
    margin-top: 30px;
    .sub-item {
      display: flex;
      height: 100px;
      background: $dark;
      align-items: center;
      border-radius: 6px;
      padding: 0 30px;
      margin-top: 15px;
      span {
        font-size: 24px;
        flex: 1;
      }
      img {
        width: 24px;
        transform: rotateZ(-90deg);
      }
    }
  }
}
</style>