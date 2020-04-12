import { Module } from "vuex";
import { Coordinates } from "@/models";
import { RootStore } from "@/store";

export interface MoveState {
  selected: Array<string>;
  dragOffset: Coordinates | null;
}

const Move: Module<MoveState, RootStore> = {
  namespaced: true,
  state: {
    selected: [],
    dragOffset: null
  },
  getters: {
    dragging(state) {
      return state.dragOffset != null;
    }
  },
  mutations: {
    setDragOffset(state, dragOffset: Coordinates) {
      state.dragOffset = dragOffset;
    },
    setSelected(state, selected) {
      state.selected = Array.isArray(selected) ? selected : [selected];
    }
  },
  actions: {
    handleMouseDown({ state, commit, rootGetters }, { coordinates, selected }) {
      commit("setSelected", selected);

      commit("setDragOffset", {
        x: coordinates.x - rootGetters[`shapes/${state.selected[0]}/x`],
        y: coordinates.y - rootGetters[`shapes/${state.selected[0]}/y`]
      });
    },
    handleMouseMove(
      { commit, state },
      { coordinates }: { coordinates: Coordinates }
    ) {
      state.selected.forEach(id => {
        commit(
          `shapes/${id}/setCoordinates`,
          {
            x: coordinates.x - (state.dragOffset?.x || 0),
            y: coordinates.y - (state.dragOffset?.y || 0)
          },
          { root: true }
        );
      });
    },
    handleMouseUp({ commit }) {
      commit("setDragOffset", null);
    }
  }
};

export default Move;
