function getCurrentUser() {
  fetch("/api/user/current")
    .then((res) => res.json())
    .then((data) => {
      myStorage.setItem("CurrentUserId", data.message._id);
      myStorage.setItem("CurrentUsername", data.message.name);
      if (data.message.isAdmin) {
        myStorage.setItem("Role", "Admin");
      } else {
        myStorage.setItem("Role", "Member");
      }
      document
        .getElementById("userAccount")
        .insertAdjacentHTML("beforeend", data.message.name);
    })
    .catch((error) => console.log(error));
}
getCurrentUser();

function resetTopicId() {
  window.localStorage.setItem("topicId", "");
}

/* ------------- Manage Join status of users ------------*/
let current_state,
  states = ["JOIN US", "JOINED"],
  currentTopic = window.localStorage.topicId;

function getJoinStatus() {
  return fetch("/api/topic/" + window.localStorage.topicId + "/join")
    .then((res) => res.json())
    .then((data) => {
      let statusParticipant = data.message.statusParticipant;
      return statusParticipant;
    })
    .catch((error) => console.log(error));
}

function joinTopic(topicId) {
  // this function is to post the join status to server
  participantObj = {
    statusParticipant: current_state,
  };

  fetch("/api/topic/" + topicId + "/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(participantObj),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function renderInitialJoinButton() {
  current_state = await getJoinStatus();
  document.getElementById("joinedButton").innerHTML = `${
    states[current_state ? 1 : 0]
  }`;
  if (current_state) {
    document.getElementById("joinedButton").classList.toggle("disabledButton");
  }
}

async function changeState() {
  (current_state = await getJoinStatus()), (current_state = !current_state);
  document.getElementById("joinedButton").innerHTML = `${
    states[current_state ? 1 : 0]
  }`;
  document.getElementById("joinedButton").classList.toggle("disabledButton");
  joinTopic(window.localStorage.topicId);
  window.location.reload();
  return current_state;
}
/*-----------------------------------------------------------------------------------*/

/*---------------------- Manage rating action of users ---------------*/
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

function getReview() {
  // this function get user's review if it existed, then to update review
  fetch("/api/review/" + currentTopic)
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "Successful") {
        document.getElementById("deleteButton").style.display = "block";
        document.getElementById("comment").innerHTML = data.message.content;
        let star = data.message.star;
        for (var i = 0; i < 5; i++) {
          if (i < star) {
            document.getElementById(i + 1 + "one").style.color = "#fed330";
          } else {
            document.getElementById(i + 1 + "one").style.color = "black";
          }
        }
      }
    })
    .catch((error) => console.log(error));
}

