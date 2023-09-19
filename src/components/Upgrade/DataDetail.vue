<template>
  <div class="layout" style="border:1px solid rgba(2,2,2,0)">
    <Title name="饰品升级"></Title>
    <nav class="nav-up-user">
      <div class="go-back war-hover" v-if="!isPhone">
        <img src="../../assets/image/upgrade/Hall/goback.png" @click="$router.go(-1)" alt="" style="width: 100%">
      </div>
      <div class="filter-data">
        <div v-show="isSeach" class="search-range">
          <p> 按日期和价格排序筛选数据</p>
          <div @click="isSeach = !isSeach"><i style="color: #000000" class="iconfont icon-icon-search"></i></div>
        </div>
        <div class="data-picker-m">
          <Date-picker v-if="isPhone" v-show="!isSeach" @on-ok="choseTime()" type="daterange" confirm v-model="date"
                       placement="bottom-end"
                       format="yyyy-MM-dd" size="small" placeholder="选择日期"
                       style="width:200px">
          </Date-picker>
        </div>
        <div v-show="!isSeach" class=" filter-up">
          <i class="iconfont icon-icon-close" @click="isSeach = !isSeach" v></i>
          <Date-picker v-if="!isPhone" @on-ok="choseTime()" type="daterange" confirm v-model="date"
                       placement="bottom-end"
                       format="yyyy-MM-dd" size="small" placeholder="选择日期"
                       style="width: 200px"></Date-picker>
          <div class="price-sort" @click="searchForm.type === 1 ? searchForm.type=2 : searchForm.type=1">
            {{ searchForm.type ? '价格' : '价格' }}
            <i style="font-size: 13px;" :class="{'sort-down': searchForm.type ===1}"
               class="iconfont iconicon-arrow"></i>
          </div>
          <div class="flex-item-center">
            <span>升级状态： </span>
            <Select label-in-value
                    placeholder="不限"
                    style="width: 100px;"
                    size="large"
                    v-model="searchForm.status">
              <Option value=" ">不限</Option>
              <Option value="0">升级成功</Option>
              <Option value="1">升级失败</Option>
            </Select>
          </div>
        </div>
      </div>
    </nav>

    <div class="detail-box">
      <div class="detail-item" v-for="el in recordsArr">
        <div class="detail-user" :class="{'fail': el.result}">
          <SkinsAvatar
              wd="85px"
              ht="85px"
              :img="el.avatar"
              :style="{'margin-left': !isPhone ? '70px' : '20px'}"
              :head-frame="el.headPortraitBox"
          ></SkinsAvatar>
          <div>
            <p><i class="iconfont icon-icon_people"></i> 用户呢称</p>
            <P>{{el.name}}</P>
          </div>
          <div class="see-user war-hover" @click="goUserInfo(el)" v-if="isPhone">
            <i class="iconfont icon-icon_view1"></i>
            <span>查看个人信息</span>
          </div>
        </div>
        <div class="up-status " :class="{'fail': !!el.result}" v-if="!isPhone">
          <div></div>
          <p>升级{{!!el.result? '失败': "成功"}}</p>
        </div>
        <div class="up-result" :class="{'fail': el.result}">
          <div class="up-skins">
            <div class="skins-value">
              <div align="center">
                <img :src="imgHost(el.consumeSkinsImage)" alt="" v-if="el.consumeSkinsImage">
                <img src="../../assets/image/upgrade/Hall/diamond.png" style="width:75px" v-else alt="">
              </div>
              <div><i class="iconfont icon-icon_diamond1" v-if=" el.consumeSkinsPrice!==0"></i><span> {{el.consumeSkinsPrice === 0 ? el.deviationAmount : el.consumeSkinsPrice}}</span>
              </div>
            </div>
            <div class="point-color " align="center">
              <img src="../../assets/image/upgrade/upgradeSucces.png" v-if="!el.result" alt="">
              <img src="../../assets/image/upgrade/upgradePoint.png" v-else alt="">
              <div :class="{'success':el.result === 0}">{{el.calculateBak.startSection}} -
                {{el.calculateBak.endSection}}
              </div>
              <p v-if="el.deviationAmount && el.consumeSkinsPrice!==0">+
                <i class="iconfont icon-icon_diamond1"></i><span> {{el.deviationAmount}}</span></p>
            </div>
            <div class="skins-value">
              <div align="center"><img :src="imgHost(el.targetSkinsImage)" alt=""></div>
              <div><i class="iconfont icon-icon_diamond1"></i><span> {{el.targetSkinsPrice}}</span></div>
            </div>
          </div>
        </div>
        <div class="see-user war-hover" style="width: 10%" @click="goUserInfo(el)" v-if="!isPhone">
          <i class="iconfont icon-icon_view1"></i>
          <span>查看个人信息</span>
        </div>
      </div>
    </div>

    <div class="page-box" style="margin: 50px auto">
      <Page class="mar-auto" :current="page.current" :total="page.total" :page-size="12"
            @on-change="jumpBoxFunc"/>
    </div>
  </div>
