export const getters = {
  getLogoInfo(state) {
    return JSON.parse(JSON.stringify(state.logoInfo));
  },

  getIcon(state) {
    return JSON.parse(JSON.stringify(state.logoInfo.icon));
  },
  getTitle(state) {
    return JSON.parse(JSON.stringify(state.logoInfo.title));
  },
  getContainer(state) {
    return JSON.parse(JSON.stringify(state.logoInfo.container));
  },
  getSlogan(state) {
    return JSON.parse(JSON.stringify(state.logoInfo.slogan));
  },
  getIconHistoryList(state) {
    return state.changeIconList;
  },
  getIconList(state) {
    return state.IconList;
  },
  getSearchText: (state) => state.searchText,
  getSvgArray: (state) => state.svgArray,
  getLetterList: (state) => state.letterList,
  getCanvasLoading: (state) => state.canvasLoading,
  token: (state) => state.user.token,
  info: (state) => state.user.info,

  isLogin(state) {
    return state.user.token ? true : false;
  },
  isShowLogin: (state) => state.user.isShowLogin,
  loginMessage: (state) => state.user.loginMessage,
  getFontList: (state) => state.fontList,
  getContainerList:(state) => state.containerList,
};
