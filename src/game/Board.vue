<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
       class="vuego-board"
       :height="size" :width="size"
       @mousemove="mouseMove"
       @mouseleave="mouseLeave"
       @click.capture="click">
    <grid :size="size" :game-size="gameSize"></grid>
    <g>
      <stone v-for="s in stones" :size="cellSize/2" :x="pointToCoordinate(s.x)" :y="pointToCoordinate(s.y)" :color="s.color"></stone>
    </g>
    <g v-if="hover">
      <stone class="vuego-stone-hover" :size="cellSize/2" :x="pointToCoordinate(hover.x)" :y="pointToCoordinate(hover.y)" :color="currentTurn"></stone>
    </g>
  </svg>
</template>

<script>
import Stone from './Stone';
import Grid from './Grid';

import { playerTurn } from './actions';

import offset from 'mouse-event-offset';

import map from 'lodash/fp/map';
import flatMap from 'lodash/fp/flatMap';
import filter from 'lodash/fp/filter';
import range from 'lodash/fp/range';

let range0 = range(0);
let compact = filter(Boolean);

export default {
  props: {
    size: {
      type: Number,
      default: 350
    }
  },
  data () {
    return {
      hover: null
    };
  },
  computed: {
    cellSize: function () {
      return this.size / this.gameSize;
    }
  },
  components: {
    Stone,
    Grid
  },
  methods: {
    mouseMove: function (event) {
      if (!this.currentTurn) {
        return;
      }

      let [x, y] = map(this.coordinateToPoint)(offset(event));
      this.hover = {
        x,
        y
      };
    },
    mouseLeave: function (event) {
      this.hover = null;
    },
    click: function (event) {
      let [x, y] = map(this.coordinateToPoint)(offset(event));

      this.play(x, y);
    },
    pointToCoordinate: function (x) {
      let cs = this.cellSize;
      return x * cs + cs / 2.0;
    },
    coordinateToPoint: function (x) {
      return Math.abs(Math.round((x - this.cellSize / 2) / this.cellSize));
    }
  },
  vuex: {
    actions: {
      play: playerTurn
    },
    getters: {
      gameSize (state) {
        return state.size;
      },
      currentTurn (state) {
        return state.current_turn;
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

<style>
.vuego-board {
  cursor: none;
}

.vuego-stone-hover {
  fill-opacity: .75;
}
</style>

