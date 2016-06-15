var bg = [], scale = 0.9, c, height = 100, width = 10
// MIN height 40
// MIN width 10
window.onload = function(){

    bg = {
        element: document.getElementById("can"),
        clear: function () {
            this.element.innerHTML = ""
        }
    }
    c = new Color()
    c.random()
    generate(c)
}

// GENERATE
function generate(color) {
    bg.clear()
    document.getElementsByTagName("style")[0].innerHTML += "td{width:" + width + "px;border-radius:" + width+ "px;height:" + height + "px}"
    var columns = Math.floor(window.innerWidth/width) + 1
    var j
    var rows = Math.floor(window.innerHeight / height)
    for (j = 0 ; j < rows ; j++){
        var row = document.createElement("tr")
        var columnColor = color.transform(j,scale).Hex
        for(var i = 0; i < columns; i++){
            var column = document.createElement("td")
            column.style.top = Math.floor(Math.random() * height / 2) + "px" // Przesunięcie
            column.style.backgroundColor = columnColor
            row.appendChild(column)
        }
        row.style.top = (height/3 * j) + "px"
        row.style.zIndex = -j
        bg.element.appendChild(row)
    }
    bg.element.style.backgroundColor = color.transform(j,scale).Hex
    for (j = 0 ; j < rows ; j++){
        var row = document.createElement("tr")
        columnColor = color.transform(j,scale).Hex
        for(var i = 0; i < columns; i++){
            var column = document.createElement("td")
            column.style.top = Math.floor(Math.random() * height / 2) + "px"
            column.style.backgroundColor = columnColor
            row.appendChild(column)
        }
        row.style.bottom = (height/3 * j) + "px"
        row.className = "bot"
        row.style.zIndex = -j
        bg.element.appendChild(row)
    }
}

// COLOR
function Color(){
    this.r = 0
    this.g = 0
    this.b = 0
}
Color.prototype.toHex = function(){
    return rgbToHex(this.r, this.g , this.b)
}
Color.prototype.random = function(){
    this.r = Math.floor(Math.random() * 255)
    this.g = Math.floor(Math.random() * 255)
    this.b = Math.floor(Math.random() * 255)
}
Color.prototype.fromHex = function(hex){
    var result
    if (hex.length > 4){
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    } else {
        result = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex)
        var r = []
        r.push("#")
        r.push(result[1] + result[1])
        r.push(result[2] + result[2])
        r.push(result[3] + result[3])
        result = r
    }

    this.r = parseInt(result[1], 16)
    this.g = parseInt(result[2], 16)
    this.b = parseInt(result[3], 16)
}
function colorPartTransform(colorpart, times, multiplier) {
    var result = parseInt(colorpart * Math.pow(multiplier, times))
    if (result > 255) {
        return 255
    } else if (result < 0) {
        return 0
    } else {
        return result
    }
}

Color.prototype.transform = function(times, multiplier){
    return {
        r: colorPartTransform(this.r, times, multiplier),
        g: colorPartTransform(this.g, times, multiplier),
        b: colorPartTransform(this.b, times, multiplier),
        Hex : (rgbToHex(colorPartTransform(this.r, times, multiplier),colorPartTransform(this.g, times, multiplier),colorPartTransform(this.b, times, multiplier))).toUpperCase()
    }
}

// UTILITIES
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
