var progress = document.getElementById("progress"); //진행상황 각 p태그에 붙임
var inning = document.getElementById("inning");
var name1 = document.getElementById("name1");
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
        stackPlus(team);
        show(setHitterName, "볼! 출루! 안타수+1");
    }
}

//아웃 3개인 경우 판단
function judgeOut() {
    if (oCount === 3) {
        initSB();
        initHitCount();
        initOCount();
        change++; // 다음 팀 넘어가기
        if (change % 2 === 0) {
            nCount++
        }
        if (change === 12 && change % 2 !== 0) {
            show("아웃!", "최종 점수: " + "<br> 1팀: " + team1Score + "<br> 2팀: " + team2Score + "<br><br> GAME OVER")
        }
    }
}

//안타 4개인 경우 판단
function judgeHit(team) {
    if (hitCount > 3) { // 4까지 하나 score하나 올라가고 5부터는 score 하나씩 올라감
        if (team === 'team1') {
            team1Score++;
        } else if (team === 'team2') {
            team2Score++;
        }
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//스윙결과보여주기
function show(showName, showResult) {
    name1.innerHTML = showName;
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
        stackPlus(team); // stackPlus()에 setHitter()들어있어서 stackPlus실행되면 새로운 타자나옴

    } else if (outRange < random && random <= strikeRange) {
        sCount++;
        show(setHitterName, "스트라이크!");
        judgeStrike(setHitterName);


    } else if (strikeRange < random && random <= ballRange) {
        bCount++;
        show(setHitterName, "볼!");
        judgeBall(setHitterName);


        //안타
    } else if (ballRange < random && random <= 1) {
        initSB();
        hitCount++;
        judgeHit(team);
        show(setHitterName, "안타!");
        stackPlus(team);
    }
    judgeOut(); // 아웃 3개
}

//game은 스윙 한번씩 진행
var change = 0;

function game() {
    if ((change % 2) === 0) {
        if (oCount < 3) {
            inning.innerHTML = nCount + "회초 " + team1[0] + " 공격"
            setHitter('team1'); //setHitterName setHitterH에 값 넣어줌
            swing('team1'); // 넣어준 값으로 스윙
        }
    } else {
        if (oCount < 3) {
            inning.innerHTML = nCount + "회말 " + team2[0] + " 공격"
            setHitter('team2');
            swing('team2');
        }
    }
}

//공격팀
function attackTeam(team) { //team매개변수에 'team1' 들어감

    setHitter(team); //공격팀에서 타자한명 올림 //setHitterName = nameArr1(team1stack[0]) setHitterH = hArr1(team1stack[0])

    while (oCount < 3) {
        swing(team);
        // 타자가 swing을 하는데 그때마다 s b o 가 바뀜
        // o가 나온 경우, s가 3인 경우, b가 4인 경우, hit이 나온 경우에
        // stackPlus에서 stack올리고 setHitter실행해줌
    }

    if (oCount >= 3) {
        initHitCount();
        initOCount();
    }
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

//출력
function printProgressRecord() {
    var prP1 = document.createElement("p");
    prP1.innerHTML = result.innerHTML
    progressRecord.appendChild(prP1);

    var prP2 = document.createElement("p");
    prP2.innerHTML = record.innerHTML
    progressRecord.appendChild(prP2);

    var prP3 = document.createElement("p");
    prP3.innerHTML = score.innterHTMl
    progressRecord.appendChild(prP3);

    var prP4 = document.createElement("p");
    prP4.innerHTML = name1.innterHTMl
    progressRecord.appendChild(prP4);

    // var brbrbr = document.createElement("br")
    // progressRecord.appendChild(brbrbr)
}


/*
//main은 6회 진행
var change = 0;

function main1() {
    for (var i = 0; i < 12; i++) {
        if ((i % 2) === 0) {
            attackTeam('team1');
            change++
        } else {
            attackTeam('team2');
            change++
        }
    }
}
*/


/*
// main2는 3out씩 진행
var change = 0;

function main2() {
    if ((change % 2) === 0) {
        attackTeam('team1');
        change++
    } else {
        attackTeam('team2');
        change++
    }
}
*/