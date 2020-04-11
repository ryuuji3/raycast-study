import Vue from "vue";
import Vuex, { Store } from "vuex";

import { ShapeState } from "@/store/modules/Shape";
import shapes from "./modules/Shapes";
import { Polygon } from "@/models";

Vue.use(Vuex);

export interface RootStore extends Store<RootStore> {
  shapes: {
    [id: string]: ShapeState;
  };
}

const store: Store<RootStore> = new Vuex.Store({
  modules: {
    shapes
  }
});

store.dispatch("shapes/addShape", {
  shape: new Polygon([
    [0, 50],
    [100, 0],
    [200, 50],
    [200, 75],
    [100, 125],
    [0, 75]
  ]),
  x: 25,
  y: 25
});

export default store;
