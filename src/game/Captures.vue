<template>
  <ul class="captures">
    <li>Black: {{black}}</li>
    <li>White: {{white}}</li>
  </ul>
</template>

<script>
import { BLACK, WHITE } from './color';

export default {
  vuex: {
    getters: {
      black (state) {
        return state.captures[BLACK];
      },

      white (state) {
        return state.captures[WHITE];
      }
    }
  }
}
</script>

<style scoped>

.captures {
  padding: 0;
  margin: 0;
}

.captures li {
  width: 49%;
  list-style: none;
  display: inline-block;
  margin: 0;
  padding: 0;
}

</style>

