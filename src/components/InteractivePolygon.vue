<template>
 <PolygonSvg
    :polygon="polygon"
    :x="x"
    :y="y"
    :selected="selected"
    @mousedown="onDragStart"
 />
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

import { Polygon as PolygonModel } from "@/models";
import PolygonSvg from "@/components/Polygon.vue";

@Component({
  components: { PolygonSvg }
})
export default class InteractivePolygon extends Vue {
  @Prop(PolygonModel)
  readonly polygon!: PolygonModel;

  @Prop(Number)
  readonly x!: number;

  @Prop(Number)
  readonly y!: number;

  dragOffsetX: number | null = null;
  dragOffsetY: number | null = null;

  get dragging() {
    return this.dragOffsetX != null && this.dragOffsetY != null;
  }

  // TODO: Represents an edit state as well.
  get selected() {
    return this.dragging;
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
