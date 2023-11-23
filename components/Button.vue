<template>
  <button class="button bg-primary">
    <slot></slot>
  </button>
</template>

<style>
.button {
  @apply px-4 py-2 mt-2 rounded-lg font-bold text-white flex flex-row;
}

.button svg {
  @apply mr-2;
}
</style>