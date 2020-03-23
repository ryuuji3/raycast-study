import Vue from "vue";
import Vuex from "vuex";
import { Polygon } from "@/models";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    polygon: new Polygon([
      [0, -200],
      [50, -175],
      [-50, -175],
      [-50, -125],
      [50, -125],
      [0, -100]
    ])
  },
  mutations: {},
  actions: {},
  modules: {}
});
