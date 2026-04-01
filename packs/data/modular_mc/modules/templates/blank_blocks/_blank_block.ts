import { BlockObjectInterface } from "./blockObject.d.ts";

export const blockObjects: BlockObjectInterface[] = [
  {
    id: "modularmc:blank_block",
    name: "Blank Block",
    category: "construction",
    group: "aaa",
    is_hidden_in_commands: false,
    texture: "textures/blank_block.png",
    render_method: "opaque",
    map_color: "#000000",
    components: {},
  },
  {
    id: "modularmc:blank_block2",
    texture: "textures/blank_block.png",
  },
  {
    id: "modularmc:geometry_block",
    texture: "textures/blank_block.png",
    geometry: "geometry.geometry_block",
  },
];
