<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
       class="board"
       :class="{ 'hover': hover }"
       ref="board"
       :view-box.camel="viewBox"
       preserveAspectRatio="xMidYMid meet"
       @mousemove="mouseMove"
       @mouseleave="mouseLeave"
       @click.capture="click">
    <grid :size="size"></grid>
    <g>
      <stone v-for="s in stones" :x="pointToCoordinate(s.x)" :y="pointToCoordinate(s.y)" :color="s.color" key="'' + s.x + s.y"></stone>
    </g>
    <g v-if="hover">
      <stone class="hover-stone" :x="pointToCoordinate(hover.x)" :y="pointToCoordinate(hover.y)" :color="hover.color"></stone>
    </g>
    <g v-if="ko">
      <ko-marker :x="pointToCoordinate(ko.x)" :y="pointToCoordinate(ko.y)"></ko-marker>
    </g>
  </svg>
</template>

<script type="text/babel">
import Stone from './Stone';
import Grid from './Grid';
import KoMarker from './KoMarker';

import { SCALE } from './graphics';

import map from 'lodash/fp/map';
import mapValues from 'lodash/fp/mapValues';
import flatMap from 'lodash/fp/flatMap';
import filter from 'lodash/fp/filter';
import range from 'lodash/fp/range';

let range0 = range(0);
let compact = filter(Boolean);

export default {
  props: {
    localCurrentTurn: String,
    ko: Object,
    size: Number,
    board: Array
  },
  data () {
    return {
      hover: null
    };
  },
  computed: {
    cellSize: function () {
      return SCALE;
    },
    viewBox: function () {
      return `0 0 ${this.size * SCALE} ${this.size * SCALE}`;
    },
    stones () {
      // TODO: This is ugly. Must be a nicer lodash/fp way.
      let ret = compact(flatMap(y => {
        return map(x => {
          let color = this.board[y][x];
          if (!color) {
            return null;
          }

          let stone = {
            x,
            y,
            color
          };

          return stone;
        })(range0(this.size));
      })(range0(this.size)));

      return ret;
    }
  },
  components: {
    Stone,
    Grid,
    KoMarker
  },
  methods: {
    mouseMove: function (event) {
      if (!this.localCurrentTurn) {
        return;
      }

      let p = this.eventToPoint(event);
      this.hover = this.isValidPoint(p) ? { x: p.x, y: p.y, color: this.localCurrentTurn } : null;
    },
    mouseLeave: function () {
      this.hover = null;
    },
    click: function (event) {
      let p = this.eventToPoint(event);

      if (!this.isValidPoint(p)) {
        return;
      }

      this.$emit('play', { x: p.x, y: p.y });
    },
    isValidPoint (p) {
      let { x, y } = p;
      return x >= 0 && y >= 0 && x < this.size && y < this.size;
    },
    pointToCoordinate: function (x) {
      let cs = this.cellSize;
      return x * cs + cs / 2.0;
    },
    coordinateToPoint: function (x) {
      return Math.round((x - this.cellSize / 2) / this.cellSize);
    },
    eventToPoint: function (event) {
      let point = this.$el.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;

      let ctm = this.$refs.board.getScreenCTM();

      let { x, y } = point.matrixTransform(ctm.inverse());

      return mapValues(a => this.coordinateToPoint(a))({ x, y });
    }
  }
}
</script>

<style scoped>
.board {
  display: block;
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 300px;
}

.board.hover {
  cursor: grabbing;
}

.hover-stone {
  fill-opacity: .75;
}
</style>
