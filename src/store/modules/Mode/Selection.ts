import { Module } from "vuex";
import { Coordinates } from "@/models";
import { RootStore } from "@/store";
import Rectangle from "@/models/Rectangle";

export interface SelectState {
  start: Coordinates | null;
  end: Coordinates | null;
}

const Selection: Module<SelectState, RootStore> = {
  namespaced: true,
  state: {
    start: null,
    end: null
  },
  getters: {
    x1(state) {
      return state.start?.x;
    },
    y1(state) {
      return state.start?.y;
    },
    x2(state) {
      return state.end?.x;
    },
    y2(state) {
      return state.end?.y;
    },
    xStart(state, getters) {
      return getters.x1 < getters.x2 ? getters.x1 : getters.x2;
    },
    yStart(state, getters) {
      return getters.y1 < getters.y2 ? getters.y1 : getters.y2;
    },
    width(state, getters) {
      return Math.abs(getters.x2 - getters.x1);
    },
    height(state, getters) {
      return Math.abs(getters.y2 - getters.y1);
    }
  },
  mutations: {
    setStartCoordinates(state, coordinates) {
      state.start = coordinates;
    },
    setEndCoordinates(state, coordinates) {
      state.end = coordinates;
    },
    clear(state) {
      state.start = null;
      state.end = null;
    }
  },
  actions: {
    async finishSelection({ state, commit, dispatch }, coordinates) {
      if (coordinates === state.start) {
        return;
      }

      commit("setEndCoordinates", coordinates);

      const startX = state.start?.x || 0;
      const startY = state.start?.y || 0;
      const endX = state.end?.x || 0;
      const endY = state.end?.y || 0;

      const rectangle = new Rectangle([
        [startX, startY],
        [endX, startY],
        [endX, endY],
        [startX, endY]
      ]);

      await dispatch("mode/select", rectangle, { root: true });

      commit("clear");
    }
  }
};

export default Selection;
