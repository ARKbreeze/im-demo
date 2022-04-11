export default {
  ...options,
};
const appKey = 'e5bb3c10690f2f16a8f6c7ac3b9c3a5a';

const options = {
  ...base,
  ...loginAndLogout,
  ...user,
  ...team,
  ...superTeam,
  ...sessionsAndMsg,
  ...sysMsg,
  onsyncdone() {},
};

const base = {
  debug: true,
  appKey,
  accid: '10086',
  token: 'breeze',
};

const loginAndLogout = {};

const user = {};

const team = {};

const superTeam = {};

const sessionsAndMsg = {};

const sysMsg = {};