function updateReview() {
  const reviewObj = {
    star: count,
    content: document.getElementById("comment").value,
  };

  fetch("/api/review/" + currentTopic, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewObj),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      alert("Successfully update review!");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function createReview() {
  const reviewObj = {
    star: count,
    content: document.getElementById("comment").value,
  };

  fetch("/api/review/" + currentTopic, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewObj),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      alert("Successfully review!");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function deleteReview() {
  fetch("/api/review/" + window.localStorage.topicId, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      
      window.location.reload();
    });
}

function review() {
  fetch("/api/review/" + currentTopic)
    .then((res) => {
      res.json();
      
      if (res.status == 404) {
        createReview();
      } else {
        updateReview();
      }
    })
    .then((data) => {})
    .catch((error) => console.log(error));
}
/*--------------------------------------------------------------------*/

/*--------------------- Admin action -------------------*/
function rejectPost(id) {
  const rejectObj = {
    action: "reject",
  };
  
  fetch("/api/user/topic/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rejectObj),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      alert("Successfully reject!");
      window.location.replace("../HomePage/HomePage.html");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function acceptPost(id) {
  const acceptObj = {
    action: "accept",
  };

  fetch("/api/user/topic/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(acceptObj),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      alert("Successfully acceept!");
      window.location.replace("../HomePage/HomePage.html");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

/*------------------------------------------------------*/

/*-------------------- Manage posts action ---------------------*/
function deletePost(id) {
  fetch("/api/topic/" + id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      window.location.replace("../HomePage/HomePage.html");
    });
}

myStorage = window.localStorage;
function getSinglePost(id) {
  return fetch("/api/topic/" + id)
    .then((respone) => respone.json())
    .then((data) => {
      const months = [
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

      let postDate = new Date(data.message.date);
      let postDateFormat =
        postDate.getDate() +
        " " +
        months[postDate.getMonth()] +
        ", " +
        postDate.getFullYear() +
        " - " +
        postDate.toLocaleTimeString();
      let partner;
      if (data.message.group.length != 0) {
        partner = ", " + data.message.group[0].name;
      } else {
        partner = "";
      }
      let postHeader;

      // Differ between members and admin
      if (myStorage.Role === "Admin") {
        postHeader = `<div class="post__header" id="post-header">
            <div class="blog-post__icon dropdown" id="post-icons">
              <div class="btn btn-primary dropdown-toggle interactButton" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                
              </div>
              <div class="dropdown-menu interactMenu" aria-labelledby="dropdownMenuButton">
                <a onClick="acceptPost('${window.localStorage.topicId}')" class="dropdown-item blog-post__accept"><img src="../img/accept.svg"  title="Accept">Accept</a>
                <a onClick="rejectPost('${window.localStorage.topicId}')" class="dropdown-item blog-post__reject"><img src="../img/rejected.svg" title="Reject">Reject</a>
                <a onClick="deletePost('${myStorage.topicId}')" class="dropdown-item"><img src="../img/delete.svg" title="Delete">Delete</a>  
              </div>
            </div>
            <div class="header__title" title="${data.message.name}">${data.message.name}</div>
              <div class="header__author">
              <span>Author: </span>
              <span>${data.message.author.name} ${partner}</span>
            </div>
            <div class="header__date">
              <span>Date: </span>
              <span>${postDateFormat}</span>
            </div>
            <div class="blog-post__rate" id="blog-post__rate">
              <span>Rate: </span>
              <span>${data.message.averageRate}</span>
              <svg
                width="1.1em"
                height="1.1em"
                viewBox="0 0 16 16"
                class="bi bi-star-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                />
              </svg>
            </div> 
          </div>`;
      } else {
        postHeader = `<div class="post__header" id="post-header">
            <div class="blog-post__icon dropdown" id="post-icons">
              <div class="btn btn-primary dropdown-toggle interactButton" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                
              </div>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a onClick="deletePost('${myStorage.topicId}')" class="dropdown-item"><img src="../img/delete.svg" title="Delete">Delete</a>  
              <a href="../CreatePost/CreatePost.html" class="dropdown-item"><img src="../img/edit.svg">Edit</a>
              </div>
            </div>
            <div class="header__title" title="${data.message.name}">${data.message.name}</div>
              <div class="header__author">
              <span>Author: </span>
              <span>${data.message.author.name} ${partner}</span>
            </div>
            <div class="header__date">
              <span>Date: </span>
              <span>${postDateFormat}</span>
            </div>
            <div class="blog-post__rate" id="blog-post__rate">
              <span>Rate: </span>
              <span>${data.message.averageRate}</span>
              <svg
                width="1.1em"
                height="1.1em"
                viewBox="0 0 16 16"
                class="bi bi-star-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                />
              </svg>
            </div> 
          </div>`;
      }

      let postBody = `<div class="post__body">
            <img src="${data.message.background}" />
            <p>
              ${data.message.detail}
            </p>
            <div class="alert alert-success" role="alert">
              ${data.message.note}
            </div>
          </div>`;

      document
        .getElementById("singlepost-wrapper")
        .insertAdjacentHTML("afterbegin", postHeader);
      document
        .getElementById("post-header")
        .insertAdjacentHTML("afterend", postBody);

      if (window.localStorage.PostStatus == 1) {
        $(".blog-post__accept").css("display", "none");
      } else if (window.localStorage.PostStatus == -1) {
        $(".blog-post__reject").css("display", "none");
      }

      if (data.message.review[0] == null || data.message.review[0] == 0) {
        // if there is no comments, hide the section
        document.getElementById("blog-post__rate").style.display = "none";
      }

      if (
        window.localStorage.CurrentUserId !== data.message.author._id &&
        window.localStorage.Role !== "Admin"
      ) {
        // Post icon for only creators
        document.getElementById("post-icons").style.display = "none";
      } else {
        // Show list of members joined the workshop
        document.getElementById("showlistButton").style.display = "inline-block";
      }

      let timeInterval = moment().diff(moment(data.message.date), "minutes");
      if (window.localStorage.PostStatus === "1" && timeInterval < 0) {
        // Posts which are accepted show the Join button and validate time interval
        document.getElementById("joinedButton").style.display = "inline-block";
      }
    })
    .catch((error) => console.log(error));
}

function getJoinList(id) {
  fetch("/api/topic/" + id)
    .then((res) => res.json())
    .then((data) => {
      let list = [];
      data.message.participants.map((element) => {
        list.push(`<li class="list-group-item">${element.name}</li>`);
      })
      document.getElementById('memberList').innerHTML = list.join("");
    })
    .catch((error) => console.log(error));
}

var renderCommentsArray = [];
function loadComments() {
  return fetch("/api/topic/" + window.localStorage.topicId)
    .then((response) => response.json())
    .then((data) => {
      renderCommentsArray = data.message.review.map((element) => {
        return `
      <div class="comment__box">
      <div class="comment__text">${element.content}</div>
      <div class="blog-post__rate comment__rate">
        <span>${element.star}</span>
        <svg
          width="1.3em"
          height="1.3em"
          viewBox="0 0 16 16"
          class="bi bi-star-fill"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
      </div> 
    </div>`;
      });
      // document.getElementById("comment-wrapper").innerHTML = renderArray;
    })
    .catch((error) => console.log(error));
}

let currentIndex = 0;
async function renderComments() {
  await loadComments();
  const maxEachTurn = 4;
  for (var i = 0; i < maxEachTurn; i++) {
    if (currentIndex >= renderCommentsArray.length) {
      $("#loadmore-button").hide();
      return;
    }
    $("#comment-wrapper").append(renderCommentsArray[i + currentIndex]);
  }
  currentIndex += maxEachTurn;
}

function renderLoadmoreButton() {
  let loadmoreButton = `<div class="loadmore-button__wrapper">
      <div class="loadmore-button" id="loadmore-button" onClick="renderComments()">Load more <i class="fas fa-arrow-down"></i></div>
    </div>`;
  document
    .getElementById("comment-wrapper")
    .insertAdjacentHTML("afterend", loadmoreButton);
}

async function renderFullTopic(id) {
  await getSinglePost(myStorage.topicId);
  Promise.all([
    fetch("/api/topic/" + id + "/join").then((res) => res.json()),
    fetch("/api/topic/" + id).then((res) => res.json()),
  ])
    .then((data) => {
      let timeInterval = moment().diff(moment(data[1].message.date), "minutes");
      if (data[0].message.statusParticipant == true && timeInterval > 0) {
        document.getElementById("rateButton").style.display = "inline-block";
      }
    })
    .catch((error) => console.log(error));
}
/*----------------------------------------------------------*/

/*------------------- Ranking board -------------------*/
function readTopicId(id) {
  console.log("Function read topicId actived");
  myStorage.setItem("topicId", id);
}

function renderRankingBoard() {
  fetch("/api/topic/ranking")
    .then((res) => res.json())
    .then((data) => {
      for (var i = 0; i < data.message.length && i < 5; i++) {
        document.getElementById('rank'+(i+1)).innerHTML = `<a href="../SinglePost/SinglePost.html" onclick="readTopicId('${data.message[i]._id}')">${data.message[i].name}</a>`
        document.getElementById('rate'+(i+1)).innerHTML = data.message[i].averageRate;
      }

      if (data.message.length < 5) {
        for (var i = data.message.length + 1; i <= 6; i++) {
          document.getElementsByTagName("TR")[i].style.display = 'none';
        }
      }
    })
    .catch((error) => console.log(error));
}
/*----------------------------------------------------------------------------------*/

renderFullTopic(window.localStorage.topicId);
getJoinList(window.localStorage.topicId);
getReview();
renderLoadmoreButton();
renderComments();
renderInitialJoinButton();
renderRankingBoard();
