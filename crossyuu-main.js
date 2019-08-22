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
  for (let obstacle of map.obstacles) {
    obstacle.step(map.layout)
  }
  map.yuu.step(map.layout)
}

function render(map) {
  room.clear()
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
    let x = 0, y = 0
    for (let col of map.layout) {
      for (let cell of col) {
        if (cell == 1) {
          room.context.fillStyle = 'green'
          room.context.fillRect(
            x * global.gridsize,
            y * global.gridsize,
            global.gridsize,
            global.gridsize
          )
        }
        y++
      }
      y = 0
      x++
    }
  }
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
