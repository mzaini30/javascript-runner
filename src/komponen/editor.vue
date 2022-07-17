<script setup="" lang="ts">
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { onMounted, onUpdated, ref } from "vue";

let isi = "";
if (localStorage.isi) {
  isi = localStorage.isi;
}

onMounted(() => {
  const elEditor = document.querySelector(".editor");
  if (elEditor) {
    let editor = new EditorView({
      doc: isi,
      extensions: [basicSetup, javascript()],
      parent: elEditor,
    });
  }
});
</script>

<template>
  <div class="editor"></div>
</template>
