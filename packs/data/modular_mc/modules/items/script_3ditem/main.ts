import * as mc from "@minecraft/server";

mc.world.afterEvents.itemUse.subscribe(({ itemStack }) => {
  if (itemStack.typeId === "modularmc:script_3ditem") {
    console.log("script_3ditem used!");
    // カスタムロジックをここに追加
  }
});
