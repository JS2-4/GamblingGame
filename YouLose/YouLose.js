/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class YouLose extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("YOU_LOSE", "./YouLose/costumes/YOU_LOSE.png", {
        x: 260,
        y: 145
      })
    ];

    this.sounds = [
      new Sound("error-126627", "./YouLose/sounds/error-126627.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Lost" }, this.whenIReceiveLost),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Stop everything" },
        this.whenIReceiveStopEverything
      )
    ];
  }

  *whenIReceiveLost() {
    yield* this.startSound("error-126627");
    this.moveAhead();
    this.effects.ghost = 0;
    this.goto(58, -34);
    this.visible = true;
    for (let i = 0; i < 2; i++) {
      this.move(-3);
      yield;
    }
    for (let i = 0; i < 2; i++) {
      this.move(3);
      yield;
    }
    for (let i = 0; i < 2; i++) {
      this.move(-3);
      yield;
    }
    for (let i = 0; i < 15; i++) {
      this.effects.ghost += 10;
      yield* this.wait(0.03);
      yield;
    }
    this.visible = false;
    if (this.toNumber(this.stage.vars.moneyy) === 0) {
      this.broadcast("Stop everything");
    }
    this.broadcast("Show again");
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveStopEverything() {
    /* TODO: Implement stop other scripts in sprite */ null;
  }
}
