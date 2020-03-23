<template>
  <div class="container">
    <interactive-polygon :polygon="polygon" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";
import { Polygon } from "@/models";
import InteractivePolygon from "@/components/InteractivePolygon.vue";

@Component({
  components: { InteractivePolygon }
})
export default class Surface extends Vue {
  @State(state => state.polygon)
  private polygon!: Polygon;
}
</script>

<style scoped>
  .container {
    margin: 1em;
  }
</style>
