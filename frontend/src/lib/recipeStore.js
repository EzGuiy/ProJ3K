import { readJson } from "./jsonDb";

export function getRecipes() {
  const data = readJson("recipes.json", {});
  return data && typeof data === "object" ? data : {};
}
