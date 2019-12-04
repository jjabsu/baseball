var progress = document.getElementById("progress");
var inning = document.getElementById("inning");
var hitterName = document.getElementById("hitterName");
var result = document.getElementById("result");
var record = document.getElementById("record");
var score = document.getElementById("score")
var progressRecord = document.getElementById("progressRecord");

//스트라이크구간, 볼구간, 안타구간, 아웃구간 중 어느 구간에 들어갈지에 대한 값
var random;

function choose() {
    random = (Math.floor(Math.random() * 10) / 10);
    return random;
}

//스트라이크구간, 볼구간, 안타구간, 아웃구간
var outRange;
var strikeRange;
var ballRange;
//안타구간는 ballRange ~ 1구간

function range(h) {
    outRange = 0.1;
    strikeRange = outRange + ((1 - h) / 2 - 0.05);
    ballRange = strikeRange + ((1 - h) / 2 - 0.05);
}


//스트라이크, 볼, 아웃, 안타, 몇 회인지에 대한 카운트
var sCount = 0;
var bCount = 0;
var oCount = 0;
var hitCount = 0;
var nCount = 1; //몇회인지 표시

//각 팀 점수
var team1Score = 0;
var team2Score = 0;

//타석에 선 타자정보        
var setHitterName;
var setHitterH;

//타자정보 들어있는 배열의 인덱스값
var team1Stack = 0;
var team2Stack = 0;

//스트라이크 볼 카운트 초기화
function initSB() {
    sCount = 0;
    bCount = 0;
}

//안타 카운트 초기화
function initHitCount() {
    hitCount = 0;
}

//아웃 카운트 초기화
function initOCount() {
    oCount = 0;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 스트라이크3개인 경우 판단
function judgeStrike(setHitterName, team) {
    if (sCount === 3) {
        oCount++;
        initSB();
        stackPlus(team); //다음타자
        show(setHitterName, "스트라이크! 아웃!");
    }
}


//볼 4개인 경우 판단
function judgeBall(setHitterName, team) {
    if (bCount === 4) {
        hitCount++;
        initSB();
        stackPlus(team); //다음타자
        show(setHitterName, "볼! 출루! 안타수+1");
    }
}

//안타 4개인 경우 판단
function judgeHit(team) {
    if (hitCount > 3) { // 4부터 score 1씩 올라감
        if (team === 'team1') {
            team1Score++;
        } else if (team === 'team2') {
            team2Score++;
        }
    }
}

// 아웃 3 개인 경우 판단

function judgeOut() {
    if (oCount >= 3) {
        initSB();
        initOCount();
        initHitCount();
        change++; // 다음 팀 넘어가기
        if (change % 2 === 0) {
            nCount++
        }
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//스윙결과보여주기
function show(showhitterName, showResult) {
    hitterName.innerHTML = showhitterName;
    result.innerHTML = showResult;
    record.innerHTML = sCount + "S" + bCount + "B" + oCount + "O <br> 안타수" + hitCount;
    score.innerHTML = team1[0] + "팀의 현재점수: " + team1Score + " 점" + "<br>" + team2[0] + "팀의 현재점수: " + team2Score + " 점";
}

//스윙
function swing(team) {

    choose();
    range(setHitterH);

    if (0 <= random && random <= outRange) {
        oCount++;
        initSB();
        show(setHitterName, "아웃!");
        stackPlus(team); //다음타자

    } else if (outRange < random && random <= strikeRange) {
        sCount++;
        show(setHitterName, "스트라이크!");
        judgeStrike(setHitterName);


    } else if (strikeRange < random && random <= ballRange) {
        bCount++;
        show(setHitterName, "볼!");
        judgeBall(setHitterName);


    } else if (ballRange < random && random <= 1) {
        initSB();
        hitCount++;
        judgeHit(team);
        show(setHitterName, "안타!");
        stackPlus(team); //다음타자
    }
    judgeOut();
}

// 타석에 타자올리기
function setHitter(team) {
    initStack();
    if (team === 'team1') {
        setHitterName = nameArr1[team1Stack]; //nameArr이랑 Harr에 인덱스로 값을 넣어줌
        setHitterH = hArr1[team1Stack];
    } else if (team === 'team2') {
        setHitterName = nameArr2[team2Stack];
        setHitterH = hArr2[team2Stack];
    }
}

//stack 올려주기
function stackPlus(team) {
    if (team === 'team1') {
        team1Stack++;
    } else if (team === 'team2') {
        team2Stack++;
    }
    initSB();
    setHitter(team); // 다음 타자 뽑기
}

//타자 한바퀴 돌고 다시 처음으로
function initStack() {
    if (team1Stack > 8) {
        team1Stack = 0;
    } else if (team2Stack > 8) {
        team2Stack = 0;
    }
}

//스윙 한번씩 진행
var change = 0; // 공수교환해주는 값

function game() {
    if (nCount > 6) {
        result.innerHTML = "GAME OVER";
        record.innerHTML = "최종 점수: " + "<br> 1팀: " + team1Score + "<br> 2팀: " + team2Score + "<br> GAME OVER";
        return;
    }
    if (change % 2 === 0) {
        if (oCount < 3) {
            inning.innerHTML = nCount + "회초 " + team1[0] + " 공격"
            attackTeam('team1')
        }
    } else {
        if (oCount < 3) {
            inning.innerHTML = nCount + "회말 " + team2[0] + " 공격"
            attackTeam('team2')
        }
    }
}

//공격팀
function attackTeam(team) {
    setHitter(team); //setHitterName setHitterH에 값 넣어줌
    swing(team); // 넣어준 값으로 스윙
    printProgressRecord();
}



//출력
function printProgressRecord() {
    var prP5 = document.createElement("p");
    prP5.innerHTML = inning.innerHTML
    progressRecord.appendChild(prP5);

    var prP1 = document.createElement("p");
    prP1.innerHTML = hitterName.innerHTML
    progressRecord.appendChild(prP1);

    var prP2 = document.createElement("p");
    prP2.innerHTML = result.innerHTML
    progressRecord.appendChild(prP2);

    var prP3 = document.createElement("p");
    prP3.innerHTML = record.innerHTML
    progressRecord.appendChild(prP3);

    var prP4 = document.createElement("p");
    prP4.innerHTML = score.innerHTML
    progressRecord.appendChild(prP4);

    var liner = document.createElement("p")
    liner.innerHTML = "=================="
    progressRecord.appendChild(liner)
}