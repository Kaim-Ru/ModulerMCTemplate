import * as mc from "@minecraft/server";

mc.world.afterEvents.itemUse.subscribe(({ itemStack }) => {
  if (itemStack.typeId === "modularmc:script_item") {
    console.log("item used!");
  }
});
