export const MAP = [
  {
    source: "*.behavior.json",
    target: `:auto`,
  },
  {
    source: "*.entity.json",
    target: `:auto`,
  },
  {
    source: "textures/*.item.png",
    target: ":autoFlat",
  },
  {
    source: "textures/*.entity.png",
    target: ":autoFlat",
  },
  {
    source: "models/*.geo.json",
    target: ":autoFlat",
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
