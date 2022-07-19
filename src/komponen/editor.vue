<script setup="" lang="ts">
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { onMounted, onUpdated, ref } from "vue";

const props = defineProps(["id"]);

let isi = "";
if (localStorage[`kode_${props.id}`]) {
  isi = localStorage[`kode_${props.id}`];
}

onMounted(() => {
  // const { EditorView, basicSetup } = await import("codemirror");
  // const { javascript } = await import("@codemirror/lang-javascript");

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
