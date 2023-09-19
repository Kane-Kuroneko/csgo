function fillStr(str, size, fill = '0') {
  let res = fill.repeat(size) + str;
  return res.substr(-size);
}

function checkDevice() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return 'm';
  } else if (bIsIpad) {
    return 'ipad';
  } else {
    return 'p';
  }
}

function debounce(func, delay) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, delay);
  }
}

function conversionStyle(rarity, type) {
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
}

function throttle(fn, interval = 200) {
  let last;
  return function () {
    let args = arguments;
    let now = +new Date();
    if (!last || now - last > interval) {
      last = now;
      fn.apply(this, args);
    }
  }
}

/*
** index1,index2代表需要交换的数组索引
 */

function swapArrData(index1, index2, arr) {
  const temp = arr.splice(index2, 1, arr[index1]);
  arr[index1] = temp[0];
  return arr;
}

function countDown(time, newUser) {
  let hours
  let a = newUser ? 86400000 : 0
  let countTime = new Date((Date.parse(new Date(time.replace(/-/g, '/'))) + a)).getTime() - new Date().getTime() || 0
  if (newUser) {
    hours = parseInt((countTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) || 0;
  } else {
    hours = parseInt((countTime / 1000 / 60 / 60), 10) || 0;
  }
  let minutes = parseInt((countTime % (1000 * 60 * 60)) / (1000 * 60)) || 0;
  let second = parseInt((countTime % (1000 * 60)) / 1000);
  return checkTime(hours) + ' : ' + checkTime(minutes) + ' : ' + checkTime(second)
}

function countTime(secondTime) {
  let minutes = Math.floor(secondTime / 60)
  let second = checkTime(Math.floor(secondTime % 60))
  return minutes + ":" + second
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i + '';
}

const monthArrEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const monthArrRus = ['Январь', 'Февраль', 'Март', 'Апрель', 'май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'декабрь']
const monthArrVn = ['thg1', 'thg2', 'thg3', 'thg4', 'thg5', 'thg6', 'thg7', 'thg8', 'thg9', 'thg10', 'thg11', 'thg12',]

function handleTime(time) {
  const date = new Date(time * 1000)
  const currentTime = fillStr(date.getHours(), 2) + ':' + fillStr(date.getMinutes(), 2) + ':' + fillStr(date.getSeconds(), 2)
  const lang = localStorage.getItem('lang')
  let res = ''
  if (lang === 'ZH') {
    res = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日   ${currentTime}`
  } else if (lang === 'RU') {
    res = `${date.getDate()}, ${monthArrRus[date.getMonth()]}, ${date.getFullYear()}   ${currentTime}`
  } else if (lang === 'VN') {
    res = `${date.getDate()}, ${monthArrVn[date.getMonth()]}, ${date.getFullYear()}   ${currentTime}`
  } else {
    res = `${monthArrEn[date.getMonth()]}  ${date.getDate()}, ${date.getFullYear()}   ${currentTime}`
  }
  return res
}

function handleTimeForm(time, connector) {
  let times = new Date(+time)
  return times.getFullYear() + connector + (times.getMonth() + 1) + connector + times.getDate();
}

function getCoolTime(time) {
  // 1 可取回 2冷却中 3取回中
  const lang = localStorage.getItem('lang')
  let coolTime = null;
  let now = Date.parse(new Date()) / 1000;
  let times = time - now;
  if (times > 0) {
    let h = Math.floor(times / 3600);
    if (h >= 24) {
      let d = Math.floor(times / 86400);
      coolTime = d + (lang === 'ZH' ? '天' : ' days');
    } else if (h > 0 && h < 24) {
      coolTime = h + (lang === 'ZH' ? '小时' : ' hours');
    } else {
      coolTime = (lang === 'ZH' ? '1小时' : '1 hour');
    }
  }
  return coolTime
}

/**
 *js的四则精确运算方法
 * http://www.cnblogs.com/junjieok/p/3306155.html
 * 例如：
 * 268.34 + 0.83
 * 268.34 - 0.86
 * 0.3 - 0.2
 * 0.33 * 10
 * 33.3 / 10
 */

function getDigits(num) {
  var digits = 0
   , parts = num.toString().split(".");

  if (parts.length === 2) {
    digits = parts[1].length;
  }

  return digits;
}

function toFixed(num, digits) {
  if (typeof digits == 'undefined') {
    return num;
  }

  return Number(num).toFixed(digits);
}

var MathFunc = {
  /*
  函数，加法函数，用来得到精确的加法结果
  说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
  参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数）
  调用：MathFunc.Add(arg1,arg2,d)
  返回值：两数相加的结果
  */
  Add: function (arg1, arg2, digits) {
    arg1 = arg1.toString(), arg2 = arg2.toString();

    var maxLen = Math.max(getDigits(arg1), getDigits(arg2))
     , m = Math.pow(10, maxLen)
     , result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));

    return toFixed(result, digits);
  },
  /*
  函数：减法函数，用来得到精确的减法结果
  说明：函数返回较为精确的减法结果。
  参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数
  调用：MathFunc.Sub(arg1,arg2)
  返回值：两数相减的结果
  */
  Sub: function (arg1, arg2, digits) {
    return MathFunc.Add(arg1, -Number(arg2), digits);
  },
  /*
  函数：乘法函数，用来得到精确的乘法结果
  说明：函数返回较为精确的乘法结果。
  参数：arg1：第一个乘数；arg2第二个乘数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
  调用：MathFunc.Mul(arg1,arg2)
  返回值：两数相乘的结果
  */
  Mul: function (arg1, arg2, digits) {
    // 数字化
    var num1 = parseFloat(arg1).toString()
     , num2 = parseFloat(arg2).toString()
     , m = getDigits(num1) + getDigits(num2)

     , result = num1.replace(".", "") * num2.replace(".", "") / Math.pow(10, m);

    return toFixed(result, digits);
  },
  /*
  函数：除法函数，用来得到精确的除法结果
  说明：函数返回较为精确的除法结果。
  参数：arg1：除数；arg2被除数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
  调用：MathFunc.Div(arg1,arg2)
  返回值：arg1除于arg2的结果
  */
  Div: function (arg1, arg2, digits) {
    // 数字化
    var num1 = parseFloat(arg1).toString()
     , num2 = parseFloat(arg2).toString()

     , t1 = getDigits(num1)
     , t2 = getDigits(num2)

     , result = num1.replace(".", "") / num2.replace(".", "") * Math.pow(10, t2 - t1)

    return toFixed(result, digits);
  }
};

function getPosition(element, target) {
  let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft,
   scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  // 四边缘的坐标
  let rectElement = element.getBoundingClientRect();
  let rectTarget = target.getBoundingClientRect();

  // 移动元素的中心点坐标
  let centerElement = {
    x: rectElement.left + (rectElement.right - rectElement.left) / 2 + scrollLeft,
    y: rectElement.top + (rectElement.bottom - rectElement.top) / 2 + scrollTop
  };
  // 目标元素的中心点位置
  let centerTarget = {
    x: rectTarget.left + (rectTarget.right - rectTarget.left) / 2 + scrollLeft,
    y: rectTarget.top + (rectTarget.bottom - rectTarget.top) / 2 + scrollTop
  };
  let coordElement = {
    x: 0,
    y: 0
  };
  let coordTarget = {
    x: -1 * (centerElement.x - centerTarget.x),
    y: -1 * (centerElement.y - centerTarget.y)
  };
  return {
    ele: coordElement,
    target: coordTarget
  }
}

function getAesString(CryptoJS, data) {//加密
  return encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(data), '88setem').toString());
}

function getDAesString(CryptoJS, ciphertext) {//解密
  let bytes = CryptoJS.AES.decrypt(decodeURIComponent(ciphertext), '88setem');
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

let levelAmount = [0, 25, 60, 100, 150, 200, 400, 600]
let levelDiscount = [0.95, 0.94, 0.92, 0.90, 0.88, 0.85, 0.80, 0.75]

function getLevelAmount() {
  return levelAmount
}

function getLevelDiscount() {
  return levelDiscount
}

function amountTransferLevel(value) {
  let t = 8
  levelAmount.forEach((item, index) => {
    if (item <= value) {
      t = index + 1
    }
  })
  return t
}

function amountTransferDiscount(value) {
  let t = levelDiscount[7]
  levelAmount.forEach((item, index) => {
    if (item <= value) {
      t = levelDiscount[index]
    }
  })
  return t
}
// 数组对象某个值大小排序
function compare(prop) {
  return function (obj1, obj2) {
    let val1 = obj1[prop];
    let val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
    }
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  }
}
  export {
    getLevelDiscount,
    getLevelAmount,
    amountTransferLevel,
    amountTransferDiscount,
    getAesString,
    getDAesString,
    handleTime,
    swapArrData,
    MathFunc,
    checkDevice,
    getCoolTime,
    getPosition,
    debounce,
    throttle,
    conversionStyle,
    countDown,
    countTime,
    handleTimeForm,
    checkTime,
    compare
  }
