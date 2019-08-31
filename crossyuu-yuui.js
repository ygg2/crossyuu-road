var game = new Vue({
  el: '#game',
  data: {
    maps: [],
    states: states,
    state: states.titleScreen,
    lastLevel: null,
    coins: 0,
    savecode: '',
    error: '',
    costumes: [
      {
        name: 'Default',
        desc: 'Yuu can definitely do it!',
        effect: 'No effect',
        image: sprites.yuu,
        spr: 'yuu',
        unlocked: true,
        price: null
      },
      {
        name: 'Mika',
        desc: 'Get carried across the road.',
        effect: 'Speed x2',
        image: sprites.yuu,
        spr: 'yuu',
        unlocked: false,
        price: 10
      },
      {
        name: 'Flower Crown',
        desc: 'Cross the street in style.',
        effect: 'No effect',
        image: sprites.flower_crown,
        spr: 'flower_crown',
        unlocked: false,
        price: 10
      },
      {
        name: 'Possession',
        desc: "Asuramaru's got some sweet healing powers.",
        effect: 'One-time revival',
        image: sprites.yuu,
        spr: 'yuu',
        unlocked: false,
        price: 15
      },
      {
        name: 'Doll Yuu',
        desc: 'Yikes! Did it just move?',
        effect: 'No effect',
        image: sprites.yuu,
        spr: 'yuu',
        unlocked: false,
        price: 5
      },
      {
        name: 'Glitchy Yuu',
        desc: 'Reference Error: yuu.mask is undefined',
        effect: 'Invincibility while glitching',
        image: sprites.yuu,
        spr: 'yuu',
        unlocked: false,
        price: 15
      },
      {
        name: 'Guren',
        desc: 'The Unparalleled Ichinose!',
        effect: 'No effect',
        image: sprites.yuu,
        spr: 'yuu',
        unlocked: false,
        price: 5
      },
      {
        name: 'Mitsuba',
        desc: 'Best girl, obviously.',
        effect: 'No effect',
        image: sprites.yuu,
        spr: 'yuu',
        unlocked: false,
        price: 5
      },
      {
        name: 'Seraph Yuu',
        desc: 'Congratulations!! You beat the game!!',
        effect: 'Complete invincibility',
        image: sprites.yuu,
        spr: 'yuu',
        unlocked: false,
        price: null
      }
    ],
    costumeIndex: 0,
    usingCostume: 'Default',
    forward: true // direction of card swap
  },
  computed: {
    costume() {
      return this.costumes[this.costumeIndex]
    },
    cardSwapEnter() {
      return 'magictime spaceIn' + (this.forward ? 'Right' : 'Left')
    },
    cardSwapLeave() {
      return 'magictime spaceOut' + (this.forward ? 'Left' : 'Right')
    }
  },
  methods: {
    mainMenu() {
      this.state = states.mainMenu
    },
    saveCode() {
      this.state = states.saveCode
    },
    levelSelect() {
      this.state = states.levelSelect
    },
    selectCostume() {
      if (this.costume.unlocked) {
        this.usingCostume = this.costume.name
        global.player.setImage(this.costume.spr)
      }
    },
    startLevel(mapIndex) {
      this.lastLevel = mapIndex
      let map = this.maps[mapIndex]
      this.state = states.crossing
      global.keyPressed = {}
      global.pause = false
      roomRestart(map, this.sprites)
      global.player.setEffect(this.costume.name)
    },
    openShop() {
      this.state = states.costumes
      global.pause = true
    },
    viewCostume(next) {
      this.forward = next > 0 ? 1 : 0
      if (this.costumeIndex + next >= this.costumes.length) {
        this.costumeIndex = 0
      } else if (this.costumeIndex + next < 0) {
        this.costumeIndex = this.costumes.length - 1
      } else {
        this.costumeIndex += next
      }
    },
    unlock(currentCostume) {
      if (this.coins < currentCostume.price) {
        yeet('you dun have enuff coinz')
        return
      }
      this.coins -= currentCostume.price
      localStorage.setItem('crossyuu-coin', this.coins)
      currentCostume.unlocked = true
      this.saveCostumes()
    },
    loadUnlocks(unlocks) {
      let _unlocks = parseInt(unlocks, 16)
      for (var i = this.costumes.length - 1; i > 0; i--) {
        this.costumes[i].unlocked = _unlocks & 1
        _unlocks = _unlocks >> 1
      }
    },
    loadSave() {
      if (isNaN(parseInt(this.savecode, 16))) {
        this.error = 'Your save code appears to be invalid.'
      } else {
        this.loadUnlocks(this.savecode)
        this.saveCostumes()
        this.mainMenu()
      }
    },
    saveCostumes() {
      // save costumes
      let _unlocks = 0
      for (var i = 1; i < this.costumes.length; i++) {
        _unlocks = _unlocks | this.costumes[i].unlocked
        _unlocks = _unlocks << 1
      }
      // trim extra bit
      _unlocks = _unlocks >> 1
      // save code
      yeet(_unlocks.toString(16))
      localStorage.setItem('crossyuu-save', _unlocks.toString(16))
    }
  },
  created() {
    // load costume unlocks
    let _save = localStorage.getItem('crossyuu-save') || 0
    this.loadUnlocks(_save)
    this.coins = localStorage.getItem('crossyuu-coin') || 0
    RunGame()
  }
})
