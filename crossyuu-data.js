window.states = {
  mainMenu: 0,
  crossing: 1,
  costumes: 2,
  levelSelect: 3,
  titleScreen: 4,
  levelEnd: 5
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

global.xoffset = (global.gridsize * 9 - 540) / 2

window.sprites = {
  yuu: 'spr/flyuu.png',
  car: 'spr/car.png',
  flower_crown: 'spr/flower_crown.png'
}

function initMaps(spr, objs) {
  return [
    {
      index: 0,
      proto_layout: [
        [0, 0, 0, 0, 3, 0, 3, 0, 0, 3, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 1, 0, 0, 9, 0, 0, 9, 0, 1],
        [1, 2, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0]
      ],
      background: false,
      player_pos: [4, 12]
    },
    {
      index: 1,
      proto_layout: [
        [0, 0, 5, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 9, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 9, 0, 1, 9, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0]
      ],
      background: false,
      player_pos: [4, 12]
    },
    {
      index: 2,
      proto_layout: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      background: false,
      player_pos: [4, 15]
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
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      background: false,
      player_pos: [4, 12]
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
    alarm: 250,
    speed: 2,
    spawn: {
      right: 1
    }
  },
  4: {
    // slow spawner bottom
    alarm: 250,
    speed: 2,
    spawn: {
      left: 1
    }
  },
  5: {
    // fast spawner top
    alarm: 120,
    speed: 4,
    spawn: {
      right: 1
    }
  },
  6: {
    // fast spawner bottom
    alarm: 120,
    speed: 4,
    spawn: {
      left: 1
    }
  },
  7: {
    // train spawner top
    alarm: 500,
    speed: 8,
    spawn: {
      right: 1
    }
  },
  8: {
    // train spawner bottom
    alarm: 500,
    speed: 8,
    spawn: {
      left: 1
    }
  }
}