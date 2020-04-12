import { Module } from "vuex";
import { Coordinates } from "@/models";
import { RootStore } from "@/store";
import Selection, { SelectState } from "@/store/modules/Mode/Selection";

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
      state.selected = Array.isArray(selected)
        ? selected
        : selected
        ? [selected]
        : [];
    }
  },
  actions: {
    handleMouseDown({ state, commit, rootGetters }, { coordinates, selected }) {
      if (!state.selected.length) {
        commit("setSelected", selected);
      }

      commit("setDragOffset", {
        x: coordinates.x - rootGetters[`shapes/${state.selected[0]}/x`],
        y: coordinates.y - rootGetters[`shapes/${state.selected[0]}/y`]
      });
    },
    handleMouseMove(
      { commit, state },
      { coordinates }: { coordinates: Coordinates }
    ) {
      const newCoordinates = {
        x: coordinates.x - (state.dragOffset?.x || 0),
        y: coordinates.y - (state.dragOffset?.y || 0)
      };

      if (state.selected.length) {
        state.selected.forEach(id => {
          commit(`shapes/${id}/setCoordinates`, newCoordinates, { root: true });
        });
      } else if (state.dragOffset) {
        commit("selection/setStartCoordinates", newCoordinates);
      }
    },
    handleMouseUp(
      { state, commit },
      { coordinates }: { coordinates: Coordinates }
    ) {
      // Ignore second event
      if (!state.dragOffset) {
        return;
      }

      commit("setDragOffset", null);

      if (!state.selected.length) {
        commit("selection/setEndCoordinates", coordinates);
      } else {
        commit("setSelected", []);
      }
    }
  },
  modules: {
    selection: Selection
  }
};

export default Move;
