export const MAP = [
  {
    source: "*.item.json",
    target: `:auto`,
  },
  {
    source: "*.item.png",
    target: `:auto`,
  },
  {
    source: "item_texture.json",
    target: `RP/textures/item_texture.json`,
    onConflict: "merge",
  },
  {
    source: "en_US.lang",
    target: `RP/texts/en_US.lang`,
    onConflict: "appendEnd",
  },
];

export const SCRIPTS = ["./main.ts"];
