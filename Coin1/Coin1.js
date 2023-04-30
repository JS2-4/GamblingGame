/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Coin1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Coin1", "./Coin1/costumes/Coin1.png", { x: 180, y: 180 }),
      new Costume("Coin2", "./Coin1/costumes/Coin2.png", { x: 180, y: 162 }),
      new Costume("Coin3", "./Coin1/costumes/Coin3.png", { x: 180, y: 122 }),
      new Costume("Coin4", "./Coin1/costumes/Coin4.png", { x: 180, y: 70 }),
      new Costume("Coin5", "./Coin1/costumes/Coin5.png", { x: 180, y: 48 }),
      new Costume("Coin6", "./Coin1/costumes/Coin6.png", { x: 180, y: 38 }),
      new Costume("Coin7", "./Coin1/costumes/Coin7.png", { x: 180, y: 25 }),
      new Costume("CoinHeads", "./Coin1/costumes/CoinHeads.png", {
        x: 180,
        y: 180
      }),
      new Costume("CoinTails", "./Coin1/costumes/CoinTails.png", {
        x: 180,
        y: 180
      })
    ];

    this.sounds = [
      new Sound("spinning-coin-1", "./Coin1/sounds/spinning-coin-1.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "CoinFlipTime" },
        this.whenIReceiveCoinfliptime
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "CoinGotHeads" },
        this.whenIReceiveCoingotheads
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "CoinGotTails" },
        this.whenIReceiveCoingottails
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "CoiinFlipped" },
        this.whenIReceiveCoiinflipped
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
    this.size = 30;
    this.costume = "Coin1";
    this.visible = false;
  }

  *whenIReceiveCoinfliptime() {
    this.visible = true;
    this.stage.costume = "GamblingTable";
    this.effects.ghost = 100;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost -= 10;
      yield;
    }
    this.broadcast("amounabetcoin");
  }

  *whenIReceiveCoingotheads() {
    this.stage.vars.moneyy += this.toNumber(this.stage.vars.amountbet);
    yield* this.wait(1);
    this.broadcast("amounabetcoin");
  }

  *whenIReceiveCoingottails() {
    this.stage.vars.moneyy += 0 - this.toNumber(this.stage.vars.amountbet);
    yield* this.wait(1);
    this.broadcast("amounabetcoin");
  }

  *whenIReceiveCoiinflipped() {
    this.broadcast("Hide Everything");
    for (let i = 0; i < 4; i++) {
      for (let i = 0; i < 6; i++) {
        this.costumeNumber++;
        yield* this.wait(0.01);
        yield;
      }
      this.costume = "Coin6";
      yield* this.wait(0.01);
      this.costume = "Coin5";
      yield* this.wait(0.01);
      this.costume = "Coin4";
      yield* this.wait(0.01);
      this.costume = "Coin3";
      yield* this.wait(0.01);
      this.costume = "Coin2";
      yield* this.wait(0.01);
      this.costume = "Coin1";
      yield* this.wait(0.01);
      yield;
    }
    for (let i = 0; i < 6; i++) {
      this.costumeNumber++;
      yield* this.wait(0.01);
      yield;
    }
    this.costume = "Coin6";
    yield* this.wait(0.01);
    this.costume = "Coin5";
    yield* this.wait(0.01);
    this.costume = "Coin4";
    yield* this.wait(0.01);
    this.costume = "Coin3";
    yield* this.wait(0.01);
    this.costume = "Coin2";
    yield* this.wait(0.01);
    this.stage.vars.coinside = this.random(8, 9);
    this.costume = this.stage.vars.coinside;
    yield* this.wait(0.07);
    yield* this.playSoundUntilDone("spinning-coin-1");
    if (this.toNumber(this.stage.vars.coinside) === 8) {
      this.broadcast("CoinGotHeads");
      yield* this.wait(0.2);
      this.broadcast("WonCF");
    } else {
      this.broadcast("CoinGotTails");
      yield* this.wait(0.2);
      this.broadcast("Lost");
    }
  }

  *whenIReceiveStartv2() {
    this.stage.costume = "backdrop1";
    this.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *whenIReceiveStopEverything() {
    /* TODO: Implement stop other scripts in sprite */ null;
  }
}
