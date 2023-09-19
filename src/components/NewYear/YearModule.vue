<template>
  <div class="hash-module " :class="{'show':isShow}">
    <div class="hash-box" :class="{origion, 'show': isShow}" :style="{'width':  width + 'px'}">
      <div class="hash-header">
        <div class="hash-title" align="center" style="font-size: 0">
          <div class="title" align="center">
            <slot name="title"></slot>
          </div>
          <img src="../../assets/image/newyear/mdutop.png" alt="" style="width: 100%">
        </div>
        <img src="../../assets/image/newyear/close.png" @click="closeModule" alt="">
      </div>
      <div class="hash-content">
        <div>
          <slot name="content"></slot>
        </div>
      </div>
      <div style="font-size: 0">
        <img src="../../assets/image/newyear/moubot.png" alt="" style="width: 100%">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "YearModule",
    inheritAttrs: false,
    props: {
      value: {
        type: Boolean,
      },
      origion: {
        default: '',
        type: String
      },
      width: {
        default: 850,
      }
    },
    watch: {
      value(nv) {
        this.isShow = nv
      }
    },
    data() {
      return {
        isShow: this.value,
      }
    },
    methods: {
      closeModule() {
        this.$emit("input", false)
      }
    }
  }
</script>

<style scoped lang="less">
  .hash-module{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    opacity: 0;
    align-items: center;
    visibility: hidden;
    overflow-y: auto;
    transition: all .4s ease-in-out .2s;

  }

  .hash-module.show{
    opacity: 1;
    visibility: visible;
    z-index: 999;
  }

  .hash-module.show .hash-box{
    transform: scale(1);
  }

  .hash-box{
    box-shadow: 0 1px 50px 0 rgba(0, 0, 0, 0.9);
    font-size: .22rem;
    transform: scale(0);
    color: #fff;
    margin: 0 auto;
    background-size: contain;
    position: relative;
  }

  .hash-header{
    padding: 10px 15px 0 0;
    position: relative;

    .hash-title{
      text-align: center;
      font-family: 'PingFang SC';
      font-weight: bold;
      letter-spacing: 2px;
      position: relative;

      .title{
        background: url('../../assets/image/newyear/titlebg.png') no-repeat center top / 90%;
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        width: 250px;
        padding: 20px 0 30px 0;

        img:nth-child(1){
          width: 77%;
          transform: translateY(-10px);
        }
      }

      > img{
        transform: translateY(3px);
        width: 29%;
      }
    }

    > img{
      position: absolute;
      right: -2.5%;
      top: -20%;
      cursor: pointer;
      width: 10%;
      transition: all .3s ease-in-out;
      opacity: .9;

      &:hover{
        opacity: 1;
      }
    }
  }

  .hash-content{
    > div{
      width: 88%;
      margin: auto;
      padding: 40px 0 15px 0;
      overflow-y: auto;
      max-height: 700px;
    }

    background: url('../../assets/image/newyear/pupbg.png') center center / 100%;
  }

  @media screen and (max-width: 767px){
    .hash-box{
      width: 94% !important;
    }

    .hash-content{
      padding: 50px 10px 10px 10px;
      max-height: 450px;
      overflow: auto;

      > div{
        padding: 0 0 15px 0;
      }
    }

    .hash-header{
      img{
        top: 0;
        width: 16%;
      }

      .hash-title{
        .title{
          img{
            width: 28%;
          }
        }
      }
    }
  }

</style>
