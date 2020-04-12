import { Module } from "vuex";
import { Coordinates } from "@/models";
import { RootStore } from "@/store";

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
  mutations: {
    setStartCoordinates(state, coordinates) {
      state.start = coordinates;
    },
    setEndCoordinates(state, coordinates) {
      state.end = coordinates;
    }
  }
};

export default Selection;
