<template>
  <rect :x="x" :y="y" :width="width" :height="height" :class="{ selected }" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class SelectionRectangle extends Vue {
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
}
</script>

<style scoped>
rect {
  stroke: green;
  fill: transparent;
}

rect.selected {
  stroke-dasharray: 10;
  animation: selected 500ms linear infinite;
}

@keyframes selected {
  to {
    stroke-dashoffset: 20;
  }
}
</style>
