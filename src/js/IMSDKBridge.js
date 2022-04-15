import IMSDK from '../../sdk/NIM_Web_SDK_v9.0.1';
import Config from '../../config/config.js';
export default class SDKBridge {
  // nim;

  constructor() {
    console.log(Config);
    this.nim = IMSDK.NIM.getInstance({
      ...Config,
    });
  }
  //方法封装
  connect() {
    console.log('connect', nim);
    this.nim.connect();
  }

  sendText(obj) {
    this.nim.sendText({
      ...obj,
    });
  }
  sendImg() {}
}
