const canvas = document.createElement("canvas")
const settings = {
    elementWidth: 8,
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

    setInterval(function () {
        c.fillStyle = settings.baseColor
        c.fillRect(0, 0, w, h)

        c.fillStyle = color2
        for (var x = 0; x < count; x++) {
            c.fillRect(x * _xoffset, 0, settings.elementWidth, 100 + top2[x].h)
            c.beginPath()
            c.ellipse(x * _xoffset + r, 100 + top2[x].h, r, r, Math.PI * 2, 0, Math.PI * 2)
            c.closePath()
            c.fill()

            c.fillRect(x * _xoffset, h, settings.elementWidth, -100 - top2[x].h)
            c.beginPath()
            c.ellipse(x * _xoffset + r, h - 100 - top2[x].h, r, r, Math.PI * 2, 0, Math.PI * 2)
            c.closePath()
            c.fill()

            top2[x].h -= top2[x].direction
            if (top2[x].h < 0 || top2[x].h > 80) top2[x].direction *= -1
        }

        c.fillStyle = color
        for (var x = 0; x < count; x++) {
            c.fillRect(x * _xoffset, 0, settings.elementWidth, top[x].h)
            c.beginPath()
            c.ellipse(x * _xoffset + r, top[x].h, r, r, Math.PI * 2, 0, Math.PI * 2)
            c.closePath()
            c.fill()

            c.fillRect(x * _xoffset, h, settings.elementWidth, -top[x].h)
            c.beginPath()
            c.ellipse(x * _xoffset + r, h - top[x].h, r, r, Math.PI * 2, 0, Math.PI * 2)
            c.closePath()
            c.fill()
            top[x].h -= top[x].direction
            if (top[x].h < 0 || top[x].h > 80) top[x].direction *= -1
        }
    }, 50)
})

