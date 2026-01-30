import { mkdirSync, copyFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

mkdirSync("dist/ru", { recursive: true });
copyFileSync("style.css", "dist/style.css");
copyFileSync("style.css", "dist/ru/style.css");

run("pandoc", [
  "resume.en.md",
  "--standalone",
  "--css",
  "style.css",
  "-o",
  "dist/index.html",
]);

run("pandoc", [
  "resume.ru.md",
  "--standalone",
  "--css",
  "style.css",
  "-o",
  "dist/ru/index.html",
]);
