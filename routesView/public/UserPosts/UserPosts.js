function resetTopicId() {
  window.localStorage.setItem('topicId', '');
}

/*----------------- INTERFACE INTERACTION------------------------*/
function toggleButton(element) {
  document.getElementById("dropdownMenu2").innerHTML = `${element.innerHTML}`;
}

let myStorage = window.localStorage;
function getCurrentUser() {
  fetch("/api/user/current")
    .then((res) => res.json())
    .then((data) => {
      myStorage.setItem("CurrentUserId", data.message._id);
      myStorage.setItem("CurrentUsername", data.message.name);
      document
        .getElementById("userAccount")
        .insertAdjacentHTML("beforeend", data.message.name);
    })
    .catch((error) => console.log(error));
}
getCurrentUser();

function readPost(id, status) {
  // this function is to navigate to the single post when user/admin click the link,
  // the local storage will store the post's id and the post's status
  window.localStorage.setItem("topicId", id);
  window.localStorage.setItem('PostStatus', status);
}

/*-----------------------------------------------------------------------*/

/*------------------ RENDER POST LIST ---------------------*/
function renderAllPosts() {
  fetch("/api/user/topic")
    .then((res) => res.json())
    .then((data) => {
      let postList = data.message.map((element) => {
        let statusArray = ["Rejected", "Waiting", "Accepted"];
        let alertColorsArr = ["danger", "warning", "success"];
        let status, alertColor;
        if (element.status === -1) {
          status = statusArray[0];
          alertColor = alertColorsArr[0];
        } else if (element.status === 0) {
          status = statusArray[1];
          alertColor = alertColorsArr[1];
        } else {
          status = statusArray[2];
          alertColor = alertColorsArr[2];
        }

        return `
        <tr>
          <td>${data.message.indexOf(element) + 1}</td>
          <td>
            <a href="../SinglePost/SinglePost.html" onClick="readPost('${
              element._id}', '${element.status}')">
              ${element.name}
            </a>
          </td>
          <td>${element.createdAt}</td>
          <td class="alert alert-${alertColor}">${status}</td>
        </tr>`;
      });

      document.getElementById("tableBodyAll").innerHTML = postList.join("");
    })
    .catch((error) => console.log(error));
}

let waitingPosts = [];
function loadWaitingPosts() {
  return fetch("/api/user/topic")
    .then((res) => res.json())
    .then((data) => {
      data.message.map((element) => {
        if (element.status === 0) {
          waitingPosts.push(element);
        }
      });
    })
    .catch((error) => console.log(error));
}

async function renderWaitingPosts() {
  await loadWaitingPosts();
  let postList = waitingPosts.map((element) => {
    return `
        <tr>
          <td>${waitingPosts.indexOf(element) + 1}</td>
          <td>
            <a href="../SinglePost/SinglePost.html" onClick="readPost('${
              element._id
            }')">
              ${element.name}
            </a>
          </td>
          <td>${element.createdAt}</td>
          <td class="alert alert-warning">Waiting</td>
        </tr>`;
  });

  document.getElementById("tableBodyWaiting").innerHTML = postList.join("");
}

let acceptedPosts = [];
function loadAcceptedPosts() {
  return fetch("/api/user/topic")
    .then((res) => res.json())
    .then((data) => {
      data.message.map((element) => {
        if (element.status === 1) {
          acceptedPosts.push(element);
        }
      });
    })
    .catch((error) => console.log(error));
}

async function renderAcceptedPosts() {
  await loadAcceptedPosts();
  let postList = acceptedPosts.map((element) => {
    return `
        <tr>
          <td>${acceptedPosts.indexOf(element) + 1}</td>
          <td>
            <a href="../SinglePost/SinglePost.html" onClick="readPost('${
              element._id
            }')">
              ${element.name}
            </a>
          </td>
          <td>${element.createdAt}</td>
          <td class="alert alert-success">Accepted</td>
        </tr>`;
  });

  document.getElementById("tableBodyAccepted").innerHTML = postList.join("");
}

let rejectedPosts = [];
function loadRejectedPosts() {
  return fetch("/api/user/topic")
    .then((res) => res.json())
    .then((data) => {
      data.message.map((element) => {
        if (element.status === -1) {
          rejectedPosts.push(element);
        }
      });
    })
    .catch((error) => console.log(error));
}

async function renderRejectedPosts() {
  await loadRejectedPosts();
  let postList = rejectedPosts.map((element) => {
    return `
        <tr>
          <td>${rejectedPosts.indexOf(element) + 1}</td>
          <td>
            <a href="../SinglePost/SinglePost.html" onClick="readPost('${
              element._id
            }')">
              ${element.name}
            </a>
          </td>
          <td>${element.createdAt}</td>
          <td class="alert alert-danger">Rejected</td>
        </tr>`;
  });

  document.getElementById("tableBodyRejected").innerHTML = postList.join("");
}

renderAllPosts();
renderWaitingPosts();
renderAcceptedPosts();
renderRejectedPosts();




/*---------------------------------------------------------*/
