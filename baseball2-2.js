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
//ball ~ 1 은 안타구간
// 타율 하나 가져오려면 hArr[0], range1(hArr[0])

var outRange
var strikeRange
var ballRange

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
function show(a, b) {
    result.innerHTML = a
    record.innerHTML = b
}


//
function referee(hitterArr) {
    if (0 <= random && random <= outRange) {
        o++
        init();
        hitterName.innerHTML = hitterArr
        show("아웃!", s + "S" + b + "B" + o + "O <br><br> 안타수" + hit + "<br> 총 안타수" + hitAll + "점수" + score)
    } else if (outRange < random && random <= strikeRange) {
        s++
        hitterName.innerHTML = hitterArr
        show("스트라이크!", s + "S" + b + "B" + o + "O <br><br> 안타수" + hit + "<br> 총 안타수" + hitAll + "점수" + score)
        judgeStrike();
    } else if (strikeRange < random && random <= ballRange) {
        b++
        hitterName.innerHTML = hitterArr
        show("볼!", s + "S" + b + "B" + o + "O <br><br> 안타수" + hit + "<br> 총 안타수" + hitAll + "점수" + score)
        judgeBall()
    } else if (ballRange < random && random <= 1) {
        hit++
        hitAll++
        init();
        hitterName.innerHTML = hitterArr
        show("안타!", s + "S" + b + "B" + o + "O <br><br> 안타수" + hit + "<br> 총 안타수" + hitAll + "점수" + score)
        judgeHit()
    }
    judgeOut();
}

//judge
function judgeStrike() {
    if (s === 3) {
        init()
        o++
        show("스트라이크! 아웃!", s + "S" + b + "B" + o + "O <br><br> 안타수" + hit + "<br> 총 안타수" + hitAll + "점수" + score)
    }
}

function judgeBall() {
    if (b === 4) {
        init()
        hit++
        hitAll++
        show("볼! 출루!", s + "S" + b + "B" + o + "O <br><br> 안타수" + hit + "<br> 총 안타수" + hitAll + "점수" + score)
    }
}

function judgeOut() {
    if (o === 3) {
        initHit()
        init()
        show("아웃!", "최종 점수: " + score + "<br><br> GAME OVER")
    }
}

//모르겟당 다시해보기
function judgeHit() {
    if (hit === 4) { // 4일때 하나 score하나 올라가고 5부터는 score 하나씩 올라감
        score++
        initHit()
        init()
    } else if (score > 0) {
        score = hitAll - 4
    }
}

//출력
function print() {

}


// 임시실행

function main() {
    while (true) {
        if (o === 3) {
            return
        }
        choose()
        range(hArr1[0])
        referee(hitterArr1[0])
        console.log(result.innerHTML)
        console.log(record.innerHTML)
    }
}