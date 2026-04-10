import { ItemObjectInterface } from "./3ditemObject.d.ts";

export const itemObjects: ItemObjectInterface[] = [
  {
    id: "modularmc:blank_3ditem",
    name: "Blank 3D Item",
    max_stack_size: 64,
    category: "equipment",
  },
  {
    id: "modularmc:blank_3ditem2",
    name: "Blank 3D Item2",
    texture: "textures/blank_3ditem.png",
    geometry: "geometry.blank_3ditem",
    max_stack_size: 16,
    components_item: {
      "minecraft:hand_equipped": true,
    },
    components_block: {
      "minecraft:destructible_by_mining": {
        seconds_to_destroy: 1.5,
      },
    },
  },
];
