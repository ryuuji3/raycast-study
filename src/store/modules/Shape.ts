import { Module } from "vuex";
import { Polygon } from "@/models";
import { RootStore } from "@/store";

export interface ShapeState {
  shape: Polygon;
  x: number;
  y: number;
  dragging: boolean;
}

const Shape: Module<ShapeState, RootStore> = {
  namespaced: true,

  state() {
    return {
      shape: new Polygon([
        [0, 50],
        [100, 0],
        [200, 50],
        [200, 75],
        [100, 125],
        [0, 75]
      ]),
      x: 25,
      y: 25,
      dragging: false
    };
  },

  mutations: {
    setX(state, value: number) {
      state.x = value;
    },
    setY(state, value: number) {
      state.y = value;
    }
  },

  actions: {
    setCoordinates({ commit }, { x, y }: { x: number; y: number }) {
      commit("setX", x);
      commit("setY", y);
    }
  }
};

export default Shape;
