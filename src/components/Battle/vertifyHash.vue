<template>
  <hash-module v-model="boxHistory" width="9" title="开箱历史">
    <div class="modal-his hide-m">
      <div class="belong-box">
        <div class="belong-box-info">
          <div class="home-box-img" style="height: 1.2rem">
            <img v-lazy="imgHost(hashHistory.background)" style="height: 100%;width: auto">
            <img v-lazy="imgHost(hashHistory.image)" style="height:70%;width: auto">
          </div>
          <p>物品所属箱子：{{ hashHistory.boxName }}</p>
        </div>
        <div class="who-open">
          <div>
            <div class="avator-shape">
              <img :src="imgHost(hashHistory.userImg)" style="height: 100%">
            </div>
          </div>
          <p>{{ hashHistory.userName }}获得此物品</p>
        </div>
      </div>
      <div class="modal-his-item">
        <Row>
          <ColC span="6">
            <skins-item :skins-data="[hashHistory]" :is-probability="true" :is-price="false"></skins-item>
          </ColC>
          <ColC span="18">
            <div style="padding: 10px 15px">
              <div class="his-p" style="padding: .1rem">
                <p>服务器种子Hash:{{ hashHistory.calculateLog.serverHash }}</p>
                <p>服务器种子: {{ hashHistory.calculateLog.serverKey }}</p>
                <p>用户种子: {{ hashHistory.calculateLog.clientKey }}</p>
                <p>结果种子Hash: {{ hashHistory.calculateLog.resultHash }}</p>
                <p :title="parseFloat((parseInt(sha256_digest(hashHistory.calculateLog.clientKey +
                                    hashHistory.calculateLog.serverKey).substring(0,6),16)/parseInt('ffffff',16)))">
                  Number =
                  {{
                    sha256_digest(hashHistory.calculateLog.clientKey +
                        hashHistory.calculateLog.serverKey).substring(0, 6)
                  }}(16进制)
                  / ffffff(16进制)=
                  {{
                    parseInt(sha256_digest(hashHistory.calculateLog.clientKey +
                        hashHistory.calculateLog.serverKey).substring(0, 6), 16) || '暂无'
                  }}
                  / {{ parseInt('ffffff', 16) }} =
                  <br/>
                  <span style="color: rgb(101, 255, 175);">{{
                      parseFloat((parseInt(sha256_digest(hashHistory.calculateLog.clientKey +
                          hashHistory.calculateLog.serverKey).substring(0, 6), 16) / parseInt('ffffff', 16))) || '暂无'
                    }}</span>
                </p>
              </div>
              <div class="upgrade-btn-box">
                <div class="default-btn" @click="goEmn(hashHistory.calculateLog.serverHash)">验证</div>
                <div class="default-btn"
                     @click="go16(sha256_digest(hashHistory.calculateLog.clientKey + hashHistory.calculateLog.serverKey).substring(0,6))">
                  16进制转换
                </div>
              </div>
            </div>
          </ColC>
        </Row>
      </div>
    </div>
    <div class="hide-ipad hide-p">
      <div style="display: flex;justify-content: space-between">
        <skins-item :skins-data="[hashHistory]" :is-probability="true" :is-price="false"></skins-item>
        <div>
          <div class="belong-box-info">
            <div class="home-box-img" style="height: 1.5rem">
              <img v-lazy="imgHost(hashHistory.background)" style="width: 40%">
              <img v-lazy="imgHost(hashHistory.image)" style="width:40%">
            </div>
            <p>物品所属箱子</p>
            <p>{{ hashHistory.boxName }}</p>
          </div>
          <div class="who-open-m">
            <div>
              <div class="avator-shape">
                <img :src="imgHost(hashHistory.userImg)" style="height: 100%">
              </div>
            </div>
            <p>物品获得者</p>
            <p>{{ hashHistory.userName }}</p>
          </div>
        </div>
      </div>
      <div class="hide-ipad hide-p">
        <div class="his-p" style="padding: .1rem;margin-top: .1rem">
          <p>服务器种子Hash:{{ hashHistory.calculateLog.serverHash }}</p>
          <p>服务器种子: {{ hashHistory.calculateLog.serverKey }}</p>
          <p>用户种子: {{ hashHistory.calculateLog.clientKey }}</p>
          <p>结果种子Hash: {{ hashHistory.calculateLog.resultHash }}</p>
        </div>
        <div>
          <p class="hash-probility-m" style="padding:0 .1rem;">Number=
            {{
              sha256_digest(hashHistory.calculateLog.clientKey +
                  hashHistory.calculateLog.serverKey).substring(0, 6)
            }}(16进制)
            / ffffff(16进制)=
            {{
              parseInt(sha256_digest(hashHistory.calculateLog.clientKey +
                  hashHistory.calculateLog.serverKey).substring(0, 6), 16) || '暂无'
            }}
            / {{ parseInt('ffffff', 16) }} =
            <span style="color: rgb(101, 255, 175);"> {{
                parseFloat((parseInt(sha256_digest(hashHistory.calculateLog.clientKey +
                    hashHistory.calculateLog.serverKey).substring(0, 6), 16) / parseInt('ffffff', 16)).toFixed(12)) || '暂无'
              }}</span>
          </p>
        </div>
        <div class="upgrade-btn-box">
          <div class="default-btn" @click="goEmn(hashHistory.calculateLog.serverHash)">验证</div>
          <div class="default-btn"
               @click="go16(sha256_digest(hashHistory.calculateLog.clientKey + hashHistory.calculateLog.serverKey).substring(0,6))">
            16进制转换
          </div>
        </div>
      </div>
    </div>

  </hash-module>
</template>

<script>
import {sha256_digest} from '../../utils/sha256'
import HashModule from "../HashModule/HashModule";

export default {
  components: {HashModule},
  props: ['hashHistory'],
  name: "vertifyHash",
  data() {
    return {
      sha256_digest,
      width: '64rem',
      boxHistory: false,
    }
  },
  methods: {
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
  }
}
</script>

<style scoped>

</style>
