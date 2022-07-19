<script setup lang="ts">
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
// import Info from "../komponen/info.vue";
import Editor from "../komponen/editor.vue";
import Tombol from "../komponen/tombol.vue";
import Grid from "../layouts/grid.vue";
// @ts-ignore
// import prettier from "prettier";
import prettier from "../lib/standalone.mjs";
// @ts-ignore
import parserBabel from "../lib/parser-babel.mjs";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

const { params } = useRoute();
const { replace } = useRouter();
const { parse, stringify } = JSON;

function save(): void {
  const elemen: HTMLElement | null = document.querySelector(".cm-content");
  if (elemen) {
    localStorage[`kode_${params.id}`] = elemen.innerText;

    const diformat = prettier.format(elemen.innerText, {
      parser: "babel",
      plugins: [parserBabel],
    });

    const elEditor = document.querySelector(".editor");
    if (elEditor) {
      elEditor.innerHTML = "";
      let editor = new EditorView({
        doc: diformat,
        extensions: [basicSetup, javascript()],
        parent: elEditor,
      });
    }

    localStorage[`kode_${params.id}`] = diformat;

    // location.reload();
  }
}

function simpan() {
  save();
  Swal.fire("Saved");
}

function run(): void {
  save();
  const elemen = document.querySelector(".cm-content");
  if (elemen) {
    let konten = (elemen as HTMLElement).innerText;
    konten = konten.replace(
      /(alert\()(.*)(\))/g,
      "await swal(($2).toString())"
    );
    const acak = Math.random().toString().replace("0.", "");
    konten = `async function init_${acak}(){
      ${konten}
    }
    init_${acak}()`;
    // @ts-ignore
    // panggil5140(konten);

    let script = document.createElement("script");
    script.innerHTML = konten;
    let elScript: HTMLElement | null = document.querySelector(".script");
    if (elScript) {
      elScript.innerHTML = "";
      elScript.appendChild(script);
    }
  }
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
    <!-- <Info /> -->
    <Editor :id="params.id"></Editor>
  </div>
  <Grid>
    <Tombol @klik="simpan">save</Tombol>
    <Tombol @klik="hapus">delete</Tombol>
    <Tombol @klik="run">run</Tombol>
  </Grid>
</template>
