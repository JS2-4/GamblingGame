/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Startbutton extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("StartButton", "./Startbutton/costumes/StartButton.png", {
        x: 480,
        y: 185.5
      })
    ];

    this.sounds = [
      new Sound(
        "Catchy Elevator Music",
        "./Startbutton/sounds/Catchy Elevator Music.wav"
      )
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "GameHasStarted" },
        this.whenIReceiveGamehasstarted
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "GameHasStarted" },
        this.whenIReceiveGamehasstarted2
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
    this.size = 2;
    this.effects.ghost = 0;
  }

  *whenIReceiveGamehasstarted() {
    this.visible = true;
    for (let i = 0; i < 16; i++) {
      this.size += 2;
      yield;
    }
    this.size -= 4;
    while (!!this.touching("mouse")) {
      yield;
    }
    this.size = 30;
    while (true) {
      if (this.touching("mouse")) {
        this.size = 35;
        while (!!this.touching("mouse")) {
          yield;
        }
        this.size = 30;
      }
      yield;
    }
  }

  *whenthisspriteclicked() {
    this.effects.color = 5;
    yield* this.wait(0.8);
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 5;
      yield;
    }
    this.visible = false;
    this.stage.watchers.moneyy.visible = true;
    this.broadcast("StartV2");
  }

  *whenIReceiveGamehasstarted2() {
    while (true) {
      yield* this.playSoundUntilDone("Catchy Elevator Music");
      yield;
    }
  }

  *whenIReceiveStopEverything() {
    this.visible = false;
  }
}
