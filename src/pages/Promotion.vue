<template>
  <div class="promotion ">
    <div class="common-bg" :class="{'common-bg-m': isPhone}">
      <div class="mar-auto">
        <div class="pro-box" :class="{'pro-box-m': isPhone}">
          <div class="pro-box-top" v-if="!isPhone">
            <div class="prm-top">
              <div class="promotion-code" >
                <span>我的推广人: </span>
                <span>{{ prmData.fatherCode ? prmData.fatherCode : '未绑定' }}</span>
                <!--                <div @click="clipboard(prmData.code)" class="default-btn copy-btn">复制</div>-->
              </div>
              <div class="promotion-code">
                <span>你的推广链接: </span>
                <span>{{ prmData.code ? `${origin}/?spread=${prmData.code}` : '登录后查看' }} </span>
                <div @click="clipboard(`${origin}/?spread=${prmData.code}`)"
                     class="default-btn copy-btn">复制
                </div>
              </div>
            </div>
            <div class="prm-bot">
              <div class="prm-gamer">
                <p>奖励提成</p>
                <p>{{ prmData.rewardRate ? prmData.rewardRate : 0 }}</p>
              </div>
              <div class="prm-gamer">
                <p>邀请玩家数</p>
                <p>{{ prmData.totalCount ? prmData.totalCount : 0 }}</p>
              </div>
              <div class="prm-gamer">
                <p>奖励</p>
                <p>{{ prmData.totalReward ? prmData.totalReward : 0 }}</p>
              </div>
              <div class="prm-gamer">
                <p>推广码</p>
                <p>{{ prmData.code ? prmData.code : 0 }}</p>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="prm-top" :class="{'prm-top-m': isPhone}">
              <div class="promotion-code"  style="margin: .2rem 0">
                <span style="width: 1.5rem">我的推广人: </span>
                <span>{{ prmData.fatherCode ? prmData.fatherCode : '未绑定' }}</span>
              </div>
              <div class="promotion-code">
                <span style="width: 1.5rem">你的推广链接: </span>
                <span
                    style="width: 45%;">{{ prmData.code ? `${origin}/?spread=${prmData.code}` : '登录后查看' }} </span>
                <div @click="clipboard(`${origin}/?spread=${prmData.code}`)"
                     class="default-btn copy-btn">复制
                </div>
              </div>
            </div>
            <div class="prm-bot">
              <div class="prm-gamer">
                <p>奖励提成</p>
                <p>{{ prmData.rewardRate ? prmData.rewardRate : 0 }}</p>
              </div>
              <div class="prm-gamer">
                <p>邀请玩家数</p>
                <p>{{ prmData.totalCount ? prmData.totalCount : 0 }}</p>
              </div>
              <div class="prm-gamer">
                <p>奖励</p>
                <p>{{ prmData.totalReward ? prmData.totalReward : 0 }}</p>
              </div>
              <div class="prm-gamer">
                <p>推广码</p>
                <p>{{ prmData.code ? prmData.code : 0 }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="prm-people-info" :class="{'prm-people-info-m': isPhone}">
          <div class="prm-history" :class="{'prm-history-m': isPhone}">
            <h3>邀请记录</h3>
            <div v-if="prmRecord.length > 0">
              <div>
                <Row class-name="table-name">
                  <ColC span="8">
                    <span>推广人</span>
                  </ColC>
                  <ColC span="8">
                    <span>充值金额</span>
                  </ColC>
                  <ColC span="8">
                    <span>你的提成</span>
                  </ColC>
                </Row>
              </div>
              <div>
                <Row v-for="el in prmRecord" :key="el.id" class-name="pro-line">
                  <ColC span="8">
                    <span style="display: inline-block;margin-left: 10px ">{{ el.name }}</span>
                  </ColC>
                  <ColC span="8">
                    <span> <i class="iconfont icon-icon_diamond1 fdc-color"></i> {{ el.recharge }}</span>
                  </ColC>
                  <ColC span="8">
                    <span></span>
                    <span><i class="iconfont icon-icon_diamond1 fdc-color"></i> {{ el.profit }}</span>
                  </ColC>
                </Row>
              </div>
            </div>
            <Empty v-else></Empty>
          </div>
          <div class="prm-warning" :class="{'prm-warning-m': isPhone}">
            <h3>常见问题</h3>
            <div>
              <div class="number-order">
                <p>1</p>
              </div>
              <div class="pro-tips">
                <p>怎样邀请其他玩家？</p>
                <p>将上方我们为您生成的邀请码或者邀请链接发送给您的伙伴，通过您的邀请码或者邀请链接登录97hash的用户将成为您的受邀伙伴。</p>
              </div>
            </div>
            <div style="display: flex">
              <div class="number-order">
                <p>2</p>
              </div>
              <div class="pro-tips">
                <p>97hash将给主动邀请其他玩家的用户提供哪些奖励？</p>
                <p>通过您的邀请码或者邀请链接登录97hash的用户，充值之后，您将获得他充值金额的3%作为奖励，奖励将直接发放到您的账户余额中。</p>
              </div>
            </div>
            <div style="display: flex">
              <div class="number-order">
                <p>3</p>
              </div>
              <div class="pro-tips">
                <p>为什么给很多人发送了邀请码或者邀请链接，但是没有收到奖励？</p>
                <p>您邀请的用户必须充值之后，您才能得到奖励。每个用户只能成为一个人的受邀伙伴，如果您发送的用户已经受邀成为别人的伙伴，则不能成为您的受邀伙伴。</p>
              </div>
            </div>
            <div style="display: flex">
              <div class="number-order">
                <p>4</p>
              </div>
              <div class="pro-tips">
                <p>接受邀请的用户是否永久成为受邀伙伴？</p>
                <p>您邀请过的人，会永久成为您的伙伴，他每一次充值之后，您都将获得他充值金额最低3%的奖励！</p>
              </div>
            </div>
            <div style="display: flex">
              <div class="number-order">
                <p>5</p>
              </div>
              <div class="pro-tips">
                <p>如何增加自己的奖励比例？</p>
                <p>如果您有信心邀请到更多的伙伴，请通过交流群聊（QQ群：850966321）联系管理员，或者联系网页在线客服，我们将根据条件提供更高级别的奖励比例。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {getAction} from "../api/manage";
  import Empty from "../components/Empty/Empty";
  import OpenBox from "../views/OpenBox";
  import {mapState} from "vuex";

  export default {
    name: 'promotion',
    components: {Empty},
    data() {
      return {
        show: false,
        prmData: {},
        origin: window.location.origin,
        prmRecord: {},
        isPhone: false,
      }
    },
    mounted() {
      this.getSpread()
      this.isPhone = this.$store.state.account.isPhone
    },
    computed: {
      ...mapState('account', {
        user: state => state.user,
      }),
      hostname(){
        if(window.location.host.includes('www')){
          return window.location.host.split('.')[1]
        }
        return window.location.host.split('.')[0]
      }
    },
    methods: {
      clipboard(text) {
        if (!this.$store.state.account.user.id) {
          this.$Message.error('请登录后操作')
          return
        }
        this.$copyText(text).then((e) => {
          this.$Message.success('复制成功')
        });
      },
      async getSpread() {
        if (this.user.id) {
          let res = await getAction('/api/user/spread/record')
          this.prmRecord = res.data
          let info = await getAction('/api/user/spread/info')
          this.prmData = info.data
        }
      },
    }
  }
</script>

<style scoped>
  /deep/ .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header{
    background: #3D3D3D !important;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
  }

  /deep/ .ivu-collapse-content{
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #0A0A0A;
    background: #B3BBC1 !important;
  }

  /deep/ .ivu-collapse-item-active i{
    color: #D89532;
  }
</style>
