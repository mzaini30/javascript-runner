<template>
  <div
    class="text-sm bg-white rounded border border-slate-300 px-4 py-1 select-none cursor-pointer"
    @click="$emit('klik')"
  >
    <slot></slot>
  </div>
</template>
