function yeet(message) {
  if (global.debug) {
    console.log(message)
  }
}

function keyboardCheckPressed(key) {
  if (key in global.keyPressed) {
    delete global.keyPressed[key]
    return true
  }
  return false
}

function onGrid(obj) {
  return obj.x % global.gridsize == 0 && obj.y % global.gridsize == 0
}

function Img(image, x, y) {
  this.x = x || 0
  this.y = y || 0
  this.image = image || false
  this.visible = true
  this.draw = function(x, y) {
    if (x) this.x = x
    if (y) this.y = y
    if (this.image && this.visible) {
      room.context.drawImage(this.image, this.x, this.y)
    }
  }
}

function roomRestart(map, objs, spr) {
  room.background = new Img(0, 0, map.background)
  // add yuu
  map.yuu = objs.yuu
  map.yuu.cell.x = 1
  map.yuu.cell.y = 1
  // add car spawners
  map.spawners = []
  map.obstacles = []
  let x = 0
  let y = 0
  for (let col of map.layout) {
    for (let cell of col) {
      if (cell == 2) {
        // car spawner right
        map.spawners.push(
          new Spawner(x, y, spr.yuu, 'car', 'right')
        )
      } else if (cell == 3) {
        // car spawner left
        map.spawners.push(
          new Spawner(x, y, spr.yuu, 'car', 'left')
        )
      }
      y++
    }
    y = 0
    x++
  }
}
