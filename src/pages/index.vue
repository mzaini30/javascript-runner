<script setup lang="ts">
import Info from "../komponen/info.vue";
import Container from "../layouts/container.vue";
import Tombol from "../komponen/tombol.vue";
import { Ref, ref } from "vue";
import { useRouter } from "vue-router";

const listKode: Ref<any> = ref([]);
const elTambah = ref(false);
const mauDitambah = ref("");

const { parse, stringify } = JSON;
const { push } = useRouter();

if (localStorage.listKode) {
  listKode.value = parse(localStorage.listKode);
}

function tambah() {
  listKode.value = [
    {
      id: Math.random().toString().replace("0.", ""),
      nama: mauDitambah.value,
    },
    ...listKode.value,
  ];
  localStorage.listKode = stringify(listKode.value);
  mauDitambah.value = "";
  elTambah.value = false;
}
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
        v-model="mauDitambah"
      />
      <Tombol class="block" @klik="tambah">submit</Tombol>
    </div>

    <div class="mt-3">
      <span v-for="x in listKode">
        <Tombol @klik="push(`/${x.id}`)" class="mr-2 mb-2">{{ x.nama }}</Tombol>
      </span>
    </div>
  </Container>
</template>
