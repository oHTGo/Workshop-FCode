console.log(window.localStorage);
function loadUserList() {
  return fetch("/api/user")
    .then((response) => response.json())
    .then((data) => {
      let usersArray = data.message.map((user) => {
        return `<option id="${user._id}" value="${user._id}">${user.name}</option>`;
      });
      currentUser = `<option id="${window.localStorage.CurrentUserId}" value="${window.localStorage.CurrentUserId}">${window.localStorage.CurrentUsername}</option>`;

      usersArray.splice(usersArray.indexOf(currentUser), 1); // delete current account from partner list

      document
        .getElementById("defaultOption")
        .insertAdjacentHTML("afterend", usersArray);
    })
    .catch((error) => console.log(error));
}

async function post() {
  await loadUserList();
  let partner = document.getElementById("partnerSelection");
  let groupAuthor = [
    {
      _id: document.getElementById("partnerSelection").value,
      // name: partner.options[partner.selectedIndex].text,
    },
  ];

  let postObj = {};
  if (groupAuthor[0]._id === "0") {
    postObj = {
      name: document.getElementById("title-input").value,
      date: document.getElementById("example-datetime-local-input").value,
      detail: CKEDITOR.instances["main-content"].getData(),
      note: document.getElementById("post__note").value,
      background: document.getElementById("imageUpload").value,
    };
  } else {
    postObj = {
      name: document.getElementById("title-input").value,
      date: document.getElementById("example-datetime-local-input").value,
      detail: CKEDITOR.instances["main-content"].getData(),
      note: document.getElementById("post__note").value,
      background: document.getElementById("imageUpload").value,
      group: groupAuthor,
    };
  }
  console.log(postObj);

  if (window.localStorage.topicId === "") {
    fetch("/api/topic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postObj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert('Post successfully!');
        window.location.replace("../HomePage/HomePage.html");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    fetch("/api/topic/" + window.localStorage.topicId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postObj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert('Update successfully!');
        window.location.replace('../HomePage/HomePage.html');
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function renderEditPost(id) {
  if (id !== "") {
    fetch("/api/topic/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let time = new Date(data.message.date).toTimeString().slice(0, 8);
        let date = new Date(data.message.date).toISOString().slice(0, 11);
        let datetime = date.concat(time);

        if (data.message.group.length !== 0) {
          // check if there is partner or not
          document
            .getElementById(data.message.group[0]._id)
            .setAttribute("selected", "true");
        }
        document.getElementById(
          "example-datetime-local-input"
        ).value = datetime;
        document.getElementById("title-input").value = data.message.name;
        document.getElementById("imageUpload").value = data.message.background;
        document.getElementById("main-content").innerHTML = data.message.detail;
        document.getElementById("post__note").value = data.message.note;
      })
      .catch((error) => console.log(error));
  }
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

loadUserList();
getCurrentUser();
renderEditPost(window.localStorage.topicId);
