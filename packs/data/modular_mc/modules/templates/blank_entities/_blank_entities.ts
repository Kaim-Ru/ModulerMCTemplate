import { EntityObjectInterface } from "./entityObject.d.ts";

export const entityObjects: EntityObjectInterface[] = [
  {
    id: "modularmc:blank_entity",
    name: "Blank Entity",
    resource: {
      texture: "textures/blank_entity.png",
      geometry: "geometry.blank_entity",
      spawn_egg_texture: "textures/blank_entity_spawn_egg.png",
    },
    components: {},
  },
  {
    id: "modularmc:blank_entity2",
  },
];
