function Color() {
    this.r = 0
    this.g = 0
    this.b = 0
}
Color.prototype.random = function (pattern) {
    this.r = Math.floor(Math.random() * 255)
    this.g = Math.floor(Math.random() * 255)
    this.b = Math.floor(Math.random() * 255)
}
Color.prototype.rgb = function () {
    return [this.r, this.g, this.b]
}
Color.prototype.hex = function () {
    var _r = this.r.toString(16), _g = this.g.toString(16), _b = this.b.toString(16)
    if (_r.length === 1) _r = 0 + _r
    if (_g.length === 1) _g = 0 + _g
    if (_b.length === 1) _b = 0 + _b
    return `#${_r}${_g}${_b}`
}
Color.prototype.hsl = function () {
    var _r = this.r / 255,
        _g = this.g / 255,
        _b = this.b / 255,
        max = Math.max(_r, _g, _b),
        min = Math.min(_r, _g, _b)

    var h, s, l = (max + min) / 2

    if (max == min) h = s = 0
    else {
        var delta = max - min
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)
        switch (max) {
            case _r:
                h = (_g - _b) / delta + (_g < _b ? 6 : 0)
                break
            case _g:
                h = (_b - _r) / delta + 2
                break
            case _b:
                h = (_r - _g) / delta + 4
                break
        }
        h /= 6
    }
    return [h, s, l]
}
Color.prototype.toString = function (type) {
    if (type) type = type.toLowerCase()
    switch (type) {
        case "hsl":
            var temp = this.hsl()
            return `hsl(${360 * temp[0]},${100 * temp[1]}%,${100 * temp[2]}%)`
        case "hex":
            return this.hex()
        default:
            return `rgb(${this.r},${this.g},${this.b})`
    }
}
Color.prototype.darker = function (scale) {
    var color = new Color()
    color.r = Math.floor(this.r * scale)
    color.g = Math.floor(this.g * scale)
    color.b = Math.floor(this.b * scale)
    return color
}