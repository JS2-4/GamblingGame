/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Slotmachine1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "SlotMachine_1",
        "./Slotmachine1/costumes/SlotMachine_1.png",
        { x: 473, y: 360 }
      ),
      new Costume(
        "SlotMachine_2",
        "./Slotmachine1/costumes/SlotMachine_2.png",
        { x: 472.5, y: 360 }
      ),
      new Costume(
        "SlotMachine_3",
        "./Slotmachine1/costumes/SlotMachine_3.png",
        { x: 472.5, y: 360 }
      ),
      new Costume(
        "SlotMachine_4",
        "./Slotmachine1/costumes/SlotMachine_4.png",
        { x: 472.5, y: 360 }
      )
    ];

    this.sounds = [
      new Sound("slot_push", "./Slotmachine1/sounds/slot_push.wav")
    ];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "amounabetcoin" },
        this.whenIReceiveAmounabetcoin
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Slottime" },
        this.whenIReceiveSlottime
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "PULLTHETRIGGER" },
        this.whenIReceivePullthetrigger
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "StartV2" },
        this.whenIReceiveStartv2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Stop everything" },
        this.whenIReceiveStopEverything
      )
    ];
  }

  *whenIReceiveAmounabetcoin() {
    this.effects.ghost -= 25;
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

  *whenIReceivePullthetrigger() {
    yield* this.startSound("slot_push");
    for (let i = 0; i < 3; i++) {
      this.costumeNumber++;
      yield* this.wait(0.03);
      yield;
    }
    this.broadcast("StartDaRollen");
    yield* this.wait(0.08);
    this.costume = "SlotMachine_3";
    yield* this.wait(0.03);
    this.costume = "SlotMachine_2";
    yield* this.wait(0.03);
    this.costume = "SlotMachine_1";
    yield* this.wait(0.03);
  }

  *whenIReceiveStartv2() {
    this.visible = false;
  }

  *whenIReceiveStopEverything() {
    /* TODO: Implement stop other scripts in sprite */ null;
  }
}
