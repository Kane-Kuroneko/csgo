<template>
  <div class="hash-content" style="overflow: hidden">
    <div class="layout mar-auto casebattle-bg">
      <Title name="公平性游戏"></Title>
      <div class="screening">
        <div class="default-btn type-btn" :class="{'active': kind === 1}" @click="kind = 1">HASH算法</div>
        <div class="default-btn type-btn" :class="{'active': kind === 2}" @click="kind = 2">种子设置</div>
        <div class="default-btn type-btn" :class="{'active': kind === 3}" @click="kind = 3">如何验证</div>
      </div>
      <div v-show="kind === 1">
        <div class="hash-title">
          <span>1</span>
          Hash算法是一种无法逆向计算的算法
        </div>
        <div align="center" class="img-content">
          <img src="../assets/image/hashmath.png" alt="">
        </div>
        <div class="hash-title" style="margin: 100px 0 50px 0">
          <span>2</span>
          我们基于Hash算法来保证游戏的绝对公平
        </div>
        <div class="hash-math-tips">
          <div style="display: flex">
            <div><p>1</p></div>
            <div>服务器种子会在每一轮游戏开始前随机生成，同时我们会把服务器种子的Hash值提供出来公示公证，以保证我们无法在游戏开始之后更改游戏结果。</div>
          </div>
          <div style="display: flex">
            <div><p>2</p></div>
            <div>
              您也需要提供一个用户种子，每一轮游戏开始前您可以任意修改您的用户种子，以保证我们无法提前预知游戏结果。
            </div>
          </div>
          <div style="display: flex">
            <div><p>3</p></div>
            <div>
              确认开始游戏后，我们将对服务器种子和用户种子进行共同Hash计算，以得到决定最终游戏结果的结果Hash值。
            </div>
          </div>
        </div>
        <div align="center" class="img-content">
          <img src="../assets/image/hashmath2.png" v-if="!isPhone" alt="">
          <img src="../assets/image/hash/hashmath2m.png" v-else alt="">
        </div>
        <div class="hash-title" style="margin: 100px 0 50px 0">
          <span>3</span>
          公平游戏Hash原理
        </div>
        <div align="center" class="img-content">
          <img src="../assets/image/hashmath3.png" v-if="!isPhone" alt="">
          <img src="../assets/image/hash/hashmath3.png" v-else alt="">
        </div>
      </div>
      <div v-show="kind === 2">
        <div class="hash-math-tips">
          <div style="display: flex">
            <div><p>1</p></div>
            <div> 97hash开创了一种公平的Hash玩法，游戏的最终结果将由用户提供的种子和服务器种子共同决定。</div>
          </div>
          <div style="display: flex">
            <div><p>2</p></div>
            <div>注册登录后，我们会为您随机生成一组用户种子，您也可以在<span class="important-tips">个人中心-账号设置</span>
              中更改您的种子，为了方便您管理自己的种子，您设置的种子将用于所
              有需要Hash算法的游戏。当然，在游戏开始前，您也可以在<span class="important-tips">游戏页面的修改种子</span>中修改你的种子
            </div>
          </div>
        </div>
        <div>
          <p class="title-mid">个人中心-账号设置更改种子</p>
          <div align="center" class="img-content" style="margin: 0 0 80px 0">
            <img src="../assets/image/hash/changeseed.png" v-if="!isPhone" alt="">
            <img src="../assets/image/hash/changeseed.png" v-else alt="">
          </div>
        </div>
        <div>
          <p class="title-mid">游戏页面修改种子</p>
          <div align="center" class="img-content" style="margin: 0 0 50px 0">
            <img src="../assets/image/gameseed.png" v-if="!isPhone" alt="">
            <img src="../assets/image/hash/gameseed.png" v-else alt="">
          </div>
        </div>
      </div>
      <div v-show="kind === 3">
        <div class="hash-title">
          <span>1</span>
          验证游戏公平性的方法
        </div>
        <div class="hash-math-tips">
          <div style="display: flex">
            <div><p>1</p></div>
            <div>
              验证服务器种子经过Hash函数计算后，是否与游戏开始前网站所有给出的服务器种子Hash值一致。
            </div>

          </div>
          <div style="display: flex">
            <div><p>2</p></div>
            <div>
              提取用户种子和服务器种子按照游戏Hash原理步骤依次计算后。查看结果Number是否与网站给出的结果一致。
            </div>

          </div>
          <div>
            <div> 验证Hash的参考网页链接：<a href="https://emn178.github.io/online-tools/sha256.html" target="_blank"
                                   class="important-tips">https://emn178.github.io/online-tools/sha256.html</a>
            </div>
            <div> 验证16进制的参考网页链接：<a href="https://tool.oschina.net/hexconvert/" target="_blank" class="important-tips">https://tool.oschina.net/hexconvert/</a>
            </div>
          </div>
        </div>
        <div class="hash-title">
          <span>2</span>
          验证方法举例
          <p style="font-size: 15px;margin-top: 20px">以Hash箱子为例（升级和对战游戏的验证方法同理）</p>
        </div>
        <div align="center" style="margin: 0">
          <img  src="../assets/image/ones.png" alt="" class="step-num step-img">
        </div>
        <div>
          <p style="text-align: center;font-size: 18px;">游戏开始前，复制当前游戏网站提供的服务器种子Hash值</p>
          <p style="text-align: center;font-size: 18px;"> 例子中值为 <span style="color: #12f6e4">14a22bd5a39cf1b7fc66a9625f45b61d3fd4173c70274aa13e64b1bc9a73fe8d</span>
          </p>
          <div align="center" class="img-content" style="margin: 0 0 80px 0">
            <img src="../assets/image/changeseed.png" alt="">
          </div>
        </div>

        <div align="center" style="margin: 0">
          <img src="../assets/image/twos.png" alt="" class="step-num step-img">
        </div>
        <div>
          <p class="how-title">游戏结束后，提取游戏结果中的服务器种子</p>
          <p class="how-title"> 通过计算Hash的参考网站，查看服务器种子的Hash计算结果是否与游戏开始前一致</p>
          <p class="how-title"> 例子中服务器种子为 <span style="color: #12f6e4">3WMKN9IVUG4CJ9BU</span>
            ，经过计算结果与网站一致</p>

          <div align="center" class="img-content" style="margin: 0 ">
            <img src="../assets/image/twosone.png" alt="">
          </div>
          <div align="center" class="img-content" style="margin: 0 0 80px 0">
            <img src="../assets/image/twover.png" alt="">
          </div>
        </div>

        <div align="center" style="margin: 0">
          <img src="../assets/image/threes.png" alt="" class="step-num step-img">
        </div>

        <div>
          <p class="how-title">提取用户种子和服务器种子按照游戏Hash原理步骤计算出结果种子Hash值 </p>
          <p class="how-title">例子中用户种子为<span class="span-color">97hash</span>，服务器种子为<span class="span-color">3WMKN9IVUG4CJ9BU</span>
          </p>
          <p style="text-align: center;font-size: 18px;">经过计算结果为 <span class="span-color">6c1669b99bb6decc198678b6c26fe8440397c5d52c22bc57b8942ef576ac47cf</span>，与网站一致
          </p>
          <div align="center" class="img-content" style="margin: 0 0 80px 0">
            <img src="../assets/image/threever.png" alt="">
          </div>
        </div>
        <div align="center"  style="margin: 0">
          <img src="../assets/image/fouts.png" alt="" class="step-img step-num">
        </div>
        <div>
          <p class="how-title">提取结果Hash值按照游戏Hash原理的步骤，通过16进制转换为10进制计算出结果Number </p>
          <p style="text-align: center;font-size: 18px;">例子中结果Hash值为<span class="span-color">6c1669b99bb6decc198678b6c26fe8440397c5d52c22bc57b8942ef576ac47cf</span>
          </p>
          <p class="how-title">取其前6位字符串为 <span class="span-color">d8640f</span>
            ，通过16进制转换为10进制为 <span class="span-color">6c1669</span>，除以16进制（ffffff）的固定值
            <span class="span-color">16777215</span></p>
          <p class="how-title">经过计算结果<span class="span-color">Number≈0.42221697701316934902485305219013</span>,与网站一致</p>
          <div align="center" class="img-content" style="margin: 0">
            <img src="../assets/image/jisuanone.png" alt="">
          </div>
          <div align="center" class="img-content" style="margin: 0 0 80px 0">
            <img src="../assets/image/jisuantwo.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getAction} from "../api/manage";
