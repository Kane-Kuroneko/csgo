<template>
  <div class="echart-box">
    <HashModule v-model="show" width="10" title="历史Number">
      <div class="info-item">
        <span>我的种子：</span>
        <Input v-model="userSeed" size="large" style="flex: 1;"/>
        <div class="default-btn user-btn hide-m" @click="randomSeed">随机</div>
        <div class="default-btn user-btn hide-m" @click="changeSeed">修改</div>
      </div>
      <div class="hide-p" style="display: flex;flex-direction: row-reverse">
        <div class="default-btn user-btn " @click="changeSeed">修改</div>
        <div class="default-btn user-btn " @click="randomSeed">随机</div>
      </div>
      <div class="filter-condition" style="margin: 10px 0">
        <div class="game-filter">
          <div :class="{'active': searchFrom.type === 1}" @click="searchFrom.type = 1">Hash开箱</div>
          <div :class="{'active': searchFrom.type === 2}" @click="searchFrom.type = 2">升级</div>
          <div :class="{'active': searchFrom.type === 3}" @click="searchFrom.type = 3">对战</div>
        </div>
        <Select class="hide-m" label-in-value placeholder="全部"
                size="large"
                style="width: 100px"
                v-model="searchFrom.count">
          <Option :key="el" v-for="el in condition" :value="el">
            {{ el }}
          </Option>
        </Select>
        <div class="echarts-tips hide-m">
          <div class="line-tip">
            <div></div>
            Number
          </div>
          <div class="circle-tip">
            <div></div>
            中线 = 0.5
          </div>
        </div>
      </div>
      <div class="filter-condition hide-p hide-ipad" style="margin: 20px 0">
        <Select label-in-value placeholder="全部"
                size="large"
                style="width: 100px"
                v-model="searchFrom.count">
          <Option :key="el" v-for="el in condition" :value="el">
            {{ el }}
          </Option>
        </Select>
        <div class="echarts-tips ">
          <div class="line-tip">
            <div style="width: 20px"></div>
            Number
          </div>
          <div class="circle-tip">
            <div></div>
            中线 = 0.5
          </div>
        </div>
      </div>
      <div id="echarts" style="height: 400px"></div>
    </HashModule>
  </div>
</template>

<script>
import HashModule from "@/components/HashModule/HashModule";
import {getAction} from "@/api/manage";

export default {
  name: "EchartLine",
  components: {HashModule},

  data() {
    return {
      show: false,
      searchFrom: {
        type: 1,
        count: 30,
      },
      seeData: [],
      userSeed: '',
      options: {
        xAxis: {
          type: 'category',
          data: [],
        },
        lineStyle: {
          color: '#FCC601'
        },
        textStyle: {
          fontSize: 15,
          color: '#fff'
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 1,
          interval: 0.1,
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgba(255,255,255,.5)','rgba(255,255,255,.5)','rgba(255,255,255,.5)','rgba(255,255,255,.5)','rgba(255,255,255,.5)','#fff',

              ]
            }
          },
        },
        tooltip: {
          trigger: "axis",
          formatter: function (value) {
            return `<p>Number：${value[0].data.value}</p> <p>种子：${value[0].data.seed}</p>`
          },
          axisPointer: {
            type: 'line',
            label: 'cross',
            show: false
          }
        },
        series: [
          {
            data: [],
            type: 'line'
          }
        ]
      },
      condition: [10, 20, 30]
    }
  },
  watch: {
    searchFrom: {
      handler(nv) {
        this.changetype(nv.count)
      },
      deep: true
    },
    show(nv) {
      if (nv) this.changetype(this.searchFrom.count)
    }
  },
  mounted() {
    this.userSeed = localStorage.getItem('userSeed')
  },
  methods: {
    changetype(number) {
      const machart = this.$echart.init(document.getElementById('echarts'))
      let arr = []
      for (let i = 1; i < number + 1; i++) {
        arr.push(i)
      }
      this.options.xAxis.data = arr
      let parmas = {type: this.searchFrom.type}
      getAction('/api/activity/trend/chart', parmas).then(res => {
        let arr = []
        res.data.forEach(el => {
          arr.push({value: Number(el.rate.match(/^\d+(?:\.\d{0,6})?/)), seed: el.userKey})
        })
        this.seeData = res.data
        this.options.series[0].data = arr.reverse().splice(30 - number, arr.length)
        machart.setOption(this.options)
      })
      window.addEventListener('resize', function () {
        machart.resize()
      })
    }
  },
}
</script>

<style scoped lang="less">
#echarts {
  width: 100%;
}

@media screen and (max-width: 800px) {
  #echarts {
    width: 100%;
  }

}

.filter-condition {
  display: flex;
  align-items: center;
}

.game-filter {
  display: flex;
}

.game-filter > div {
  width: 93px;
  height: 31px;
  font-size: 14px;
  text-align: center;
  line-height: 31px;
  color: #FFFFFF;
  background: #2E314D;
  margin-right: 5px;
  cursor: pointer;

  &.active {
    background: #0041F8;
  }
}

/deep/ .ivu-select-selection {
  border: none;
  background: transparent;
}

/deep/ .ivu-select-selected-value {
  background: rgba(25, 28, 44, 0);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/deep/ .ivu-input {
  background: #0F111D !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  box-sizing: border-box;
}

.echarts-tips {
  margin-left: auto;
  display: flex;
}

.line-tip {
  display: flex;
  align-items: center;
  font-size: 14px;

  > div {
    width: 49px;
    height: 2px;
    background: #FCC601;
    border: 0px solid #000000;
    margin-right: 10px;
  }
}

.circle-tip {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-left: 30px;

  > div {
    width: 9px;
    height: 9px;
    background: #ffffff;
    border: 0px solid #000000;
    border-radius: 50%;
    margin-right: 10px;
  }
}

.echart-box /deep/ .hash-box {
  width: 800px;
}
</style>
