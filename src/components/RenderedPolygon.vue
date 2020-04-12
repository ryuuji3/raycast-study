<template>
  <g @mousedown="e => $emit('mousedown', e)" :class="{ selected }">
    <selection-rectangle
      v-if="selected"
      :x="x"
      :y="y"
      :width="width"
      :height="height"
      :selected="selected"
    />
    <polygon :points="pointsToSvgPoints" />
  </g>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import { Coordinates } from "@/models";
import SelectionRectangle from "@/components/SelectionRectangle.vue";

@Component({
  components: { SelectionRectangle }
})
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

g:hover {
  cursor: grab;
}

g.selected {
  cursor: grabbing;
}

polygon {
  fill: transparent;
  stroke: green;
  stroke-width: 1px;
}
</style>
