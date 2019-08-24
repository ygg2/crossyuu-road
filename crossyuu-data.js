window.states = {
  mainMenu: 0,
  crossing: 1,
  costumes: 2
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

global.xoffset = (global.gridsize * 6 - 540) / 2

window.sprites = {
  yuu: 'spr/flyuu.png',
  car: 'spr/car.png',
  flower_crown: 'spr/flower_crown.png'
}