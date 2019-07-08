<template>
  <van-list
    v-model="filmLoading"
    :finished="isFinished"
    finished-text="没有更多了"
    @load="getFilmsList"
    ref="vanBox"
  >
    <div class="page-home-films">
      <router-link to="/city" tag="div" class="city-fixed">
        <span>{{ curCityInfo && curCityInfo.name }}</span>
        <i class="iconfont icon-xiala"></i>
      </router-link>
      <Banner class="banner" :list="bannerList" pagination loop></Banner>
      <van-tabs v-model="curFilmType" sticky>
        <van-tab title="正在热映">
          <Filmlist :list="filmsList" filmType="nowPlaying"></Filmlist>
        </van-tab>
        <van-tab title="即将上映">
          <Filmlist :list="filmsList" filmType="comingSoon"></Filmlist>
        </van-tab>
      </van-tabs>
    </div>
  </van-list>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import Banner from "@/components/Banner/index.vue";
import Filmlist from "@/components/Filmlist/index.vue";
export default {
  name: "films",
  components: {
    Banner,
    Filmlist
  },
  computed: {
    ...mapState("films", ["bannerList", "filmsList"]),
    ...mapGetters("films", ["isFinished"]),
    ...mapGetters("city", ["curCityInfo"]),
    curFilmType: {
      get() {
        return this.$store.state.films.curFilmType;
      },
      set(value) {
        this.$store.commit({
          type: "films/setCurFilmType",
          filmType: value
        });
      }
    },
    filmLoading: {
      get() {
        return this.$store.state.films.filmLoading;
      },
      set(value) {
        this.$store.commit({
          type: "films/setFilmLoading",
          loading: value
        });
      }
    }
  },
  methods: {
    ...mapActions("films", ["getBannerList", "getFilmsList"])
  },
  watch: {
    curFilmType() {
      //切换时让滚动条在顶部
      this.$refs.vanBox.$el.scrollTop = 0;
      // 当 curFilmType 发生变化了，重新发送请求，并要清空上次数据
      this.getFilmsList(true);
    }
  },
  created() {
    this.getBannerList();
    // 由于使用了 van-list 默认它的 @load 事件会触发一次
    // this.getFilmsList();
  }
};
</script>

<style lang="scss">
.page-home-films {
  .banner {
    img {
      width: 100%;
    }
  }
  .city-fixed {
    position: absolute;
    top: 18px;
    left: 7px;
    color: #fff;
    z-index: 10;
    font-size: 13px;
    background: rgba(0, 0, 0, 0.2);
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    text-align: center;
    padding: 0 5px;

    i {
      font-size: 10px;
    }
  }
}
</style>
