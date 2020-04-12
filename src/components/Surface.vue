<template>
  <svg
    ref="surface"
    class="container"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
  >
    <interactive-polygon
      v-for="shape of shapes"
      :key="shape.id"
      v-bind="getShape(shape.id)"
      @mousedown="coordinates => handleMouseDown(coordinates, shape.id)"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
    />
    <selection-rectangle
      v-if="selectionWidth"
      :x="selectionX"
      :y="selectionY"
      :width="selectionWidth"
      :height="selectionHeight"
      selected
    />
  </svg>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Ref } from "vue-property-decorator";
import { Getter, State } from "vuex-class";

import InteractivePolygon from "@/components/InteractivePolygon.vue";
import { RootStore } from "@/store";
import { Coordinates } from "@/models";
import SelectionRectangle from "@/components/SelectionRectangle.vue";

@Component({
  components: { SelectionRectangle, InteractivePolygon }
})
export default class Surface extends Vue {
  @Ref("surface")
  readonly surface!: HTMLElement;

  @State(state => state.shapes)
  private shapes!: RootStore;

  @Getter("mode/selection/xStart")
  readonly selectionX!: number;

  @Getter("mode/selection/yStart")
  readonly selectionY!: number;

  @Getter("mode/selection/width")
  readonly selectionWidth!: number;

  @Getter("mode/selection/height")
  readonly selectionHeight!: number;

  handleMouseDown(coordinates: Coordinates, id?: string) {
    return this.$store.dispatch(`mode/handleMouseDown`, {
      coordinates,
      selected: id
    });
  }

  handleMouseMove(coordinates: Coordinates) {
    return this.$store.dispatch(`mode/handleMouseMove`, {
      coordinates
    });
  }

  handleMouseUp(coordinates: Coordinates) {
    return this.$store.dispatch(`mode/handleMouseUp`, {
      coordinates
    });
  }

  getShape(id: string) {
    return {
      id,
      points: this.$store.getters[`shapes/${id}/points`],
      x: this.$store.getters[`shapes/${id}/x`],
      y: this.$store.getters[`shapes/${id}/y`],
      width: this.$store.getters[`shapes/${id}/width`],
      height: this.$store.getters[`shapes/${id}/height`],
      selected: this.$store.getters[`shapes/${id}/selected`],
      dragging: this.$store.getters[`shapes/${id}/dragging`]
    };
  }
}
</script>

<style scoped>
.container {
  width: inherit;
  height: inherit;

  z-index: 0;
}
</style>
