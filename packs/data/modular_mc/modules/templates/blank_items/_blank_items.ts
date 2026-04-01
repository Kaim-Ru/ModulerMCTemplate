import { ItemObjectInterface } from "./itemObject.d.ts";

export const itemObjects: ItemObjectInterface[] = [
  {
    id: "modularmc:blank_item",
    name: "Blank Item",
    max_stack_size: 64,
    category: "equipment",
  },
  {
    format_version: "1.20.50",
    id: "modularmc:blank_item2",
    name: "Blank Item2",
    texture: "textures/blank_item.png",
    max_stack_size: 2,
    components: {
      "minecraft:fuel": {
        duration: 3,
      },
      "minecraft:hand_equipped": true,
    },
  },
];
