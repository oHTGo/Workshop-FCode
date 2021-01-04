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
  "December",
];

function readTopicId(id) {
  window.localStorage.setItem("topicId", id);
}

var currentTime = new Date();
var month = new Date().getMonth();
var year = new Date().getFullYear(); 
var today = new Date().getDate();

//doi thang tu so sang ten
for (let i = 0; i < 12; i++) {
  if (i == month) {
    var monthShow = monthName[i];
  }
}

//tinh ngay trong tuan
function zeller(q, m, y) {
  if (m == 1) {
    m = 13;
    y--;
  }
  if (m == 2) {
    m = 14;
    y--;
  }
  var k = y % 100;
  var j = Math.floor(y / 100);
  var h = Math.trunc(
    q +
      Math.trunc((13 * (m + 1)) / 5) +
      k +
      Math.trunc(k / 4) +
      Math.trunc(j / 4) +
      5 * j
  );
  h = Math.trunc(h % 7);
  return h === 0 ? 6 : h - 1;
}

//nam nhuan
function isLeap(year) {
  if (year % 4 || (year % 100 === 0 && year % 400)) return 0;
  else return 1;
}

//so ngay co trong 1 thang
function daysIn(month, year) {
  return month === 2 ? 28 + isLeap(year) : 31 - (((month - 1) % 7) % 2);
}

//cac ngay trong thang theo dung thu tu
function calendar(month, year) {
  var startIndex = Math.trunc(zeller(1, month, year));
  var endIndex = daysIn(month, year);
  var result = Array.apply(0, Array(42)).map(function (i) {
    return 0;
  });
  for (var i = startIndex; i < endIndex + startIndex; i++) {
    result[i] = i - startIndex + 1;
  }
  return result;
}

document.getElementById("monthYearShow").innerHTML = monthShow + " " + year;

const dataArray = [];
async function showEvent(month, year) {
  try {
    const res = await fetch("/api/topic/schedule");
    const data = await res.json();
    // data.message.map((element) => {
    //   dataArray.push(element);
    // })
    data.message.map((topic) => {
      yearE = new Date(topic.date).getFullYear();
      monthE = new Date(topic.date).getMonth();
      dayE = new Date(topic.date).getDate();
      if (yearE == year && monthE == month) {
        let i = 100;
        for (const day of calendar(month + 1, year)) {
          if (dayE == day) {
            document.getElementById(
              i
            ).innerHTML = `<a href="../SinglePost/SinglePost.html" onclick="readTopicId('${topic._id}')" title="${topic.name}">${topic.name}</a>`;
          }
          i++;
        }
      }
    });
  } catch (error) {
    return console.log(error);
  }
}

function updateCalendar(monthS, yearS) {
  // console.log(calendar(monthS + 1, yearS));
  let i = 0;
  for (const day of calendar(monthS + 1, yearS)) {
    document.getElementById(i).innerHTML = "";
    if (day != 0) {
      document.getElementById(i).innerHTML = day;
    }
    if (
      monthS == new Date().getMonth() &&
      day == new Date().getDate() &&
      yearS == new Date().getFullYear()
    ) {
      document.getElementsByClassName("day")[i].style.backgroundColor =
        "#BDBDBD";
    }
    i++;
  }
}

function updateTodayCalendar() {
  clearDataCalendar();
  updateCalendar(new Date().getMonth(), new Date().getFullYear());
  document.getElementById("monthYearShow").innerHTML = monthName[new Date().getMonth()] + " " + year;
  showEvent(new Date().getMonth(), new Date().getFullYear());
}

function clearDataCalendar() {
  for (var i = 0; i < document.getElementsByClassName("event").length; i++) {
    document.getElementsByClassName("event")[i].innerHTML = "";
    document.getElementsByClassName("day")[i].style.backgroundColor = "#fff";
  }
}

// async function showEvent(month, year) {
//   await loadData();
//   dataArray.map((topic) => {
//     console.log(topic);
//     yearE = new Date(topic.date).getFullYear();
//     monthE = new Date(topic.date).getMonth();
//     dayE = new Date(topic.date).getDate();
//     if (yearE == year && monthE == month) {
//       let i = 100;
//       for (const day of calendar(month + 1, year)) {
//         if (dayE == day) {
//           document.getElementById(
//             i
//           ).innerHTML = `<a href="../SinglePost/SinglePost.html" onclick="readTopicId('${topic._id}')">${topic.name}</a>`;
//         }
//         i++;
//       }
//     }
//   });
// }

document.getElementById("increase").onclick = onClickIncrease;
function onClickIncrease() {
  if (monthShow == monthName[11]) {
    year += 1;
    monthShow = monthName[0];
    month = 0;
    document.getElementById("monthYearShow").innerHTML = monthShow + " " + year;

    clearDataCalendar();
    updateCalendar(month, year);
    showEvent(month, year);
  } else {
    for (let i = 11; i > -1; i--) {
      if (monthShow == monthName[i]) {
        monthShow = monthName[i + 1];
        month += 1;
        document.getElementById("monthYearShow").innerHTML =
          monthShow + " " + year;
        clearDataCalendar();
        updateCalendar(month, year);
        showEvent(month, year);
      }
    }
  }
}

document.getElementById("decrease").onclick = onClickDecrease;
function onClickDecrease() {
  if (monthShow == monthName[0]) {
    year -= 1;
    monthShow = monthName[11];
    month = 11;
    document.getElementById("monthYearShow").innerHTML = monthShow + " " + year;
    clearDataCalendar();
    updateCalendar(month, year);
    showEvent(month, year);
  } else {
    for (let i = 0; i < 12; i++) {
      if (monthShow == monthName[i]) {
        monthShow = monthName[i - 1];
        month -= 1;
        document.getElementById("monthYearShow").innerHTML =
          monthShow + " " + year;
        clearDataCalendar();
        updateCalendar(month, year);
        showEvent(month, year);
      }
    }
  }
}
/*------------------------------------------------------*/

updateCalendar(month, year);
showEvent(month, year);
