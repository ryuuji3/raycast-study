<template>
  <div class="container">
    <interactive-polygon
      v-for="(shape, index) in shapes"
      :key="index"
      :polygon="shape.shape"
      :x="shape.x"
      :y="shape.y"
      @drag="coordinates => setCoordinates({ index, ...coordinates})"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Action } from "vuex-class";

import InteractivePolygon from "@/components/InteractivePolygon.vue";
import { RootStore } from "@/store";

@Component({
  components: { InteractivePolygon }
})
export default class Surface extends Vue {
  @State(state => state.shapes)
  private shapes!: RootStore;

  @Action("shapes/setCoordinates")
  public setCoordinates!: ({
    index,
    x,
    y
  }: {
    index: number;
    x: number;
    y: number;
  }) => Promise<void>;
}
</script>

<style scoped>
.container {
  width: inherit;
  height: inherit;
  position: absolute;
}
</style>
