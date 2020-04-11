import { Module } from "vuex";
import { Coordinates, Polygon } from "@/models";
import { RootStore } from "@/store";

export interface ShapeState {
  id: string;
  shape: Polygon;
  coordinates: {
    x: number;
    y: number;
  };
  dragOffset: null | {
    x: number;
    y: number;
  };
}

export function Shape(state: ShapeState): Module<ShapeState, RootStore> {
  return {
    namespaced: true,
    state: {
      ...state,
      dragOffset: null
    },
    getters: {
      x(state) {
        return state.coordinates.x;
      },
      y(state) {
        return state.coordinates.y;
      },
      width(state) {
        return state.shape.width;
      },
      height(state) {
        return state.shape.height;
      },
      points(state, getters) {
        return state.shape.points.map(p => ({
          x: p.x + getters.x,
          y: p.y + getters.y
        }));
      },
      dragging(state) {
        return state.dragOffset != null;
      }
    },
    mutations: {
      setCoordinates(state, coordinates: Coordinates) {
        state.coordinates = coordinates;
      },
      setDragOffset(state, dragOffset: Coordinates) {
        state.dragOffset = dragOffset;
      }
    },
    actions: {
      startDrag({ commit, getters }, dragOffset: Coordinates) {
        commit("setDragOffset", {
          x: dragOffset.x - getters.x,
          y: dragOffset.y - getters.y
        });
      },
      moveShape({ commit, state }, newPosition: Coordinates) {
        commit("setCoordinates", {
          x: newPosition.x - (state.dragOffset?.x || 0),
          y: newPosition.y - (state.dragOffset?.y || 0)
        });
      },
      endDrag({ commit }) {
        commit("setDragOffset", null);
      }
    }
  };
}
