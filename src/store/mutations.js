export const mutations = {
  setLogoInfo(state, newValue) {
    state.logoInfo = newValue;
    let logoInfo = newValue;
    localStorage.setItem("logoInfo", JSON.stringify({ logoInfo }));
  },

  setIcon(state, newValue) {
    state.logoInfo.icon = newValue;
    let a = localStorage.getItem("logoInfo");
    let logoInfo = a ? JSON.parse(a).logoInfo : {};
    logoInfo.icon = newValue;
    localStorage.setItem("logoInfo", JSON.stringify({ logoInfo }));
  },
  setTitle(state, newValue) {
    state.logoInfo.title = newValue;
    let a = localStorage.getItem("logoInfo");
    let logoInfo = a ? JSON.parse(a).logoInfo : {};
    logoInfo.title = newValue;
    localStorage.setItem("logoInfo", JSON.stringify({ logoInfo }));
  },
  setContainer(state, newValue) {
    state.logoInfo.container = newValue;
    let a = localStorage.getItem("logoInfo");
    let logoInfo = a ? JSON.parse(a).logoInfo : {};
    logoInfo.container = newValue;
    localStorage.setItem("logoInfo", JSON.stringify({ logoInfo }));
  },
  setSlogan(state, newValue) {
    state.logoInfo.slogan = newValue;
    let a = localStorage.getItem("logoInfo");
    let logoInfo = a ? JSON.parse(a).logoInfo : {};
    logoInfo.slogan = newValue;
    localStorage.setItem("logoInfo", JSON.stringify({ logoInfo }));
  },
  addSvgArray(state, newValue) {
    state.svgArray.push(newValue);
  },
  setCanvasLoading(state, newValue) {
    state.canvasLoading = newValue;
  },
  setSvgArray(state, newValue) {
    state.svgArray = newValue;
  },
  setJsonStr(state, newValue) {
    state.logoInfo.jsonStr = newValue;
    let a = localStorage.getItem("logoInfo");
    let logoInfo = a ? JSON.parse(a).logoInfo : {};
    logoInfo.jsonStr = newValue;
    localStorage.setItem("logoInfo", JSON.stringify({ logoInfo }));
  },

  addIconHistory(state, newValue) {
    // 如果不存在，则添加新元素
    if (!state.changeIconList.some((item) => item.id === newValue.id)) {
      state.changeIconList.unshift(newValue);
    }
  },
  addIconList(state, newValue) {
    state.changeIconList.unshift(newValue);
  },
  updateSearchText(state, newValue) {
    state.searchText = newValue;
  },
  setLetterList(state, newValue) {
    state.letterList = newValue;
  },
  setFontList(state, newValue) {
    state.fontList = newValue;
  },
  setContainerList(state, newValue) {
    state.containerList = newValue;
  },
};
