<template>
  <div class="poster-content">
    <div>
      <canvas id="canvas" v-show="false"></canvas>
      <canvas id="poster" width="1" height="1" v-show="!posterImg"></canvas>
      <img src="" class="download-img" alt="" crossorigin="anonymous">
      <a download="photo.png" class="down"></a>
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcode'

  export default {
    name: "QrcodePoster",
    data() {
      return {
        newSrc: window.location.origin + `/page/source?poster=${this.$store.state.account.user.spreadCode}`,
        qrcodeUrl: '',
        show: false,
        posterImg: true,
        posterBg: require('../../../assets/image/newyear/poterbg.png')
      }
    },
    methods: {
      sharePopup() {
        this.createQrcode(this.newSrc);
        this.drawAndShareImage(this.posterBg, this.qrcodeUrl);
      },
      createQrcode(text) {
        // 生成二维码
        const canvas = document.getElementById('canvas');
        QRCode.toCanvas(canvas, text, {
          margin: 0,
        });
        let data = canvas.toDataURL('image/png', 1);
        this.qrcodeUrl = data;
      },
      downImg() {
        let a = document.getElementsByClassName('down')[0];
        a.dispatchEvent(new MouseEvent('click'))
      },
      drawAndShareImage(img1, img2) {
        let canvas = document.getElementById('poster');
        canvas.width = 428;
        canvas.height = 539;
        let context = canvas.getContext('2d');
        context.rect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#fff';
        context.fill();
        let myImage = new Image();
        myImage.src = img1;
        myImage.crossOrigin = 'Anonymous';
        myImage.onload = function () {
          context.drawImage(myImage, 0, 0, 428, 539);
          let myImage2 = new Image();
          myImage2.src = img2;
          myImage2.crossOrigin = 'Anonymous';
          myImage2.onload = function () {
            context.drawImage(myImage2, 288, 405, 100, 100);
            let base64 = canvas.toDataURL('image/png');
            this.posterImg = false;
            let img = document.getElementsByClassName('download-img')[0];
            img.setAttribute('src', base64);
            let a = document.getElementsByClassName('down')[0]
            a.setAttribute('href', base64)
          };
        };
      },
    }

  }
</script>

<style scoped>
  .poster-content{
    width: 40%;
    z-index: 101;
    box-shadow: -3px -1px 20px 0px #000000;
    transition: all .4s linear;
    margin: auto;
    font-size: 0;
  }

  .poster-content img{
    width: 100%;
  }

  @media screen and (max-width: 800px){
    .poster-content{
      width: 80%;
      font-size: 0;
      height: auto;
    }
  }
</style>