import Title from "../components/Title";

export default {
  name: 'instructions',
  components: {Title},
  data() {
    return {
      kind: 1,
      isPhone: document.body.clientWidth > 750 ? false : true
    }
  },
}
</script>

<style scoped lang="less">
.step-num {
  width: 8%;
}

.how-title {
  text-align: center;
  font-size: 18px;
}

.title-mid {
  text-align: center;
  font-size: 25px;
}

.hash-content {
  width: 80%;
  margin: auto;

  //img {
  //  width: 80%;
  //}
}

.span-color {
  color: #12f6e4
}

.img-content {
  margin: 80px 0;

  > img {
    width: 100%;
  }
}

.step-img {
  width: 8%;
  margin-bottom: 20px;
}

.hash-title {
  font-size: 28px;
  font-weight: 600;
  overflow: hidden;
  color: #FFFFFE;
  text-align: center;
  margin: 50px 0;

  > span {
    font-size: 25px;
    display: inline-block;
    //padding: 10px;
    line-height: 30px;
    width: 35px;
    text-align: center;
    border-radius: 50%;
    border: 2px solid #FFFFFE;
    margin-right: 15px;
  }
}

.hash-math-tips {
  background: linear-gradient(0deg, #37427C, #0B0E1A, #131834, #243173);
  padding: 30px 60px;
  border-radius: 10px;
  margin: 50px 0;

  > div {
    margin: 20px 0;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;

    p {
      font-size: 18px;
      display: inline-block;
      //padding: 10px;
      line-height: 30px;
      height: 30px;
      width: 30px;
      text-align: center;
      border-radius: 50%;
      margin-right: 10px;
      background: #2143FF;
      color: #FFFFFE;
    }
  }
}

@media screen and (max-width: 767px) {
  .hash-content {
    width: 98%;
    margin: auto;
  }

  .title-mid {
    font-size: 20px;
  }

  .step-img {
    width: 20%;
    margin-bottom: 10px;
  }

  .hash-title {
    font-size: 18px;
    margin: 25px 0;
  }

  .hash-title > span {
    font-size: 14px;
    display: inline-block;
    line-height: 20px;
    width: 25px;
    border-radius: 50%;
    margin-right: 3px;
  }

  .img-content {
    margin: 40px 0;

    img {
      width: 95%;
    }
  }

  .hash-math-tips {
    padding: 10px;
  }

  .hash-math-tips > div {
    //text-indent: -20px;
    //margin-left: 20px;
  }

  .hash-math-tips > div p {
    line-height: 25px;
    height: 27px;
    width: 30px;
  }

  .hash-math-tips > div {
    font-size: 16px;
  }

  .img-content .step-num {
    width: 25%;
  }
}
</style>
