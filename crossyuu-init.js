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

function Spawner(x, y, sprite, type, dir) {
  this.x = x || 0
  this.y = y || 0
  this.sprite = sprite
  this.counter = 0
  this.alarm = 200
  this.spawn = {}
  this.spawn[dir] = 1
  this.tick = function(map) {
    this.counter++
    if (this.counter == this.alarm) {
      this.counter = 0
      map.obstacles.push(new Character(this.sprite, this.spawn, this.x, this.y))
    }
  }
}

function Character(img, inputs, x, y) {
  this.x = x * global.gridsize || 0
  this.y = y * global.gridsize || 0
  this.image = new Img(img)
  this.visible = true
  this.hsp = 0
  this.vsp = 0
  this.speed = 4
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
  this.id = 7
  this.destroyed = false
}
Character.prototype.draw = function() {
  this.image.draw(this.x, this.y)
}
Character.prototype.step = function(grid) {
  if (onGrid(this)) {
    if (this.cell.x != this.fromCell.x || this.cell.y != this.fromCell.y) {
      if (grid[this.fromCell.x][this.fromCell.y] == this.id)
      grid[this.fromCell.x][this.fromCell.y] = 0
    }
    this.hsp = 0
    this.vsp = 0
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
      }
    } else if (vertical != 0 && !this.collision(grid, vertical, true)) {
      this.vsp = vertical * this.speed
      this.hsp = 0
      this.cell.y += vertical
      if (grid[this.cell.x][this.cell.y] == 0) {
        grid[this.cell.x][this.cell.y] = this.id
      }
    }
  }
  this.x += this.hsp
  this.y += this.vsp
  return this.destroyed
}
Character.prototype.checkInput = function() {
  return this.input
}
Character.prototype.collision = function(grid, amount, vertical = false) {
  // block 1 spawner right 3 spawner left 5 collision 7 player -1
  if (vertical) {
    var space = grid[this.cell.x][this.cell.y + amount]
  } else {
    // out of bounds check
    if (this.cell.x + amount < 0 || this.cell.x + amount >= grid.length) {
      this.destroyed = true
      return true
    }
    var space = grid[this.cell.x + amount][this.cell.y]
  }
  if (space & this.mask) {
    return true
  }
  return false
}

function initObjects(spr) {
  function Player(img) {
    Character.call(this, img)
    this.id = -1
    this.mask = 1
    this.speed = 8
  }
  Player.prototype = new Character()
  Player.prototype.checkInput = function() {
    return {
      right: keyboardCheckPressed(global.keymap.right),
      left: keyboardCheckPressed(global.keymap.left),
      up: keyboardCheckPressed(global.keymap.up),
      down: keyboardCheckPressed(global.keymap.down)
    }
  }

  var objs = {
    yuu: new Player(spr.yuu),
    cars: []
  }
  return objs
}

function initMaps(spr, objs) {
  return {
    Title: {},
    Lv1: {
      layout: [
        [1, 1, 3, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 5, 1]
      ],
      background: false
    }
  }
}
