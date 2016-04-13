<template>
  <g>
    <line v-for="x in centers" :x1="x" :x2="x" :y1="cellSize/2" :y2="size-cellSize/2" stroke="black" stroke-width="1"></line>
    <line v-for="y in centers" :y1="y" :y2="y" :x1="cellSize/2" :x2="size-cellSize/2" stroke="black" stroke-width="1"></line>
  </g>
</template>


<script>
import map from 'lodash/fp/map';
import range from 'lodash/fp/range';

export default {
  props: ['size', 'gameSize'],
  computed: {
    cellSize: function () {
      return this.size / this.gameSize;
    },
    centers: function () {
      let cs = this.cellSize;
      return map(c => {
        return c * cs + cs / 2;
      })(range(0)(this.size));
    }
  }
}
</script>
