import IMSDK from '../../sdk/NIM_Web_SDK_v9.0.1';
import Config from '../../config';
class SDKbridge {
  constructor() {
    this.nim = IMSDK.getInstance({
      ...Config,
    });
  }
}
