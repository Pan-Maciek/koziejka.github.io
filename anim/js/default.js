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
    for (var i = 0; i < lis.length; i++){
        var li = document.createElement("li")
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
    document.querySelector("#codeView>header div:nth-child(3)").addEventListener("click", hideCode)
}
window.addEventListener("keyup", function (e) {
    if(diplay_code) return
    if (e.key == "ArrowLeft") {
        moveLeft()
    } else if (e.key == "ArrowRight") {
        moveRight()
    } else if (e.key == " ") {
        // document.querySelector("#container>ul").classList.toggle('toList');
        // document.querySelector("#list").classList.toggle('toList');
    }
})
var last_moxse_x, md = false // mousedown
window.addEventListener("mousedown", function (e) {
    if(diplay_code) return
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
    if(diplay_code) return
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
    if (md) {
        lis[curent].style.left = lis[curent].offsetLeft + (e.touches[0].pageX - last_moxse_x) * 10 + "px";
        last_moxse_x = e.touches[0].pageX
    }
})


var curent = 0, lis
function moveLeft() {
    if (md || diplay_code) return
    if (curent >= lis.length - 1) {
        lis[curent].style.left = "50%"
        lis[curent].style.transform = "translate(-50%,-50%)"
        return
    }
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
    lis[curent].style.transform = "translate(-100%,-50%)"
    curent++
    lis[curent].style.left = "50%"
    lis[curent].style.transform = "translate(-50%,-50%)"
}

function moveRight() {
    if (md || diplay_code) return
    if (curent == 0) {
        lis[curent].style.left = "50%"
        lis[curent].style.transform = "translate(-50%,-50%)"
        return
    }
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
    selected.style.zIndex = "2000"
    document.querySelector("#arrowL").style.transform = "translateX(-200%)"
    document.querySelector("#arrowR").style.transform = "translateX(200%)"
    document.querySelector("#codeView").style.transform = "translate(-50%,0)"
}

function hideCode() {
    diplay_code = false
    document.querySelector("#codeView")
    document.querySelector("#arrowL").style = ""
    document.querySelector("#arrowR").style = ""
    document.querySelector("#codeView").style.transform = ""
}
