var states = ["JOIN US", "JOINED"],
  current_state = 0;
function changeState() {
  current_state = !current_state;
  document.getElementById("joinedButton").innerHTML = `${states[current_state ? 1 : 0]
    }`;
  document.getElementById("joinedButton").classList.toggle("disabledButton");
  return current_state;
}

var count;

function starmark(item) {
  count = item.id[0];
  sessionStorage.starRating = count;
  var subid = item.id.substring(1);
  for (var i = 0; i < 5; i++) {
    if (i < count) {
      document.getElementById(i + 1 + subid).style.color = "#fed330";
    } else {
      document.getElementById(i + 1 + subid).style.color = "black";
    }
  }
}

function result() {
  //Rating : Count
  //Review : Comment(id)
  alert(
    "Rating : " +
    count +
    "\nReview : " +
    document.getElementById("comment").value
  );
}