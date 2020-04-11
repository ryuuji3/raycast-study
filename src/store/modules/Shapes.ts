import { Module } from "vuex";
import { Shape, ShapeState } from "@/store/modules/Shape";
import { RootStore } from "@/store";
import { Polygon, Coordinates } from "@/models";
import { v4 as uuid } from "uuid";

const Shapes: Module<ShapeState, RootStore> = {
  namespaced: true,

  actions: {
    async addShape(
      _,
      { shape, coordinates }: { shape: Polygon; coordinates: Coordinates }
    ) {
      const id = uuid();

      this.registerModule(
        ["shapes", id],
        Shape({
          id,
          shape,
          coordinates,
        })
      );
    }
  }
};

export default Shapes;
