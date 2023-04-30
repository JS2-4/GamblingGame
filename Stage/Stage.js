/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("WarningText", "./Stage/costumes/WarningText.png", {
        x: 480,
        y: 360
      }),
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 262.3999938964844,
        y: 187.6999969482422
      }),
      new Costume("GamblingTable", "./Stage/costumes/GamblingTable.png", {
        x: 480,
        y: 360
      }),
      new Costume("Background", "./Stage/costumes/Background.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [
      new Sound(
        "Catchy Elevator Music",
        "./Stage/sounds/Catchy Elevator Music.wav"
      )
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "amounabetcoin" },
        this.whenIReceiveAmounabetcoin
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "bruhaskagain" },
        this.whenIReceiveBruhaskagain
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "amounabetslot" },
        this.whenIReceiveAmounabetslot
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "amounabetdice" },
        this.whenIReceiveAmounabetdice
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
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "amounabetcoin" },
        this.whenIReceiveAmounabetcoin2
      )
    ];

    this.vars.diceValue1 = 6;
    this.vars.diceValue2 = 5;
    this.vars.diceValue3 = 6;
    this.vars.diceValue4 = 4;
    this.vars.coinside = 8;
    this.vars.amountbet = 5000;
    this.vars.slotvalue = 6;
    this.vars.slotvalue1 = 6;
    this.vars.slotvalue2 = 2;
    this.vars.slotvalue3 = 3;
    this.vars.moneyy = 43114;

    this.watchers.moneyy = new Watcher({
      label: "MONEYY",
      style: "large",
      visible: true,
      value: () => this.vars.moneyy,
      x: 245,
      y: 175
    });
  }

  *whenGreenFlagClicked() {
    this.vars.moneyy = 25000;
    this.watchers.moneyy.visible = false;
    this.costume = "WarningText";
    yield* this.wait(4);
    for (let i = 0; i < 15; i++) {
      this.effects.brightness -= 5;
      yield;
    }
    this.costumeNumber++;
    yield* this.wait(0.5);
    for (let i = 0; i < 15; i++) {
      this.effects.brightness += 5;
      yield* this.wait(0.01);
      yield;
    }
    this.broadcast("GameHasStarted");
    this.costume = "Background";
  }

  *whenIReceiveAmounabetcoin() {
    yield* this.askAndWait("Amount to bet?");
    while (
      !(
        (this.compare(this.answer, 5000) < 0 ||
          5000 === this.toNumber(this.answer)) &&
        (this.compare(this.answer, this.vars.moneyy) < 0 ||
          this.compare(this.answer, this.vars.moneyy) === 0)
      )
    ) {
      yield* this.askAndWait("Amount too high.");
      yield;
    }
    this.vars.amountbet = this.answer;
    while (true) {
      if (this.keyPressed("space")) {
        this.broadcast("Hide Everything");
        this.broadcast("CoiinFlipped");
        return;
      }
      yield;
    }
  }

  *whenIReceiveBruhaskagain() {
    yield* this.askAndWait("Amount to bet?");
  }

  *whenIReceiveAmounabetslot() {
    yield* this.askAndWait("Amount to bet?");
    while (
      !(
        (this.compare(this.answer, 5000) < 0 ||
          5000 === this.toNumber(this.answer)) &&
        (this.compare(this.answer, this.vars.moneyy) < 0 ||
          this.compare(this.answer, this.vars.moneyy) === 0)
      )
    ) {
      yield* this.askAndWait("Amount too high. ");
      yield;
    }
    this.vars.amountbet = this.answer;
    while (true) {
      if (this.keyPressed("space")) {
        this.broadcast("Hide Everything");
        this.broadcast("PULLTHETRIGGER");
        return;
      }
      yield;
    }
  }

  *whenIReceiveAmounabetdice() {
    yield* this.askAndWait("Amount to bet?");
    while (
      !(
        (this.compare(this.answer, 5000) < 0 ||
          5000 === this.toNumber(this.answer)) &&
        (this.compare(this.answer, this.vars.moneyy) < 0 ||
          this.compare(this.answer, this.vars.moneyy) === 0)
      )
    ) {
      yield* this.askAndWait("Amount too high.");
      yield;
    }
    this.vars.amountbet = this.answer;
    while (true) {
      if (this.keyPressed("space")) {
        this.broadcast("Hide Everything");
        this.broadcast("Dice rolled");
        return;
      }
      yield;
    }
  }

  *whenIReceiveStartv2() {
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *whenIReceiveStopEverything() {
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *whenIReceiveAmounabetcoin2() {}
}
