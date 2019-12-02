// 두 야구팀의 팀이름과 선수 데이터를 입력한다.
// 각 팀은 9명의 타자와 한명의 투수로 이루어진다.
// 타자 정보: 순번, 이름, 타율을 저장한다. 타율이란 각 타자가 안타를 칠 수 있는 확률로 타율 h는 0.1 < h < 0.5이고 소수 세째 자리까지 입력한다. (ex: 0.347, 0.120)
// 입력한 팀 데이터에 대한 저장하기 및 출력하기 기능을 구현한다.
// 편의를 위해 에러 처리 등의 기능을 구현한다.

//엘리먼트
var out1 = document.getElementById("out1")
var out2 = document.getElementById("out2")

//빈배열
var team1 = [] //팀정보
var hArr1 = [] //타율

var team2 = []
var hArr2 = []


//팀정보입력
function teamName1() {
    var teamName = prompt("팀 이름 입력")
    team1.push(teamName)
}

function teamName2() {
    var teamName = prompt("팀 이름 입력")
    team2.push(teamName)
}

//투수정보입력
function pitcher1() {
    var pitcher = prompt("투수 정보 입력")
    team1.push(pitcher)
}

function pitcher2() {
    var pitcher = prompt("투수 정보 입력")
    team2.push(pitcher)
}

//타자정보입력
function hitter1() {
    var n = 1
    for (var i = 0; i < 1; i++) {
        var hitter = prompt(n + " 번 타자 정보 입력 \n\n 이름, 타율(소수점이하 3자리까지 입력)")
        n++
        var hitterArr1 = hitter.split(",") // ["채희찬", "0.333"]
        team1.push(hitter)
        var strH = hitterArr1.pop(); // ["0.333"] //hitterArr에서 빼서 hArr1에 넣어줌 // 바보짓했네 바로 team1에서 빼서 넣어주면 되잖아
        var numH = Number(strH)
        hArr1.push(numH) // [0.333] 
    }
}

function hitter2() {
    var n = 1
    for (var i = 0; i < 1; i++) {
        var hitter = prompt(n + " 번 타자 정보 입력 \n\n 이름, 타율(소수점이하 3자리까지 입력)")
        n++
        var hitterArr2 = hitter.split(",") // ["채희찬", "0.333"]
        team2.push(hitter)
        var strH = hitterArr2.pop(); // ["0.333"] //hitterArr에서 빼서 hArr1에 넣어줌 // 바보짓했네 바로 team2에서 빼서 넣어주면 되잖아
        var numH = Number(strH)
        hArr2.push(numH) // [0.333] 
    }
}

//check
function check1() {
    if (String(hArr1[0]).length !== 5 && typeof(hArr1[0]) === 'number') {
        alert("다시 입력해주세요!")
        return
    } else {
        alert("1팀의 정보 입력이 완료되었습니다.")
    }
}

function check2() {
    if (String(hArr2[0]).length !== 5 && typeof(hArr2[0]) === 'number') {
        alert("다시 입력해주세요!")
        return
    } else {
        alert("2팀의 정보 입력이 완료되었습니다.")
    }
}

function input1() {
    teamName1()
    pitcher1()
    hitter1()
    check1()
}

function input2() {
    teamName2()
    pitcher2()
    hitter2()
    check2()
}

//팀정보출력
function print1() {

    var p = document.createElement("p")
    p.innerHTML = team1[0] + " 팀의 정보입니다."
    out1.appendChild(p)

    var n = 1
    for (var i = 1; i < team1.length - 1; i++) {
        p = document.createElement("p")
        p.innerHTML = n + " 번 타자: " + team1[i]
        out1.appendChild(p)
        n++
    }

    var p = document.createElement("p")
    p.innerHTML = "투수: " + team1[(team1.length - 1)]
    out1.appendChild(p)
}

function print2() {

    var p = document.createElement("p")
    p.innerHTML = team2[0] + " 팀의 정보입니다."
    out2.appendChild(p)

    var n = 1
    for (var i = 1; i < team1.length - 1; i++) {
        p = document.createElement("p")
        p.innerHTML = n + " 번 타자: " + team2[i]
        out2.appendChild(p)
        n++
    }

    var p = document.createElement("p")
    p.innerHTML = "투수: " + team2[(team2.length - 2)]
    out2.appendChild(p)
}