import { Module, Store } from "vuex";
import { Shape, ShapeState } from "@/store/modules/Shape";
import { RootStore } from "@/store";
import { Polygon } from "@/models";
import { v4 as uuid } from "uuid";

const Shapes: Module<ShapeState, RootStore> = {
  namespaced: true,

  actions: {
    async setCoordinates(
      { dispatch },
      { id, ...coordinates }: { id: string; x: number; y: number }
    ) {
      return dispatch(`${id}/setCoordinates`, coordinates);
    },

    async addShape(
      _,
      { shape, x, y}: { shape: Polygon; x: number; y: number }
    ) {
      const id = uuid();

      this.registerModule(
        ["shapes", id],
        Shape({
          id,
          shape,
          x,
          y
        })
      );
    }
  }
};

export default Shapes;
