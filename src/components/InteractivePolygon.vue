<template>
  <svg
    :viewBox="viewBox"
    :width="width"
    :height="height"
    :style="style"
    @mousedown="onDragStart"
    @mouseup="onDragEnd"
    ref="dragZone"
  >
    <rect
      :x="polygon.leftMostX"
      :y="polygon.topMostY - height"
      :width="width"
      :height="height"
      :class="{ selected }"
    />
    <polygon :points="points" />
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Emit } from "vue-property-decorator";

import { Polygon } from "@/models";

@Component({})
export default class InteractivePolygon extends Vue {
  @Prop(Polygon)
  readonly polygon!: Polygon;

  @Prop(Number)
  readonly x!: number;

  @Prop(Number)
  readonly y!: number;

  @Ref("dragZone")
  readonly dragZone!: SVGElement;

  dragOffsetX: number | null = null;
  dragOffsetY: number | null = null;

  get dragging() {
    return this.dragOffsetX != null && this.dragOffsetY != null;
  }

  // TODO: Represents an edit state as well.
  get selected() {
    return this.dragging;
  }

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

  onDragStart(e: MouseEvent) {
    this.dragOffsetX = e.clientX - this.x;
    this.dragOffsetY = e.clientY - this.y;
    document.addEventListener("mouseup", this.onDragEnd);
    document.addEventListener("mousemove", this.onMouseMove);
  }

  onDragEnd() {
    this.dragOffsetX = null;
    this.dragOffsetY = null;
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onDragEnd);
  }

  @Emit("drag")
  onMouseMove(e: MouseEvent) {
    return {
      x: e.clientX - (this.dragOffsetX || 0),
      y: e.clientY - (this.dragOffsetY || 0)
    };
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

rect.selected {
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
