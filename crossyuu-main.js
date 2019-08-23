function createRoom() {
  var room = {
    canvas: document.getElementById('crossyuu-canvas'),
    setup() {
      this.context = this.canvas.getContext('2d', { alpha: false })
      window.addEventListener('keydown', function(e) {
        global.keyPressed[e.code] = true
      })
    },
    clear() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }
  room.setup()
  return room
}

function update(map) {
  let deletion = false
  for (let obstacle of map.obstacles) {
    if (obstacle.step(map.layout)) {
      deletion = true
    }
  }
  if (deletion) {
    map.obstacles = map.obstacles.filter(inst => !inst.destroyed)
  }
  map.yuu.step(map.layout)
}

function render(map) {
  room.clear()
  // move the view
  let drawy = map.yuu.y - room.canvas.height/2
  room.context.save()
  room.context.translate(0, -drawy)
  room.background.draw()
  map.yuu.draw()
  for (let spawner of map.spawners) {
    spawner.tick(map)
  }
  for (let obstacle of map.obstacles) {
    obstacle.draw()
  }
  // block drawing
  if (global.debug) {
    let x = 0,
      y = 0
    for (let col of map.layout) {
      for (let cell of col) {
        if (cell == 1) {
          room.context.fillStyle = 'green'
          room.context.fillRect(
            x * global.gridsize,
            y * global.gridsize,
            global.gridsize,
            global.gridsize
          )/*
        } else if (cell == -1) {
          room.context.fillStyle = 'red'
          room.context.fillRect(
            x * global.gridsize,
            y * global.gridsize,
            global.gridsize,
            global.gridsize
          )*/
        }
        y++
      }
      y = 0
      x++
    }
  }
  room.context.restore()
}

function main(map) {
  update(map)
  render(map)
  rAF(() => main(map))
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
  roomRestart(maps['Lv1'], objs, sprites)
  yeet('Starting main')
  main(maps['Lv1'])
}

RunGame()
