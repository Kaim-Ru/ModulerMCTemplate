import { blockObjects } from "./_blank_block.ts";

export const MAP = blockObjects.flatMap((blockObject) => {
  const defaultBlockObject = {
    format_version: "1.21.100",
    name: blockObject.id.split(":")[1],
    category: "construction",
    group: undefined,
    is_hidden_in_commands: undefined,
    texture: `textures/${blockObject.id.split(":")[1]}.png`,
    components: {
      "minecraft:geometry":
        blockObject.geometry ?? "minecraft:geometry.full_block",
      "minecraft:material_instances": {
        "*": {
          texture: blockObject.id,
          render_method: blockObject.render_method ?? "opaque",
        },
      },
      "minecraft:map_color": blockObject.map_color ?? "#000000",
    },
  };
  const normalizedBlockObject = {
    ...defaultBlockObject,
    ...blockObject,
    components: {
      ...defaultBlockObject.components,
      ...blockObject.components,
    },
  };
  const Mapping: {
    source: string;
    target: string;
    onConflict?:
      | "skip"
      | "merge"
      | "appendEnd"
      | "appendStart"
      | "overwrite"
      | "stop";
    jsonTemplate?: boolean;
    textTemplate?: boolean;
    scope?: object;
  }[] = [
    {
      source: "blank_block.block.json",
      target: `BP/blocks/${normalizedBlockObject.id.split(":")[1]}.block.json`,
      jsonTemplate: true,
      scope: normalizedBlockObject,
    },
    {
      source: normalizedBlockObject.texture,
      target: `RP/textures/blocks/${normalizedBlockObject.texture.split("/").pop()}`,
      onConflict: "skip",
    },
    {
      source: "terrain_texture.json",
      target: `RP/textures/terrain_texture.json`,
      onConflict: "merge",
      jsonTemplate: true,
      scope: normalizedBlockObject,
    },
    {
      source: "en_US.lang",
      target: `RP/texts/en_US.lang`,
      onConflict: "appendEnd",
      textTemplate: true,
      scope: normalizedBlockObject,
    },
  ];
  if (blockObject.geometry) {
    Mapping.push({
      source: `models/${blockObject.geometry.split(".")[1]}.geo.json`,
      target: `RP/models/blocks/${blockObject.geometry.split(".")[1]}.geo.json`,
      onConflict: "skip",
    });
  }
  return Mapping;
});
