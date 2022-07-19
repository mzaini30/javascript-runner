<script setup lang="ts">
import Info from "../komponen/info.vue";
import Container from "../layouts/container.vue";
import Tombol from "../komponen/tombol.vue";
import { ref } from "vue";

const elTambah = ref(false);
</script>

<template>
  <Info></Info>
  <Container>
    <Tombol class="!bg-black text-white" @klik="elTambah = !elTambah"
      >add</Tombol
    >
    <div class="mt-3 border border-slate-300 p-2 rounded" v-if="elTambah">
      <input
        type="text"
        placeholder="Write here"
        class="focus:outline-none text-sm border border-slate-300 rounded px-2 py-1 block w-full mb-3"
      />
      <Tombol class="block">submit</Tombol>
    </div>
  </Container>
</template>
