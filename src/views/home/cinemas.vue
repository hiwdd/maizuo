<template>
  <div class="page-home-cinemas iconfont">
    <header class="base">
      <router-link tag="div" to="/city" class="left"
        >深圳<i>&#xe612;</i></router-link
      >
      <div class="title">影院</div>
      <div class="right"><i>&#xe611;</i></div>
    </header>
    <div class="cinena-list base">
      <!-- <label>全城<i>&#xe612;</i></label>
      <label>APP订票 <i>&#xe612;</i></label>
      <label>最近去过 <i>&#xe612;</i></label> -->
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
        <van-dropdown-item v-model="value3" :options="option3" />
      </van-dropdown-menu>
    </div>

    <ul>
      <router-link
        class="base"
        tag="li"
        to="/defalis"
        v-for="item in filterList"
        :key="item.cinemaId"
      >
        <div>
          <p>{{ item.name }}</p>
          <p>{{ item.address }}</p>
        </div>
        <div>
          <p>{{ item.lowPrice / 100 }}</p>
          <p>距离未知</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "cinemaList",

  data() {
    return {
      active: 0,

      value1: "全城",
      value2: "APP订票",
      value3: "最近去过",
      option1: [
        { text: "全城", value: "全城" },
        { text: "福田区", value: "福田区" },
        { text: "南山区", value: "南山区" },
        { text: "龙岗区", value: "龙岗区" },
        { text: "龙华区", value: "龙华区" },
        { text: "宝安区", value: "宝安区" },
        { text: "罗湖区", value: "罗湖区" },
        { text: "盐田区", value: "盐田区" },
        { text: "坪山区", value: "坪山区" }
      ],
      option2: [
        { text: "APP订票", value: "APP订票" },
        { text: "前台兑换", value: "前台兑换" }
      ],
      option3: [
        { text: "最近去过", value: "最近去过" },
        { text: "离我最近", value: "离我最近" }
      ]
    };
  },
  components: {},

  computed: {
    ...mapState("films", ["cinemaList"]),
    filterList() {
      if (this.value1 == "全城") {
        return [...this.cinemaList];
      } else {
        return this.cinemaList.filter(item => item.districtName == this.value1);
      }
    }
  },

  methods: {
    ...mapActions("films", ["getCinemaList"])
  },

  created() {
    // 判断本地存储中是否有 cinemaList 的数据，如果有就不发送
    let cinemaList = window.localStorage.getItem("cinemaList");
    if (!cinemaList) {
      this.getCinemaList();
    }
    // 阻止了发送，但未拿出来用，/改仓库数据（film p12）
  }
};
</script>