</template>

<script>
  import {url} from "../../api/upgradeApi";
  import Title from "../Title";
  import {getAction} from "../../api/manage";
  import {handleTimeForm} from "../../utils/utils";

  export default {
    name: "DataDetail",
    components: {Title},
    data() {
      return {
        url,
        handleTimeForm,
        isSeach: true,
        recordsArr: [],
        date: [],
        isPhone: this.$store.state.account.isPhone,
        searchForm: {
          type: 1,
          status: '',
          startTime: '',
          endTime: '',
        },
        page: {
          current: 1,
          total: 0,
        }
      }
    },
    watch: {
      searchForm: {
        handler() {
          this.getData()
        },
        deep: true
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData(page = 1) {
        this.page.current = page;
        let parma = {
          ...this.searchForm,
          ...this.page
        }
        getAction(url.data, parma).then(res => {
          res.data.records.forEach(el => {
            el.calculateBak = JSON.parse(el.calculateBak)
          })
          this.recordsArr = res.data.records;
          this.page.current = res.data.current;
          this.page.total = res.data.total;
        })
      },
      goUserInfo(item) {
        this.$router.push(`/upgrade/userInfo/${item.userId}`)
      },
      choseTime() {
        this.searchForm.startTime = handleTimeForm(this.date[0], '-') + ' 00:00:00';
        this.searchForm.endTime = handleTimeForm(this.date[1], '-') + ' 23:59:59';
      },
      jumpBoxFunc(page) {
        this.getData(page);
      }
    }
  }
</script>

<style scoped>
  .search-range{
    text-align: center;
    font-size: 15px;
    color: #FFCA6E;;
    line-height: 36px;
    font-weight: bold;
  }

  .search-range > div{
    display: inline-block;
    margin-left: 10px;
    background: #FCC601;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    line-height: 30px;
    cursor: pointer;
  }

  .search-range > p{
    display: inline-block;
    color: #FFCA6E;;
  }

  @media screen and (max-width: 800px){
    .detail-item{
      flex-direction: column;
      height: auto;
      padding: 10px 0;
    }

    /deep/ .ivu-date-picker-with-range .ivu-picker-panel-body{
      width: 100%;
    }

    /deep/ .ivu-date-picker-with-range .ivu-picker-panel-content{
      width: 41%;
    }

    /deep/ .ivu-picker-confirm{
      padding-right: 100px;
    }

    /deep/ .ivu-date-picker-cells{
      width: 100%;
    }

    .detail-user{
      border-left: 0;
    }

    .see-user{
      width: auto;
      padding: 0 5px;
      margin-left: auto;
    }

    .up-result{
      width: 96%;
      margin: auto;
      height: 110px;
      border-left: 5px solid #1CAB61;
    }

    .up-result.fail{
      border-left: 5px solid #D42E2A;
    }

    .detail-user{
      width: 100%;
    }

  }

  /deep/ .ivu-select-selection{
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #141727;
  }

  /deep/ .ivu-input-group-append{
    border: 0px solid #030000;
    box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.25);
    color: #FFFFFF;
  }

  /deep/ .ivu-input-number-input{
    border: 0px solid #030000;
    border-radius: 3px;
  }

  /deep/ .ivu-select-dropdown{
    background: #141727;
    box-shadow: 0px 2px 8px 0px rgba(11, 11, 11, 0.1) inset;
  }

  /deep/ .ivu-input-number-handler-wrap{
    display: none;
  }

  /deep/ .ivu-slider-button-wrap{
    top: -7px
  }

  /deep/ .ivu-select-placeholder{
    color: #FFFFFE;
  }

  /deep/ .ivu-select-dropdown-list .ivu-select-item:hover{
    color: #FFFFFE;
  }

  /deep/ .ivu-date-picker-cells-cell:hover em{
    background: #2C3C9D;
  }

  /deep/ .ivu-date-picker-cells-cell-range:before{
    background: #2C3C9D;
  }
</style>
