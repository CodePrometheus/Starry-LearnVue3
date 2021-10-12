import { createStore } from "vuex";
import { login } from "@/api/user";
import createPersistedState from "vuex-persistedstate";

export const store = createStore({
  plugins: [createPersistedState()],
  state: {
    username: "",
    avatar: "",
    token: "",
  },
  mutations: {
    setUser(state, user) {
      state.username = user.username;
      state.avatar = user.avatar;
      state.token = user.token;
    },
  },
  actions: {
    login({ commit }, params) {
      return new Promise((resolve, reject) => {
        login(params)
          .then((res) => {
            commit("setUser", res.data);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    logout({ commit }) {
      commit("setUser", {
        username: "",
        avatar: "",
        token: "",
      });
    },
  },
  modules: {},
});

export default store
