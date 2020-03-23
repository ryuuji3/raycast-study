<template>
  <div id="app">
    <surface />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Surface from "@/components/Surface.vue";

@Component({
  components: { Surface }
})
export default class App extends Vue {}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  color: white;
  background-color: #111;
}
</style>
