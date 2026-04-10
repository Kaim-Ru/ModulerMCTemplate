import { itemObjects } from "./_blank_3ditems.ts";

export const MAP = itemObjects.flatMap((itemObject) => {
  const itemIdWithoutNamespace = itemObject.id.split(":")[1];

  // Default item configuration
  const defaultItemObject = {
    format_version_item: "1.21.70",
    name: itemObject.name,
    texture: `textures/${itemIdWithoutNamespace}.png`,
    category: "equipment",
    group: undefined,
    is_hidden_in_commands: undefined,
    components_item: {
      "minecraft:max_stack_size": itemObject.max_stack_size ?? 64,
      "minecraft:block_placer": {
        block: itemObject.id,
        use_on: [itemObject.id],
        replace_block_item: true,
      },
    },
  };

  // Default block configuration
  const defaultBlockObject = {
    format_version_block: "1.21.70",
    geometry: itemObject.geometry ?? `geometry.${itemIdWithoutNamespace}`,
    components_block: {
      "minecraft:geometry":
        itemObject.geometry ?? `geometry.${itemIdWithoutNamespace}`,
      "minecraft:material_instances": {
        "*": {
          texture: itemObject.id,
          render_method: "alpha_test",
          ambient_occlusion: false,
          face_dimming: false,
        },
      },
    },
  };

  // Normalize item and block objects
  const normalizedItemObject = {
    ...defaultItemObject,
    ...itemObject,
    components_item: {
      ...defaultItemObject.components_item,
      ...itemObject.components_item,
    },
  };

  const normalizedBlockObject = {
    ...defaultBlockObject,
    ...itemObject,
    components_block: {
      ...defaultBlockObject.components_block,
      ...itemObject.components_block,
    },
  };

  // Create mapping for both item and block, plus resources
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
    // Item file
    {
      source: "blank_3ditem.item.json",
      target: `BP/items/${itemIdWithoutNamespace}.item.json`,
      jsonTemplate: true,
      scope: {
        ...normalizedItemObject,
        components: normalizedItemObject.components_item,
      },
    },
    // Block file
    {
      source: "blank_3ditem.block.json",
      target: `BP/blocks/${itemIdWithoutNamespace}.block.json`,
      jsonTemplate: true,
      scope: {
        ...normalizedBlockObject,
        components: normalizedBlockObject.components_block,
      },
    },
    // Texture file
    {
      source: normalizedItemObject.texture,
      target: `RP/textures/items/${normalizedItemObject.texture.split("/").pop()}`,
      onConflict: "skip",
    },
    // Texture definition
    {
      source: "terrain_texture.json",
      target: `RP/textures/terrain_texture.json`,
      onConflict: "merge",
      jsonTemplate: true,
      scope: normalizedItemObject,
    },
    {
      source: `models/${normalizedBlockObject.geometry.split(".")[1]}.geo.json`,
      target: `RP/models/blocks/${normalizedBlockObject.geometry.split(".")[1]}.geo.json`,
      onConflict: "skip",
    },
    // Localization
    {
      source: "en_US.lang",
      target: `RP/texts/en_US.lang`,
      onConflict: "appendEnd",
      textTemplate: true,
      scope: normalizedItemObject,
    },
  ];

  return Mapping;
});
