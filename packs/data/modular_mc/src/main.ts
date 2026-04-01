import mc from "@minecraft/server";
import { test } from "@src/module.ts";

mc.world.afterEvents.worldLoad.subscribe(() => {
  console.log("Hello, Modular MC!");
  console.log(test.foo);
});
