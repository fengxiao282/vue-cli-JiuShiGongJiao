/*  */
// 要求a, b 都是Date类型, 且a < b
function RandomDate(a, b) {
    var date = new Date(),
        a = a.getTime(),
        b = b.getTime()
    date.setTime(Math.random()*(b - a) + a)
    return date
}

/**
* 返回一个随机日期字符串
*/
function RandomDateString(a, b) {
    let date = RandomDate(new Date(a), new Date(b))
    let result = date.toLocaleString().split("").filter((item) => {
        return !/[\u4E00-\u9FA5]/g.test(item)
    }).join("")
    return result
}

/** 
* 返回一个随机字母，可指定大小写
*/
function getCharacter(flag) {
    var character = ""
    if (flag === "lower") {
        character = String.fromCharCode(Math.floor(Math.random() * 26) + "a".charCodeAt(0))
    }
    if (flag === "upper") {
        character = String.fromCharCode(Math.floor(Math.random() * 26) + "A".charCodeAt(0))
    }
    return character
} 

/** 
* 返回一个随机的字母 
*/
function RandomLetter(type = 'lower') {
    return getCharacter(type)
}

/**
* 返回一个随机的数字
*/
function RandomNumBoth (Min, Max) {
    let Range = Max - Min
    let Rand = Math.random()
    let num = Min + Math.round(Rand * Range)
    return num
}

/**
* 返回一个基于基数上下一定范围内的随机数
*/
function RandomBase (base, rag) {
    let Range = rag * 2
    let Rand = Math.random()
    let num = (base - rag) + Math.round(Rand * Range)
    return num
}

/**
* 返回一个指定长度的随机数字组成的字符串
*/
function RandomNumStr (len = 1) {
    let num = new Array(len).fill(1).map(() => {
        return RandomNumBoth(0, 9)
    })
    return num.join('')
}

/**
* 返回可指定真假比例的布尔值
*/
function RandomBoolean (truefactor = 0.5) {
    let Rand = Math.random()
    let compator = 1 - truefactor
    if (Rand > compator) {
        return true
    } else {
        return false
    }
}

/**
* 返回一个从数组中随机选出的元素，多次运行可重复
*/
function RandomArray (arr) {
    let min = 0, max = arr.length - 1
    return arr[RandomNumBoth(min, max)]
}


/**
* 返回一个从数组中随机选出的元素，多次运行，每次都选出唯一元素，前提是保证数组本身没有重复元素
*/
function RandomUniqueArray (arr) {
    let min = 0, max = arr.length - 1
    let index = RandomNumBoth(min, max)
    let result = arr[index]
    arr.splice(index, 1)
    return result
}

/**
* 返回一个随机的时间字符串 默认格式 时分
*/
function RandomTime(hasec = false) {
    let hour = RandomNumBoth(0, 23), minute = RandomNumBoth(0, 59), sec = RandomNumBoth(0, 59)
    if (hour < 10) {
        hour = '0' + hour
    }
    if (minute < 10) {
        minute = '0' + minute
    }
    if (hasec) {
        if (sec < 10) {
            sec = '0' + sec
        }
        return hour + ':' + minute + ':' + sec
    }
    return hour + ':' + minute
}

function RandomAddress() {
    let addresspool = ['盘古路滨江大道', '柳营路古园大道', '水电路银杏大道', '沪太路淀山湖大道', '平凉路海湾大道', '浦东南路时代大道', '钦州北路世纪大道', '漕宝路森林大道', '巨峰路杭州湾大道']
    return RandomArray(addresspool)
}

function RandomName() {
    let namespool = ['陶燕康', '叶志伟', '王石竹', '孙心桂', '舒大钧', '林秋萍', '江维伦', '嵇信宏', '郭依仪', '张益达']
    return RandomArray(namespool)
}

export { RandomUniqueArray, RandomBase, RandomNumBoth, RandomNumStr, RandomBoolean, RandomArray, RandomTime, RandomAddress, RandomName, RandomLetter, RandomDateString }