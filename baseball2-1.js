// 두 야구팀의 팀이름과 선수 데이터를 입력한다.
// 각 팀은 9명의 타자와 한명의 투수로 이루어진다.
// 타자 정보: 순번, 이름, 타율을 저장한다. 타율이란 각 타자가 안타를 칠 수 있는 확률로 타율 h는 0.1 < h < 0.5이고 소수 세째 자리까지 입력한다. (ex: 0.347, 0.120)
// 입력한 팀 데이터에 대한 저장하기 및 출력하기 기능을 구현한다.
// 편의를 위해 에러 처리 등의 기능을 구현한다.

//엘리먼트
var printOutputSpan1 = document.getElementById("printOutputSpan1");
var printOutputSpan2 = document.getElementById("printOutputSpan2");

// 빈배열
var team1 = [];
var nameArr1 = [];
var hArr1 = [];

var team2 = [];
var nameArr2 = [];
var hArr2 = [];

// var team1 = ["롯데", "박찬호"]; // 팀배열임시값
// var nameArr1 = ["채희찬1", "채희찬2", "채희찬3", "채희찬4", "채희찬5", "채희찬6", "채희찬7", "채희찬8", "채희찬9"]; //타자이름 임시값
// var hArr1 = [0.201, 0.202, 0.203, 0.204, 0.205, 0.206, 0.207, 0.208, 0.209]; //타율 임시값

// var team2 = ["삼성", "류현진"]; // 팀배열임시값
// var nameArr2 = ["채승훈1", "채승훈2", "채승훈3", "채승훈4", "채승훈5", "채승훈6", "채승훈7", "채승훈8", "채승훈9"]; //타자이름 임시값
// var hArr2 = [0.201, 0.202, 0.203, 0.204, 0.205, 0.206, 0.207, 0.208, 0.209]; //타율 임시값


//팀이름넣기
function inputTeamName(team) {
    var teamName = prompt("팀 이름 입력");
    team.push(teamName);
}

//투수정보넣기
function inputPitcher(team) {
    var pitcherInfo = prompt("투수 정보 입력");
    team.push(pitcherInfo);
}


//타자정보 넣기
var hitterArr = []; //hitterArr에 타자정보 계속 갱신

function InputHitter(team, nameArr, hArr) {
    var n = 1
    for (var i = 0; i < 9; i++) {
        var hitterInfo = prompt(n + " 번 타자 정보 입력 \n\n 이름, 타율(소수점이하 3자리까지 입력)"); //"채희찬, 0.333"
        n++;
        team.push(hitterInfo);
        hitterArr = hitterInfo.split(", "); // ["채희찬", "0.333"] 

        var name = hitterArr.shift();
        nameArr.push(name); // nameArr에 타자 이름 넣어줌

        var h = hitterArr.pop();
        var numberH = Number(h);
        hArr.push(numberH); // hArr에 타자 이름 넣어줌
    }
}

//타자 정보 입력값 에러처리                        
function checkInput(team, hArr) {
    if (String(hArr[0]).length !== 5 || typeof(hArr[0]) !== 'number') {
        alert("다시 입력해주세요! 입력형식은 이름, 타율(소수점이하 3자리까지 입력)입니다.")
    } else {
        alert(team[0] + " 팀의 정보 입력이 완료되었습니다.")
    }
}

//팀정보입력
function input(team, nameArr, hArr) {
    inputTeamName(team);
    inputPitcher(team);
    InputHitter(team, nameArr, hArr);
    checkInput(team, hArr);
}

//팀정보출력
function printOutput(team, span, nameArr, hArr) {
    var printP1 = document.createElement("p")
    printP1.innerHTML = team[0] + " 팀의 정보입니다."
    span.appendChild(printP1)

    var printP2 = document.createElement("p")
    printP2.innerHTML = "투수: " + team[1]
    span.appendChild(printP2)

    var n = 1
    for (var i = 0; i < nameArr.length; i++) {
        var printP3 = document.createElement("p")
        printP3.innerHTML = n + " 번 타자: " + nameArr[i] + " 타율: " + hArr[i]
        span.appendChild(printP3)
        n++
    }
}