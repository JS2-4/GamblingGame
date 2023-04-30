/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Slot8 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Slot_7", "./Slot8/costumes/Slot_7.png", { x: 228, y: 230 }),
      new Costume("Slot_Apple", "./Slot8/costumes/Slot_Apple.png", {
        x: 228,
        y: 230
      }),
      new Costume("Slot_Bar", "./Slot8/costumes/Slot_Bar.png", {
        x: 228,
        y: 230
      }),
      new Costume("Slot_Cherry", "./Slot8/costumes/Slot_Cherry.png", {
        x: 228,
        y: 230
      }),
      new Costume("Slot_Grape", "./Slot8/costumes/Slot_Grape.png", {
        x: 228,
        y: 230
      }),
      new Costume("Slot_Lemon", "./Slot8/costumes/Slot_Lemon.png", {
        x: 228,
        y: 230
      })
    ];

    this.sounds = [
      new Sound("SlotRoll", "./Slot8/sounds/SlotRoll.wav"),
      new Sound("SlotStop", "./Slot8/sounds/SlotStop.wav")
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
        { name: "Regular Win Slot" },
        this.whenIReceiveRegularWinSlot
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "times 10" },
        this.whenIReceiveTimes10
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
    yield* this.wait(0.6);
    yield* this.startSound("SlotRoll");
    for (let i = 0; i < 19; i++) {
      this.costume = this.random(1, 6);
      yield* this.wait(0.08);
      yield;
    }
    if (this.random(1, 2) === 1) {
      this.stage.vars.slotvalue3 = this.stage.vars.slotvalue;
      this.costume = this.stage.vars.slotvalue;
      yield* this.wait(0.08);
      yield* this.startSound("SlotStop");
    } else {
      this.stage.vars.slotvalue3 = this.random(1, 6);
      this.costume = this.stage.vars.slotvalue3;
      yield* this.wait(0.08);
      yield* this.startSound("SlotStop");
    }
    yield* this.wait(0.1);
    if (
      this.compare(this.stage.vars.slotvalue, this.stage.vars.slotvalue1) ===
        0 &&
      this.compare(this.stage.vars.slotvalue, this.stage.vars.slotvalue1) ===
        0 &&
      this.compare(this.stage.vars.slotvalue, this.stage.vars.slotvalue2) ===
        0 &&
        this.compare(this.stage.vars.slotvalue, this.stage.vars.slotvalue3) ===
          0
    ) {
      if (this.toNumber(this.stage.vars.slotvalue) === 1) {
        this.stage.vars.moneyy += this.toNumber(this.stage.vars.amountbet) * 4;
        this.broadcast("Won");
        yield* this.wait(1);
        this.broadcast("amounabetslot");
      }
      if (this.toNumber(this.stage.vars.slotvalue) === 2) {
        this.stage.vars.moneyy += this.toNumber(this.stage.vars.amountbet) * 4;
        this.broadcast("Won");
        yield* this.wait(1);
        this.broadcast("amounabetslot");
      }
      if (this.toNumber(this.stage.vars.slotvalue) === 3) {
        this.broadcast("times 10");
        this.broadcast("Won");
        yield* this.wait(1);
        this.broadcast("amounabetslot");
      }
      if (this.toNumber(this.stage.vars.slotvalue) === 4) {
        this.broadcast("Regular Win Slot");
        this.broadcast("Won");
        yield* this.wait(1);
        this.broadcast("amounabetslot");
      }
      if (this.toNumber(this.stage.vars.slotvalue) === 5) {
        this.broadcast("Regular Win Slot");
        this.broadcast("Won");
        yield* this.wait(1);
        this.broadcast("amounabetslot");
      }
      if (this.toNumber(this.stage.vars.slotvalue) === 6) {
        this.broadcast("Regular Win Slot");
        this.broadcast("Won");
        yield* this.wait(1);
        this.broadcast("amounabetslot");
      }
    } else {
      this.stage.vars.moneyy += 0 - this.toNumber(this.stage.vars.amountbet);
      this.broadcast("Lost");
      yield* this.wait(1);
      this.broadcast("amounabetslot");
    }
  }

  *whenIReceiveStartv2() {
    this.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *whenIReceiveRegularWinSlot() {
    this.stage.vars.moneyy += this.toNumber(this.stage.vars.amountbet) * 4;
  }

  *whenIReceiveTimes10() {
    this.stage.vars.moneyy += this.toNumber(this.stage.vars.amountbet) * 10;
  }

  *whenIReceiveStopEverything() {
    /* TODO: Implement stop other scripts in sprite */ null;
  }
}
