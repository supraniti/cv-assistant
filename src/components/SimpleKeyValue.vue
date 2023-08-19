<template>
  <div
    class="key-value-wrapper"
  >
    <q-item-label class="key-value-label" overline v-if="labelText">{{labelText}}</q-item-label>
    <q-item-label class="key-value-value"  v-if="value">{{value}}</q-item-label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SimpleKeyValue',
  props: {
    labelText: {
      type: String,
    },
    value: {
      type: [Date, String, Number],
    },
    type: {
      type: String,
      default: 'textRegular',
    },
  },
});
</script>
