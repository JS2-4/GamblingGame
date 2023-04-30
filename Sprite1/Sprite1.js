/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite1/costumes/costume1.svg", {
        x: 127.09840000000003,
        y: 35.86439999999999
      })
    ];

    this.sounds = [new Sound("pop", "./Sprite1/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Stop everything" },
        this.whenIReceiveStopEverything
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenIReceiveStopEverything() {
    this.visible = true;
    for (let i = 0; i < 12; i++) {
      this.size += 2;
      this.effects.ghost -= 3;
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.size = 80;
    this.visible = false;
    this.effects.ghost = 30;
  }
}
