<template>
  <svg ref="surface" class="container">
    <interactive-polygon
      v-for="shape of shapes"
      :key="shape.id"
      v-bind="getShape(shape.id)"
      @mousedown="coordinates => handleMouseDown(coordinates, shape.id)"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
    />
  </svg>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Ref } from "vue-property-decorator";
import { State } from "vuex-class";

import InteractivePolygon from "@/components/InteractivePolygon.vue";
import { RootStore } from "@/store";
import { Coordinates } from "@/models";

@Component({
  components: { InteractivePolygon }
})
export default class Surface extends Vue {
  @Ref("surface")
  readonly surface!: HTMLElement;

  @State(state => state.shapes)
  private shapes!: RootStore;

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
      dragging: this.$store.getters[`shapes/${id}/dragging`]
    };
  }
}
</script>

<style scoped>
.container {
  width: inherit;
  height: inherit;
}
</style>
