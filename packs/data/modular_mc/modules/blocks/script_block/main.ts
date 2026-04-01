import * as mc from "@minecraft/server";

mc.world.afterEvents.playerPlaceBlock.subscribe(({ block }) => {
  if (block.typeId === "modularmc:script_block") {
    console.log("Block placed!");
  }
});
