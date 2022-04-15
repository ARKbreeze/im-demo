<template>
  <div class="appD">
    <div>
      <button :style="{ marginTop: '10px', padding: '0 40px' }" @click="imLogin">登陆</button>
      <button @click="IMlogout" key="1">登出</button>

      <button @click="addToBlacklist" key="2">加黑名单</button>
      <button @click="removeFromBlack" key="4">除黑名单</button>
      <button @click="getLocalMsg" key="3">获取本地消息</button>
      <button @click="getHistoryMsgs" key="5">获取历史消息</button>
      {{ msg }}
      <div>
        <input type="text" v-model="text" />
        <button @click="sendMsg">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
  import NIMSDK from '../../sdk/NIM_Web_NIM_v9.0.1';
  import IMSDKBridge from '../js/IMSDKBridge.js';
  // import NIMSDK from 'nim-web-sdk-ng';
  // import RTCSDK from 'nertc-web-sdk';
  export default {
    name: 'HelloWorld',

    data() {
      return {
        msg: 'welcome',
        Nim: null,
        msg: '',
        dataList: [],
        rtc: {},
        text: '',
      };
    },
    computed: {},
    methods: {
      init() {
        this.dataInit();
      },
      dataInit() {},
      async imLogin() {
        const nim = new IMSDKBridge();
        // const nim = new NIMSDK({
        //   account: '10086',
        //   token: 'breeze',
        //   appKey: 'e5bb3c10690f2f16a8f6c7ac3b9c3a5a',
        //   onconnect() {
        //     console.log('000000');
        //   },
        // });
        // console.log('nim', nim);
        // this.nimEventInit(nim);
        console.log('init');
        this.Nim = nim;
      },

      sendMsg() {
        this.Nim.sendText({
          scene: 'p2p',
          to: '10086',
          text: this.text,
          isRoamingable: true,
          done: () => console.log('发送文本消息'),
        });
      },
      getLocalMsg() {
        this.Nim.nim.getLocalMsgs({
          done: (error, obj) => {
            if (error) {
              console.log('MsgError', error);
            } else {
              console.log('msgObj', obj);
            }
          },
        });
      },
      getHistoryMsgs() {
        this.Nim.nim.getHistoryMsgs({
          scene: 'p2p',
          to: '10086',
          done: (error, obj) => {
            if (error) {
              console.log('MsgError', error);
            } else {
              console.log('msgObj', obj);
              this.msg = obj.msgs[0].text;
            }
          },
        });
      },
      IMlogout() {
        this.Nim?.nim.disconnect();
      },
      addToBlacklist() {
        this.Nim.nim.addToBlacklist({
          account: '10010',
          done: (res) => {
            console.log('加入黑名单回调', res);
          },
        });
      },
      removeFromBlack() {
        this.Nim.nim.removeFromBlacklist({
          account: '10010',
          done() {
            console.log('解除黑名单');
          },
        });
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
