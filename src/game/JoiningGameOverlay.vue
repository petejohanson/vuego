<template>
  <div class="overlay">
    <div>
      <div class="overlay-container">
        <mdl-spinner></mdl-spinner>
        <h6>Joining Game</h6>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import { MdlSpinner } from 'vue-mdl';

export default {
  components: {
    MdlSpinner
  }
}
</script>

<style scoped lang="scss">

@import '../style.scss';

.overlay {
  background-color: transparent;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.overlay > * {
  height: 100%;
  width: auto;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.overlay-container {
  @extend .mdl-shadow--2dp;
  border-radius: 2px;
  background-color: #fff;
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.overlay-container > * {
  margin: 0 8px;
  padding: 0;
}
</style>
