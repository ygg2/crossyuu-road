var game = new Vue({
  el: '#game',
  data: {
    states: states,
    state: states.mainMenu,
    costumes: [
      {
        name: 'Default',
        desc: 'Yuu can do it!',
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
        desc: 'Yikes! It moves!',
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
    costumeIndex: 0
  },
  computed: {
    costume() {
      return this.costumes[this.costumeIndex]
    }
  },
  methods: {
    mainMenu() {
      if (this.costume.unlocked)
      this.state = states.mainMenu
      else {
        yeet('this aint unlocked fam')
      }
    },
    startLevel() {
      this.state = states.crossing
      global.keyPressed = {}
      global.pause = false
      global.player.setImage(this.costume.spr)
      global.player.restart(1, 1)
    },
    openShop() {
      this.state = states.costumes
      global.pause = true
    },
    viewCostume(next) {
      if (this.costumeIndex + next >= this.costumes.length) {
        this.costumeIndex = 0
      } else if (this.costumeIndex + next < 0) {
        this.costumeIndex = this.costumes.length - 1
      } else {
        this.costumeIndex += next
      }
    }
  }
})
