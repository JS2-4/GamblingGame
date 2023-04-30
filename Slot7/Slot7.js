/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Slot7 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Slot_7", "./Slot7/costumes/Slot_7.png", { x: 228, y: 230 }),
      new Costume("Slot_Apple", "./Slot7/costumes/Slot_Apple.png", {
        x: 228,
        y: 230
      }),
      new Costume("Slot_Bar", "./Slot7/costumes/Slot_Bar.png", {
        x: 228,
        y: 230
      }),
      new Costume("Slot_Cherry", "./Slot7/costumes/Slot_Cherry.png", {
        x: 228,
        y: 230
      }),
      new Costume("Slot_Grape", "./Slot7/costumes/Slot_Grape.png", {
        x: 228,
        y: 230
      }),
      new Costume("Slot_Lemon", "./Slot7/costumes/Slot_Lemon.png", {
        x: 228,
        y: 230
      })
    ];

    this.sounds = [
      new Sound("SlotRoll", "./Slot7/sounds/SlotRoll.wav"),
      new Sound("SlotStop", "./Slot7/sounds/SlotStop.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Slottime" },
        this.whenIReceiveSlottime
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "StartDaRollen" },
        this.whenIReceiveStartdarollen
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "StartV2" },
        this.whenIReceiveStartv2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "StartV2" },
        this.whenIReceiveStartv3
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "StartV2" },
        this.whenIReceiveStartv4
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Stop everything" },
        this.whenIReceiveStopEverything
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveSlottime() {
    this.visible = true;
    this.effects.ghost = 100;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost -= 10;
      yield;
    }
    this.broadcast("amounabetslot");
  }

  *whenIReceiveStartdarollen() {
    yield* this.startSound("SlotRoll");
    for (let i = 0; i < 19; i++) {
      this.costume = this.random(1, 6);
      yield* this.wait(0.08);
      yield;
    }
    this.stage.vars.slotvalue = this.random(1, 6);
    this.costume = this.stage.vars.slotvalue;
    yield* this.wait(0.08);
    yield* this.startSound("SlotStop");
  }

  *whenIReceiveStartv2() {
    this.visible = false;
  }

  *whenIReceiveStartv3() {
    this.visible = false;
  }

  *whenIReceiveStartv4() {
    this.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *whenIReceiveStopEverything() {
    /* TODO: Implement stop other scripts in sprite */ null;
  }
}
