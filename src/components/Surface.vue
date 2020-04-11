<template>
  <svg
    ref="surface"
    class="container"
  >
    <interactive-polygon
      v-for="shape of shapes"
      :key="shape.id"
      :id="shape.id"
      :polygon="shape.shape"
      :x="shape.x"
      :y="shape.y"
      @drag="coordinates => setCoordinates({ id: shape.id, ...coordinates})"
    />
  </svg>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Ref } from "vue-property-decorator";
import { State, Action } from "vuex-class";

import InteractivePolygon from "@/components/InteractivePolygon.vue";
import { RootStore } from "@/store";

@Component({
  components: { InteractivePolygon }
})
export default class Surface extends Vue {
  @Ref("surface")
  readonly surface!: HTMLElement;

  @State(state => state.shapes)
  private shapes!: RootStore;

  @Action("shapes/setCoordinates")
  public setCoordinates!: ({
    id,
    x,
    y
  }: {
    id: string;
    x: number;
    y: number;
  }) => Promise<void>;
}
</script>

<style scoped>
.container {
  width: inherit;
  height: inherit;
}
</style>
