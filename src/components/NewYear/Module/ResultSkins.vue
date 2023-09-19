<template>
  <div class="result-show" :class="{'show': show}">
    <div class="content">
      <div class="skins-content">
        <div class="year-item">
          <div align="center">
            <img :src="imgHost(skins.img)" alt="">
          </div>
          <p>
            <i v-show="skins.type === 0" class="iconfont icon-icon_diamond1"></i>
            {{ skins.state }}
          </p>
          <p class="sk-name">{{ skins.name.split('|')[0] }}</p>
          <p class="sk-name">{{ skins.name.split('|')[1] ? skins.name.split('|')[1] : '' }}</p>
        </div>
        <div class="invite-frd btn-com cursor war-hover" @click="show = false">
          <img src="../../../assets/image/newyear/closebtn.png" alt="">
          <span> 关闭弹窗</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ResultSkins",
    props: {
      value: {
        default: false,
        type: Boolean
      }
    },
    data() {
      return {
        show: false,
        skins: {name: '', state: ''},
      }
    }
  }
</script>

<style scoped lang="less">
  .invite-frd{
    width: fit-content;
    padding: 10px 40px;
    background: url("../../../assets/image/newyear/btnbgs.png") no-repeat top center / 100% 100%;
    margin: 20px auto 20px;
    display: flex;
    align-items: center;

    > span{
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #FFDE00;
    }

    img{
      width: 30px;
      margin-right: 10px;
    }
  }

  .result-show{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    overflow-y: auto;
    transition: opacity .3s ease-in-out .2s;

  }

  .result-show.show{
    visibility: visible;
    z-index: 999;
    opacity: 1;
    background:  url('../../../assets/image/newyear/resultlight.png')  rgba(0, 0, 0, .7) no-repeat center 90% / 50%;
  }

  .result-show.show .content{
    transition: transform .4s ease-in-out;
    transform: translate(-50%, -50%) scale(1);
  }

  .content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    padding: 20px;
  }

  .skins-content{
    width: 335px;
    height: 467px;
    margin: auto;
    padding-top: 75px;
    background: url("../../../assets/image/newyear/resultbg.png") no-repeat center center / contain;
    box-shadow: 0px -3px 89px 0px rgba(0,0,0,0.28);

    .sk-name{
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #FFDDC6;
      line-height: 25px;
      opacity: 0.8;
      width: fit-content;
      margin: auto;
    }

    p:nth-of-type(2){
      margin-top: 10px;
    }

    p:nth-of-type(1){
      font-size: 23px;
      font-family: FZLanTingHei-B-GBK;
      color: #FED90A;
      line-height: 27px;
      font-weight: bold;
      text-align: center;
      margin-top: 4px;
      i{
        color: #FED90A;
        font-size: 23px;
      }
    }


  }


  .year-item{
    > div:nth-of-type(1){
      width: 200px;
      height: 200px;
      margin: 0 auto 10px;
      font-size: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 90%;
      }
    }
  }

  .war-hover{
    width: 200px;
  }

  @media screen and (max-width: 800px){
    .year-item{
      padding-top: 25px;

      > div:nth-of-type(1){
        width: 150px;
        height: 130px;
        margin-bottom: 50px;
      }
    }

    .content{
      width: 100%;
      height: auto;
      padding: 23% 20px 20px 20px;
      background-size: 130%;
      background-position: top center;
    }

    .skins-content{
      width: 98%;
      padding-top: 50px;

      p{
        font-size: 13px;
        line-height: 14px;
      }

      p:nth-of-type(3){
        font-size: 15px;
        margin-top: 10px;
      }
    }
  }
</style>xx
