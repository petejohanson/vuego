<template>
  <line class="ko-marker" :x1="topLeft.x" :x2="topRight.x" :y1="topLeft.y" :y2="topRight.y"></line>
  <line class="ko-marker" :x1="topLeft.x" :x2="bottomLeft.x" :y1="topLeft.y" :y2="bottomLeft.y"></line>
  <line class="ko-marker" :x1="topRight.x" :x2="topRight.x" :y1="topRight.y" :y2="bottomRight.y"></line>
  <line class="ko-marker" :x1="bottomLeft.x" :x2="bottomRight.x" :y1="bottomLeft.y" :y2="bottomRight.y"></line>
</template>

<script>
import { SCALE } from './graphics';

export default {
  props: ['x', 'y'],
  computed: {
    topLeft () {
      return { x: this.x - SCALE / 4, y: this.y - SCALE / 4 };
    },
    topRight () {
      return { x: this.x + SCALE / 4, y: this.y - SCALE / 4 };
    },
    bottomLeft () {
      return { x: this.x - SCALE / 4, y: this.y + SCALE / 4 };
    },
    bottomRight () {
      return { x: this.x + SCALE / 4, y: this.y + SCALE / 4 };
    }
  }
}
</script>

<style scoped>
  .ko-marker {
    stroke: black;
    stroke-width: 1;
  }
</style>
