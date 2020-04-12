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
}

export function Shape(state: ShapeState): Module<ShapeState, RootStore> {
  return {
    namespaced: true,
    state,
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
      selected(state, getters, rootStore) {
        const selected = rootStore.mode?.selected || [];

        return selected.includes(state.id);
      }
    },
    mutations: {
      setCoordinates(state, coordinates: Coordinates) {
        state.coordinates = coordinates;
      }
    }
  };
}
