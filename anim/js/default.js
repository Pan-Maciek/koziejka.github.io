window.onload = function () {
    var hsl = [parseInt(Math.random() * 48), "50%", "41%"]
    document.body.style.backgroundColor = translateToColor(hsl)
    var meta = document.createElement("meta")
    meta.name = "theme-color"
    hsl[2] = "30%"
    meta.content = translateToColor(hsl)
    document.querySelector("head").appendChild(meta)
    lis = document.querySelectorAll("#container>ul>li")
    var temp = document.querySelector("#list")
    var temp2 = document.querySelector("#hidenList")
    for (var i = 0; i < lis.length; i++){
        lis[i].addEventListener("click", (function (x) {
            return function () {
                if (!diplay_list) return
                var a = document.querySelectorAll("#list li")
                a[lis.length - curent - 1].style = ""
                curent = x
                a[lis.length - curent - 1].style = "transform:scale(1.2);opacity:1"
                select(x)
            }
         })(i))
        var li = document.createElement("li")
        var li2 = document.createElement("li")
        temp2.appendChild(li2)
        var code = document.createElement("div")
        code.className = "code"
        code.innerHTML = "CODE"
        code.addEventListener("click", (function (c) {
            return function (e) {
                e.stopPropagation()
                showCode(c)
            }
        })(i))
        lis[i].appendChild(code)
        li.addEventListener("click", (function (c) {
            return function () {
                if (curent == c) return
                if (curent > c) {
                    for (var j = curent; j > c; j--) {
                        setTimeout(function() {
                            moveRight()
                        }, 100 * j);
                    }
                } else {
                    for (var j = curent; j < c; j++) {
                        setTimeout(function() {
                            moveLeft()
                        }, 100 * j);
                    }
                }
            }
        })(lis.length - 1 - i))
        temp.appendChild(li)
    }
    temp.lastChild.style = "transform:scale(1.2);opacity:1"
    document.querySelector("#arrowL").addEventListener("click", moveLeft)
    document.querySelector("#arrowR").addEventListener("click", moveRight)
    {
        var divs = document.querySelectorAll("#codeView>header div")
        divs[0].addEventListener("click", function(){
            changetCodeTo(this.innerHTML)
        })
        divs[1].addEventListener("click", function(){
            changetCodeTo(this.innerHTML)
        })
        divs[2].addEventListener("click", hideCode)
        var colors = document.querySelectorAll(".color")
        for (var i = 0; i < colors.length; i++){
            var b = document.createElement("b")
            b.style.backgroundColor = colors[i].innerHTML
            colors[i].appendChild(b)
        }
    }
    window.addEventListener("mousewheel", function (e) {
        if (e.wheelDelta > 0) {
            moveLeft()
        } else {
            moveRight()
        }
    })
}
window.addEventListener("keyup", function (e) {
    if(diplay_code) return
    if (e.key == "ArrowLeft") {
        moveLeft()
    } else if (e.key == "ArrowRight") {
        moveRight()
    } else if (e.key == " ") {
        toList()
    }
})
var last_moxse_x, diplay_list = false, md = false // mousedown
window.addEventListener("mousedown", function (e) {
    if(diplay_code || diplay_list) return
    if (e.pageX < 40) return
    if (e.pageX > window.innerWidth - 40) return
    if (window.innerHeight - e.pageY < 60) return
    md = true
    last_moxse_x = e.pageX
    lis[curent].style.transitionDuration = "0.2s"
})
window.addEventListener("mouseup", function () {
    if(!md) return
    md = false
    lis[curent].style.transitionDuration = ""
    if (Math.abs(window.innerWidth / 2 - lis[curent].offsetLeft) < 30) {
        lis[curent].style.left = "50%"
        lis[curent].style.transform = "translate(-50%,-50%)"
        return
    }
    if (parseInt(lis[curent].style.left.replace("px", "")) > window.innerWidth / 2) {
        moveRight()
    } else {
        moveLeft()
    }
})
window.addEventListener("mousemove", function (e) {
    if (md) {
        lis[curent].style.left = lis[curent].offsetLeft + (e.pageX - last_moxse_x) * 20 + "px";
        last_moxse_x = e.pageX
    }
})

window.addEventListener("touchstart", function (e) {
    if(diplay_code || diplay_list) return
    md = true
    last_moxse_x = e.touches[0].pageX
    lis[curent].style.transitionDuration = "0.2s"
})
window.addEventListener("touchend", function () {
    if(!md) return
    md = false
    lis[curent].style.transitionDuration = ""
    if (Math.abs(window.innerWidth / 2 - lis[curent].offsetLeft) < 30) {
        lis[curent].style.left = "50%"
        lis[curent].style.transform = "translate(-50%,-50%)"
        return
    }
    if (parseInt(lis[curent].style.left.replace("px", "")) > window.innerWidth / 2) {
        moveRight()
    } else {
        moveLeft()
    }
})
window.addEventListener("touchmove", function (e) {
    if (diplay_list) return
    if (md) {
        lis[curent].style.left = lis[curent].offsetLeft + (e.touches[0].pageX - last_moxse_x) * 10 + "px";
        last_moxse_x = e.touches[0].pageX
    }
})


