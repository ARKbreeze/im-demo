<template>
  <div class="appD">
    <h2>{{ isLogin ? `accid : ${accid}` : 'Login' }}</h2>
    <div v-if="isLogin" key="isLogin">
      <button @click="IMlogout" key="1">登出</button>
      <button @click="getLocalMsg" key="2">获取本地消息</button>
    </div>

    <div class="login" v-if="!isLogin">
      <label for="">accid <input type="text" v-model="accid" /></label>
      <br />
      <label for=""> token <input type="text" v-model="token" /></label>
      <br />
      <button :style="{ marginTop: '10px', padding: '0 40px' }" :disabled="accid === '' || token === ''" @click="imLogin">登陆</button>
    </div>

    <div v-if="isLogin" class="msgContent">
      <ul>
        <p>to {{ toAccid }}</p>
        <input type="text" v-model="msg" />
        <button @click="sendMsg">发送</button>
        <li v-for="(item, index) in dataList" :key="index" :class="item.flow">
          {{ item.from + ':' + item.body }}<br />
          {{ '状态' + item.status }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import APPConfig from '../../config/config';
  import NIMSDK from '../../sdk/NIM_Web_NIM_v9.0.1';
  // import NIMSDK from 'nim-web-sdk-ng';
  // import RTCSDK from 'nertc-web-sdk';
  export default {
    name: 'HelloWorld',

    data() {
      return {
        msg: 'welcome',
        isLogin: false,
        accid: '10086',
        token: 'breeze',
        nim: null,
        msg: '',
        dataList: [],
        rtc: {},
      };
    },
    computed: {
      toAccid() {
        return this.accid === '10086' ? '10010' : '10086';
      },
    },
    methods: {
      init() {
        this.dataInit();
      },
      dataInit() {},
      async imLogin() {
        const nim = new NIMSDK({
          appKey: APPConfig.AppKey,
          account: this.accid,
          token: this.token,
          // debugLevel: 'error',
          onconnect: () => {
            console.log('connection');
            console.log(this);
            this.isLogin = true;
          },
          ondisconnect: () => {
            console.log('disconnect');
            this.isLogin = false;
          },
        });
        // this.nimEventInit(nim);
        console.log('init');
        console.log(NIMSDK.support.db);
        this.nim = nim;
        await nim.connect();
      },
      nimEventInit(n) {
        // new
        // const events = {
        //   logined: (e) => {
        //     this.isLogin = true;
        //     console.log(e, 'login');
        //   },
        //   disconnect: () => {
        //     console.log('disconnect');
        //   },
        //   //被踢下线
        //   kicked: (e) => {
        //     console.log(e, 'kicked');
        //     this.isLogin = false;
        //   },
        //   multiPortLogin: (e) => {
        //     console.log('multiPortLogin');
        //   },
        //   msg: (e) => {
        //     console.log(e, 'msg');
        //     this.dataList.push(e);
        //   },
        // };
        // for (const key in events) {
        //   n.on(key, events[key]);
        // }
        //old

        n.setOptions({ ...getEventOptions() });
      },
      async sendMsg() {
        const msgObj = {
          scene: 'p2p',
          to: this.toAccid,
          body: this.msg,
          onSendBefore: (e) => {
            console.log('IMMessage 发送消息前', e);
          },
        };
        console.log(this.nim.msg);
        const res = await this.nim.msg.sendTextMsg(msgObj);
        this.dataList.push(res);
        console.log('发送消息后结果', res);
      },
      getLocalMsg() {
        this.nim.getLocalMsgs({
          done: (error, obj) => {
            if (error) {
              console.log('MsgError', error);
            } else {
              console.log('msgObj', obj);
            }
          },
        });
      },
      IMlogout() {
        this.nim?.disconnect();
      },
      rtcInit() {},
      // 退出登录
    },
    mounted() {
      this.init();
    },
  };
</script>

<style>
  .appD {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .appD .msgContent .out {
    text-align: right;
  }
</style>
