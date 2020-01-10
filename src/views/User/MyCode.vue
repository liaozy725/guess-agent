<template>
  <div class="my-code">
    <div class="dom-box" ref="domBox" v-if="!imgUrl">
      <img src="../../assets/login-logo2.png" alt="" class="logo">
      <img src="../../assets/code-font.png" alt="" class="code-font">
      <div class="code-main">
        <div id="code"></div>
        <p>扫一扫该二维码，即刻加入</p>
      </div>
    </div>
    <div v-else class="canvas-box" ref='canvasBox'>
      <img :src="imgUrl" alt="">
    </div>
    <p class="prompting">长按保存到手机</p>
  </div>
</template>

<script>
import QRCode from "qrcodejs2"
import html2canvas from 'html2canvas'
import { getEleWidth } from '@/utils/utils'
export default {
  data() {
    return {
      imgUrl: ''
    }
  },
  created(){
    this.$store.commit("setPageTitle", "我的推广二维码");
  },
  mounted() {
    let link = window.g.guessH5Link +'#/login?code=' + this.$route.query.code;
    this.initCode(link)
  },
  methods: {
    // 生成二维码
    initCode(link) {
      this.$nextTick(() => {
        let qrcode = new QRCode('code', {
          width: getEleWidth(300),
          height: getEleWidth(300),
          text: link,
        })
        setTimeout(()=>{
          this.domToCanvas()
        },500)
      })
    },
    domToCanvas() {
      this.$nextTick(() => {
        html2canvas(this.$refs.domBox, {
          backgroundColor: null
        }).then(canvas => {
          let dataURL = canvas.toDataURL("image/png");
          this.imgUrl = dataURL
        })
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.my-code{
  height: 100%;
  .dom-box{
    background: url(~@/assets/login-bg.png) no-repeat;
    background-size: contain;
    height: 100%;
    padding-top: 30px;
    text-align: center;
    .logo{
      width: 300px;
      margin-bottom: 20px;
    }
    .code-font{
      width: 440px;
      display: block;
      margin: 0 auto 50px;
    }
    .code-main{
      text-align: center;
      background: #fff;
      padding: 30px;
      border-radius: 10px;
      display: block;
      width: 400px;
      text-align: center;
      margin: 0 auto;
      #code{
        text-align: center;
        width: 300px;
        height: 300px;
        overflow: hidden;
        margin: 0 auto;
      }
      p{
        font-size: 26px;
        color: #000;
        margin-top: 20px;
      }
    }
  }
  .canvas-box{
    img{
      width: 100%;
    }
  }
  .prompting{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 28px;
    color: #ccc;
    line-height: 120px;
  }
}

</style>