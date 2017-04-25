<template>
  <ul class="captures">
    <li>Black: {{black}}</li>
    <li>White: {{white}}</li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
import { BLACK, WHITE } from './color';

export default {
  computed: {
    ...mapGetters(['captures']),
    black: function () {
      return this.captures[BLACK];
    },
    white: function () {
      return this.captures[WHITE];
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
