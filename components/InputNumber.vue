<template>
  <input type="number" @input="$emit('update:value', $event.target.value)" :value="value" class="w-full p-2.5 my-1 border-0 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary text-gray-900 rounded-lg" :placeholder="placeholder" />
</template>

<script setup>
const props = defineProps(['value', 'placeholder'])
defineEmits(['update:value'])
</script>