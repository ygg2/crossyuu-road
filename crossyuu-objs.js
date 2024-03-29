function loadImages(images) {
  return new Promise(resolve => {
    var spr = {}
    var sprites = Object.keys(images)
    var remaining = sprites.length
    for (var i = 0; i < sprites.length; i++) {
      spr[sprites[i]] = new Image()
      spr[sprites[i]].onload = () => {
        --remaining
        if (remaining <= 0) {
          resolve(spr)
        }
      }
      spr[sprites[i]].onerror = () => {
        reject('Failed image load for' + String(sprites[i]))
      }
      spr[sprites[i]].src = images[sprites[i]]
    }
  })
}

function Spawner(x, y, type, spr, offset, xoffset) {
  this.x = (x + (global.spawners[type].spawn.left ? -1 : 1)) || 0
  this.y = y || 0
  this.counter = global.spawners[type].alarm - offset
  this.alarm = global.spawners[type].alarm
  this.spawn = global.spawners[type].spawn
  this.speed = global.spawners[type].speed
  this.sprites = spr
  this.xoffset = xoffset
  this.variance = Math.floor(this.alarm / 2)
}
Spawner.prototype.tick = function(map) {
  this.counter++
  if (this.counter == this.alarm) {
    this.counter = iRandomRange(0, this.variance)
    // choose a random sprite
    let _sprite = this.sprites[iRandomRange(0, this.sprites.length - 1)]
    map.obstacles.push(
      new Character(
        _sprite,
        this.spawn,
        this.x,
        this.y,
        this.speed,
        this.xoffset
      )
    )
  }
}

function Confetti(x, y) {
  this.x = x || 0
  this.y = y || 0
  this.hsp = iRandomRange(-8, 8)
  this.vsp = iRandomRange(-8, -2)
  let _r = iRandomRange(0, 255)
  let _g = iRandomRange(0, 255)
  let _b = iRandomRange(0, 255)
  this.color = `rgb(${_r}, ${_g}, ${_b})`
  this.angle = iRandomRange(0, 360)
}
Confetti.prototype.step = function() {
  this.x += this.hsp
  this.y += this.vsp
  this.hsp = lerp(this.hsp, 0, 0.03)
  this.vsp = Math.min(this.vsp + 0.2, 5)
  this.angle += 3
}
Confetti.prototype.draw = function() {
  let COSIZE = 12
  room.context.fillStyle = this.color
  room.context.beginPath()
  for (var m = 0; m < 5; m++) {
    var scale = Math.sin(this.x / 100 + this.y / 100)
    var a = m == 0 ? 110 : m == 1 ? 70 : m == 2 ? 290 : m == 3 ? 250 : 110
    room.context.lineTo(
      this.x - lengthdir_x(COSIZE * scale, a + this.angle),
      this.y + lengthdir_y(COSIZE, a + this.angle)
    )
  }
  room.context.closePath()
  room.context.fill()
}

function Character(img, inputs, x, y, speed, xoffset) {
  this.x = x * global.gridsize || 0
  this.y = y * global.gridsize || 0
  this.image = new Img(img)
  this.visible = true
  this.hsp = 0
  this.vsp = 0
  this.speed = speed || 4
  this.mask = 0
  if (!inputs) inputs = {}
  this.input = {
    right: inputs.right || 0,
    left: inputs.left || 0,
    up: inputs.up || 0,
    down: inputs.down || 0
  }
  this.cell = {}
  this.fromCell = {}
  this.cell.x = x || 0
  this.cell.y = y || 0
  this.fromCell.x = x || 0
  this.fromCell.y = y || 0
  this.id = 6
  this.destroyed = false
  this.xoffset = xoffset || 0
  this.time = 0
}
Character.prototype.draw = function() {
  this.image.draw(this.x + this.xoffset, this.y)
}
Character.prototype.step = function(grid) {
  if (onGrid(this)) {
    this.clearOldPosition(grid)
    this.hsp = 0
    this.vsp = 0
    this.time = 0
    var input = this.checkInput()
    var horizontal = input.right - input.left
    var vertical = input.down - input.up
    this.fromCell.x = this.cell.x
    this.fromCell.y = this.cell.y
    if (horizontal != 0 && !this.collision(grid, horizontal)) {
      this.hsp = horizontal * this.speed
      this.vsp = 0
      this.cell.x += horizontal
      if (grid[this.cell.x][this.cell.y] == 0) {
        grid[this.cell.x][this.cell.y] = this.id
        if (this.id == -1 || this.id == 1) this.clearOldPosition(grid)
      }
    } else if (vertical != 0 && !this.collision(grid, vertical, true)) {
      this.vsp = vertical * this.speed
      this.hsp = 0
      this.cell.y += vertical
      if (grid[this.cell.x][this.cell.y] == 0) {
        grid[this.cell.x][this.cell.y] = this.id
        if (this.id == -1 || this.id == 1) this.clearOldPosition(grid)
      }
    }
  }
  this.time++
  this.x += this.hsp
  if (this.id == -1 || this.id == 1) {
    if (this.speed == 16)
      this.y = Math.floor(
        twerp_out_back(
          this.fromCell.y * global.gridsize,
          this.cell.y * global.gridsize,
          this.time / (global.gridsize / this.speed),
          1.02
        )
      )
    else
      this.y = Math.floor(
        twerp_out_back(
          this.fromCell.y * global.gridsize,
          this.cell.y * global.gridsize,
          this.time / (global.gridsize / this.speed),
          1.1
        )
      )
  }
  return this.destroyed
}
Character.prototype.clearOldPosition = function(grid) {
  if (this.cell.x != this.fromCell.x || this.cell.y != this.fromCell.y) {
    if (grid[this.fromCell.x][this.fromCell.y] == this.id)
      grid[this.fromCell.x][this.fromCell.y] = 0
  }
}
Character.prototype.checkInput = function() {
  return this.input
}
Character.prototype.collision = function(grid, amount, vertical = false) {
  // block 1 spawner right 3 spawner left 5 collision 7 player -1
  var toX = this.cell.x + (vertical ? 0 : amount)
  var toY = this.cell.y + (vertical ? amount : 0)
  if (!vertical) {
    // out of bounds check
    if (this.cell.x + amount < 0 || this.cell.x + amount >= grid.length) {
      this.destroyed = true
      return true
    }
  }
  var space = grid[toX][toY]
  if (space & this.mask || space == 2) {
    return this.collideWith(space, grid, toX, toY)
  }
  return false
}
Character.prototype.collideWith = function() {
  return true
}

