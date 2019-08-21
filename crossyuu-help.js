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

function roomRestart(map, objs) {
  room.background = new Img(0, 0, map.background)
  map.yuu = objs.yuu
  map.yuu.cell.x = 1
  map.yuu.cell.y = 1
}
