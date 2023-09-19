<template>
  <div class="layout">
    <Title name="饰品升级"></Title>
    <nav class="nav-up-user">
      <div class="go-back war-hover" v-if="!isPhone">
        <img src="../../assets/image/upgrade/Hall/goback.png" @click="$router.push('/page/upgradeHall')" alt="" style="width: 100%">
      </div>
      <div class="likes-box">
        <div>
          <div class="name-sy">{{userInfo.name}} <span>的升级故事</span></div>
          <div class="likes-item">
            <div class="war-hover" @click="thumbStory"><i class="iconfont icon-icon_praise"></i> <span> {{!storyArr.status ? '故事点赞' : '已点赞'}}</span>
            </div>
            <div class="war-hover" @click="copy(storyLink)"><i class="iconfont icon-icon-link"></i>
              <span> 复制故事链接</span></div>
            <div class="war-hover" @click="$router.push(`/upgrade/userInfo/${userInfo.userId}`)"><i
                class="iconfont icon-icon_view1"></i> <span> 查看个人信息</span></div>
          </div>
        </div>
        <div class="likes-ava" align="center">
          <img :src="imgHost(userInfo.avatar)" alt="">
        </div>
      </div>
    </nav>
    <div class="sy-box">
      <div class="sy-list">
        <div class="sy-name" :style="{background: colorRgba('#'+userInfo.color,.4)}">
          <img :src="imgHost(userInfo.emoteIcon)" alt="">
          <div :title="userInfo.storyName" class="sy-text over-flow-hide">{{userInfo.storyName}}</div>
          <div class="likes"
               :style="{'background-image':`url(${imgHost(userInfo.giveALikeIcon)})`}">
            <p>{{userInfo.thumbsUpNumber}}</p>
          </div>
        </div>
        <ul>
          <li v-for="(el,idx) in storyArr.list" @click="el.videoSource ? choseVideo(el) : ''" :class="[{'video-active':el.index === videoActive.index&& el.videoSource}, {'cursor': el.videoSource}] ">
            <div :class="{'success':!el.result}">
              <div class="up-skins">
                <div class="skins-value">
                  <div align="center">
                    <img :src="imgHost(el.consumeSkinsImage)" alt="" v-if="el.consumeSkinsImage"
                         style="aspect-ratio: 1.4">
                    <img src="../../assets/image/upgrade/Hall/diamond.png" style="width: 65px" v-else alt="">
                  </div>
                  <div><i v-if="el.consumeSkinsPrice !== 0" class="iconfont icon-icon_diamond1"></i><span> {{el.consumeSkinsPrice === 0 ? el.deviationAmount : el.consumeSkinsPrice}}</span>
                  </div>
                </div>
                <div align="center" class="point-color">
                  <img src="../../assets/image/upgrade/upgradeSucces.png" v-if="!el.result" alt="">
                  <img src="../../assets/image/upgrade/upgradePoint.png" v-else alt="">
                  <div :class="{'success': !el.result}">{{el.calculateBak.startSection}} -
                    {{el.calculateBak.endSection}}
                  </div>
                  <p v-if="el.deviationAmount && el.consumeSkinsPrice!==0">+ <i class="iconfont icon-icon_diamond1"></i><span> {{el.deviationAmount}}</span>
                  </p>
                </div>
                <div class="skins-value">
                  <img src="../../assets/image/upgrade/Hall/play.png" v-if="!el.targetSkinsImage" alt=""
                       class="play-img">
                  <div align="center">
                    <img v-if="el.targetSkinsImage" :src="imgHost(el.targetSkinsImage )" alt=""
                         style="aspect-ratio: 1.4">
                    <img v-else class="end-img" src="../../assets/image/upgrade/Hall/why.png" alt="">
                  </div>
                  <div><i class="iconfont icon-icon_diamond1"></i><span> {{el.targetSkinsPrice ? el.targetSkinsPrice: '???'}}</span>
                  </div>
                </div>
              </div>
              <div class="up-index">{{idx+1}}</div>
              <div class="up-hash" @click="el.isOpen = !el.isOpen">
                <i class="iconfont icon-icon_arrow" :class="{'active': el.isOpen}"></i>
              </div>
            </div>
            <div class="hash-seed" :class="{'active': el.isOpen}">
              <div class="over-flow-hide"><span>服务器种子Hash:</span> {{el.calculateBak.serverHash}}</div>
              <div class="over-flow-hide"><span>服务器种子: </span> {{el.calculateBak.serverSeed}}</div>
              <div class="over-flow-hide"><span>用户种子:</span>{{el.calculateBak.userSeed}}</div>
              <div class="over-flow-hide"><span>结果种子Hash:</span>{{el.calculateBak.resultHash}}</div>
              <div><span>Number={{el.calculateBak.resultHash.substring(0,6)}}（16进制）/ ffffff（16进制）= {{el.calculateBak.hash16}} /
                16777215 = {{el.calculateBak.number}}</span></div>
              <div class="btn-hash">
                <div class="war-hover" @click="goEmn(el.calculateBak.serverHash)">验证</div>
                <div class="war-hover" @click="go16(el.calculateBak.resultHash.substring(0,6))">16进制转换</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="!isPhone" class="sy-video">
        <div class="video-top">
          <p>观看升级故事的精彩之处</p>
          <div class="video-idx">
            <div class="idx-item" :class="{'active':item.index === videoActive.index }"
                 v-for="(item,index) in videoArr"
                 @click="choseVideo(item)">
              <div>{{item.index}}</div>
              <p>精彩之处{{index+1}}</p>
              <P>第{{item.index}}段升级记录</P>
            </div>
          </div>
        </div>
        <div class="rrweb-video">
          <img v-show="!isPlay" src="../../assets/image/upgrade/Hall/video.png" alt=""
               style="width: 100%;height: 621px" class="cursor" @click="choseVideo(videoArr[0])">
          <div id="rrweb-player" v-show="isPlay"></div>
        </div>
      </div>
    </div>
    <div class="float-btn" @click="videoShow =!videoShow" v-show="!videoShow" v-if="isPhone">
      <img src="../../assets/image/upgrade/Hall/play.png" alt="">
      <p>故事视频</p>
    </div>
    <div class="video-pup" v-show="videoShow">
      <div class="flex-item-center video-tips">
        <p>观看升级故事的精彩之处</p>
        <i class="iconfont icon-icon-close" @click="videoShow=false"></i>
      </div>
      <div class="video-top">
        <div class="video-idx">
          <div class="idx-item" :class="{'active':item.index === videoActive.index  }"
               v-for="(item,index) in videoArr"
               @click="choseVideo(item)">
            <div>{{item.index}}</div>
            <p>精彩之处{{index+1}}</p>
            <P>第{{item.index}}段升级记录</P>
          </div>
        </div>
      </div>
      <div class="video-area">
        <img v-show="!isPlay"  @click="choseVideo(videoArr[0])" src="../../assets/image/upgrade/Hall/video.png" alt=""
             style="width: 100%;">
        <div id="rrweb-player-phone" v-show="isPlay"></div>
      </div>
    </div>
  </div>
