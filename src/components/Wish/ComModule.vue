<template>
  <div class="wish-module " :class="{'show': show}">
    <div class="wish-content">
      <div class="close" @click="closeModule">
        <i class="iconfont icon-icon-close"></i>
      </div>
      <div>
        <div class="wish-title">
          <div>
            {{ title }}
          </div>
        </div>
        <div class="wish-contanier">
          <div class="wish-contanier-inside">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "WishModule",
  inheritAttrs: false,
  props: {
    title: {
      type: String,
    },
    value: {
      type: Boolean
    }
  },
  data() {
    return {
      show: this.value,
    }
  },
  watch: {
    value(nv, ov) {
      this.show = nv
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

.wish-module {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  opacity: 0;
  overflow-y: auto;
  transition: all .2s ease-in-out .2s;
}

.wish-content {
  width: 585px;
  height: 400px;
  position: relative;

  .close {
    height: 28px;
    width: 28px;
    border: 2px solid;
    border-image: linear-gradient(180deg, #4CB7E4, #2A83E3) 2 2;
    box-shadow: 0px 1px 18px 2px rgba(37, 227, 255, 0.5), 0px 18px 58px 2px rgba(18, 43, 108, 0.7);
    position: absolute;
    top: 5%;
    transform: rotate(45deg);
    right: -6%;
    text-align: center;
    cursor: pointer;

    i {
      display: inline-block;
      color: #FFFFFE;
      font-size: 13px;
      line-height: 20px;
      transform: rotate(-45deg);
    }
  }
}

.wish-module.show {
  opacity: 1;
  visibility: visible;
  z-index: 999;
}

.wish-title {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-around;

  div {
    display: inline-block;
    font-size: 26px;
    font-weight: 500;
    color: #FFF9F9;
    text-align: center;
    padding: 10px 50px;
    width: 60%;
    background: url("../../assets/image/wish/wishtitle.png") no-repeat center center / 100%;
  }

}

.wish-contanier {
  width: 600px;
  border: 2px solid;
  padding: 2px;
  background: linear-gradient(180deg, #4CB7E4, #2A83E3);
  box-shadow: 0px 1px 18px 2px rgba(37, 227, 255, 0.9), 0px 18px 58px 2px rgba(18, 43, 108, 0.7);
  -webkit-clip-path: polygon(2% 0%, 97% 0%, 99% 4%, 99% 94%, 97% 99%, 3% 98%, 0% 94%, 0% 6%);
  clip-path: polygon(2% 0%, 97% 0%, 99% 4%, 99% 94%, 97% 99%, 3% 98%, 0% 94%, 0% 6%);
  margin-top: -20px;

  .wish-contanier-inside {
    padding: 30px 28px 28px 28px;
    height: 100%;
    width: 100%;
    background: black;
    -webkit-clip-path: polygon(2% 0%, 97% 0%, 99% 4%, 99% 94%, 97% 99%, 3% 98%, 0% 94%, 0% 6%);
    clip-path: polygon(2% 0%, 97% 0%, 99% 4%, 99% 94%, 97% 99%, 3% 98%, 0% 94%, 0% 6%);
    box-shadow: 0px 1px 18px 2px rgba(37, 227, 255, 0.5), 0px 18px 58px 2px rgba(18, 43, 108, 0.7) inset;
  }
}

@media screen and (max-width: 767px) {
  .wish-content {
    width: 85%;

    .close {
      width: 20px;
      height: 20px;
      right: -4%;
      top: 4%;
      transform: rotate(54deg);
      i {
        font-size: 12px;
        line-height: normal;
        transform: scale(.7) rotate(-54deg);
      }
    }
  }

  .wish-contanier {
    width: 100%;
    -webkit-clip-path: polygon(5% 0%, 95% 0%, 99% 5%, 99% 95%, 95% 99%, 5% 99%, 0% 95%, 0% 5%);
    clip-path: polygon(5% 0%, 95% 0%, 99% 5%, 99% 95%, 95% 99%, 5% 99%, 0% 95%, 0% 5%);
    padding: 1px;

    .wish-contanier-inside {
      padding: 30px 10px 20px 10px;
      -webkit-clip-path: polygon(5% 0%, 95% 0%, 99% 5%, 99% 95%, 95% 99%, 5% 99%, 0% 95%, 0% 5%);
      clip-path: polygon(5% 0%, 95% 0%, 99% 5%, 99% 95%, 95% 99%, 5% 99%, 0% 95%, 0% 5%);
    }
  }

  .how-tips {
    font-size: 14px !important;
  }

  .hope-btn {
    width: 110px !important;
  }

  .hope-btn > div {
    text-align: center;
    padding: 4px 20px;
    font-size: 14px;
  }

  .wish-title div {
    font-size: 16px;
    font-weight: bolder;
    padding: 10px 20px;
  }

}
</style>