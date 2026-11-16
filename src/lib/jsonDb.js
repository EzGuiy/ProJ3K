import fs from "fs";
import path from "path";

function filePath(filename) {
  return path.join(process.cwd(), "data", filename);
}

export function readJson(filename, fallback) {
  const file = filePath(filename);
  if (!fs.existsSync(file)) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(fallback, null, 2));
    return structuredClone(fallback);
  }
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function writeJson(filename, data) {
  const file = filePath(filename);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
