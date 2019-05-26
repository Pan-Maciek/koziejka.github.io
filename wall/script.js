const canvas = document.createElement("canvas")
const settings = {
  elementWidth: 10,
  elementsSpacing: 0,
  baseColor: new Color()
}
noise.seed(Math.random())

window.addEventListener("load", function () {
  document.body.appendChild(canvas)
  var w = window.innerWidth,
    h = window.innerHeight
  canvas.width = w
  canvas.height = h
  settings.baseColor.random()

  var c = canvas.getContext("2d")
  var color = settings.baseColor.darker(.8), color2 = settings.baseColor.darker(.6)
  var count = Math.floor(w / (settings.elementWidth + settings.elementsSpacing)) + 1
  var r = settings.elementWidth / 2

  var top = [], top2 = []
  var _xoffset = (settings.elementWidth + settings.elementsSpacing) // 
  for (var x = 0; x < count; x++) {
    top.push({
      h: 50 + 20 * noise.simplex2(x / 10, 100),
      direction: 2
    })
    top2.push({
      h: 50 + 20 * noise.simplex2(x / 5, 100),
      direction: 1.8
    })
  }

  let time = 0

  function draw() {
    time += 0.01
    c.fillStyle = settings.baseColor
    c.fillRect(0, 0, w, h)

    c.fillStyle = color2
    let y_offset = time
    for (var x = 0; x < count; x++) {
      y_offset += 0.05
      c.fillRect(x * _xoffset, 0, settings.elementWidth, 110 + top2[x].h + Math.sin(y_offset) * 50)
      c.beginPath()
      c.ellipse(x * _xoffset + r, 110 + top2[x].h + Math.sin(y_offset) * 50, r, r, Math.PI * 2, 0, Math.PI * 2)
      c.closePath()
      c.fill()

      c.fillRect(x * _xoffset, h, settings.elementWidth, -100 - top2[x].h - Math.sin(y_offset) * 50)
      c.beginPath()
      c.ellipse(x * _xoffset + r, h - 100 - top2[x].h - Math.sin(y_offset) * 50, r, r, Math.PI * 2, 0, Math.PI * 2)
      c.closePath()
      c.fill()
    }

    c.fillStyle = color
    for (var x = 0; x < count; x++) {
      y_offset += 0.1
      c.fillRect(x * _xoffset, 0, settings.elementWidth, top[x].h + Math.cos(y_offset) * 30)
      c.beginPath()
      c.ellipse(x * _xoffset + r, top[x].h + Math.cos(y_offset) * 30, r, r, Math.PI * 2, 0, Math.PI * 2)
      c.closePath()
      c.fill()

      c.fillRect(x * _xoffset, h, settings.elementWidth, -top[x].h - Math.cos(y_offset) * 30)
      c.beginPath()
      c.ellipse(x * _xoffset + r, h - top[x].h - Math.cos(y_offset) * 30, r, r, Math.PI * 2, 0, Math.PI * 2)
      c.closePath()
      c.fill()
    }
    requestAnimationFrame(draw)
  }
  requestAnimationFrame(draw)
})

