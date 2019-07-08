import axios from "axios";
import { Toast } from "vant";

const state = {
  bannerList: [],
  filmsList: [],
  curFilmType: 0, //当前影片的类型
  filmLoading: false, //影片加载状态
  pageNum: 1, //页码
  pageSize: 10, //每页显示条数
  total: 1, //总条数
  // 影院数据
  cinemaList: window.localStorage.getItem("cinemaList")
    ? JSON.parse(window.localStorage.getItem("cinemaList"))
    : [],
  nowFilmsList: window.localStorage.getItem("nowFilmsList")
    ? JSON.parse(window.localStorage.getItem("nowFilmsList"))
    : [] //详情页
};

const getters = {
  //总页数
  totalPage(state) {
    return Math.ceil(state.total / state.pageSize);
  },
  //是否还有更多数据，true代表没有
  isFinished(state, getters) {
    return state.pageNum > getters.totalPage;
  }
};
const mutations = {
  setBannerList(state, payload) {
    state.bannerList = payload;
    // console.log(state.bannerList);
  },
  setFilmsList(state, payload) {
    state.filmsList = payload.list;
    state.total = payload.total;
    // console.log(state.filmsList);
  },
  setCurFilmType(state, payload) {
    state.curFilmType = payload.filmType;
  },
  setFilmLoading(state, payload) {
    state.filmLoading = payload.loading;
  },
  setPageNum(state, payload) {
    state.pageNum = payload.num;
  },
  setCinemaList(state, payload) {
    state.cinemaList = payload.list;
  },
  setNowFilms(state, payload) {
    state.nowFilmsList = payload.list;
  }
};
const actions = {
  getBannerList({ commit }) {
    axios
      .get("https://m.maizuo.com/gateway?type=2&cityId=440300&k=1464571", {
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"156171194310273561772975"}',
          "X-Host": "mall.cfg.common-banner"
        }
      })
      .then(response => {
        if (response.data.status === 0) {
          commit("setBannerList", response.data.data);
        } else {
          Toast.fail(response.data.msg);
        }
      });
  },
  getFilmsList({ commit, state }, payload) {
    if (payload) {
      // commit("setFilmsList", { list: [], total: 1 });
      commit("setPageNum", { num: 1 });
    }
    Toast.loading({
      duration: 0,
      mask: true,
      message: "加载中..."
    });
    axios
      .get("https://m.maizuo.com/gateway", {
        params: {
          cityId: 440300,
          pageNum: state.pageNum,
          pageSize: state.pageSize,
          type: state.curFilmType === 0 ? 1 : 2,
          k: 5541996
        },
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"156171194310273561772975"}',
          "X-Host": "mall.film-ticket.film.list"
        }
      })
      .then(response => {
        if (response.data.status === 0) {
          commit("setFilmsList", {
            list: payload
              ? response.data.data.films
              : state.filmsList.concat(response.data.data.films),
            total: response.data.data.total
          });
        } else {
          Toast.fail(response.data.msg);
        }
        // 1. 数据加载完成，需要将 filmLoading 设置为 false
        commit({ type: "setFilmLoading", loading: false });
        // 2. 数据加载完成，需要将页码++
        commit({ type: "setPageNum", num: state.pageNum + 1 });
        // 3. 判断是否是最后一页 ，已经交给上面的 isFinised 来处理了
        // 4. 数据追击，而不是赋值。
        Toast.clear();
      });
  },
  // 获取影院信息
  getCinemaList({ commit }) {
    // 请求之前，loading
    // 默认3秒，设为不消失； 蒙版； 提示信息
    Toast.loading({ duration: 0, mask: true, message: "加载中..." });
    /* eslint-disable */
    axios
      .get(
        'https://m.maizuo.com/gateway?cityId=440300&ticketFlag=1&k=8934726',
        {
          headers: {
            'X-Client-Info':
              '{"a":"3000","ch":"1002","v":"5.0.4","e":"15614774089852654977227"}',
            'X-Host': 'mall.film-ticket.cinema.list'
          }
        }
      )
      .then(response => {
        let res = response.data;
        if (res.status === 0) {
          commit({
            type: 'setCinemaList',
            list: res.data.cinemas
          });
          window.localStorage.setItem(
            'cinemaList',
            JSON.stringify(res.data.cinemas)
          );
        } else {
          // Toast(res.msg);
        }
        // 加载完成关闭
        Toast.clear();
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
