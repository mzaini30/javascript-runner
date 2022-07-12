<script setup lang="ts">
import { Ref, ref } from "vue";

const { parse, stringify } = JSON;

const info: Ref<any> = ref({
  slug: "",
  judul: "",
});

if (localStorage.info) {
  info.value = parse(localStorage.info);
}

async function dapatkan() {
  let data = await fetch("https://android.zenia.my.id/pertama.json");
  data = await data.json();
  info.value = data;
  localStorage.info = stringify(data);
}
dapatkan();
</script>

<template>
  <div class="text-center bg-black text-sm text-white p-2 select-none">
    <a
      class="underline decoration-dotted"
      :href="`https://android.zenia.my.id/tulisan/${info.slug}`"
      >{{ info.judul }}</a
    >
  </div>
</template>
