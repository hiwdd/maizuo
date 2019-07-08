<template>
  <div class="page-film">
    <h1 class="back iconfont" @click="$router.back()">&#xe612;</h1>
    <div class="film-img">
      <img :src="nowFilmsList.poster" alt="filmImg" />
    </div>
    <div class="film-detail">
      <div class="col">
        <div class="film-name">
          <span class="name">{{ nowFilmsList.name }} </span
          ><span class="item">{{ nowFilmsList.filmType.name }}</span>
        </div>
        <div class="film-grade">
          <span class="grade">{{ nowFilmsList.grade }}</span>
          <span class="grade-text" v-show="nowFilmsList.grade">分</span>
        </div>
      </div>
      <div class="film-category grey-text">{{ nowFilmsList.category }}</div>
      <div class="film-premiere-time grey-text">
        2019-06-21上映
      </div>
      <div class="film-nation-runtime grey-text">
        {{ nowFilmsList.nation }} | {{ nowFilmsList.runtime }}分钟
      </div>
      <div class="film-synopsis grey-text hidde">
        {{ nowFilmsList.synopsis }}
      </div>
      <div class="toggle">
        <span class="iconfont">&#xe612;</span>
      </div>
    </div>
    <div class="actors">
      <div class="actors-title">演职人员</div>
      <ul class="actors-list">
        <li v-for="(item, index) in nowFilmsList.actors" :key="index">
          <img :src="item.avatarAddress" alt="aa" />
          <span class="actors-name">{{ item.name }}</span>
          <span class="actors-role">{{ item.role }}</span>
        </li>
      </ul>
    </div>
    <div class="goSchedule">选座购票</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "film",
  computed: {
    ...mapState("films", ["nowFilmsList"])
  }
};
</script>

<style lang="scss">
@import "~@/assets/styles/common/px2rem.scss";
.page-film {
  width: 100%;
  .back {
    width: px2rem(30);
    height: px2rem(30);
    background: #8a8991;
    border-radius: 50%;
    text-align: center;
    line-height: px2rem(30);
    position: absolute;
    top: px2rem(5);
    left: px2rem(5);
  }
  .film-img {
    width: 100%;
    height: px2rem(210);
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
  }
  .film-detail {
    padding: px2rem(15);
    padding-top: px2rem(12);
    background-color: #fff;
    .col {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .film-name {
        width: px2rem(296);
        .name {
          color: #191a1b;
          font-size: 18px;
          height: px2rem(24);
          line-height: px2rem(24);
          margin-right: px2rem(7);
        }
        .item {
          font-size: 9px;
          color: #fff;
          background-color: #d2d6dc;
          height: px2rem(14);
          line-height: px2rem(14);
          padding: 0 2px;
          border-radius: 2px;
          display: inline-block;
        }
      }
      .film-grade {
        width: calc(100% - px2rem(250));
        text-align: right;
        color: #ffb232;
        .grade {
          font-size: 18px;
          font-style: italic;
        }
        .grade-text {
          font-size: 10px;
        }
      }
    }
    .film-synopsis {
      line-height: 18px;
    }
    .grey-text {
      font-size: 13px;
      color: #797d82;
      margin-top: px2rem(8);
    }
    .test {
      width: calc(100vw - px2rem(30));
      opacity: 0;
      position: absolute;
      top: 1px;
      margin-left: -px2rem(10000);
      font-size: 13px;
    }
    .toggle {
      text-align: center;
      display: block;
      height: auto;
      width: px2rem(20);
      margin: auto;
      line-height: normal;
    }
  }
  .actors {
    margin: px2rem(10) 0 px2rem(50);
    background-color: #fff;
    .actors-title {
      font-size: 16px;
      text-align: left;
      color: #191a1b;
      width: 100%;
      box-sizing: border-box;
      padding: px2rem(15);
    }
    .actors-list {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      overflow-x: auto;
      &::-webkit-scrollbar {
        overflow-x: auto;
      }
      li {
        display: flex;
        flex-direction: column;
        margin-left: px2rem(10);
        img {
          width: px2rem(85);
          height: px2rem(85);
        }
        .actors-name {
          padding-top: px2rem(10);
          font-size: 12px;
          color: #191a1b;
          width: 85px;
          height: 18px;
          display: block;
          overflow: hidden;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .actors-role {
          font-size: 10px;
          color: #797d82;
        }
        span {
          text-align: center;
        }
      }
    }
  }
  .goSchedule {
    position: fixed;
    bottom: 0;
    left: 0;
    height: px2rem(50);
    width: 100%;
    text-align: center;
    background-color: #ff5f16;
    color: #fff;
    font-size: 16px;
    line-height: px2rem(50);
  }
}
</style>
