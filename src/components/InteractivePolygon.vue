<template>
  <rendered-polygon
    :points="points"
    :x="x"
    :y="y"
    :width="width"
    :height="height"
    :selected="selected"
    :data-shapeid="id"
    @mousedown="onDragStart"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

import RenderedPolygon from "@/components/RenderedPolygon.vue";
import { Coordinates } from "@/models";

@Component({
  components: { RenderedPolygon }
})
export default class InteractivePolygon extends Vue {
  @Prop(String)
  readonly id!: string;

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
  readonly dragging!: boolean;

  // TODO: Represents an edit state as well.
  get selected() {
    return this.dragging;
  }

  @Emit("mousedown")
  onDragStart(e: MouseEvent) {
    document.addEventListener("mouseup", this.onDragEnd);
    document.addEventListener("mousemove", this.onMouseMove);

    return {
      x: e.offsetX,
      y: e.offsetY
    };
  }

  @Emit("mouseup")
  onDragEnd() {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onDragEnd);
  }

  @Emit("mousemove")
  onMouseMove(e: MouseEvent) {
    return {
      x: e.offsetX,
      y: e.offsetY
    };
  }
}
</script>
