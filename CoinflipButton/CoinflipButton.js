/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class CoinflipButton extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "CoinFlip Button",
        "./CoinflipButton/costumes/CoinFlip Button.png",
        { x: 480, y: 321 }
      )
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "StartV2" },
        this.whenIReceiveStartv2
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Slottime" },
        this.whenIReceiveSlottime
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "DiceTime" },
        this.whenIReceiveDicetime
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Stop everything" },
        this.whenIReceiveStopEverything
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.size = 2;
    this.visible = false;
  }

  *whenIReceiveStartv2() {
    this.size = 2;
    yield* this.wait(0.5);
    this.visible = true;
    for (let i = 0; i < 10; i++) {
      this.size += 2;
      yield;
    }
    this.size -= 4;
    while (!!this.touching("mouse")) {
      yield;
    }
    this.size = 22;
    while (true) {
      if (this.touching("mouse")) {
        this.size = 27;
        while (!!this.touching("mouse")) {
          yield;
        }
        this.size = 22;
      }
      yield;
    }
  }

  *whenthisspriteclicked() {
    this.effects.color = 5;
    yield* this.wait(1);
    this.broadcast("CoinFlipTime");
    this.visible = false;
    this.effects.color = 0;
  }

  *whenIReceiveSlottime() {
    this.visible = false;
  }

  *whenIReceiveDicetime() {
    this.visible = false;
  }

  *whenIReceiveStopEverything() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
  }
}
