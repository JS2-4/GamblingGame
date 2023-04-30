/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Backbutton extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("BackButton", "./Backbutton/costumes/BackButton.png", {
        x: 480,
        y: 185.5
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Hide Everything" },
        this.whenIReceiveHideEverything
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Show again" },
        this.whenIReceiveShowAgain
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Stop everything" },
        this.whenIReceiveStopEverything
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(182, 156);
    this.moveAhead();
    this.visible = false;
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

  *whenIReceiveHideEverything() {
    this.visible = false;
  }

  *whenIReceiveShowAgain() {
    yield* this.wait(0.1);
    this.visible = true;
  }

  *whenthisspriteclicked() {
    this.effects.color = 5;
    yield* this.wait(0.8);
    this.visible = false;
    this.broadcast("StartV2");
    this.effects.color = 0;
  }

  *whenIReceiveStopEverything() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
  }
}
