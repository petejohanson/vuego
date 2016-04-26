<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
       class="vuego-board"
       v-el:board
       :view-box.camel="viewBox"
       preserveAspectRatio="xMidYMid meet"
       @mousemove="mouseMove"
       @mouseleave="mouseLeave"
       @click.capture="click">
    <grid :size="size"></grid>
    <g>
      <stone v-for="s in stones" :x="pointToCoordinate(s.x)" :y="pointToCoordinate(s.y)" :color="s.color"></stone>
    </g>
    <g v-if="hover">
      <stone class="vuego-stone-hover" :x="pointToCoordinate(hover.x)" :y="pointToCoordinate(hover.y)" :color="currentTurn"></stone>
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
import { playerTurn } from './actions';

import map from 'lodash/fp/map';
import mapValues from 'lodash/fp/mapValues';
import flatMap from 'lodash/fp/flatMap';
import filter from 'lodash/fp/filter';
import range from 'lodash/fp/range';

let range0 = range(0);
let compact = filter(Boolean);

export default {
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
    }
  },
  components: {
    Stone,
    Grid,
    KoMarker
  },
  methods: {
    mouseMove: function (event) {
      if (!this.currentTurn) {
        return;
      }

      let p = this.eventToPoint(event);
      this.hover = this.isValidPoint(p) ? p : null;
    },
    mouseLeave: function (event) {
      this.hover = null;
    },
    click: function (event) {
      let p = this.eventToPoint(event);

      if (!this.isValidPoint(p)) {
        return;
      }

      this.play(p.x, p.y);
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

      let ctm = this.$els.board.getScreenCTM();

      let { x, y } = point.matrixTransform(ctm.inverse());

      return mapValues(a => this.coordinateToPoint(a))({ x, y });
    }
  },
  vuex: {
    actions: {
      play: playerTurn
    },
    getters: {
      size (state) {
        return state.size;
      },
      currentTurn (state) {
        return state.current_turn;
      },
      ko (state) {
        return state.ko;
      },
      stones (state) {
        // TODO: This is ugly. Must be a nicer lodash/fp way.
        let ret = compact(flatMap(y => {
          return map(x => {
            let color = state.board[y][x];
            if (!color) {
              return null;
            }

            let stone = {
              x,
              y,
              color
            };

            return stone;
          })(range0(state.size));
        })(range0(state.size)));

        return ret;
      }
    }
  }
}
</script>

<style scoped>
.vuego-board {
  display: block;
  cursor: grabbing;
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 300px;
}

.vuego-stone-hover {
  fill-opacity: .75;
}
</style>

