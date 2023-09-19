<template>
  <div>
    <hash-module v-model="show" title="箱子物品详情" width="9">
      <div v-if="goodOrHash">
        <div class="witch-box">
          <div>
            <div class="box-style">
              <img :src="imgHost(boxInfo.background)" alt="">
              <img :src="imgHost(boxInfo.boxImg)" alt="">
              <p>{{ boxInfo.name }}</p>
            </div>
          </div>
        </div>
        <div class="box-goods">
          <SkinsItem :skins-data="box" isProbability></SkinsItem>
        </div>
      </div>
    </hash-module>
  </div>
</template>

<script>
import {getAction} from "../../api/manage";
import HashModule from "../HashModule/HashModule";

export default {
  name: "boxDetaile",
  components: {HashModule},
  props: {
    boxId: {
      type: Number,
    }
  },
  data() {
    return {
      box: [],
      show: false,
      goodOrHash: true,
      hashSeed: [],
      boxInfo: [],
      url: {
        stuff: '/api/home/box/stuff'
      }
    }
  },
  methods: {
    async getBoxStuff(id) {
      let params = {'boxId': id}

      try {
        let res = await getAction(this.url.stuff, params)
        this.box = this.handleData(res.data, res.data[0].game)
      } catch (e) {
        this.$Spin.hide();
      }
    },
    handleData(data, type) {
      type = type === 730 ? 'csgo' : 'dota'
      data.map((item) => {
        let splitStr = (type === 'csgo' ? '|' : ' ');
        let name = item.name.split(splitStr);
        item.name1 = name[0];
        item.name2 = name.splice(1, name.length).join('｜');
        item.random = this.conversionStyle(item.rarity, item.category);
      });
      return data;
    },
  }
}
</script>

<style scoped>

</style>
