function twerp_out_back(start, end, position, option) {
  var _chng = end - start
  var _b = option || 1.5
  _pos = position - 1
  return _chng * (_pos * _pos * ((_b + 1) * _pos + _b) + 1) + start
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

function keyboardKeyPress(key) {
  global.keyPressed[key] = true
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
  map.walls = []
  map.coin = new Img(spr.coin, 0, 0)
  // wall sprite choices
  let wall_sprites = [spr.wall0, spr.wall1, spr.wall2]
  let x = 0
  let y = 0
  let has_placed = {}
  for (var _x = 2; _x < 9; _x++) {
    map.walls.push(
      new Img(
        spr.finish,
        _x * global.gridsize,
        global.gridsize + Math.floor(global.gridsize / 5)
      )
    )
  }
  for (let col of map.layout) {
    for (let cell of col) {
      if (cell == 1) {
        let sprite = wall_sprites[iRandomRange(0, wall_sprites.length - 1)]
        map.walls.push(
          new Img(sprite, x * global.gridsize, y * global.gridsize)
        )
      } else if (cell > 2 && cell < 9) {
        switch (cell) {
          case 3:
          case 5:
          case 7:
            var _sprites = [
              spr.car_r,
              spr.car_3_r,
              spr.car_4_r,
              spr.truck_r,
              spr.truck_3_r,
              spr.truck_5_r
            ]
            var _xoffset = -63
            break
          case 4:
          case 6:
          case 8:
            var _sprites = [
              spr.car,
              spr.car_2,
              spr.car_4,
              spr.car_3,
              spr.truck,
              spr.truck_2,
              spr.truck_4,
              spr.truck_5
            ]
            var _xoffset = -30
        }
        var _offset = iRandomRange(1, 50)
        map.spawners.push(new Spawner(x, y, cell, _sprites, _offset, _xoffset))
        // add roads
        if (!(y in has_placed)) {
          for (var _x = 2; _x < 9; _x++) {
            map.walls.push(
              new Img(
                spr.road,
                _x * global.gridsize,
                y * global.gridsize + Math.floor(global.gridsize / 5)
              )
            )
          }
          has_placed[y] = true
        }
      }
      y++
    }
    y = 0
    x++
  }
}
