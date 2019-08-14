var utils = {
    calculateColor: function (color, opacity) {
        if (color.indexOf('#') === 0) {
            var color16 = color.slice(1)
            var r = parseInt(color16.slice(0, 2), 16)
            var g = parseInt(color16.slice(2, 4), 16)
            var b = parseInt(color16.slice(4), 16)
            return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')'
        } else if (/^rgb\(/.test(color)) {
            return color.replace(/rgb/, 'rgba').replace(')', ",") +
                opacity + ')'
        } else {
            return color.split(',').splice(0, 3).join(',') +
                opacity + ')'
        }
    }
}

var arrayUtils = {
    forEach: function (arr, cb, scope) {
        if (typeof Array.prototype.forEach === 'function') {
            arr.forEach(cb, scope)
        } else {
            for (var i = 0, len = arr.length; i < len; i++) {
                cb.apply(scope, [arr[i], i, arr])
            }
        }
    },
    map: function (arr, cb, scope) {
        if (typeof Array.prototype.map === 'function') {
            return arr.map(cb, scope)
        } else {
            var mapped = []
            for (var i = 0, len = arr.length; i < len; i++) {
                mapped[i] = cb.apply(scope, [arr[i], i, arr])
            }
            return mapped
        }
    }
}

var Marker = (function () {
    var M = function (options) {
        this.x = options.x
        this.y = options.y
        this.rotation = options.rotation
        this.style = options.style
        this.color = options.color
        this.size = options.size
        this.borderWidth = options.borderWidth
        this.borderColor = options.borderColor
    }

    M.prototype.draw = function (context) {
        context.save()
        context.translate(this.x, this.y)
        context.rotate(this.rotation)

        context.lineWidth = this.borderWidth || 0
        context.strokeStyle = this.borderColor || '#000'
        context.fillStyle = this.color || '#000'
        context.beginPath()
        if (this.style === 'circle') {
            context.arc(0, 0, this.size, 0, Math.PI * 2, false)
        } else if (this.style === 'arrow') {
            context.moveTo(-this.size, -this.size)
            context.lineTo(this.size, 0)
            context.lineTo(-this.size, this.size)
            context.lineTo(-this.size / 4, 0)
            context.lineTo(-this.size, -this.size)
        }
        context.closePath()
        context.stroke()
        context.fill()
        context.restore()
    }

    return M
})()

var Arc = (function () {
    var A = function (options) {
        var startX = options.startX,
            startY = options.startY,
            endX = options.endX,
            endY = options.endY

        var L = Math.sqrt(Math.pow(startX - endX, 2) + Math.pow(startY - endY, 2))
        var m = (startX + endX) / 2
        var n = (startY + endY) / 2
        var factor = 1.5

        var centerX = (startY - endY) * factor + m
        var centerY = (endX - startX) * factor + n

        var radius = Math.sqrt(Math.pow(L / 2, 2) + Math.pow(L * factor, 2))
        var startAngle = Math.atan2(startY - centerY, startX - centerX)
        var endAngle = Math.atan2(endY - centerY, endX - centerX)

        this.startX = startX
        this.startY = startY
        this.endX = endX
        this.endY = endY
        this.centerX = centerX
        this.centerY = centerY
        this.startAngle = startAngle
        this.endAngle = endAngle
        this.startLabel = options && options.labels && options.labels[0],
        this.endLabel = options && options.labels && options.labels[1],
        this.radius = radius
        this.lineWidth = options.width || 1
        this.strokeStyle = options.color || '#000'
        this.shadowBlur = options.shadowBlur
    }

    A.prototype.draw = function (context) {
        context.save()
        context.lineWidth = this.lineWidth
        context.strokeStyle = this.strokeStyle

        context.beginPath()
        context.arc(this.centerX, this.centerY, this.radius, this.startAngle, this.endAngle, false)
        context.stroke()
        context.restore()

        context.save()
        context.fillStyle = this.strokeStyle
        context.font = "15px sans-serif"
        context.restore()
    }

    return A
})()

var Pulse = (function () {
    function P(options) {
        this.x = options.x
        this.y = options.y
        this.minRadius = options.minr
        this.maxRadius = options.maxr
        this.speed = (this.maxRadius - this.minRadius) / (1000 / (1000 / 60)) / 2
        this.color = options.color
        this.shadowBlur = 5
        this.lineWidth = options.borderWidth
        this.r = this.minRadius
        this.pball1 = {
            name: 'pball1',
            r: this.minRadius,
            vr: this.speed,
            delayflag: false,
            fadecount: 0,
            stopflag: false,
            next: 'pball2',
            play: function () {
                this.stopflag = false
            },
            pause: function () {
                this.stopflag = true
            }
        }
        this.pball2 = {
            name: 'pball2',
            r: this.minRadius,
            vr: this.speed,
            delayflag: false,
            fadecount: 0,
            stopflag: false,
            next: 'pball3',
            play: function () {
                this.stopflag = false
            },
            pause: function () {
                this.stopflag = true
            }
        }
        this.pball3 = {
            name: 'pball3',
            r: this.minRadius,
            vr: this.speed,
            delayflag: false,
            fadecount: 0,
            stopflag: false,
            next: 'pball1',
            play: function () {
                this.stopflag = false
            },
            pause: function () {
                this.stopflag = true
            }
        }
        this.factor = 2 / options.radius
        this.secondstartflag = false
        this.thirdstartflag = false
        this.lockflag = false
        this.delayflag = false
        this.halfdistance = (this.maxRadius + this.minRadius) / 2
        this.vr = this.speed
        this.animateobjs = []
        this.animateobjs.push(this.pball1)
    }

    P.prototype.draw = function (context) {
        this.animateobjs.map((obj) => {
            if (!obj.stopflag) {
                this.drawSingle(context, obj)
            }
        })
    }

    P.prototype.addObject = function (obj) {
        this.animateobjs.push(obj)
    }

    P.prototype.drawSingle = function (context, obj) {
        obj.r += obj.vr
        context.save()
        context.translate(this.x, this.y)
        let strokeColor = this.color
        if (obj.delayflag) {
            let ratio = obj.fadecount / 60
            if (ratio <= 1) {
                strokeColor = utils.calculateColor(strokeColor, 0.3 - 0.3 * ratio)
            } else {
                obj.r = this.minRadius
                obj.vr = this.speed
                obj.delayflag = false
                obj.fadecount = 0
                obj.pause()
            }
        } else {
            strokeColor = utils.calculateColor(strokeColor, 0.3)
        }
        context.fillStyle = strokeColor
        context.beginPath()
        context.arc(0, 0, obj.r, 0, Math.PI * 2, false)
        context.fill()
        context.restore()
        if (obj.r > this.halfdistance) {
            if (obj.name == 'pball1' && !this.secondstartflag) {
                this.secondstartflag = true
                this.addObject(this[obj.next])
            }
            else if (obj.name == 'pball2' && !this.thirdstartflag) {
                this.thirdstartflag = true
                this.addObject(this[obj.next])
            }
            else {
                this[obj.next].play()
            }
        }
        if (Math.abs(this.maxRadius - obj.r) < 0.8) {
            if (!obj.delayflag) {
                obj.vr = 0
                obj.delayflag = true
            } else {
                obj.fadecount += 1
            }
        }
    }

    return P;
})();

var Dot = (function () {
    function C(options) {
        this.x = options.x
        this.y = options.y
        this.r = options.r
        this.color = options.color
    }
    C.prototype.draw = function (context) {
        context.save()
        context.beginPath()
        context.fillStyle = this.color
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
        context.closePath()
        context.fill()
        context.restore()
    }
    return C
})()

var Spark = (function () {
    var S = function (options) {
        var startX = options.startX,
            startY = options.startY,
            endX = options.endX,
            endY = options.endY

        //两点之间的圆有多个，通过两点及半径便可以定出两个圆，根据需要选取其中一个圆
        var L = Math.sqrt(Math.pow(startX - endX, 2) + Math.pow(startY - endY, 2))
        var m = (startX + endX) / 2 // 横轴中点
        var n = (startY + endY) / 2 // 纵轴中点
        var factor = 1.5

        var centerX = (startY - endY) * factor + m
        var centerY = (endX - startX) * factor + n

        var radius = Math.sqrt(Math.pow(L / 2, 2) + Math.pow(L * factor, 2))
        var startAngle = Math.atan2(startY - centerY, startX - centerX)
        var endAngle = Math.atan2(endY - centerY, endX - centerX)

        // 保证Spark的弧度不超过Math.PI
        if (startAngle * endAngle < 0) {
            if (startAngle < 0) {
                startAngle += Math.PI * 2
                endAngle += Math.PI * 2
            } else {
                endAngle += Math.PI * 2
            }
        }

        this.tailPointsCount = 15 // 拖尾点数
        this.centerX = centerX
        this.centerY = centerY
        this.startAngle = startAngle
        this.endAngle = endAngle
        this.radius = radius
        this.lineWidth = options.width
        this.sparkWidth = options.sparkwidth
        this.strokeStyle = options.color
        this.factor = 2 / this.radius
        this.deltaAngle = (80 / Math.min(this.radius, 400)) / this.tailPointsCount
        this.trailAngle = this.startAngle
        this.arcAngle = this.startAngle

        this.animateBlur = true
        this.tripleSpeed = options.tripleSpeed
        this.marker = new Marker({
            x: 50,
            y: 80,
            rotation: 50 * Math.PI / 180,
            style: 'circle',
            color: options.color,
            size: this.sparkWidth,
            borderWidth: 0,
            borderColor: this.strokeStyle
        })
    }

    S.prototype.drawArc = function (context, strokeColor, lineWidth, startAngle, endAngle) {
        context.save()
        context.lineWidth = lineWidth*2
        context.strokeStyle = strokeColor
        context.shadowColor = this.strokeStyle
        context.shadowBlur = 10
        context.lineCap = "round"
        context.beginPath()
        context.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle, false)
        context.stroke()
        context.restore()
    }

    S.prototype.draw = function (context) {
        var endAngle = this.endAngle
        // 匀速
        var angle = this.trailAngle + (endAngle - this.startAngle) * this.factor * this.tripleSpeed
        var strokeColor = this.strokeStyle
        if (this.animateBlur) {
            this.arcAngle = angle
        }
        this.trailAngle = angle
        strokeColor = utils.calculateColor(strokeColor, 0.1)

        // 拖尾效果
        var count = this.tailPointsCount
        for (var i = 0; i < count; i++) {
            var arcColor = utils.calculateColor(this.strokeStyle, 0.3 - 0.3 / count * i)
            var tailLineWidth = this.sparkWidth
            if (this.trailAngle - this.deltaAngle * i > this.startAngle) {
                this.drawArc(context, arcColor,
                    tailLineWidth - tailLineWidth / count * i,
                    this.trailAngle - this.deltaAngle * i,
                    this.trailAngle
                )
            }
        }

        context.save()
        context.translate(this.centerX, this.centerY)
        this.marker.x = Math.cos(this.trailAngle) * this.radius
        this.marker.y = Math.sin(this.trailAngle) * this.radius
        this.marker.draw(context)

        context.restore()

        if ((endAngle - this.trailAngle) * 180 / Math.PI < 0.5) {
            this.trailAngle = this.startAngle
            this.animateBlur = false
        }
    }

    return S
})()

