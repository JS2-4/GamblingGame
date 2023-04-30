import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Backbutton from "./Backbutton/Backbutton.js";
import Startbutton from "./Startbutton/Startbutton.js";
import Coin1 from "./Coin1/Coin1.js";
import Dice1 from "./Dice1/Dice1.js";
import Dice2 from "./Dice2/Dice2.js";
import Dice3 from "./Dice3/Dice3.js";
import Dice4 from "./Dice4/Dice4.js";
import CoinflipButton from "./CoinflipButton/CoinflipButton.js";
import Slotbutton from "./Slotbutton/Slotbutton.js";
import Dicebutton from "./Dicebutton/Dicebutton.js";
import YouLose from "./YouLose/YouLose.js";
import YouWin from "./YouWin/YouWin.js";
import Slotmachine1 from "./Slotmachine1/Slotmachine1.js";
import Slot7 from "./Slot7/Slot7.js";
import Slot5 from "./Slot5/Slot5.js";
import Slot6 from "./Slot6/Slot6.js";
import Slot8 from "./Slot8/Slot8.js";
import Sprite1 from "./Sprite1/Sprite1.js";

const stage = new Stage({ costumeNumber: 3 });

const sprites = {
  Backbutton: new Backbutton({
    x: 182,
    y: 156,
    direction: 90,
    costumeNumber: 1,
    size: 22,
    visible: false,
    layerOrder: 15
  }),
  Startbutton: new Startbutton({
    x: 5,
    y: -108,
    direction: 90,
    costumeNumber: 1,
    size: 30,
    visible: false,
    layerOrder: 14
  }),
  Coin1: new Coin1({
    x: 6,
    y: 4,
    direction: 90,
    costumeNumber: 8,
    size: 50,
    visible: true,
    layerOrder: 16
  }),
  Dice1: new Dice1({
    x: -41,
    y: -102,
    direction: 90,
    costumeNumber: 6,
    size: 15,
    visible: false,
    layerOrder: 1
  }),
  Dice2: new Dice2({
    x: 29.23584860077726,
    y: 93.4210768380384,
    direction: 90,
    costumeNumber: 6,
    size: 15,
    visible: false,
    layerOrder: 3
  }),
  Dice3: new Dice3({
    x: 29.735485847547622,
    y: -102.03907994757456,
    direction: 90,
    costumeNumber: 5,
    size: 15,
    visible: false,
    layerOrder: 2
  }),
  Dice4: new Dice4({
    x: -40.184392413214226,
    y: 93,
    direction: 90,
    costumeNumber: 4,
    size: 15,
    visible: false,
    layerOrder: 12
  }),
  CoinflipButton: new CoinflipButton({
    x: 7,
    y: -84,
    direction: 90,
    costumeNumber: 1,
    size: 22,
    visible: false,
    layerOrder: 4
  }),
  Slotbutton: new Slotbutton({
    x: -141,
    y: -16,
    direction: 90,
    costumeNumber: 1,
    size: 22,
    visible: false,
    layerOrder: 5
  }),
  Dicebutton: new Dicebutton({
    x: 140,
    y: -18,
    direction: 90,
    costumeNumber: 1,
    size: 24,
    visible: false,
    layerOrder: 11
  }),
  YouLose: new YouLose({
    x: 52,
    y: -34,
    direction: 90,
    costumeNumber: 1,
    size: 90,
    visible: false,
    layerOrder: 18
  }),
  YouWin: new YouWin({
    x: 60,
    y: -10,
    direction: 90,
    costumeNumber: 1,
    size: 50,
    visible: false,
    layerOrder: 17
  }),
  Slotmachine1: new Slotmachine1({
    x: 16,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 80,
    visible: false,
    layerOrder: 6
  }),
  Slot7: new Slot7({
    x: -116,
    y: -3,
    direction: 90,
    costumeNumber: 6,
    size: 30,
    visible: false,
    layerOrder: 7
  }),
  Slot5: new Slot5({
    x: -38.470588235294116,
    y: -3,
    direction: 90,
    costumeNumber: 6,
    size: 30,
    visible: false,
    layerOrder: 9
  }),
  Slot6: new Slot6({
    x: 41.12809671187221,
    y: -3,
    direction: 90,
    costumeNumber: 2,
    size: 30,
    visible: false,
    layerOrder: 8
  }),
  Slot8: new Slot8({
    x: 116.70765707526502,
    y: -3,
    direction: 90,
    costumeNumber: 3,
    size: 30,
    visible: false,
    layerOrder: 10
  }),
  Sprite1: new Sprite1({
    x: 1,
    y: 2,
    direction: 90,
    costumeNumber: 1,
    size: 80,
    visible: false,
    layerOrder: 13
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
