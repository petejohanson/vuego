<template>
  <dialog v-el:join-game class="mdl-dialog">
    <h6 class="mdl-dialog__title">Join Game</h6>
    <div class="mdl-dialog__content">
      <mdl-textfield label="Game ID" :value.sync="gameId"></mdl-textfield>
    </div>
    <div class="mdl-dialog__actions">
      <mdl-button v-mdl-ripple-effect :disabled="!gameId" @click="joinGame">Join Game</mdl-button>
      <mdl-button v-mdl-ripple-effect @click="close">Cancel</mdl-button>
    </div>
  </dialog>
</template>

<script type="text/babel">
import pf from 'dialog-polyfill';

import { MdlTextfield, MdlButton, MdlRippleEffect } from 'vue-mdl';

export default {
  components: {
    MdlTextfield,
    MdlButton
  },
  directives: {
    MdlRippleEffect
  },
  data: function () {
    return {
      gameId: ''
    };
  },
  methods: {
    joinGame: function () {
      this.$emit('join-game', { gameId: this.gameId });
    },
    close: function () {
      this.$emit('cancel');
    }
  },
  ready () {
    if (!this.$els.joinGame.showModal) {
      pf.registerDialog(this.$els.joinGame);
    }
    this.$els.joinGame.showModal();
  }
}
</script>

<style scoped>

</style>
