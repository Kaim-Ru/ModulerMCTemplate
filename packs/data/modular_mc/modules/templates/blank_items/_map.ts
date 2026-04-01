import { itemObjects } from "./_blank_items.ts";

export const MAP = itemObjects.flatMap((itemObject) => {
  const itemIdWithoutNamespace = itemObject.id.split(":")[1];
  const defaultItemObject = {
    format_version: "1.20.50",
    name: itemObject.name,
    texture: `textures/${itemIdWithoutNamespace}.png`,
    category: "equipment",
    group: undefined,
    is_hidden_in_commands: undefined,
    components: {
      "minecraft:max_stack_size": itemObject.max_stack_size ?? 64,
      "minecraft:icon": itemObject.id,
    },
  };
  const normalizedItemObject = {
    ...defaultItemObject,
    ...itemObject,
    components: {
      ...defaultItemObject.components,
      ...itemObject.components,
    },
  };
  return [
    {
      source: "blank_item.item.json",
      target: `BP/items/${itemIdWithoutNamespace}.item.json`,
      jsonTemplate: true,
      scope: normalizedItemObject,
    },
    {
      source: normalizedItemObject.texture,
      target: `RP/textures/items/${normalizedItemObject.texture.split("/").pop()}`,
      onConflict: "skip",
    },
    {
      source: "item_texture.json",
      target: `RP/textures/item_texture.json`,
      onConflict: "merge",
      jsonTemplate: true,
      scope: normalizedItemObject,
    },
    {
      source: "en_US.lang",
      target: `RP/texts/en_US.lang`,
      onConflict: "appendEnd",
      textTemplate: true,
      scope: normalizedItemObject,
    },
  ];
});
