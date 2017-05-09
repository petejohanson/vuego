<template>
  <dialog ref="newGame" class="mdl-dialog" @close="close">
    <h6 class="mdl-dialog__title">New Game</h6>
    <div class="mdl-dialog__content">
      <div class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label" ref="size">
        <select id="game-size" class="mdl-selectfield__select" v-model="size">
          <option v-for="s in sizes" :value="s">{{s}}</option>
        </select>
        <label for="game-size" class="mdl-selectfield__label">Game Size</label>
      </div>
      <mdl-switch v-model="remoteGame" id="play-online" v-if="online">Play Online</mdl-switch>
    </div>
    <div class="mdl-dialog__actions">
      <mdl-button v-mdl-ripple-effect :disabled="!size" @click.native="doNewGame">New Game</mdl-button>
      <mdl-button v-mdl-ripple-effect @click.native="close">Cancel</mdl-button>
    </div>
  </dialog>
</template>

<script type="text/babel">
import pf from 'dialog-polyfill';

import { MdlSwitch, MdlButton, MdlRippleEffect } from 'vue-mdl';

import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters(['online'])
  },
  methods: {
    doNewGame: function () {
      this.$emit('new-game', { size: this.size, remoteGame: this.remoteGame });
    },
    close: function () {
      this.$emit('cancel');
    }
  },
  mounted () {
    if (!this.$refs.newGame.showModal) {
      pf.registerDialog(this.$refs.newGame);
    }
    componentHandler.upgradeElement(this.$refs.size);
    this.$refs.newGame.showModal();
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
