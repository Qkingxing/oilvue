const getters = {
  isMobile: state => state.app.isMobile,
  lang: state => state.app.lang,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  site_id: state => state.user.site_id,
  group_id: state => state.user.group_id,
  userId: state => state.user.userId,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  checkedCoupons: state => state.crm.checkedCoupons
}

export default getters
