import { Module } from "vuex";
import { ShapeState } from "@/store/modules/Shape";
import { RootStore } from "@/store";

const Shapes: Module<ShapeState, RootStore> = {
  namespaced: true
};

export default Shapes;
