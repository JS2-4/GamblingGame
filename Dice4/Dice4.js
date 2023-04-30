/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Dice4 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Dice_1", "./Dice4/costumes/Dice_1.png", {
        x: 338,
        y: 337.5
      }),
      new Costume("Dice_2", "./Dice4/costumes/Dice_2.png", {
        x: 338,
        y: 337.5
      }),
      new Costume("Dice_3", "./Dice4/costumes/Dice_3.png", {
        x: 338,
        y: 337.5
      }),
      new Costume("Dice_4", "./Dice4/costumes/Dice_4.png", {
        x: 338,
        y: 337.5
      }),
      new Costume("Dice_5", "./Dice4/costumes/Dice_5.png", {
        x: 338,
        y: 337.5
      }),
      new Costume("Dice_6", "./Dice4/costumes/Dice_6.png", { x: 338, y: 337.5 })
    ];

    this.sounds = [
      new Sound("error-126627", "./Dice4/sounds/error-126627.wav"),
      new Sound("dice-142528", "./Dice4/sounds/dice-142528.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "DiceTime" },
        this.whenIReceiveDicetime
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Dice rolled" },
        this.whenIReceiveDiceRolled
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

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveDicetime() {
    this.visible = true;
    this.stage.costume = "GamblingTable";
    this.effects.ghost = 100;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost -= 10;
      yield;
    }
  }

  *whenIReceiveDiceRolled() {
    yield* this.wait(2.5);
    for (let i = 0; i < 12; i++) {
      this.costume = this.random(1, 6);
      yield* this.wait(0.08);
      for (let i = 0; i < 3; i++) {
        this.direction += 25;
        yield;
      }
      yield;
    }
    this.direction = 90;
    this.stage.vars.diceValue4 = this.random(1, 6);
    this.costume = this.stage.vars.diceValue4;
    yield* this.playSoundUntilDone("dice-142528");
    if (
      this.compare(
        this.toNumber(this.stage.vars.diceValue1) +
          this.toNumber(this.stage.vars.diceValue2),
        this.toNumber(this.stage.vars.diceValue3) +
          this.toNumber(this.stage.vars.diceValue4)
      ) > 0
    ) {
      this.stage.vars.moneyy += this.toNumber(this.stage.vars.amountbet) * 1;
      yield* this.wait(0.1);
      this.broadcast("WonCF");
      yield* this.wait(1.5);
      this.broadcast("amounabetdice");
    } else {
      if (
        this.compare(
          this.toNumber(this.stage.vars.diceValue1) +
            this.toNumber(this.stage.vars.diceValue2),
          this.toNumber(this.stage.vars.diceValue3) +
            this.toNumber(this.stage.vars.diceValue4)
        ) === 0
      ) {
        yield* this.wait(0.1);
        yield* this.startSound("error-126627");
        yield* this.wait(1.5);
        this.broadcast("amounabetdice");
      } else {
        this.stage.vars.moneyy += 0 - this.toNumber(this.stage.vars.amountbet);
        yield* this.wait(0.1);
        this.broadcast("Lost");
        yield* this.wait(1.5);
        this.broadcast("amounabetdice");
      }
    }
  }

  *whenIReceiveStartv2() {
    this.visible = false;
  }

  *whenIReceiveStopEverything() {
    /* TODO: Implement stop other scripts in sprite */ null;
  }
}
