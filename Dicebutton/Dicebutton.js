/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Dicebutton extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("DiceButton", "./Dicebutton/costumes/DiceButton.png", {
        x: 480,
        y: 258.5
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "StartV2" },
        this.whenIReceiveStartv2
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "CoinFlipTime" },
        this.whenIReceiveCoinfliptime
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Slottime" },
        this.whenIReceiveSlottime
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Stop everything" },
        this.whenIReceiveStopEverything
      )
    ];
  }

  *whenIReceiveStartv2() {
    this.size = 2;
    yield* this.wait(0.8);
    this.visible = true;
    for (let i = 0; i < 10; i++) {
      this.size += 3;
      yield;
    }
    this.size -= 3;
    while (!!this.touching("mouse")) {
      yield;
    }
    this.size = 24;
    while (true) {
      if (this.touching("mouse")) {
        this.size = 29;
        while (!!this.touching("mouse")) {
          yield;
        }
        this.size = 24;
      }
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.size = 2;
    this.visible = false;
  }

  *whenIReceiveCoinfliptime() {
    this.visible = false;
  }

  *whenthisspriteclicked() {
    this.effects.color = 5;
    yield* this.wait(1);
    this.broadcast("DiceTime");
    this.visible = false;
    this.effects.color = 0;
    this.broadcast("amounabetdice");
  }

  *whenIReceiveSlottime() {
    this.visible = false;
  }

  *whenIReceiveStopEverything() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
  }
}
