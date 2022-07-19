<script setup="" lang="ts">
defineProps(["class"]);
</script>

<template>
  <div
    class="text-sm bg-white rounded inline-block border border-slate-300 px-4 py-1 select-none cursor-pointer"
    @click="$emit('klik')"
    :class="class"
  >
    <slot></slot>
  </div>
</template>
