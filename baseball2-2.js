// ex) 타율 0.4
// 아웃 0 ~ 0.1
// 볼 0.1 ~ 0.35
// 스트라이크 0.35 ~ 0.5
// 안타 0.5 ~ 1

function choose() {
    return (Math.floor(Math.choose() * 10) / 10)
}

// 타율 하나 가져오려면 hArr[0], range1(hArr[0])
function range1(h) {
    var out = 0.1
    var strike = out + (1 - h) / 2 - 0.05
    var ball = strike + (1 - h) / 2 - 0.05
    var hit = 1 - ball
}

//s b o
var s;
var b;
var o;
var hit;
var score;

//
function referee() {
    if (0 <= choose() && choose() <= out) { //아웃
        o++
    } else if (out < choose() && choose() <= strike) { //볼
        b++
    } else if (strike < choose() && choose() <= hit) { // 스트라이크
        s++
    } else if (hit < choose() && choose() <= 1) { //안타
        hit++
    }
}

//
function judge() {
    if (s === 3) {
        o++
    } else if (b === 4) {
        hit++
    } else if (hit >= 4) {
        score++
    }
}

function print() {

}