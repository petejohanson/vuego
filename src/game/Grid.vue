<template>
  <g>
    <line v-for="x in centers" :x1="pointToCoordinate(x)" :x2="pointToCoordinate(x)" :y1="pointToCoordinate(0)" :y2="pointToCoordinate(size-1)" stroke="black" stroke-width="1"></line>
    <line v-for="y in centers" :y1="pointToCoordinate(y)" :y2="pointToCoordinate(y)" :x1="pointToCoordinate(0)" :x2="pointToCoordinate(size-1)" stroke="black" stroke-width="1"></line>
    <circle v-for="dot in guides" :cx="pointToCoordinate(dot.x)" :cy="pointToCoordinate(dot.y)" r="3"></circle>
  </g>
</template>


<script>
import range from 'lodash/fp/range';
import { SCALE } from './graphics';

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
  ],
  9: [
    { x: 2, y: 2 },
    { x: 6, y: 2 },
    { x: 2, y: 6 },
    { x: 6, y: 6 },
    { x: 4, y: 4 }
  ]
};

export default {
  props: ['size'],
  methods: {
    pointToCoordinate: function (x) {
      let cs = this.cellSize;
      return x * cs + cs / 2.0;
    }
  },
  computed: {
    cellSize: function () {
      return SCALE;
    },
    guides: function () {
      return GUIDE_DOTS[this.size];
    },
    centers: function () {
      return range(0)(this.size);
    }
  }
}
</script>
