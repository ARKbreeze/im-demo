const appKey = '387e7e36aff049c3ca6edef545b92385';

export default {
  ...base(),
  ...loginAndLogout(),
  ...user(),
  ...team(),
  ...superTeam(),
  ...sessionsAndMsg(),
  ...sysMsg(),
  onsyncdone() {
    console.log('done');
  },
};

function base() {
  return {
    debug: false,
    appKey,
    account: '10010',
    token: 'breeze',
    syncRoamingMsgs: true,
    syncSuperTeamRoamingMsgs: true,

    //https
    // secure : true,
    // token认证
    // authType : 0,
    //登录扩展字段
    //loginExt,
    //客户端自定义tag 多端同步更改
    //customTag,
    //客户端自定义类型 用于自定义多端登录
    //customClientType
  };
}

//回调函数里this 就是nim实例

function loginAndLogout() {
  return {
    //登录成功
    onconnect(obj) {
      const { lastLoginDeviceId, customTag, ip, port, country } = obj;
      console.log('connect', obj);
    },
    //即将重连
    onwillreconnect(obj) {
      const { duration, retryCount } = obj;
      console.log('willReconnect', obj);
    },
    //断开连接
    ondisconnect(obj) {
      const { code } = obj;
      if (code === 'kicked') {
        const { reason, message, custom, from, customClientType } = obj;
      }
      console.log('disconnect', obj);
    },
    //错误
    onerror(err) {
      console.error('IMError', err);
    },
    //多端登录
    onloginportschange(loginList) {
      //登录端列表
      console.log('loginPortChange', loginList);
    },
  };
}

function user() {
  return {
    //黑名单
    onblacklist(blackList) {
      console.log('黑名单', blackList);
      //增量列表
      //merge
      //cut
    },
    //多端在线同步黑名单
    onsyncmarkinblacklist(obj) {
      const { account, isAdd } = obj;
    },
    //静音列表
    onmutelist(mutelist) {
      //增量列表
      //merget
      //cut
    },
    //多端同步静音
    onsyncmarkinmutelist(obj) {
      const { account, isAdd } = obj;
    },
    //同步好友
    onfriends(friendsList) {
      console.log('好友列表', friendsList);
    },
    //多端同步好友状态
    onsyncfriendaction(obj) {
      const { type } = obj;
    },
    //同步自己信息
    onmyinfo(myInfo) {
      console.log('个人信息', myInfo);
    },
    //多端同步自己信息
    onupdatemyinfo(myInfo) {},
    // ? 同步用户名片数组
    onusers(userList) {
      console.log('好友信息', userList);
    },
    // ? 多端同步用户名片
    onupdateuser(user) {},
  };
}

function team() {}

function superTeam() {}

function sessionsAndMsg() {
  return {
    onroamingmsgs(obj) {
      console.log('漫游消息', obj);
    },
    onofflinemsgs(obj) {
      console.log('离线消息', obj);
    },
  };
}

function sysMsg() {}
