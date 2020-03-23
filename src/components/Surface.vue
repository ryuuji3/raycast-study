<template>
  <div class="container">
    <interactive-polygon
      v-for="(shape, key) in shapes"
      :key="key"
      :polygon="shape.shape"
      :x="shape.x"
      :y="shape.y"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";

import InteractivePolygon from "@/components/InteractivePolygon.vue";
import { RootStore } from "@/store";

@Component({
  components: { InteractivePolygon }
})
export default class Surface extends Vue {
  @State(state => state.shapes)
  private shapes!: RootStore;
}
</script>

<style scoped>
.container {
  width: inherit;
  height: inherit;
  position: absolute;
}
</style>
