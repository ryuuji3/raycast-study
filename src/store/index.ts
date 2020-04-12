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
  shape: new Polygon([
    [0, 50],
    [100, 0],
    [200, 50],
    [200, 75],
    [100, 125],
    [0, 75]
  ]),
  coordinates: {
    x: 25,
    y: 25
  }
});

export default store;
