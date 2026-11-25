import fs from "fs";
import path from "path";

function filePath(filename) {
  const p1 = path.join(process.cwd(), "data", filename);
  if (fs.existsSync(p1)) return p1;
  const p2 = path.join(process.cwd(), "ProJ3K", "data", filename);
  if (fs.existsSync(p2)) return p2;
  return fs.existsSync(path.join(process.cwd(), "ProJ3K")) ? p2 : p1;
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
