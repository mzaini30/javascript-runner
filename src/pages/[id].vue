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

function save(): void {
  const elemen = document.querySelector(".cm-content");
  if (elemen) {
    const diformat = prettier.format((elemen as HTMLElement).innerText, {
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

    localStorage.isi = diformat;
    // @ts-ignore
    swal("Saved");
    // location.reload();
  }
}

function run(): void {
  save();
  const elemen = document.querySelector(".cm-content");
  if (elemen) {
    let konten = (elemen as HTMLElement).innerText;
    konten = konten.replace(/(alert\()(.*)(\))/g, "await swal(($2).toString())");
    const acak = Math.random().toString().replace("0.", "");
    konten = `async function init_${acak}(){
      ${konten}
    }
    init_${acak}()`;
    // @ts-ignore
    panggil5140(konten)
  }
}
</script>

<template>
  <div class="mb-50px">
    <!-- <Info /> -->
    <Editor></Editor>
  </div>
  <Grid>
    <Tombol @klik="save">save</Tombol>
    <Tombol @klik="run">run</Tombol>
  </Grid>
</template>
