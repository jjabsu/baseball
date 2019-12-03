// (1) 게임이 시작되면 "첫 번째 타자가 타석에 입장했습니다." 메시지와 함께 경기를 진행한다.
// (2) 경기가 진행되면 랜덤하게 스트라이크 / 볼 / 안타 / 아웃 네 가지 중 한 결과가 출력된다.
// (3) (2)의 결과의 아래 줄에 누적된 스트라이크(S), 볼(B), 아웃(O) 상황을 출력한다. (아래 예시 참고)
// (4) 스트라이크가 3회 누적되면 1 아웃이다.
// (5) 볼이 4회 누적되면 1 안타가 된다.
// (6) (4)와 (5)의 경우를 포함한 안타 또는 아웃의 경우 "다음 타자가 타석에 입장했습니다." 메시지와 함께 경기가 이어진다.
// (7) 다음 타자의 차례에서 현재의 안타, 아웃 카운트는 유지되고, 스트라이크와 볼 카운트는 초기화된다.
// (8) 3 아웃이 될 경우 전체 안타수를 출력하고 경기가 종료된다.

//element
var result = document.getElementById("result");
var record = document.getElementById("record");
var hitNum = document.getElementById("hit");
var div2 = document.getElementById("div2");

//choose random
var ruleArr = ["스트라이크", "스트라이크", "스트라이크", "스트라이크", "볼", "볼", "볼", "볼", "안타", "아웃"];
var rule;

var choose = function() {
    var index = Math.floor(Math.random() * 10);
    rule = ruleArr[index];
    return rule;
}

//전역변수 0S 0B 0O, 현재안타수:hit
var sCount = 0;
var bCount = 0;
var oCount = 0;
var hitCount = 0;

//초기화
var initSB = function() {
    sCount = 0;
    bCount = 0;
}

// 현재상황보여주기
var showNow = function(showNowResult, showNowRecord, showNowHitNum) {
    result.innerHTML = showNowResult;
    record.innerHTML = showNowRecord;
    hitNum.innerHTML = showNowHitNum;
}

/////////////////////////////////////////////////////
// strike 3개인 경우
var strike = function() {
    if (sCount === 3) {
        oCount++;
        initSB();
        showNow("스트라이크! <Br> 아웃! 다음 타자가 타석에 입장했습니다.", sCount + "S " + bCount + "B " + oCount + "O ", "현재 안타수: " + hitCount);
    }
}

//ball 4개인 경우
var ball = function() {
    if (bCount === 4) {
        hitCount++;
        initSB();
        showNow("볼! <Br> 출루! 다음 타자가 타석에 입장했습니다.", sCount + "S " + bCount + "B " + oCount + "O ", "현재 안타수: " + hitCount);
    }
}

// out 3개인 경우
var out = function() {
    if (oCount === 3) {
        showNow("아웃!", sCount + "S " + bCount + "B " + oCount + "O ", "최종 안타수: " + hitCount + "<br><br> GAME OVER");
    }
}

////////////////////////////////////////////////////
//심판
var referee = function(rule) {
    if (rule === "스트라이크") {
        sCount++;
        showNow("스트라이크!", sCount + "S " + bCount + "B " + oCount + "O ", "현재 안타수: " + hitCount);
        strike();

    } else if (rule === "볼") {
        bCount++;
        showNow("볼!", sCount + "S " + bCount + "B " + oCount + "O ", "현재 안타수: " + hitCount);
        ball();

    } else if (rule === "안타") {
        hitCount++;
        initSB();
        showNow("안타! 다음 타자가 타석에 입장했습니다.", sCount + "S " + bCount + "B " + oCount + "O ", "현재 안타수: " + hitCount);

    } else if (rule === "아웃") {
        oCount++;
        initSB();
        showNow("아웃! 다음 타자가 타석에 입장했습니다.", sCount + "S " + bCount + "B " + oCount + "O ", "현재 안타수: " + hitCount);
    }
    out(); // 모든 곳에서 다 검사해야됨
}


// 경기기록 보여주기
var print = function() {
    var p1 = document.createElement("p");
    p1.innerHTML = result.innerHTML;
    var p2 = document.createElement("p");
    p2.innerHTML = record.innerHTML;
    var p3 = document.createElement("p");
    p3.innerHTML = hitNum.innerHTML;

    div2.appendChild(p1);
    div2.appendChild(p2);
    div2.appendChild(p3);

    var br1 = document.createElement("br");
    div2.appendChild(br1);
}

//
function main() {
    if (oCount === 3) {
        return;
    }
    var game = choose();
    referee(game);
    print();;
}