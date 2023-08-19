<template>
  <div
    class="editable"
    v-html="html"
    @click="$emit('change', {})"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EditableData',
  props: {
    html: String,
    value: String || Object,
    icon: {
      type: String,
      default: '',
    },
  },
});
</script>
