import * as mc from "@minecraft/server";

mc.world.afterEvents.entitySpawn.subscribe(({ entity }) => {
  if (entity.typeId === "modular_mc:script_entity") {
    console.log("Script entity spawned!");
  }
});