var curent = 0, lis
function moveLeft() {
    if (md || diplay_code || diplay_list) return
    if (curent >= lis.length - 1) {
        lis[curent].style.left = "50%"
        lis[curent].style.transform = "translate(-50%,-50%)"
        return
    }
    if (curent == lis.length - 2) {
        document.querySelector("#arrowL").style.transform = "translateX(-200%)"
    }
    document.querySelector("#arrowR").style = ""
    var a = document.querySelectorAll("#list li")
    a[a.length - 1 - curent].style = "opacity:1"
    a[a.length - 1 - curent].className = "moveL"
    setTimeout((function (el) {
        return function () {
            el.style = ""
            el.className = ""
            a[a.length - 1 - curent].style = "transform:scale(1.2);opacity:1"
        }
    })(a[a.length - 1 - curent]), 500)
    lis[curent].style.left = "0"
    lis[curent].style.transform = "translate(-110%,-50%)"
    curent++
    lis[curent].style.left = "50%"
    lis[curent].style.transform = "translate(-50%,-50%)"
}

function moveRight() {
    if (md || diplay_code || diplay_list) return
    if (curent == 0) {
        lis[curent].style.left = "50%"
        lis[curent].style.transform = "translate(-50%,-50%)"
        return
    }
    if (curent == 1) {
        document.querySelector("#arrowR").style.transform = "translateX(200%)"
    }
    document.querySelector("#arrowL").style = ""
    var a = document.querySelectorAll("#list li")
    a[a.length - 1 - curent].style = "opacity:1"
    a[a.length - 1 - curent].className = "moveR"
    setTimeout((function (el) {
        return function () {
            el.style = ""
            el.className = ""
            a[a.length - 1 - curent].style = "transform:scale(1.2);opacity:1"
        }
    })(a[a.length - 1 - curent]), 500)
    lis[curent].style.left = "100%"
    lis[curent].style.transform = "translate(100%,-50%)"
    curent--
    lis[curent].style.left = "50%"
    lis[curent].style.transform = "translate(-50%,-50%)"
}

function translateToColor(obj) {
    return "hsl("+obj[0]+","+obj[1]+","+obj[2]+")"
}

var selected, code_type = "html", diplay_code = false
function showCode(c) {
    if (selected) selected.style = ""
    diplay_code = true
    selected = document.querySelector("#codeView li:nth-child(" + (c + 1) + ") ." + code_type)
    selected.style = "display:block"
    document.querySelector("#arrowL").style.transform = "translateX(-200%)"
    document.querySelector("#arrowR").style.transform = "translateX(200%)"
    document.querySelector("#codeView").style.transform = "translate(-50%,0)"
}

function changetCodeTo(ctype) {
    ctype = ctype.toLowerCase()
    if (ctype == code_type || ctype == "x") return
    code_type = ctype
    var header = document.querySelectorAll("#codeView div")

    if (ctype == "html") {
        header[0].style.backgroundColor = ""
        header[1].style.backgroundColor = "#c2c2c2"
    } else {
        header[0].style.backgroundColor = "#c2c2c2"
        header[1].style.backgroundColor = ""
    }
    selected.style = ""
    selected = selected.parentNode.querySelector("." + ctype)
    selected.style = "display:block"
}

function hideCode() {
    diplay_code = false
    document.querySelector("#codeView")
    if (curent != lis.length - 1) document.querySelector("#arrowL").style = ""
    if (curent != 0) document.querySelector("#arrowR").style = ""
    document.querySelector("#codeView").style.transform = ""
}

function toList() {
    if (diplay_code) return
    diplay_list = true
    var elementy = document.querySelectorAll("#hidenList li"),
        l = document.querySelector("#hidenList"),
        t = l.offsetTop,
        w = l.offsetWidth / 2,
        h = l.offsetHeight / 2
    l = l.offsetLeft
    document.querySelector("#arrowL").style.transform = "translateX(-200%)"
    document.querySelector("#arrowR").style.transform = "translateX(200%)"
    document.querySelector("#list").style.transform = "translate(-50%, 200%)"
    for (var i = 0; i < lis.length; i++){
        lis[i].className = "list"
        lis[i].style.top = (t + elementy[i].offsetTop - h) + "px"
        lis[i].style.left = (l + elementy[i].offsetLeft - w) + "px"
    }
}

function select(x) {
    if (diplay_list) {
        for (var i = 0; i < x; i++){
            lis[i].className = ""
            lis[i].style = "transform:translate(-110%, -50%);left:0;"
        }
        for (var i = x + 1; i < lis.length; i++){
            lis[i].className = ""
            lis[i].style = "transform:translate(0, -50%)"
        }
        lis[x].className = ""
        lis[x].style = "left:50%;transform:translate(-50%, -50%)"
        document.querySelector("#arrowL").style = ""
        document.querySelector("#arrowR").style = ""
        document.querySelector("#list").style = ""
    }
    diplay_list = false
}

window.addEventListener("resize", function () {
    if (diplay_list) toList()
})

window.addEventListener("doubletap", function () {
    toList()
})

window.addEventListener("dblclick", function () {
    toList()
})
