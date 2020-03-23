<template>
  <svg
    :viewBox="viewBox"
    :width="width"
    :height="height"
    :style="style"
  >
    <rect :x="polygon.leftMostX" :y="polygon.topMostY - height" :width="width" :height="height" />
    <polygon :points="points" />
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Polygon } from "@/models";

@Component({})
export default class InteractivePolygon extends Vue {
  @Prop(Polygon)
  readonly polygon!: Polygon;

  @Prop(Number)
  readonly x!: number;

  @Prop(Number)
  readonly y!: number;

  get style() {
    return {
      top: this.x,
      left: this.y,
    };
  }

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
    return `0 0 ${this.width} ${this.height}`;
  }
}
</script>

<style scoped>
svg {
  position: relative;
}

rect {
  stroke: green;
  stroke-dasharray: 10;
  animation: selected 500ms linear infinite;
}

@keyframes selected {
  to {
    stroke-dashoffset: 20;
  }
}

polygon {
  fill: transparent;
  stroke: green;
  stroke-width: 1px;
}
</style>
