<template>
  <div class="page-city">
    <van-search v-model="searchVal" placeholder="请输入搜索关键词" />
    <!-- 拼音检索 -->
    <div class="lv-indexlist" v-show="!searchVal">
      <ul class="lv-indexlist__content" ref="lv-indexlist__content">
        <div class="recommend-city">
          <div class="gprs-city">
            <div class="city-index-title">GPS定位你所在城市</div>
            <ul class="city-index-detail">
              <li class="city-item-detail city-item-detail-gprs">
                <div class="city-item-text">定位失败</div>
              </li>
            </ul>
          </div>
          <div class="hot-city">
            <div class="city-index-title">热门城市</div>
            <ul class="city-index-detail">
              <li
                class="city-item-detail"
                v-for="item in hotCity"
                :Key="item.cityId"
                @click="handleChgCity(item)"
              >
                <div class="city-item-text">{{ item.name }}</div>
              </li>
            </ul>
          </div>
        </div>
        <li
          :ref="'box_' + item.py"
          class="lv-indexsection"
          v-for="item in cityList"
          :Key="item.py"
        >
          <p class="lv-indexsection__index">{{ item.py }}</p>
          <ul>
            <li
              v-for="city in item.list"
              :Key="city.cityId"
              @click="handleChgCity(city)"
            >
              {{ city.name }}
            </li>
          </ul>
        </li>
      </ul>
      <div class="lv-indexlist__nav">
        <ul>
          <li v-for="item in indexlist" :key="item" @click="goTop(item)">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div class="lv-indexlist" v-show="searchVal">
      <ul class="search_box lv-indexlist__content" v-show="searchList.length">
        <li
          v-for="city in searchList"
          :key="city.cityId"
          @click="handleChgCity(city)"
        >
          {{ city.name }}
        </li>
      </ul>

      <div class="empty-result" v-show="!searchList.length">
        <img src="../../assets/images/empty.png" alt />
        <p>没有找到匹配的城市</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "city",
  computed: {
    ...mapGetters("city", ["cityList", "hotCity", "indexlist", "searchList"]),
    searchVal: {
      get() {
        return this.$store.state.city.searchVal;
      },
      set(value) {
        this.$store.commit({
          type: "city/setSearchVal",
          value
        });
      }
    }
  },
  methods: {
    goTop(py) {
      let el = this.$refs["box_" + py][0];
      let box = this.$refs["lv-indexlist__content"];
      let offsetTop = el.offsetTop;
      box.scrollTop = offsetTop;
    },
    handleChgCity(city) {
      let cityId = city.cityId;
      this.$store.commit({
        type: "city/setCurCityId",
        cityId
      });
      this.$router.go(-1);
      window.localStorage.setItem("curCtiyId", cityId);
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/styles/common/mixins.scss";

.page-city {
  display: flex;
  flex-direction: column;
  height: 100%;
  .lv-indexlist {
    width: 100%;
    flex: 1;
    display: flex;
    background: #fff;
    overflow: hidden;
    position: relative;
    &__content {
      flex: 1;
      height: 100%;
      overflow-y: auto;
    }
    &__nav {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18px;
      height: 100%;

      li {
        height: 18px;
        font-size: 12px;
        color: #191a1b;
        padding: 0 6px;
      }
    }

    .lv-indexsection {
      font-size: 16px;

      &__index {
        background-color: #f4f4f4;
        color: #797d82;
        padding-left: 15px;
        height: 30px;
        line-height: 30px;
      }

      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 15px;
        margin-bottom: -1px;
        li {
          @include border-bottom;
          position: relative;
          width: 33.33%;
          height: 48px;
          line-height: 48px;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }

    .recommend-city {
      padding-left: 15px;
      padding-top: 15px;

      .city-index-title {
        font-size: 13px;
        color: #797d82;
        margin-bottom: 10px;
      }

      .city-index-detail {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        .city-item-detail {
          width: 33.33%;
          text-align: center;
          padding-bottom: 15px;
          box-sizing: border-box;
          float: left;

          .city-item-text {
            height: 30px;
            line-height: 30px;
            background-color: #f4f4f4;
            border-radius: 3px;
            box-sizing: border-box;
            margin: 0 7.5px;
            font-size: 14px;
            color: #191a1b;
          }
        }
      }
    }
  }
  .search_box {
    width: 100%;
    padding-left: 15px;
    li {
      @include border-bottom;
      height: 44px;
      position: relative;
      line-height: 44px;
      color: #191a1b;
      font-size: 14px;
    }
  }
  .empty-result {
    position: absolute;
    top: 50px;
    width: 100%;
    text-align: center;
    img {
      width: 90px;
      margin: auto;
    }
    p {
      color: #bdc0c5;
      font-size: 14px;
      margin: 0;
    }
  }
}
</style>
