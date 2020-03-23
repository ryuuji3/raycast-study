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
  height: 100%;
}

body {
  margin: 0;
  padding: 0;

  color: white;
  background-color: #111;
}

  #app {
    width: 100%;
    height: 100%;
  }
</style>
