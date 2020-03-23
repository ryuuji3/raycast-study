<template>
  <svg :viewBox="viewBox" :width="width" :height="height">
    <polygon :points="points" />
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Polygon } from "@/models";

@Component({})
export default class InteractivePolygon extends Vue {
  @Prop(Polygon)
  private readonly polygon!: Polygon;

  get points() {
    return this.polygon.toSvg();
  }

  get width(): number {
    return this.polygon.width;
  }

  get height() {
    return this.polygon.height;
  }

  get viewBox() {
    return `${this.width / -2} ${this.polygon.topMostY * 2} ${this.width} ${
      this.height
    }`;
  }
}
</script>

<style scoped>
svg > polygon {
  fill: transparent;
  stroke: green;
  stroke-width: 1px;
}
</style>