</template>

<script>

  import Title from "../Title";
  import {getAction, postAction} from "../../api/manage";
  import {url} from "../../api/upgradeApi";
  import {strToU8, unzlibSync, strFromU8} from 'fflate';
  import rrwebPlayer from 'rrweb-player/lib/index';
  import 'rrweb-player/dist/style.css';
  import {rrwebCss} from '../../utils/rrwebWebCss';

  export default {
    name: "UpgradeUserRecord",
    components: {Title},
    props: {
      id: {
        type: String
      }
    },
    created() {
      this.getStoreDetail();
    },
    data() {
      return {
        url,
        videoActive: [],
        videoArr: [],
        rrwebPlay: '',
        colorArr: [
          {}
        ],
        isPlay: false,
        videoShow: false,
        isPhone: this.$store.state.account.isPhone,
        userInfo: JSON.parse(localStorage.getItem('story')),
        storyArr: [],
        storyLink: window.location.href
      }
    },
    methods: {
      choseVideo(el) {
        this.videoActive = el;
        this.initPlay()
      },
      initPlay() {
        let that = this
        this.isPlay = true;
        let targetBox = !this.$store.state.account.isPhone ? document.querySelector('#rrweb-player') :
         document.querySelector('#rrweb-player-phone');
        let sonTargert = document.querySelector('.rr-player');
        if (sonTargert) targetBox.removeChild(sonTargert);
        let rrweb = new rrwebPlayer({
          target: targetBox,
          props: {
            events: that.videoActive.video,
            mouseTail: false,
            speedOption: [1,2]
          }
        });
      },
      unzip(compressedEvents) {
        // 将base64转成二进制字符串
        const binary = atob(JSON.parse(compressedEvents));
        // 检查是否是zlib压缩的数据，zlib header (x78), level 9 (xDA)
        if (binary.startsWith('\x78\xDA')) {
          // 将字符串转成Uint8Array
          const buffer = strToU8(binary, true)
          // 解压缩
          const unzipped = unzlibSync(buffer)
          // 将Uint8Array重新转换成字符串
          return strFromU8(unzipped)
        }
        return JSON.parse(decodeURIComponent(escape(binary)))
      },
      getStoreDetail() {
        let orderNo = this.id.substring(0, this.id.length - 1);
        let params = {index: this.id[this.id.length - 1], orderNo: orderNo};
        getAction(url.storyDetail, params).then(res => {
          res.data.list.forEach((el, idx) => {
            el.calculateBak = JSON.parse(el.calculateBak);
            el.isOpen = false;
            if (el.videoSource != null) {
              el.video = JSON.parse(this.unzip(el.videoSource));
              el.index= idx+1;
              this.videoArr.push({video: JSON.parse(this.unzip(el.videoSource)), index: idx + 1})
            }
          })
          // 将抽离的CSS文件插入回去
          // this.videoArr.forEach(item => {
          // item.video[1].data.initialOffset.top = 400
          // let arr = item.video[1].data.node.childNodes[1].childNodes[0].childNodes;
          // arr.forEach(node => {
          //   rrwebCss.forEach(el => {
          //     if (node.id === el.id) {
          //       node.childNodes[0].textContent = el.childNodes[0].textContent
          //     }
          //   })
          // })
          // item.video[1].data.node.childNodes[1].childNodes[0].childNodes = arr;
          // })
          this.videoActive = this.videoArr[0]
          console.log(this.videoActive)
          this.storyArr = res.data;
        })
      },
      thumbStory() {
        if (this.storyArr.status) return
        if (!this.$store.state.account.user.id) return this.$login();
        let orderNo = this.id.substring(0, this.id.length - 1);
        let params = {index: this.id[this.id.length - 1], orderNo: orderNo};
        postAction(url.thumbStroy, params).then(res => {
          this.$Message.success('点赞成功');
          this.storyArr.status = true;
          this.userInfo.thumbsUpNumber += 1;
        }).catch(e => {
          this.$Message.error(e.response.data.errMsg);
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .rrweb-video{
    height: 621px;
    width: 100%;
  }

  .float-btn{
    position: fixed;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    width: 125px;
    height: 40px;
    background: #121424;
    border: 1px solid rgba(107, 113, 167, 0.6);
    box-shadow: 2px 0 20px rgba(0, 0, 0, 0.58);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 15px;
    line-height: 40px;
    font-weight: 600;
    color: #FFFFFF;

    img{
      width: 21px;
    }
  }

  .video-pup{
    position: fixed;
    width: 96%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #141727;
    box-shadow: 2px 0 20px #000000;
    border-radius: 10px;
    padding: 20px 10px;

    .video-tips{
      margin-bottom: 10px;
      padding-right: 20px;

      > p{
        font-size: 14px;
      }

      i{
        font-size: 14px;
        color: #ffffff;
      }
    }

  }

  /deep/ .label.svelte-9brlez.svelte-9brlez.svelte-9brlez{
    color: #ffffff;
  }

  /deep/ .rr-timeline__time.svelte-19ke1iv.svelte-19ke1iv{
    color: #ffffff;
  }

  /deep/ .rr-player{
    width: 100% !important;
    background: none;

    svg{
      fill: #FFFFFE;
    }
  }

  /deep/ .rr-player__frame{
    height: 65%;
    width: 100% !important;
  }

  /deep/ .rr-controller.svelte-19ke1iv.svelte-19ke1iv{
    background: #141727;
  }

  /deep/ .rr-controller__btns.svelte-19ke1iv button{
    color: #ffffff;
  }

  .video-area{
    img{
      display: block;
      margin: 10px auto;
      width: 98%;
    }
  }

  @media screen and (max-width: 800px){
    /deep/ .rr-player{
      width: 100% !important;
      background: none;
      height: 300px !important;
    }

    /deep/ .switch.svelte-9brlez.svelte-9brlez.svelte-9brlez{
      display: none;
    }

    /deep/ .rr-player__frame{
      width: 100% !important;
      height: 300px !important;
    }
  }

</style>
