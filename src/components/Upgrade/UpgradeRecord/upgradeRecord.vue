<template>

  <hash-module v-model="show" width="11"
               title="升级历史">
    <template v-if="data.length > 0">
      <Scroll :on-reach-bottom="handleReachBottom" class="history-list" :height="isMobile ? 400 : 500">
        <div class="modal-his">
          <div class="modal-his-item" v-for="el in data" :key="el.consumeSkinId">
            <p>{{ el.createdTime }}</p>
            <div class="hide-m">
              <Row>
                <ColC span="24">
                  <div class="upgrade-his" :class="{'upgrade-win': el.result == 0}">
                    <div>
                      <!--                                    升级物品-->
                      <div class="upgrade-his-need" v-if="!!el.leftStuffName">
                        <div class="lf-skins" align="center" style="display: unset">
                          <img :src="el.leftStuffImage" style="width: 100%">
                          <img v-if="el.leftLevelName" :src="require(`../../../assets/image/stone${el.leftLevelName}.png`)"
                               alt="" class="upgrade-level">
                          <div class="drop-gun-del" v-if="!!el.leftAmount && !!el.leftStuffName">
                            <p class="over-flow-hide">{{ el.leftStuffName.split('|')[0] }}</p>
                            <p class="over-flow-hide">{{ el.leftStuffName.split('|')[1] }}</p>
                          </div>
                        </div>
                        <div class="drop-gun-del" v-if="el.leftStuffName && !el.leftAmount">
                          <p class="over-flow-hide">{{ el.leftStuffName.split('|')[0] }}</p>
                          <p class="over-flow-hide">{{ el.leftStuffName.split('|')[1] }}</p>
                        </div>
                        <p v-if="!!el.leftAmount && !!el.leftStuffName">+</p>
                        <div v-if="!!el.leftAmount && !!el.leftStuffName" class="charge-amout">
                          <p><i class="iconfont icon-icon_diamond2"></i></p>
                          <p>{{el.leftAmount.toFixed(2) }}</p>
                        </div>
                      </div>
                      <!--                                    金额-->
                      <div v-else class="upgrade-money">
                        <div align="center">
                          <i class="iconfont icon-icon_diamond2 diamond-two"
                             style="font-size: 20px;color: rgb(252, 198, 1)"></i>
                        </div>
                        <div>
                          {{ (el.leftAmount).toFixed(2) }}
                        </div>
                      </div>
                      <!--                                    期望物品-->
                      <div class="upgrade-his-to">
                        <div>
                          <div align="center">
                            <img v-if="el.result !== 0 "
                                 src="../../../assets/image/upgrade/upgradePoint.png"
                                 style="width: 80%">
                            <img v-else src="../../../assets/image/upgrade/upgradeSucces.png"
                                 style="width: 80%">
                          </div>
                          <span class="probility-color"
                                :class="{'probility-win': el.result == 0}">{{((el.upgradeResult.startSection ? el.upgradeResult.startSection : "0") + ' - ' +
                                  (el.upgradeResult.endSection ? el.upgradeResult.endSection : el.successRate))
                            }}</span>
                        </div>
                      </div>
                      <div class="upgrade-his-desiered">
                        <div class="lf-skins" align="center">
                          <img :src="el.rightStuffImage" style="width: 100%">
                          <img v-if="el.rightLevelName"
                               :src="require(`../../../assets/image/stone${el.rightLevelName}.png`)"
                               alt="" class="upgrade-level">
                        </div>
                        <div class="drop-gun-del" style="opacity:.5">
                          <p class="over-flow-hide">{{ el.rightStuffName.split('|')[0] }}</p>
                          <p class="over-flow-hide">
                            {{ el.rightStuffName.split('|')[1] }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ColC>
              </Row>
              <Row>
                <ColC span="24">
                  <div class="upgrade-p over-flow-hide" style="padding: .1rem">
                    <p>服务器种子Hash: {{ el.upgradeResult.serverHash }}</p>
                    <p>服务器种子: {{ el.upgradeResult.serverSeed }} </p>
                    <p>用户种子: {{ el.upgradeResult.userSeed }}</p>
                    <p>结果种子Hash: {{ el.upgradeResult.resultHash }}</p>
                    <div
                        :title="parseFloat((parseInt(sha256_digest(el.upgradeResult.userSeed + el.upgradeResult.serverSeed).substring(0,6),16)/parseInt('ffffff',16)))"
                        class="formula">
                      Number
                      =<span>{{
                        sha256_digest(el.upgradeResult.userSeed + el.upgradeResult.serverSeed).substring(0, 6)
                      }}（16进制）<span>——————————</span>ffffff（16进制）</span>=
                      <span>{{
                          parseInt(sha256_digest(el.upgradeResult.userSeed + el.upgradeResult.serverSeed).substring(0, 6), 16) || '暂无'
                        }}<span>—————</span>
                                            {{ parseInt('ffffff', 16) }}</span>=
                      <p class="over-hidde" style="margin-left: 4px"
                         :style="{'color': el.result !== 0 ? '#D42E2A' : '#65FFAF'}">
                        {{
                        parseFloat((parseInt(sha256_digest(el.upgradeResult.userSeed +
                        el.upgradeResult.serverSeed).substring(0, 6), 16) / parseInt('ffffff', 16)).toFixed(12)) || '暂无'
                        }}</p>
                    </div>
                    <div class="upgrade-btn-box">
                      <div class="default-btn" @click="goEmn(el.upgradeResult.serverHash)">验证
                      </div>
                      <div class="default-btn"
                           @click="go16(sha256_digest(el.upgradeResult.userSeed + el.upgradeResult.serverSeed).substring(0,6))">
                        16进制转换
                      </div>
                    </div>
                  </div>
                </ColC>
              </Row>
            </div>

            <div class="hide-ipad hide-p">
              <div class="upgrade-his" :class="{'upgrade-win': el.result == 0}">
                <div>
                  <!--                                    升级物品-->
                  <div class="upgrade-his-m" v-if="!!el.leftStuffName">
                    <div class="bg-quality-m" align="center">
                      <img :src="el.leftStuffImage" style="width: 60%">
                      <img v-if="el.leftLevelName"
                           :src="require(`../../../assets/image/stone${el.leftLevelName}.png`)"
                           alt="" class="upgrade-level">
                    </div>
                    <div class="drop-gun-del ">
                      <p class="over-flow-hide">{{ el.leftStuffName.split('|')[0] }}
                      </p>
                      <p class="over-flow-hide">
                        {{ el.leftStuffName.split('|')[1] }}</p>
                    </div>
                  </div>
                  <!--                                    金额-->
                  <div v-else class="upgrade-money">
                    <div align="center">
                      <i class="iconfont icon-icon_diamond2 diamond-two" style="font-size: 20px;"></i>
                    </div>
                    <div>
                      {{ (el.leftAmount).toFixed(2) }}
                    </div>
                  </div>
                  <!--                                    期望物品-->
                  <div class="upgrade-his-to-m">
                    <div>
                      <div>
                        <img v-if="el.result !== 0 "
                             src="../../../assets/image/upgrade/upgradePoint.png"
                             style="width: 80%">
                        <img v-else src="../../../assets/image/upgrade/upgradeSucces.png"
                             style="width: 80%">
                      </div>
                      <span class="probility-color" :class="{'probility-win': el.result == 0}">{{
                          ((el.upgradeResult.startSection ? el.upgradeResult.startSection : "0") + '-' +
                              (el.upgradeResult.endSection ? el.upgradeResult.endSection : el.successRate))
                        }}</span>
                    </div>
                  </div>
                  <div class="upgrade-his-m">
                    <div class="bg-quality-m" align="center">
                      <img :src="el.rightStuffImage" style="width: 60%">
                      <img v-if="el.rightLevelName"
                           :src="require(`../../../assets/image/stone${el.rightLevelName}.png`)"
                           alt="" class="upgrade-level">
                    </div>
                    <div class="drop-gun-del">
                      <p class="over-flow-hide">{{ el.rightStuffName.split('|')[0] }}
                      </p>
                      <p class="over-flow-hide">
                        {{ el.rightStuffName.split('|')[1] }}</p>
                    </div>
                  </div>
                </div>
                <div v-if="!!el.leftAmount && !!el.leftStuffName" class="charge-amout-m">
                  <p>+</p>
                  <div><i class="iconfont icon-icon_diamond1 diamond-two" style="font-size: 14px;"></i> {{
                    el.leftAmount.toFixed(2) }}
                  </div>
                </div>
              </div>
              <div class="check-hash">
                <h3>Hash校验</h3>
                <div @click="checkboxSeed = !checkboxSeed">
                  <i class="iconfont iconicon-down2" :class="{'active':checkboxSeed }"></i>
                </div>
              </div>
              <div class="upgrade-p-m over-flow-hide" :class="{'active': checkboxSeed}">
                <p>服务器种子Hash: {{ el.upgradeResult.serverHash }}</p>
                <p>服务器种子: {{ el.upgradeResult.serverSeed }} </p>
                <p>用户种子: {{ el.upgradeResult.userSeed }}</p>
                <p>结果种子Hash: {{ el.upgradeResult.resultHash }}</p>
                <div class="formula">Number
                  =<span>{{
                      sha256_digest(el.upgradeResult.userSeed + el.upgradeResult.serverSeed).substring(0, 6)
                    }}<span>————</span>ffffff</span>=<span>{{
                      parseInt(sha256_digest(el.upgradeResult.userSeed + el.upgradeResult.serverSeed).substring(0, 6), 16) || '暂无'
                    }}<span>—————</span>{{ parseInt('ffffff', 16) }}</span>=
                  <span :style="{'color': el.result !== 0 ? '#D42E2A' : '#65FFAF'}">{{
                      parseFloat((parseInt(sha256_digest(el.upgradeResult.userSeed +
                          el.upgradeResult.serverSeed).substring(0, 6), 16) / parseInt('ffffff', 16)).toFixed(12)) || '暂无'
                    }}</span>
                </div>
              </div>
              <div class="upgrade-btn-m">
                <div class="default-btn" @click="goEmn(el.upgradeResult.serverHash)">验证
                </div>
                <div class="default-btn"
                     @click="go16(sha256_digest(el.upgradeResult.userSeed + el.upgradeResult.serverSeed).substring(0,6))">
                  16进制转换
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scroll>
    </template>
    <Empty v-else></Empty>
  </hash-module>
</template>

<script>
  import {sha256_digest} from '../../../utils/sha256'
  import Empty from "../../Empty/Empty";
  import {getAction} from "../../../api/manage";
  import HashModule from "../../HashModule/HashModule";

  export default {
    components: {HashModule, Empty},
    props: {
      show: {
        type: Boolean,
      },
      isMobile: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        sha256_digest,
        page: 1,
        count: 12,
        data: [],
        load: false,
        isPhone: false,
        checkboxSeed: false,
        expansion: null
      }
    },
    mounted() {
      this.equipment
    },
    methods: {
      sha256(clientSeed, serverSeed) {
        return this.sha256_digest(clientSeed + serverSeed)
      },
      close() {
        this.show = false
        this.data = []
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
      equipment() {
        if (navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)
        ) {
          this.isPhone = true
        }
        this.isPhone = false
      },

      handleReachBottom() {
        return new Promise(resolve => {
          this.page++
          let params = {current: this.page, size: this.count}
          getAction('/api/upgrade/order/record', params).then(res => {
            res.data.records.forEach(el => {
              el.upgradeResult = JSON.parse(el.upgradeResult)
            })
            this.data.push(...res.data.records)
            this.load = false
          })
        });
      },
    },
    watch: {
      show(nv) {
        if (nv) {
          this.load = true
          this.page = 1
          let params = {current: this.page, size: this.count}
          getAction('/api/upgrade/order/record', params).then(res => {
            this.data = res.data.records
            this.data.forEach(el => {
              el.upgradeResult = JSON.parse(el.upgradeResult)
            })
            this.load = false
          }).catch(e => {
            this.load = false
          })
        }
      }
    }
  };
</script>
<style scoped>
  .formula{
    font-size: .19rem;
    display: flex;
    align-items: center;
    white-space: nowrap;
    line-height: .1rem;
    color: #FFFFFF;
    margin-top: .1rem;
  }

  .formula span{
    display: flex;
    flex-flow: column;
    align-items: center;
    color: #FFFFFF;
    margin: 0 .05rem;
  }

  /deep/ .ivu-modal-body{
    padding: 6px;
  }
</style>
