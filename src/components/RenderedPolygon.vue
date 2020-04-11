<template>
  <g
    @mousedown="e => $emit('mousedown', e)"
    :class="{ selected }"
    :transform="coordinates"
  >
    <rect
      :x="polygon.leftMostX"
      :y="polygon.topMostY - height"
      :width="width"
      :height="height"
    />
    <polygon :points="points" />
  </g>
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

  get coordinates() {
    return `translate(${this.x},${this.y})`;
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
}
</script>

<style scoped>
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
