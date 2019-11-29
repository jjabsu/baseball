// (1) 게임이 시작되면 "첫 번째 타자가 타석에 입장했습니다." 메시지와 함께 경기를 진행한다.
// (2) 경기가 진행되면 랜덤하게 스트라이크 / 볼 / 안타 / 아웃 네 가지 중 한 결과가 출력된다.
// (3) (2)의 결과의 아래 줄에 누적된 스트라이크(S), 볼(B), 아웃(O) 상황을 출력한다. (아래 예시 참고)
// (4) 스트라이크가 3회 누적되면 1 아웃이다.
// (5) 볼이 4회 누적되면 1 안타가 된다.
// (6) (4)와 (5)의 경우를 포함한 안타 또는 아웃의 경우 "다음 타자가 타석에 입장했습니다." 메시지와 함께 경기가 이어진다.
// (7) 다음 타자의 차례에서 현재의 안타, 아웃 카운트는 유지되고, 스트라이크와 볼 카운트는 초기화된다.
// (8) 3 아웃이 될 경우 전체 안타수를 출력하고 경기가 종료된다.

//element
var result = document.getElementById("result")
var record = document.getElementById("record")
var hitNum = document.getElementById("hit")


var ruleArr = ["스트라이크", "스트라이크", "스트라이크", "스트라이크", "볼", "볼", "볼", "볼", "안타", "아웃"]

//랜덤
var choose = function() {
    var index = Math.floor(Math.random() * 10)
    var rule = ruleArr[index]
    return rule
};

//전광판 0S 0B 0O
var s = 0;
var b = 0;
var o = 0;
var hit = 0;

// 보여주기
var show = function(rule) {
    if (rule === "스트라이크") {
        s++
        result.innerHTML = "스트라이크!"
        record.innerHTML = s + "S " + b + "B " + o + "O "
    } else if (rule === "볼") {
        b++
        result.innerHTML = "볼!"
        record.innerHTML = s + "S " + b + "B " + o + "O "
    } else if (rule === "안타") {
        hit++
        result.innerHTML = "안타! 다음 타자가 타석에 입장했습니다."
        record.innerHTML = s + "S " + b + "B " + o + "O "
        hitNum.innerHTML = "현재 안타수: " + hit
        init();
    } else if (rule === "아웃") {
        o++
        result.innerHTML = "아웃! 다음 타자가 타석에 입장했습니다."
        record.innerHTML = s + "S " + b + "B " + o + "O "
        init();
    }
}


//초기화
var init = function() {
    s = 0
    b = 0
}

// strike 3개 ball 4개 out 3개
var judge = function() {
    if (s === 3) {
        o++
        result.innerHTML = "스트라이크! 아웃!, 다음 타자가 타석에 입장했습니다."
        init();
    } else if (b === 4) {
        hit++
        result.innerHTML = "볼! 출루!, 다음 타자가 타석에 입장했습니다."
        hitNum.innerHTML = "현재 안타수: " + hit
        init();
    } else if (o === 3) {
        alert("게임종료")
        result.innerHTML = ""
        hitNum.innerHTML = "최종 안타수: " + hit
        record.innerHTML = "GAME OVER"
    }
}


function main() {
    var game = choose();
    show(game);
    judge();
}