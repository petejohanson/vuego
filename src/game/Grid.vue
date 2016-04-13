<template>
  <g>
    <line v-for="x in centers" :x1="x" :x2="x" :y1="cellSize/2" :y2="size-cellSize/2" stroke="black" stroke-width="1"></line>
    <line v-for="y in centers" :y1="y" :y2="y" :x1="cellSize/2" :x2="size-cellSize/2" stroke="black" stroke-width="1"></line>
    <circle v-for="dot in guides" :cx="pointToCoordinate(dot.x)" :cy="pointToCoordinate(dot.y)" r="3"></circle>
  </g>
</template>


<script>
import map from 'lodash/fp/map';
import range from 'lodash/fp/range';

const GUIDE_DOTS = {
  19: [
    { x: 3, y: 3 },
    { x: 9, y: 3 },
    { x: 15, y: 3 },
    { x: 3, y: 9 },
    { x: 9, y: 9 },
    { x: 15, y: 9 },
    { x: 3, y: 15 },
    { x: 9, y: 15 },
    { x: 15, y: 15 }
  ],
  13: [
    { x: 3, y: 3 },
    { x: 9, y: 3 },
    { x: 3, y: 9 },
    { x: 9, y: 9 },
    { x: 6, y: 6 }
  ]
};

export default {
  props: ['size', 'gameSize'],
  methods: {
    pointToCoordinate: function (x) {
      let cs = this.cellSize;
      return x * cs + cs / 2.0;
    }
  },
  computed: {
    cellSize: function () {
      return this.size / this.gameSize;
    },
    guides: function () {
      return GUIDE_DOTS[this.gameSize];
    },
    centers: function () {
      let cs = this.cellSize;
      return map(c => {
        return c * cs + cs / 2;
      })(range(0)(this.gameSize));
    }
  }
}
</script>
