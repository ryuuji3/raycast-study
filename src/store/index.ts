import Vue from "vue";
import Vuex, { Store } from "vuex";

import { ShapeState } from "@/store/modules/Shape";
import shapes from "./modules/Shapes";
import { ModeState } from "./modules/Mode";
import { Polygon } from "@/models";
import Move from "@/store/modules/Mode/Move";

Vue.use(Vuex);

export interface RootStore extends Store<RootStore> {
  mode: ModeState;
  shapes: {
    [id: string]: ShapeState;
  };
}

const store: Store<RootStore> = new Vuex.Store({
  getters: {
    currentMode(state) {
      return state.mode?.type;
    }
  },
  actions: {
    setMode({ getters, state }, mode) {
      if (mode === getters.currentMode) {
        return;
      }

      if (state.mode != null) {
        store.unregisterModule("mode");
      }

      switch (mode) {
        case "move":
          store.registerModule("mode", Move);
          break;
        default:
          break;
      }
    }
  },
  modules: {
    shapes
  }
});

store.dispatch("setMode", "move");
store.dispatch("shapes/addShape", {
  shape: new Polygon(
    [
      [80, 0],
      [100, 0],
      [100, 20],
      [100, 40],
      [100, 60],
      [100, 80],
      [100, 100],
      [80, 120],
      [60, 120],
      [40, 120],
      [20, 120],
      [0, 100],
      [0, 80],
      [20, 80],
      [20, 100],
      [40, 100],
      [60, 100],
      [80, 80],
      [80, 60],
      [80, 40],
      [80, 20]
    ],
    true
  ),
  coordinates: {
    x: 25,
    y: 25
  }
});
store.dispatch("shapes/addShape", {
  shape: new Polygon(
    [
      [0, 0],
      [20, 0],
      [20, 100],
      [100, 100],
      [100, 120],
      [0, 120]
    ],
    true
  ),
  coordinates: {
    x: 150,
    y: 25
  }
});

export default store;
