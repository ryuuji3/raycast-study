<template>
  <svg
    :viewBox="viewBox"
    :width="width"
    :height="height"
    :style="style"
    @mousedown="e => $emit('mousedown', e)"
    :class="{ selected }"
  >
    <rect
      :x="polygon.leftMostX"
      :y="polygon.topMostY - height"
      :width="width"
      :height="height"
    />
    <polygon :points="points" />
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import { Polygon as PolygonModel } from "@/models";

@Component({})
export default class PolygonSvg extends Vue {
  @Prop(PolygonModel)
  readonly polygon!: PolygonModel;

  @Prop(Number)
  readonly x!: number;

  @Prop(Number)
  readonly y!: number;

  @Prop(Boolean)
  readonly selected!: boolean;

  get style() {
    return {
      top: this.y,
      left: this.x
    };
  }

  get points() {
    return this.polygon.toSvg();
  }

  get width() {
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
}

svg.selected > rect {
  stroke-dasharray: 10;
  animation: selected 500ms linear infinite;
}

svg:hover {
  cursor: grab;
}

svg.selected {
  cursor: grabbing;
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
