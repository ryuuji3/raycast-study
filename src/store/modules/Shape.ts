import { Module } from "vuex";
import { Polygon } from "@/models";
import { RootStore } from "@/store";

export interface ShapeState {
  id: string;
  shape: Polygon;
  x: number;
  y: number;
}

export function Shape(
  state: ShapeState
): Module<ShapeState, RootStore> {
  return {
    namespaced: true,
    state,
    mutations: {
      setX(state, value: number) {
        state.x = value;
      },
      setY(state, value: number) {
        state.y = value;
      }
    },

    actions: {
      async setCoordinates({ commit }, { x, y }: { x: number; y: number }) {
        commit("setX", x);
        commit("setY", y);
      }
    }
  };
}
