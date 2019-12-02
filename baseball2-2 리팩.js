var progress = document.getElementById("progress")
var hitterName = document.getElementById("hitterName")
var result = document.getElementById("result")
var record = document.getElementById("record")

// random
var random

function choose() {
    random = (Math.floor(Math.random() * 10) / 10)
    return random
}

//구간
// 타율 하나 가져오려면 hArr[0], range1(hArr[0])
var outRange
var strikeRange
var ballRange
    //ballRange ~ 1 은 안타구간

function range(h) {
    outRange = 0.1
    strikeRange = outRange + ((1 - h) / 2 - 0.05)
    ballRange = strikeRange + ((1 - h) / 2 - 0.05)
}

//s b o
var s = 0
var b = 0
var o = 0
var hit = 0
var hitAll = 0
var score = 0

//초기화
function init() {
    s = 0
    b = 0
}

function initHit() {
    hit = 0
}

//결과표현
function show(x, y) {
    result.innerHTML = x
    record.innerHTML = s + "S" + b + "B" + o + "O <br><br> 안타수" + hit + "<br> 총 안타수" + hitAll + "점수" + score
    hitterName.innerHTML = y
}


//
function referee(nameArr) {
    if (0 <= random && random <= outRange) {
        o++
        init();
        show("아웃!", nameArr)
    } else if (outRange < random && random <= strikeRange) {
        s++
        show("스트라이크!", nameArr)
        judgeStrike();
    } else if (strikeRange < random && random <= ballRange) {
        b++
        show("볼!", nameArr)
        judgeBall()
    } else if (ballRange < random && random <= 1) {
        hit++
        hitAll++
        init();
        show("안타!", nameArr)
        judgeHit()
    }
    judgeOut();
}

//judge
function judgeStrike(nameArr) {
    if (s === 3) {
        init()
        o++
        show("스트라이크! 아웃!", nameArr)
    }
}

function judgeBall(nameArr) {
    if (b === 4) {
        init()
        hit++
        hitAll++
        show("볼! 출루!", nameArr)
    }
}

function judgeOut() {
    if (o === 3) {
        init()
        initHit()
        show("아웃!", "최종 점수: " + score + "<br><br> GAME OVER")
    }
}

//모르겟당 다시해보기
function judgeHit() {
    if (hit === 4) { // 4일때 하나 score하나 올라가고 5부터는 score 하나씩 올라감
        score++
        init()
        initHit()
    } else if (score > 0) {
        score = hitAll - 4
    }
}

//출력
var progressRecord = document.getElementById("progressRecord")

function print() {
    var p1 = document.createElement("p")
    p1.innerHTML
    progressRecord.appendChild(p1)

    var p2 = document.createElement("p")
    p2.innerHTML
    progressRecord.appendChild(p2)

    var p3 = document.createElement("p")
    p3.innerHTML
    progressRecord.appendChild(p3)
}


// 임시실행
function main() {
    choose()
    range(hArr1[0])
    referee(nameArr1[0])
}