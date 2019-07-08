import axios from "axios";
import { Toast } from "vant";

const state = {
  cities: window.localStorage.getItem("cities")
    ? JSON.parse(window.localStorage.getItem("cities"))
    : [],
  curCityId: window.localStorage.getItem("curCtiyId")
    ? window.localStorage.getItem("curCtiyId") - 0
    : 440300,
  searchVal: ""
};
const getters = {
  //当前城市信息
  curCityInfo(state) {
    return state.cities.find(item => item.cityId === state.curCityId);
  },
  //归纳城市列表
  cityList(state) {
    let result = [];
    state.cities.forEach(city => {
      let py = city.pinyin.charAt(0).toUpperCase();
      let index = result.findIndex(item => item.py == py);
      if (index > -1) {
        result[index].list.push(city);
      } else {
        let obj = {
          py,
          list: [city]
        };
        result.push(obj);
      }
    });
    result = result.sort((a, b) => {
      return a.py.charCodeAt() - b.py.charCodeAt();
    });
    return result;
  },
  //热门城市
  hotCity(state) {
    return state.cities.filter(item => item.isHot);
  },
  indexlist(state, getters) {
    return getters.cityList.map(item => item.py);
  },
  //搜索
  searchList(state) {
    let tmp = [];
    if (state.searchVal) {
      tmp = state.cities.filter(item => {
        return (
          item.name.indexOf(state.searchVal) > -1 ||
          item.pinyin.indexOf(state.searchVal) > -1
        );
      });
    }
    return tmp;
  }
};
const mutations = {
  setCities(state, payload) {
    state.cities = payload.list;
  },
  setSearchVal(state, payload) {
    state.searchVal = payload.value;
  },
  setCurCityId(state, payload) {
    state.curCityId = payload.cityId;
    state.searchVal = "";
  }
};
const actions = {
  getCities({ commit, state }) {
    if (state.cities.length) {
      return;
    }
    Toast.loading({ duration: 0, mask: true, message: "加载中..." });
    axios
      .get("https://m.maizuo.com/gateway?k=7895092", {
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"156171194310273561772975"}',
          "X-Host": "mall.film-ticket.city.list"
        }
      })
      .then(response => {
        let res = response.data;
        if (res.status === 0) {
          commit({ type: "setCities", list: res.data.cities });
          window.localStorage.setItem(
            "cities",
            JSON.stringify(res.data.cities)
          );
        } else {
          Toast(res.msg);
        }
        Toast.clear();
      });
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
