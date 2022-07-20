<script setup lang="ts">
import Tombol from "../komponen/tombol.vue";
import Grid from "../layouts/grid.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

const isi = ref("");

const { params } = useRoute();
const { replace } = useRouter();
const { parse, stringify } = JSON;

if (localStorage[`kode_${params.id}`]) {
  isi.value = localStorage[`kode_${params.id}`];
}

let selaluSimpan: number;
onMounted(
  () =>
    (selaluSimpan = setInterval(() => {
      localStorage[`kode_${params.id}`] = isi.value;
    }, 5000))
);
onUnmounted(() => clearInterval(selaluSimpan));

function run(): void {
  // @ts-ignore
  const diformat = prettier.format(isi.value, {
    parser: "babel",
    // @ts-ignore
    plugins: prettierPlugins,
  });

  isi.value = diformat;

  localStorage[`kode_${params.id}`] = isi.value;

  let konten = isi.value.replace(
    /(alert\()(.*)(\))/g,
    "await swal(($2).toString())"
  );
  const acak = Math.random().toString().replace("0.", "");
  konten = `async function init_${acak}(){
      ${konten}
      
    }
    init_${acak}()`;

  // @ts-ignore
  mantapmantapmantap(konten);
}

async function hapus() {
  const tanya = await Swal.fire("Delete?");
  if (tanya.isConfirmed) {
    let data = parse(localStorage.listKode);
    data = data.filter((x: any) => x.id != params.id);
    localStorage.listKode = stringify(data);

    localStorage.removeItem(`kode_${params.id}`);
    replace("/");
  }
}
</script>

<template>
  <div class="mb-50px">
    <textarea
      class="focus:outline-none w-full p-2 whitespace-pre"
      cols="30"
      rows="10"
      v-model="isi"
    ></textarea>
  </div>
  <Grid>
    <Tombol @klik="hapus">delete</Tombol>
    <Tombol @klik="run">run</Tombol>
  </Grid>
</template>

<style scoped="">
textarea {
  height: calc(100vh - 56px);
}
</style>
