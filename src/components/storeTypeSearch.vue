<template>
  <div class="search-type">
    <ul class="csgo-type" v-if="type==='csgo'">
      <template v-for="(item,index) in csgoType.newCategory">
        <li :class="{'active':searchForm.category===item.value}" :key="index"
            @click.stop="firstChoice(item.value)">
          <i class="iconfont" :class="item.icon"/>
          <span class="csgo-type-name">{{ item.name }}</span>
          <div class="second_level"
               :class="{'second_level_end':index===6||index===7,'active':optCategory === item.value}"
               v-if="item.name !== '全部'">
            <template v-for="(child,index) in item.child">
                        <span class="second_level_item"
                              :class="{'active':searchForm.name === child.value||searchForm.category === child.value}"
                              :key="index" @click.stop="secondLevelChoice(item.value,child.value)">
                            {{ child.name }}
                        </span>
            </template>
          </div>
        </li>
      </template>
    </ul>
    <div class="search-type-label">
      <div @click="filter = !filter" :class="{'active': filter}">更多筛选
        <Icon v-show="!filter" type="md-arrow-dropdown" size="16"/>
        <Icon v-show="filter" type="md-arrow-dropup" size="16"/>
      </div>
      <div v-show="filter" class="hidden-ani">
        <div>
          <div>
            <p class="search-type-label-item">
              <span class="search-type-label-h">外观</span>
            </p>
          </div>
          <div>
            <p class="search-type-label-item">
                            <span class="search-type-label-i" :class="{'active':searchForm.exterior===item.value}"
                                  v-for="(item,index) in csgoType.exterior" :key="index" @click="exterior(item.value)">
                    {{ item.labelZH }}
                </span>
            </p>
          </div>
        </div>
        <div>
          <div>
            <p class="search-type-label-item">
              <span class="search-type-label-h">品质</span>
            </p>
          </div>
          <div>
            <p class="search-type-label-item">
                            <span class="search-type-label-i" v-for="(item,index) in csgoType.quality" :key="index"
                                  :class="{'active':searchForm.rarity===item.value}" :style="{'color':item.color}"
                                  @click="csquality(item.value)">
                    {{ item.labelZH }}
                </span>
            </p>
          </div>
        </div>
        <div>
          <div>
            <p class="search-type-label-item">
              <span class="search-type-label-h">暗金</span>
            </p>
          </div>
          <div>
            <p class="search-type-label-item">
                            <span class="search-type-label-i" :class="{'active':searchForm.darkGold===item.value}"
                                  v-for="(item,index) in csgoType.darkGold" :key="index" @click="darkGold(item.value)">
                    {{ item.labelZH }}
                     <i v-if="item.labelZH==='有暗金'" class="iconfont iconshixinxingxing"/>
                </span>
            </p>
          </div>
        </div>
        <div>
          <div>
            <p class="search-type-label-item">
              <span class="search-type-label-h">宝石</span>
            </p>
          </div>
          <div>
            <p class="search-type-label-item">
                            <span class="search-type-label-i" :class="{'active':searchForm.levelName===item.value}"
                                  v-for="(item,index) in csgoType.gemstone" :key="index"
                                  @click="gemstone(item.value)">
                    {{ item.labelZH }}
                     <i v-if="item.labelZH==='有暗金'" class="iconfont iconshixinxingxing"/>
                </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  mixins: [],

  components: {},

  props: {
    csgoType: Object,
    searchForm: Object,
    type: String,
    dotaType: Object,
  },

  data() {
    return {
      optCategory: null,
      filter: false,
    }
  },

  computed: {},

  watch: {},

  created() {
  },

  mounted() {
    window.addEventListener("click", this.clickOther);
  },

  destroyed() {
  },
  beforeDestroy() {  // 实例销毁之前对点击事件进行解绑
    window.removeEventListener('click', this.clickOther);
  },
  methods: {
    clickOther: function () {
      this.optCategory = null
    },
    firstChoice(category) {
      if (this.optCategory === category) {
        this.optCategory = null
        return;
      } else {
        this.optCategory = category
      }
      if (category === 'Other') return
      const searchForm = this.searchForm
      searchForm.name = ''
      searchForm.category = category;
      this.$emit('update:searchForm', searchForm)
      // this.$emit('searchFunc')
    },
    secondLevelChoice(category, name) {
      this.optCategory = null
      const searchForm = this.searchForm
      if (category === 'Other') {
        searchForm.name = ''
        searchForm.category = name;
      } else {
        searchForm.name = name;
        searchForm.category = category;
      }
      this.$emit('update:searchForm', searchForm)
    },
    exterior(exterior) {
      this.optCategory = null
      const searchForm = this.searchForm
      searchForm.exterior = exterior;
      this.$emit('update:searchForm', searchForm)
      this.$emit('searchFunc')
    },
    darkGold(darkGold) {
      this.optCategory = null
      const searchForm = this.searchForm
      searchForm.darkGold = darkGold;
      this.$emit('update:searchForm', searchForm)
      this.$emit('searchFunc')
    },
    gemstone(LeveTName) {
      this.optCategory = null
      const searchForm = this.searchForm
      searchForm.levelName = LeveTName;
      this.$emit('update:searchForm', searchForm)
      this.$emit('searchFunc')
    },
    rarity(rarity) {
      this.optCategory = null
      const searchForm = this.searchForm
      searchForm.rarity = rarity;
      this.$emit('update:searchForm', searchForm)
      this.$emit('searchFunc')
    },
    quality(quality) {
      this.optCategory = null
      const searchForm = this.searchForm
      searchForm.quality = quality;
      this.$emit('update:searchForm', searchForm)
      this.$emit('searchFunc')
    },
    csquality(quality) {
      this.optCategory = null
      const searchForm = this.searchForm
      searchForm.rarity = quality;
      this.$emit('update:searchForm', searchForm)
      this.$emit('searchFunc')
    }
  },
};
</script>

<style>
/* ... */
</style>
