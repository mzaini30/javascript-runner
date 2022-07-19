import { readFileSync, writeFileSync } from "fs";

let content = readFileSync("dist/index.html").toString();
content = content.replace(
  /<script type="module" crossorigin/g,
  '<script type="module" crossorigin defer'
);
// .replace(/<script nomodule/g, "<script")
// .replace(/type=.module./g, "type=nothing");
writeFileSync("dist/index.html", content);
