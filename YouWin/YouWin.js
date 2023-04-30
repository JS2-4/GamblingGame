/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class YouWin extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("YOU_WIN", "./YouWin/costumes/YOU_WIN.png", {
        x: 420,
        y: 310
      })
    ];

    this.sounds = [
      new Sound("slot_payout", "./YouWin/sounds/slot_payout.wav"),
      new Sound("cha-ching-7053", "./YouWin/sounds/cha-ching-7053.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Won" }, this.whenIReceiveWon),
      new Trigger(Trigger.BROADCAST, { name: "WonCF" }, this.whenIReceiveWoncf),
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

  *whenIReceiveWon() {
    this.moveAhead();
    this.effects.ghost = 0;
    yield* this.startSound("slot_payout");
    this.goto(60, -40);
    this.visible = true;
    for (let i = 0; i < 15; i++) {
      this.effects.ghost += 10;
      yield* this.wait(0.06);
      this.y += 2;
      yield;
    }
    this.broadcast("Show again");
    this.visible = false;
  }

  *whenIReceiveWoncf() {
    this.moveAhead();
    this.effects.ghost = 0;
    yield* this.startSound("cha-ching-7053");
    this.goto(60, -40);
    this.visible = true;
    for (let i = 0; i < 15; i++) {
      this.effects.ghost += 10;
      yield* this.wait(0.06);
      this.y += 2;
      yield;
    }
    this.broadcast("Show again");
    this.visible = false;
  }

  *whenIReceiveStopEverything() {
    /* TODO: Implement stop other scripts in sprite */ null;
  }
}
