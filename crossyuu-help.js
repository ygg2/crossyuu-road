function yeet(message) {
  if (global.debug) {
    console.log(message)
  }
}

function iRandomRange(n1, n2) {
  return Math.floor(Math.random() * (n2 - n1 + 1)) + n1
}

function lerp(a, b, amt) {
  return (1 - amt) * a + amt * b
}

function lengthdir_x(len, dir) {
  return len * Math.cos((dir * Math.PI) / 180)
}

function lengthdir_y(len, dir) {
  return len * Math.sin((dir * Math.PI) / 180)
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

function roomRestart(map, spr) {
  room.background = new Img(0, 0, map.background)
  room.map = map
  map.layout = JSON.parse(JSON.stringify(map.proto_layout))
  // add yuu
  map.yuu = global.player
  map.yuu.restart(...map.player_pos)
  // add car spawners
  map.spawners = []
  map.obstacles = []
  let x = 0
  let y = 0
  for (let col of map.layout) {
    for (let cell of col) {
      if (cell > 2 && cell < 9) {
        switch(cell) {
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            var _sprites = [spr.car]
        }
        var _offset = iRandomRange(1, 50)
        map.spawners.push(new Spawner(x, y, cell, _sprites, _offset))
      }
      y++
    }
    y = 0
    x++
  }
}
