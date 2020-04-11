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

@Component({
  components: { RenderedPolygon }
})
export default class InteractivePolygon extends Vue {
  @Prop(String)
  readonly id!: string;

  dragOffsetX: number | null = null;
  dragOffsetY: number | null = null;

  get dragging() {
    return this.dragOffsetX != null && this.dragOffsetY != null;
  }

  get points() {
    return this.$store.getters[`shapes/${this.id}/points`];
  }

  get x() {
    return this.$store.getters[`shapes/${this.id}/x`];
  }

  get y() {
    return this.$store.getters[`shapes/${this.id}/y`];
  }

  get width() {
    return this.$store.getters[`shapes/${this.id}/width`];
  }

  get height() {
    return this.$store.getters[`shapes/${this.id}/height`];
  }

  // TODO: Represents an edit state as well.
  get selected() {
    return this.dragging;
  }

  @Emit("dragstart")
  onDragStart(e: MouseEvent) {
    document.addEventListener("mouseup", this.onDragEnd);
    document.addEventListener("mousemove", this.onMouseMove);

    return {
      x: e.offsetX,
      y: e.offsetY
    };
  }

  @Emit("dragend")
  onDragEnd() {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onDragEnd);
  }

  @Emit("drag")
  onMouseMove(e: MouseEvent) {
    return {
      x: e.offsetX,
      y: e.offsetY
    };
  }
}
</script>
