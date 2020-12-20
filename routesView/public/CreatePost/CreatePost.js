fetch("/api/user")
  .then((response) => response.json())
  .then((data) => {
    let usersArray = data.message.map((user) => {
      return `<option value="${user._id}">${user.name}</option>`;
    });
    currentUser = `<option value="${myStorage.CurrentUserId}">${myStorage.CurrentUsername}</option>`
    
    usersArray.splice(usersArray.indexOf(currentUser), 1); // delete current account from partner list

    document
      .getElementById("defaultOption")
      .insertAdjacentHTML("afterend", usersArray);
  })
  .catch((error) => console.log(error));

  
post = () => {
  let partner = document.getElementById("partnerSelection");
  

  let groupAuthor = [
    {
      _id: document.getElementById("partnerSelection").value,
      // name: partner.options[partner.selectedIndex].text,
    }
  ];

  let postObj = {};
  if (groupAuthor[0]._id === '0') {
    postObj = {
      name: document.getElementById("title-input").value,
      date: document.getElementById("example-datetime-local-input").value,
      detail: CKEDITOR.instances['main-content'].getData(),
      note: document.getElementById("post__note").value,
      background: document.getElementById('imageUpload').value      
    }
  } else {
    postObj = {
      name: document.getElementById("title-input").value,
      date: document.getElementById("example-datetime-local-input").value,
      detail: CKEDITOR.instances['main-content'].getData(),
      note: document.getElementById("post__note").value,
      background: document.getElementById('imageUpload').value,   
      group: groupAuthor,
    };
  };
  console.log(postObj);
  fetch('/api/topic', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postObj),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // alert('Succsessfully post!');
      // window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

let myStorage = window.localStorage
function getCurrentUser() {
  fetch("/api/user/current")
    .then((res) => res.json())
    .then((data) => {
      myStorage.setItem("CurrentUserId", data.message._id);
      myStorage.setItem("CurrentUsername", data.message.name);
      document.getElementById('userAccount').insertAdjacentHTML("beforeend", data.message.name);
    })
    .catch((error) => console.log(error));
}

getCurrentUser();




