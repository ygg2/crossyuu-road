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

function initObjects(spr) {
  function Character(img) {
    this.x = 0
    this.y = 0
    this.image = new Img(img)
    this.visible = true
    this.hsp = 0
    this.vsp = 0
    this.speed = 4
    this.mask = 1
    this.input = {
      right: 0,
      left: 0,
      up: 0,
      down: 0
    }
    this.cell = { x: 0, y: 0 }
    this.fromCell = { x: -1, y: -1 }
  }
  Character.prototype.draw = function() {
    this.image.draw(this.x, this.y)
  }
  Character.prototype.step = function(grid) {
    if (onGrid(this)) {
      if (this.fromCell.x != -1) {
        grid[this.fromCell.x][this.fromCell.y] = -4
      }
      this.hsp = 0
      this.vsp = 0
      var input = this.checkInput()
      var horizontal = input.right - input.left
      var vertical = input.down - input.up
      if (horizontal != 0 && !this.collision(grid, horizontal)) {
        this.hsp = horizontal * this.speed
        this.vsp = 0
        this.fromCell.x = this.cell.x
        this.fromCell.y = this.cell.y
        this.cell.x += horizontal
        grid[this.cell.x][this.cell.y] = this.id
      } else if (vertical != 0 && !this.collision(grid, vertical, true)) {
        this.vsp = vertical * this.speed
        this.hsp = 0
        this.fromCell.x = this.cell.x
        this.fromCell.y = this.cell.y
        this.cell.y += vertical
        grid[this.cell.x][this.cell.y] = this.id
      }
    }
    this.x += this.hsp
    this.y += this.vsp
  }
  Character.prototype.checkInput = function() {
    return this.input
  }
  Character.prototype.collision = function(grid, amount, vertical = false) {
    var offset = 0
    if (vertical) {
      let space = grid[this.cell.x][this.cell.y + amount]
      if (space > 0 || (space + offset) & this.mask) {
        return true
      }
    } else {
      let space = grid[this.cell.x + amount][this.cell.y]
      if (space > 0 || (space + offset) & this.mask) {
        return true
      }
    }
    return false
  }

  function Player(img) {
    Character.call(this, img)
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
    yuu: new Player(spr.yuu)
  }
  return objs
}

function initMaps(spr, objs) {
  return {
    Title: {},
    Lv1: {
      layout: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ],
      background: false
    }
  }
}
