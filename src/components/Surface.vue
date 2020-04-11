<template>
  <svg ref="surface" class="container">
    <interactive-polygon
      v-for="shape of shapes"
      :key="shape.id"
      :id="shape.id"
      v-bind="getShape(shape.id)"
      @drag="coordinates => handleDrag(shape.id, coordinates)"
      @dragstart="coordinates => handleDragStart(shape.id, coordinates)"
      @dragend="() => handleDragEnd(shape.id)"
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

  handleDrag(id: number, coordinates: Coordinates) {
    return this.$store.dispatch(`shapes/${id}/moveShape`, coordinates);
  }

  handleDragStart(id: number, coordinates: Coordinates) {
    return this.$store.dispatch(`shapes/${id}/startDrag`, coordinates);
  }

  handleDragEnd(id: number) {
    return this.$store.dispatch(`shapes/${id}/endDrag`);
  }

  getShape(id: string) {
    return {
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
