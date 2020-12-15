function toggleButton(element) {
    document.getElementById('dropdownMenu2').innerHTML=`${element.innerHTML}`
}

let myStorage = window.localStorage;
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