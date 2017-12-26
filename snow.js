class SnowFlake {
    constructor({
        size = 50,
        strokeStyle = '#fff',
        lineCap = 'round',
        lineWidth = Math.floor(Math.log(size)),
        branches = 5
    }) {
        const canvas = this.canvas = document.createElement('canvas')
        const c = this.c = canvas.getContext('2d')
        canvas.width = canvas.height = size

        c.translate(size / 2, size / 2)
        c.rotate(this.angle = Math.random())
        c.strokeStyle = strokeStyle
        c.lineCap = lineCap
        c.lineWidth = lineWidth

        const radius = this.radius = size / 2 - lineWidth - 2

        let branchesPoints = []
        for (let i = 0; i < branches; i++) {
            let base = Math.random() * radius
            let x = Math.random() * radius / 6
            branchesPoints.push({
                x1: 0,
                y1: base,
                x2: x,
                y2: base + x
            })
        }

        for (let i = 0; i < 6; i++) {
            c.rotate(Math.PI / 3)
            c.beginPath()
            c.lineTo(0, 0)
            c.lineTo(0, -radius)
            c.stroke()
            for (let branch of branchesPoints) {
                c.beginPath()
                c.lineTo(-branch.x2, -branch.y2)
                c.lineTo(branch.x1, -branch.y1)
                c.lineTo(branch.x2, -branch.y2)
                c.stroke()
            }
        }
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} c 
     */
    draw(c, x = 0, y = 0) {
        c.save()
        c.translate(x, y)
        c.rotate(this.angle += 0.0001)
        c.drawImage(this.canvas, 0, 0)
        c.restore()
    }
}

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvas.width = innerWidth
canvas.height = innerHeight
const c = canvas.getContext('2d')

const flakes = []

for (let i = 0; i < 500; i++) {

    const flake = new SnowFlake({
        size: 15 * Math.random() ** 5 + 10,
        lineWidth: 1,
        strokeStyle: `rgba(234, 234, 234, ${Math.random()})`
    })
    flake.x = Math.random() * innerWidth
    flake.y = Math.random() * innerHeight
    flake.vel_y = (Math.random() * flake.radius + 0.2) / 1.5
    flake.angle = 0
    flakes.push(flake)
}

const draw = () => {
    requestAnimationFrame(draw)
    c.clearRect(0, 0, innerWidth, innerHeight)
    for (let flake of flakes) {
        flake.draw(c, flake.x, flake.y)
        flake.angle += 0.05 * flake.radius / 20
        flake.x += (Math.sin(flake.angle) + Math.cos(flake.angle * 2) / 2) / 2
        flake.y += flake.vel_y
        if (flake.y > innerHeight) flake.y = -flake.radius * 2
    }
}
requestAnimationFrame(draw)