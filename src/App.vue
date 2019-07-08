<template>
  <keep-alive :include="['home']">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapActions("city", ["getCities"])
  },
  created() {
    this.getCities();
  }
};
</script>
