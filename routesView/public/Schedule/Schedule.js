
var monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

var currentTime = new Date();
var month = currentTime.getMonth(); //11
var year = currentTime.getFullYear(); //2020

// Đổi tháng từ số thành tên
for (let i = 0; i < 12; i++) {
    if (i == month) {
        var monthShow = monthName[i];
    }
}


// hàm tính thế kỷ
function centuryZ(y) {
    return Math.floor(y / 100);
}

// hàm tính tháng cho công thức zeller
function monthZ(m) {
    return m < 3 ? m + 10 : m - 2;
}

// hàm tính năm trong thể kỷ
function yearZ(y) {
    return y % 100;
}

// công thức zeller
function _zeller(day, month, year, century) {
    return ((13 * month - 1) / 5 + year / 4 + century / 4 + day + year - 2 * century) % 7;
}

// viết lại cho dễ dùng
function zeller(d, m, y) {
    return _zeller(d, monthZ(m), yearZ(y), centuryZ(y));
}

// tính năm nhuận
function isLeap(year) {
    if ((year % 4) || ((year % 100 === 0) && (year % 400))) return 0;
    else return 1;
}

// Tính số ngày của một tháng
function daysIn(month, year) {
    return month === 2 ? (28 + isLeap(year)) : 31 - (month - 1) % 7 % 2;
}

function calendar(month, year) {
    var startIndex = Math.trunc(zeller(1, month, year));
    var endIndex = daysIn(month, year);
    var result = Array.apply(0, Array(42)).map(function (i) { return 0; });
    for (var i = startIndex; i < endIndex + startIndex; i++) {
        result[i] = (i - startIndex) + 1;
    }
    return result;
}

//var schedule = document.querySelector("#calendar");
//schedule.insertAdjacentHTML("beforeend", '<div class="day">${calendar(month, year)}</div>')
document.getElementById("monthYearShow").innerHTML = monthShow + " " + year;

// function updateCalendar(monthS, yearS) {
//     console.log(calendar(monthS + 1, yearS));
//     let i = 0;
//     for (const day of calendar(monthS + 1, yearS)) {
//         document.getElementById(i).innerHTML = "";
//         if (day != 0) {
//             document.getElementById(i).innerHTML = day;
//         }
//         i++;
//     }
// }
// updateCalendar(month, year);

document.getElementById("increase").onclick = onClickIncrease;
function onClickIncrease() {
    for (let i = 11; i > -1; i--) {
        if (monthShow == monthName[11]) {
            year += 1;
            monthShow = monthName[0];
            month = 0;
            document.getElementById("monthYearShow").innerHTML = monthShow + " " + year;
            updateCalendar(month, year);
        }
        else {
            if (monthShow == monthName[i]) {
                monthShow = monthName[i + 1];
                month += 1;
                document.getElementById("monthYearShow").innerHTML = monthShow + " " + year;
                updateCalendar(month, year);
            }
        }
    }
}

document.getElementById("decrease").onclick = onClickDecrease;
function onClickDecrease() {
    for (let i = 0; i < 12; i++) {
        if (monthShow == monthName[0]) {
            year -= 1;
            monthShow = monthName[11];
            month = 11;
            document.getElementById("monthYearShow").innerHTML = monthShow + " " + year;
            updateCalendar(month, year);
        }
        else {
            if (monthShow == monthName[i]) {
                monthShow = monthName[i - 1];
                month -= 1;
                document.getElementById("monthYearShow").innerHTML = monthShow + " " + year;
                updateCalendar(month, year);
            }
        }
    }
}

