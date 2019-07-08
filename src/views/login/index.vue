<template>
  <div class="page-login">
    <div class="logo">
      <img src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png" />
    </div>
    <div class="login-form">
      <div class="form-group">
        <input placeholder="用户名" class="input-control" type="text" v-model="username" />
      </div>
      <div class="form-group">
        <input placeholder="密码" class="input-control" type="password" v-model="password" />
      </div>
      <button
        class="submit login-btn"
        :disabled="!username || !password"
        @click="handleLogin({username, password})"
      >
        <span>登录</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",

  data() {
    return {
      username: "",
      password: ""
    };
  },

  methods: {
    ...mapActions("user", ["handleLogin"])
  }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
