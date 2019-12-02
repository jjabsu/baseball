// 두 야구팀의 팀이름과 선수 데이터를 입력한다.
// 각 팀은 9명의 타자와 한명의 투수로 이루어진다.
// 타자 정보: 순번, 이름, 타율을 저장한다. 타율이란 각 타자가 안타를 칠 수 있는 확률로 타율 h는 0.1 < h < 0.5이고 소수 세째 자리까지 입력한다. (ex: 0.347, 0.120)
// 입력한 팀 데이터에 대한 저장하기 및 출력하기 기능을 구현한다.
// 편의를 위해 에러 처리 등의 기능을 구현한다.

//엘리먼트
var out1 = document.getElementById("out1")
var out2 = document.getElementById("out2")

//빈배열
var team1 = []
var nameArr1 = [] //타자이름
var hArr1 = [] //타율

var team2 = []
var nameArr2 = [] //타자이름
var hArr2 = [] //타율

//이름
function inputTeamName(team) { // 매개변수활용하기 teamNum:매개변수 x는 그냥 변수선언
    var x = prompt("팀 이름 입력")
    team.push(x)
}

/*
function teamName(teamNum, teamName) { // 이렇게 쓰면 어떻게 처리할까?
    teamNum.push(teamName)
}
*/

//투수
function inputPitcher(team) {
    var x = prompt("투수 정보 입력")
    team.push(x)
}


//타자
var hitterArr = [] //타자정보      **************** 전역변수

function InputHitter(team, nameArr, hArr) {
    var n = 1
    for (var i = 0; i < 2; i++) {
        var x = prompt(n + " 번 타자 정보 입력 \n\n 이름, 타율(소수점이하 3자리까지 입력)")
        n++
        team.push(x)
        hitterArr = x.split(", ") // ["채희찬", "0.333"] //여기서 hitterArr이 계속 갱신 여기 밑에 쓰면됨

        var name = hitterArr.shift()
        nameArr.push(name)

        var h = hitterArr.pop()
        var numberH = Number(h)
        hArr.push(numberH)
    }
}


/*
function getName(nameArr) {
    var x = hitterArr.shift()
    nameArr.push(x)
}

function getH(hArr) {
    var x = hitterArr.pop()
    var numberX = Number(x)
    hArr.push(numberX)
}

*/


//check
function check(team, hArr) {
    if (String(hArr[0]).length !== 5 && typeof(hArr[0]) === 'number') {
        alert("다시 입력해주세요!")
        return
    } else {
        alert(team[0] + " 팀의 정보 입력이 완료되었습니다.")
    }
}


//팀정보입력
function input(team, nameArr, hArr) {
    inputTeamName(team);
    inputPitcher(team);
    InputHitter(team, nameArr, hArr)
    check(team, hArr)
}


//팀정보출력
function print(team, out) {
    var p = document.createElement("p")
    p.innerHTML = team[0] + " 팀의 정보입니다."
    out.appendChild(p)

    var p = document.createElement("p")
    p.innerHTML = "투수: " + team[1]
    out.appendChild(p)

    var n = 1
    for (var i = 2; i < team.length; i++) {
        p = document.createElement("p")
        p.innerHTML = n + " 번 타자: " + team[i]
        out.appendChild(p)
        n++
    }
}