function createRoom() {
  var room = {
    canvas: document.getElementById('crossyuu-canvas'),
    effects: [],
    setup() {
      this.context = this.canvas.getContext('2d', { alpha: false })
      window.addEventListener('keydown', function(e) {
        global.keyPressed[e.code] = true
      })
    },
    clear() {
      this.context.fillStyle = '#22896E'
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }
  room.setup()
  return room
}

function update() {
  var map = room.map
  for (let spawner of map.spawners) {
    spawner.tick(map)
  }
  let deletion = false
  for (let obstacle of map.obstacles) {
    if (obstacle.step(map.layout)) {
      deletion = true
    }
    if (map.layout[obstacle.cell.x][obstacle.cell.y] == -1) {
      map.yuu.destroy(obstacle)
      map.layout[obstacle.cell.x][obstacle.cell.y] = 0
      map.layout[obstacle.fromCell.x][obstacle.fromCell.y] = 0
    }
  }
  if (deletion) {
    map.obstacles = map.obstacles.filter(inst => !inst.destroyed)
  }
  map.yuu.step(map.layout)
}

function render() {
  var map = room.map
  room.clear()
  // move the view
  let drawy = map.yuu.y - room.canvas.height / 2
  room.context.save()
  room.context.translate(-global.xoffset, -drawy)
  // block drawing
  for (let wall of map.walls) {
    wall.draw()
  }
  let x = 0,
    y = 0
  for (let col of map.layout) {
    for (let cell of col) {
      if (cell == 9) {
        map.coin.x = x * global.gridsize
        map.coin.y = y * global.gridsize
        map.coin.draw()
      }
      y++
    }
    y = 0
    x++
  }
  for (let obstacle of map.obstacles) {
    obstacle.draw()
  }
  map.yuu.draw()
  let _any_done = false
  for (let effect of room.effects) {
    effect.timer++
    effect.step()
    if (effect.done()) {
      _any_done = true
    }
  }
  if (_any_done) {
    room.effects = room.effects.filter(effect => !effect.done())
  }
  room.context.restore()
}

function main() {
  if (!global.pause) update()
  render()
  rAF(main)
}

var rAF =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.mozRequestAnimationFrame

async function RunGame() {
  yeet('Run Game')
  yeet('Loading images')
  var sprites = await loadImages(window.sprites)
  yeet('Creating room')
  window.room = createRoom()
  yeet('Creating objects')
  var objs = initObjects(sprites)
  yeet('Creating maps')
  var maps = initMaps(sprites, objs)
  game.sprites = sprites
  game.maps = maps
  roomRestart(maps[0], sprites)
  yeet('Starting main')
  main()
}
