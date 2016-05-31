<template>
  <dialog v-el:invite-opponent class="mdl-dialog">
    <h6 class="mdl-dialog__title">Invite Player</h6>
    <div class="mdl-dialog__content">
      <div class="invite-url-container">
        <mdl-textfield :value="invitationUrl" readonly v-el:invite-url></mdl-textfield>
        <mdl-tooltip for="copy_invite">Copy Invite URL</mdl-tooltip>
        <mdl-button id="copy_invite" icon="content_copy" @click="copyInvite"></mdl-button>
      </div>
      <mdl-progress indeterminate></mdl-progress>
    </div>
    <div class="mdl-dialog__actions">
      <mdl-button @click="cancel">Cancel</mdl-button>
    </div>
  </dialog>
</template>

<script type="text/babel">
import pf from 'dialog-polyfill';

import { MdlButton, MdlTooltip, MdlTextfield, MdlProgress } from 'vue-mdl';

export default {
  components: {
    MdlTextfield,
    MdlButton,
    MdlTooltip,
    MdlProgress
  },
  computed: {
    invitationUrl: function () {
      return window.location.origin + `/?join=${this.inviteId}`;
    }
  },
  vuex: {
    getters: {
      inviteId: state => state.remoteInviteId
    }
  },
  methods: {
    copyInvite: function () {
      this.$els.inviteUrl.querySelector('input').select();
      document.execCommand('copy');
    },
    cancel: function () {
      this.$emit('cancel');
    }
  },
  ready () {
    if (!this.$els.inviteOpponent.showModal) {
      pf.registerDialog(this.$els.inviteOpponent);
    }
    this.$els.inviteOpponent.showModal();
  }
}
</script>

<style scoped>
  .invite-url-container {
    display: flex;
    flex-direction: row;
  }

  #copy_invite {
    margin: 16px 0;
  }
</style>
