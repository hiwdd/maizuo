<template>
  <div class="mz-banner swiper-container" ref="banner">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in list" :key="item.bannerId">
        <img :src="item.imgUrl" alt />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination" v-if="pagination"></div>

    <!-- 如果需要导航按钮 -->
    <template v-if="navigation">
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </template>

    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar" v-if="scrollbar"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Banner",
  props: {
    //轮播项目
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    // 循环模式选项
    loop: {
      type: Boolean,
      default: false
    },
    // 如果需要分页器
    pagination: {
      type: Boolean,
      default: false
    },
    // 如果需要前进后退按钮
    navigation: {
      type: Boolean,
      default: false
    },
    // 如果需要滚动条
    scrollbar: {
      type: Boolean,
      default: false
    }
  },
  //解决数据更新，swiper两次实例化导致轮播出现的文题
  watch: {
    list() {
      if (this.mySwiper) {
        // 已经被初始化
        this.mySwiper.destroy();
      }
      this.$nextTick(() => {
        this.initSwiper();
      });
    }
  },
  methods: {
    initSwiper() {
      //使用ref解决组件多次调用而类名相同导致多次实例化影响分页不走的bug
      let container = this.$refs.banner;
      this.mySwiper = new Swiper(container, {
        //自动播放
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 循环模式选项
        loop: this.loop,

        // 如果需要分页器
        pagination: this.pagination
          ? {
              el: ".swiper-pagination"
            }
          : {},

        // 如果需要前进后退按钮
        navigation: this.navigation
          ? {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }
          : {},

        // 如果需要滚动条
        scrollbar: this.scrollbar
          ? {
              el: ".swiper-scrollbar"
            }
          : {}
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~swiper/dist/css/swiper.css";
@import "~@/assets/styles/common/px2rem.scss";

.mz-banner {
  height: px2rem(210);
}
</style>
