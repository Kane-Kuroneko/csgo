// global mixins

export default {
  data() {
    return {
      vw: document.body.clientWidth,
    }
  },
  methods: {
    imgHost(url) {
      if (!url) return url
      if (url.charAt(0) !== '/') {
        return url
      } else {
        return `https://picture.hzqinyun.com${url}`
      }
    },
    getRefreshToken() {
      if ((typeof grecaptcha) && grecaptcha) {
        //6Lfka6sUAAAAAHH6itZvTl0wiVzI1-wy5AN4opV5
        grecaptcha.execute('6Lca8qoUAAAAAE7Dg5mlJTiVOoJGo8F7OJaatsH3', {action: 'homepage'}).then(function (token) {
          window.recaptchaToken = token
        });
      }
    },

    colorRgba(sHex, alpha = 1) {
      // 十六进制颜色值的正则表达式
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
      /* 16进制颜色转为RGB格式 */
      let sColor = sHex.toLowerCase()
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          var sColorNew = '#'
          for (let i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
          }
          sColor = sColorNew
        }
        //  处理六位的颜色值
        var sColorChange = []
        for (let i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
        }
        // return sColorChange.join(',')
        // 或
        return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
      } else {
        return sColor
      }
    },
    // 种子
    randomStr(flag, min, max) {
      var str = "";
      var index = "";
      var range = min;
      var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
        'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      //min,max范围内随机的一个数
      if (flag) {
        range = Math.floor(Math.random() * (max - min + 1) + min);
      }
      for (var i = 0; i < range; i++) {
        index = Math.round(Math.random() * (arr.length - 1));
        str += arr[index];
      }
      return str;
    },
    copy(text) {
      this.$copyText(text).then((e) => {
        this.$Message.success('复制成功')
      });
    },
    goEmn(str) {
      this.$copyText(str).then((e) => {
        this.$Message.success('复制成功')
        window.open('https://emn178.github.io/online-tools/sha256.html', '_blank')
      });
    },
    go16(str) {
      this.$copyText(str).then((e) => {
        this.$Message.success('复制成功')
        window.open('https://tool.oschina.net/hexconvert/', '_blank')
      });
    },
    randomSeed() {
      this.seed = this.randomStr(true, 1, 16)
      this.userSeed = this.seed
      localStorage.setItem('userSeed', this.seed)
    },
    changeSeed() {
      let req = /^[0-9a-zA-Z]{1,16}$/;
      if (req.test(this.userSeed)) {
        localStorage.setItem('userSeed', this.userSeed)
        this.userSeed = localStorage.getItem('userSeed')
        this.$Message.success('修改用户种子成功')
      } else {
        this.$Message.error('种子不能为空且最大长度为16位的英文字母和数字组合')
      }
    },
    taskType(type) {
      let welfareType = {
        0: '升级献祭总金额',
        1: '升级总次数',
        2: '升级失败次数',
        3: '对战参与总金额',
        4: '对战参与次数',
        5: '充值金额',
        6: '消费总金额',
        7: '经典开箱次数',
        8: 'Hash开箱次数',
        9: '经典开箱总额',
        10: 'Hash开箱总金额',
        11: '白给值',
        13: '升级失败献祭总金额'
      }
      return welfareType[type]
    },
    hostHandle() {
      let name = ['www.97hash.com', '97hash.com']
      if (name.includes(window.location.hostname)) {
        return true
      }
      return false
    },
	  
	  /**
	   * 
	   * @param rarity
	   * @param type
	   * @return {"gold"|"red"|"pink"|"purple"|"blues"|"blue"|"white"}
	   */
    conversionStyle(rarity, type) {
      let skinsType = ['Type_Hands', 'CSGO_Type_Knife', 'type_hands', 'csgo_type_knife'];
      if (skinsType.includes(type)) {
        switch (rarity) {
          case 'Rarity_Ancient_Weapon':
          case 'rarity_ancient_weapon':
          case 'Rarity_Ancient':
          case 'rarity_ancient':
          case 'Rarity_Contraband':
          case 'rarity_contraband':
            return 'gold';
        }
        return
      }
      switch (rarity) {
        case 'Rarity_Contraband':
        case 'rarity_contraband':
          return 'gold';
        case 'Rarity_Ancient':
        case 'rarity_ancient':
        case 'Rarity_Ancient_Weapon':
        case 'rarity_ancient_weapon':
          return 'red'
        case 'Rarity_Legendary_Weapon':
        case 'rarity_legendary_weapon':
        case 'Rarity_Legendary':
        case 'rarity_legendary':
        case 'Rarity_Legendary_Character':
        case 'rarity_legendary_character':
          return 'pink'
        case 'Rarity_Mythical_Weapon':
        case 'rarity_mythical_weapon':
        case 'Rarity_Mythical':
        case 'rarity_mythical':
          return 'purple'
        case 'Rarity_Rare_Weapon':
        case 'rarity_rare_weapon':
        case 'Rarity_Rare':
        case 'rarity_rare':
          return 'blues'
        case 'Rarity_Uncommon_Weapon':
        case 'rarity_uncommon_weapon':
          return 'blue'
        case 'Rarity_Common_Weapon':
        case 'rarity_common_weapon':
        case 'Rarity_Common':
        case 'rarity_common':
          return 'white'
      }
      return 'white'
    },

    handleState(status) {
      let skinsStatus = {
        0: '背包中',
        1: '已升级',
        2: '已出售',
        3: '待发货',
        4: '取回失败',
        5: '已取回',
        6: '已作废',
        7: '已拒收',
        8: '多次取回失败',
        9: '拒收两次报价',
        10: '已汰换'
      }
      return skinsStatus[status]
    },
  }
}
