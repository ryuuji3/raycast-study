<template>
  <g @mousedown="e => $emit('mousedown', e)" :class="{ selected }">
    <rect v-if="selected" :x="x" :y="y" :width="width" :height="height" />
    <polygon :points="pointsToSvgPoints" />
  </g>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import { Coordinates } from "@/models";

@Component({})
export default class PolygonSvg extends Vue {
  @Prop(Array)
  readonly points!: Array<Coordinates>;

  @Prop(Number)
  readonly x!: number;

  @Prop(Number)
  readonly y!: number;

  @Prop(Number)
  readonly width!: number;

  @Prop(Number)
  readonly height!: number;

  @Prop(Boolean)
  readonly selected!: boolean;

  get pointsToSvgPoints() {
    return this.points.reduce(
      (points, point) => `${points} ${point.x},${point.y}`,
      ""
    );
  }
}
</script>

<style scoped>
g {
  z-index: 10;
}

rect {
  stroke: green;
}

g.selected > rect {
  stroke-dasharray: 10;
  animation: selected 500ms linear infinite;
}

g:hover {
  cursor: grab;
}

g.selected {
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