var Migration = function (options) {
    this.data = options.data
    this.dots = options.dots
    this.store = {
        arcs: [],
        markers: [],
        sparks: [],
        dots: [],
    }
    this.playAnimation = true
    this.started = false
    this.context = options.context
    this.init()
}

Migration.prototype.init = function () {
    this.updateData(this.data, this.dots)
}
Migration.prototype.add = function (Shape) {

}
Migration.prototype.remove = function () {

}
Migration.prototype.clear = function () {
    this.store = {
        arcs: [],
        markers: [],
        pulses: [],
        sparks: [],
        dots: []
    }
    this.playAnimation = true
    this.started = false
    window.cancelAnimationFrame(this.requestAnimationId)
}
/*
 * 更新数据
*/
Migration.prototype.updateData = function (data, dots) {
    if (!data || data.length === 0) {
        return
    }
    this.clear()
    this.data = data
    this.dots = dots
    if (this.data && this.data.length > 0) {
        arrayUtils.forEach(this.data, function (element) {
            var arc = new Arc({
                startX: element.from[0],
                startY: element.from[1],
                endX: element.to[0],
                endY: element.to[1],
                labels: element.labels,
                width: element.linewidth || 4,
                color: element.linecolor || '#fff',
            })

            var spark = new Spark({
                startX: element.from[0],
                startY: element.from[1],
                endX: element.to[0],
                endY: element.to[1],
                width: element.width || 10,
                color: element.color || '#24FFB5',
                tripleSpeed: element.tripleSpeed || 5,
                sparkwidth: element.sparkwidth || 10
            })

            this.store.arcs.push(arc)
            this.store.sparks.push(spark)
        }, this)
    }

/*     if (this.dots && this.dots.length > 0) {
        this.dots.map((dot) => {
            dot.arr.map((yuan) => {
                var circle = new Dot({
                    x: dot.pos[0],
                    y: dot.pos[1],
                    r: yuan.radius,
                    color: yuan.color
                })
                this.store.dots.push(circle)
            })
            var pulse = new Pulse({
                x: dot.pos[0],
                y: dot.pos[1],
                minr: dot.minr,
                maxr: dot.maxr,
                color: dot.color,
                borderWidth: 0
            });
            this.store.pulses.push(pulse);
        })
    } */

}

Migration.prototype.start = function (canvas) {
    var that = this
    if (!this.started) {
        (function drawFrame() {
            that.requestAnimationId = window.requestAnimationFrame(drawFrame, canvas)

            if (that.playAnimation) {
                that.context.clearRect(0, 0, canvas.width, canvas.height)
                canvas.width = canvas.width
                for (var p in that.store) {
                    var shapes = that.store[p]
                    for (var i = 0, len = shapes.length; i < len; i++) {
                        shapes[i].draw(that.context)
                    }
                }
            }
        })()
        this.started = true
    }
}

export {
    Migration
}