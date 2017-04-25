<template>
  <dialog ref="inviteOpponent" class="mdl-dialog">
    <h6 class="mdl-dialog__title">Invite Player</h6>
    <div class="mdl-dialog__content">
      <div class="invite-url-container">
        <mdl-textfield :value="invitationUrl" readonly ref="inviteUrl"></mdl-textfield>
        <mdl-tooltip target="copy_invite">Copy Invite URL</mdl-tooltip>
        <mdl-button id="copy_invite" icon="content_copy" @click.native="copyInvite"></mdl-button>
      </div>
      <mdl-progress indeterminate></mdl-progress>
    </div>
    <div class="mdl-dialog__actions">
      <mdl-button @click.native="cancel">Cancel</mdl-button>
    </div>
  </dialog>
</template>

<script type="text/babel">
import { mapGetters } from 'vuex';

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
    ...mapGetters([
      'inviteId'
    ]),
    invitationUrl: function () {
      return window.location.origin + `/?join=${this.inviteId}`;
    }
  },
  methods: {
    copyInvite: function () {
      this.$refs.inviteUrl.$el.querySelector('input').select();
      document.execCommand('copy');
    },
    cancel: function () {
      this.$emit('cancel');
    }
  },
  mounted () {
    if (!this.$refs.inviteOpponent.showModal) {
      pf.registerDialog(this.$refs.inviteOpponent);
    }
    this.$refs.inviteOpponent.showModal();
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
