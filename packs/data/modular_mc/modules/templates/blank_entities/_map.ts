import { entityObjects } from "./_blank_entities.ts";

export const MAP = entityObjects.flatMap((entityObject) => {
  const entityIdWithoutNamespace = entityObject.id.split(":")[1];
  const defaultEntityObject = {
    format_version: "1.16.100",
    name: entityIdWithoutNamespace,
    is_spawnable: entityObject.resource ? true : false,
    is_summonable: true,
    is_experimental: false,
    resource: {
      texture: `textures/${entityIdWithoutNamespace}.png`,
      geometry: `geometry.${entityIdWithoutNamespace}`,
      spawn_egg_texture: `textures/${entityIdWithoutNamespace}_spawn_egg.png`,
    },
    components: {
      "minecraft:physics": {
        has_gravity: true,
        has_collision: true,
      },
      "minecraft:pushable": {
        is_pushable: true,
      },
      "minecraft:collision_box": {
        height: 1.0,
        width: 1.0,
      },
      "minecraft:push_through": {
        value: 1,
      },
    },
  };
  const normalizedEntityObject = {
    ...defaultEntityObject,
    ...entityObject,
    resource: {
      ...defaultEntityObject.resource,
      ...entityObject.resource,
    },
    components: {
      ...defaultEntityObject.components,
      ...entityObject.components,
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
      source: "blank_entity.behavior.json",
      target: `BP/entities/${entityIdWithoutNamespace}.behavior.json`,
      jsonTemplate: true,
      scope: normalizedEntityObject,
    },
    {
      source: "en_US.lang",
      target: `RP/texts/en_US.lang`,
      onConflict: "appendEnd",
      textTemplate: true,
      scope: normalizedEntityObject,
    },
  ];
  if (entityObject.resource) {
    Mapping.push(
      {
        source: normalizedEntityObject.resource.texture,
        target: `RP/textures/entity/${normalizedEntityObject.resource.texture.split("/").pop()}`,
        onConflict: "skip",
      },
      {
        source: normalizedEntityObject.resource.spawn_egg_texture,
        target: `RP/textures/items/${normalizedEntityObject.resource.spawn_egg_texture.split("/").pop()}`,
        onConflict: "skip",
      },
      {
        source: `models/${normalizedEntityObject.resource.geometry.split(".")[1]}.geo.json`,
        target: `RP/models/entity/${normalizedEntityObject.resource.geometry.split(".")[1]}.geo.json`,
        onConflict: "skip",
      },
      {
        source: "item_texture.json",
        target: `RP/textures/item_texture.json`,
        onConflict: "merge",
        jsonTemplate: true,
        scope: normalizedEntityObject,
      },
      {
        source: "blank_entity.entity.json",
        target: `RP/entity/${entityIdWithoutNamespace}.entity.json`,
        jsonTemplate: true,
        scope: normalizedEntityObject,
      },
    );
  }
  return Mapping;
});