function initObjects(spr) {
  function Player(img) {
    Character.call(this, img)
    this.id = -1
    this.mask = 3
    this.speed = 8
    this.revival = false
    this.revived = false
    this.glitchy = false
    this.glitching = false
    this.glitchTimer = 0
    this.glow = new Img(spr.glow, 0, 0)
  }
  Player.prototype = new Character()
  Player.prototype.step = function(grid) {
    if (this.glitchy) {
      this.glitchTimer++
      if (this.glitchTimer == 100) {
        this.glitchTimer = 0
        this.glitching = !this.glitching
        if (this.glitching) {
          this.id = 1
          this.mask = 1
        } else {
          this.id = -1
          this.mask = 3
        }
      }
      grid[this.fromCell.x][this.fromCell.y] = this.id
    }
    Character.prototype.step.call(this, grid)
  }
  Player.prototype.clearOldPosition = function(grid) {
    if (this.cell.x != this.fromCell.x || this.cell.y != this.fromCell.y) {
      if (grid[this.fromCell.x][this.fromCell.y] == this.id || this.glitchy)
        grid[this.fromCell.x][this.fromCell.y] = 0
    }
    this.oldId = this.id
  }
  Player.prototype.draw = function() {
    this.image.draw(this.x, this.y)
    if (this.revived) {
      this.glow.draw(this.x, this.y)
    } else if (this.glitching && this.glitchTimer % 10 == 0) {
      room.context.fillStyle = '#8CFF9B88'
      room.context.fillRect(this.x, this.y, global.gridsize, global.gridsize)
    }
  }
  Player.prototype.checkInput = function() {
    return {
      right: keyboardCheckPressed(global.keymap.right),
      left: keyboardCheckPressed(global.keymap.left),
      up: keyboardCheckPressed(global.keymap.up),
      down: keyboardCheckPressed(global.keymap.down)
    }
  }
  Player.prototype.collideWith = function(id, grid, x, y) {
    if (id == 9) {
      // coin
      grid[x][y] = 0
      game.coins++
      localStorage.setItem('crossyuu-coin', game.coins)
      return false
    } else if (id == 2) {
      // end
      game.finishLevel(room.map.index)
      this.checkInput = function() {
        return this.input
      }
      return false
    }
    return true
  }
  Player.prototype.destroy = function(car) {
    if (this.revival) {
      this.revival = false
      this.revived = true
      car.destroyed = true
      return
    }
    this.glitchy = false
    game.state = states.mainMenu
    this.checkInput = function() {
      return this.input
    }
    this.image.visible = false
    let _x = this.x
    let _y = this.y
    room.effects.push({
      timer: 0,
      duration: 100,
      confetti: [],
      step: function() {
        if (this.timer == 1) {
          for (var i = 0; i < 50; i++) {
            this.confetti.push(
              new Confetti(
                _x + iRandomRange(-100, 100),
                _y + iRandomRange(-100, 100)
              )
            )
          }
        }
        for (let inst of this.confetti) {
          inst.step()
          inst.draw()
        }
      },
      done: function() {
        return this.timer >= this.duration
      }
    })
  }
  Player.prototype.restart = function(x, y) {
    delete this.checkInput
    this.cell.x = x
    this.cell.y = y
    this.fromCell.x = x
    this.fromCell.y = y
    this.x = x * global.gridsize
    this.y = y * global.gridsize
    this.image.visible = true
    this.revived = false
  }
  Player.prototype.setImage = function(sprite) {
    this.image.image = spr[sprite]
  }
  Player.prototype.setEffect = function(costume) {
    // reset defaults
    this.speed = 8
    this.revival = false
    this.glitchy = false
    this.id = -1
    this.mask = 3
    switch (costume) {
      case 'Mika':
        this.speed = 16
        break
      case 'Possession':
        this.revival = true
        break
      case 'Glitchy Yuu':
        this.glitchy = true
        break
      case 'Seraph Yuu':
        this.id = 1
        this.mask = 1
        break
    }
  }

  var objs = {
    yuu: new Player(spr.yuu),
    cars: []
  }
  global.player = objs.yuu
  return objs
}
