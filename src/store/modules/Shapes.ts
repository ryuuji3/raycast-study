import { Module } from "vuex";
import { ShapeState } from "@/store/modules/Shape";
import { RootStore } from "@/store";

const Shapes: Module<ShapeState, RootStore> = {
  namespaced: true,

  actions: {
    async setCoordinates(
      { dispatch },
      { index, ...coordinates }: { index: number; x: number; y: number }
    ) {
      return dispatch(`${index}/setCoordinates`, coordinates)
    }
  }
};

export default Shapes;
