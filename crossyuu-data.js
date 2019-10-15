window.states = {
  mainMenu: 0,
  crossing: 1,
  costumes: 2,
  levelSelect: 3,
  titleScreen: 4,
  levelEnd: 5,
  saveCode: 6
}

window.global = {
  keymap: {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    up: 'ArrowUp',
    down: 'ArrowDown'
  },
  keyPressed: {},
  gridsize: 96,
  debug: true,
  pause: true
}

global.xoffset = (global.gridsize * 11 - 540) / 2

window.sprites = {
  yuu: 'spr/yuu.png',
  car: 'spr/car.png',
  car_2: 'spr/car_2.png',
  car_3: 'spr/car_3.png',
  car_3_r: 'spr/car_3_r.png',
  car_4: 'spr/car_4.png',
  car_4_r: 'spr/car_4_r.png',
  car_r: 'spr/car_r.png',
  truck: 'spr/truck.png',
  truck_2: 'spr/truck_2.png',
  truck_4: 'spr/truck_4.png',
  truck_5: 'spr/truck_5.png',
  truck_r: 'spr/truck_r.png',
  truck_3_r: 'spr/truck_3_r.png',
  truck_5_r: 'spr/truck_5_r.png',
  flower_crown: 'spr/flower_crown.png',
  mika: 'spr/mika.png',
  doll: 'spr/doll.png',
  mitsuba: 'spr/mitsu.png',
  seraph: 'spr/seraph.png',
  wall0: 'spr/wall0.png',
  wall1: 'spr/wall1.png',
  wall2: 'spr/wall2.png',
  coin: 'spr/coin.png',
  road: 'spr/road.png',
  finish: 'spr/finish.png',
  glow: 'spr/glow.png'
}

function initMaps(spr, objs) {
  return [
    {
      index: 0,
      proto_layout:[
        [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 9, 0, 0, 0, 9, 0, 9, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0]
      ],
      background: false,
      player_pos: [5, 10]
    },
    {
      index: 1,
      proto_layout: [
        [0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 9, 0, 1, 0, 0, 9, 0, 0, 9, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0]
      ],
      background: false,
      player_pos: [5, 12]
    },
    {
      index: 2,
      proto_layout: [
        [0, 0, 0, 5, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 1, 0, 0, 9, 0, 0, 9, 0, 0, 1],
        [1, 2, 0, 9, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0]
      ],
      background: false,
      player_pos: [5, 12]
    },
    {
      index: 3,
      proto_layout: [
        [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 2, 9, 9, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 4, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      background: false,
      player_pos: [5, 15]
    },
    {
      index: 4,
      proto_layout: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      background: false,
      player_pos: [5, 14]
    },
    {
      index: 5,
      proto_layout: [
        [0, 0, 0, 0, 0, 5, 5, 0, 0, 3, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 4, 0, 0, 0, 6, 4, 0, 0, 0, 0, 0]
      ],
      background: false,
      player_pos: [5, 12]
    },
    // true proto
    {
      index: 10,
      proto_layout: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      background: false,
      player_pos: [5, 12]
    }
  ]
}
/*

1 block
2 win
3 slow spawner top
4 slow spawner bottom
5 fast spawner top
6 fast spawner bottom
7 train spawner top
8 train spawner bottom
9 coin

*/
global.spawners = {
  3: {
    // slow spawner top
    alarm: 300,
    speed: 2,
    spawn: {
      right: 1
    }
  },
  4: {
    // slow spawner bottom
    alarm: 300,
    speed: 2,
    spawn: {
      left: 1
    }
  },
  5: {
    // fast spawner top
    alarm: 200,
    speed: 4,
    spawn: {
      right: 1
    }
  },
  6: {
    // fast spawner bottom
    alarm: 200,
    speed: 4,
    spawn: {
      left: 1
    }
  },
  7: {
    // train spawner top
    alarm: 500,
    speed: 16,
    spawn: {
      right: 1
    }
  },
  8: {
    // train spawner bottom
    alarm: 500,
    speed: 16,
    spawn: {
      left: 1
    }
  }
}