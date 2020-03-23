import Vue from "vue";
import Vuex from "vuex";
import shape, { ShapeState } from "./modules/Shape";
import shapes from "./modules/Shapes";

Vue.use(Vuex);

export interface RootStore {
  shapes: {
    [id: string]: ShapeState;
  };
}

const store = new Vuex.Store({
  modules: {
    shapes
  }
});

store.registerModule(["shapes", "1"], shape);

export default store;
