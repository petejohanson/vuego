<template>
  <dialog v-el:new-game class="mdl-dialog">
    <h6 class="mdl-dialog__title">New Game</h6>
    <div class="mdl-dialog__content">
      <div class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label" v-el:size>
        <select id="game-size" class="mdl-selectfield__select" v-model="size">
          <option v-for="s in sizes" :value="s">{{s}}</option>
        </select>
        <label for="game-size" class="mdl-selectfield__label">Game Size</label>
      </div>
      <mdl-switch :checked.sync="remoteGame" id="play-online">Play Online</mdl-switch>
    </div>
    <div class="mdl-dialog__actions">
      <mdl-button v-mdl-ripple-effect :disabled="!size" @click="doNewGame">New Game</mdl-button>
      <mdl-button v-mdl-ripple-effect @click="close">Cancel</mdl-button>
    </div>
  </dialog>
</template>

<script type="text/babel">
import pf from 'dialog-polyfill';

import { MdlSwitch, MdlButton, MdlRippleEffect } from 'vue-mdl';

const sizes = [9, 13, 19];

export default {
  components: {
    MdlSwitch,
    MdlButton
  },
  directives: {
    MdlRippleEffect
  },
  data: function () {
    return {
      sizes,
      size: null,
      remoteGame: false
    };
  },
  methods: {
    doNewGame: function () {
      this.$emit('new-game', { size: this.size, remoteGame: this.remoteGame });
    },
    close: function () {
      this.$emit('cancel');
    }
  },
  ready () {
    if (!this.$els.newGame.showModal) {
      pf.registerDialog(this.$els.newGame);
    }
    componentHandler.upgradeElement(this.$els.size);
    this.$els.newGame.showModal();
  }
}
</script>

<style scoped>

.new-game-sizes {
  padding: 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}

.new-game-sizes li {
  display: list-item;
  list-style: none;
  width: 33%;
  height: auto;
  align-content: center;
  text-align: center;
}
</style>
