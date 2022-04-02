<template>
  <div id="app">
    <h2>{{ isLogin ? `accid : ${accid}` : 'Login' }}</h2>
    <button v-if="isLogin" @click="IMlogout">登出</button>

    <div class="login">
      <label for="">accid <input type="text" v-model="accid" /></label>
      <br />
      <label for=""> token <input type="text" v-model="token" /></label>
      <br />
      <button :style="{ marginTop: '10px', padding: '0 40px' }" :disabled="accid === '' || token === ''" @click="imInit">登陆</button>
    </div>
  </div>
</template>

<script>
  import APPConfig from '../config/config';
  // import NIMSDK from '../sdk/NIM_Web_NIM_v9.0.1';
  import NIMSDK from 'nim-web-sdk-ng';
  import RTCSDK from 'nertc-web-sdk';
  export default {
    name: 'App',

    data() {
      return {
        msg: 'welcome',
        isLogin: false,
        accid: '10086',
        token: 'breeze',
        nim: null,
        rtc: {},
      };
    },
    methods: {
      init() {
        // im 初始化
        this.imInit();
        // rtc 初始化
        this.rtcInit();
      },
      async imInit() {
        const nim = new NIMSDK({
          appkey: APPConfig.AppKey,
          account: this.accid,
          token: this.token,
          debugLevel: 'error',
        });

        // 登录
        nim.on('logined', () => {
          this.isLogin = true;
          console.log('login');
        });

        //
        nim.on('disconnect', () => {
          this.isLogin = false;
          console.log('disconnection');
        });
        this.nim = nim;
        await nim.connect();
      },
      rtcInit() {},

      // 退出登录
      IMlogout() {
        this.nim?.disconnect();
      },
    },
    mounted() {
      // this.init();
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
