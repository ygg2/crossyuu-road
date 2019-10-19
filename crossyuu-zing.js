var touchArea = new ZingTouch.Region(document.body);

var wholeScreen = document.getElementById("crossyuu-canvas");

touchArea.bind(wholeScreen, 'tap', (e) => {
  keyboardKeyPress(global.keymap.up);
}, false);

touchArea.bind(wholeScreen, 'swipe', (e) => {
  var dir = e.detail.data[0].currentDirection;
  dir += 45; // adjust direction
  console.log(dir)
  if (dir < 90 || dir > 360) {
    keyboardKeyPress(global.keymap.right)
  } else if (dir < 180) {
    keyboardKeyPress(global.keymap.up)
  } else if (dir < 270) {
    keyboardKeyPress(global.keymap.left)
  } else {
    keyboardKeyPress(global.keymap.down)
  }
}, false);