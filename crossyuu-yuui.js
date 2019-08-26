var game = new Vue({
  el: '#game',
  data: {
    states: states,
    state: states.mainMenu,
    costumes: [
      {
        name: 'Default',
        desc: 'Yuu can definitely do it!',
        effect: 'No effect',
        image: sprites.yuu,
        spr: 'yuu',
        unlocked: true
      },
      {
        name: 'Mika',
        desc: 'Get carried across the road.',
        effect: 'Speed x2',
        image: sprites.yuu,
        spr: 'yuu',
        unlocked: false
      },
      {
        name: 'Flower Crown',
        desc: 'Cross the street in style.',
        effect: 'No effect',
        image: sprites.flower_crown,
        spr: 'flower_crown',
        unlocked: false,
      },
      {
        name: 'Possession',
        desc: 'Asuramaru\'s got some sweet healing powers.',
        effect: 'One-time revival',
        image: sprites.yuu,
        spr: 'yuu',
        unlocked: false
      },
      {
        name: 'Doll Yuu',
        desc: 'Yikes! Did it just move?',
        effect: 'No effect',
        image: sprites.yuu,
        spr: 'yuu',
        unlocked: false
      },
      {
        name: 'Glitchy Yuu',
        desc: 'Reference Error: yuu.mask is undefined',
        effect: 'Invincibility while glitching',
        image: sprites.yuu,
        spr: 'yuu',
        unlocked: false
      },
      {
        name: 'Guren',
        desc: 'The Unparalleled Ichinose!',
        effect: 'No effect',
        image: sprites.yuu,
        spr: 'yuu',
        unlocked: false
      },
      {
        name: 'Mitsuba',
        desc: 'Best girl, obviously.',
        effect: 'No effect',
        image: sprites.yuu,
        spr: 'yuu',
        unlocked: false
      },
      {
        name: 'Seraph Yuu',
        desc: 'Congratulations!! You beat the game!!',
        effect: 'Complete invincibility',
        image: sprites.yuu,
        spr: 'yuu',
        unlocked: false
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
    selectCostume() {
      if (this.costume.unlocked) {
        this.usingCostume = this.costume.name
        global.player.setImage(this.costume.spr)
      }
    },
    startLevel() {
      this.state = states.crossing
      global.keyPressed = {}
      global.pause = false
      global.player.restart(1, 1)
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
      currentCostume.unlocked = true
      // 8 costume unlocks, default always unlocked
      let _unlocks = 0
      for (var i = 1; i < this.costumes.length; i++) {
        _unlocks = _unlocks | this.costumes[i].unlocked;
        _unlocks = _unlocks << 1;
      }
      // trim extra bit
      _unlocks = _unlocks >> 1;
      // save code
      yeet(_unlocks.toString(16))
      localStorage.setItem('crossyuu-save', _unlocks.toString(16))
    }
  },
  created() {
    // load costume unlocks
    let _unlocks = localStorage.getItem('crossyuu-save') || 0
    for (var i = this.costumes.length - 1; i > 0; i--) {
      this.costumes[i].unlocked = _unlocks & 1
      _unlocks = _unlocks >> 1
    }
  }
})
