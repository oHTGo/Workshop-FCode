let myStorage = window.localStorage;

function readPost(id, status) {
  myStorage.setItem("topicId", id);
  myStorage.setItem('PostStatus', status);
}

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

function resetTopicId() {
  window.localStorage.setItem('topicId', '');
}


function renderPosts(pageNumber) {
fetch("/api/topic/page/" + pageNumber)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    // myStorage.setItem('CurrentUserID', data.message.author.name);
    let postsArray = data.message.map((element) => {
      const weeks = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
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
      let postDate = new Date(element.date);
      let postDateFormat =
        postDate.getDate() +
        " " +
        months[postDate.getMonth()] +
        ", " +
        postDate.getFullYear() +
        " - " +
        postDate.toLocaleTimeString();
      let postRate = Math.round(element.review[0] * 100) / 100;

      return `
        <div class="blog-post">
          <div class="blog-post__img">
            <img src="${element.background}" alt="">
          </div>
          <div class="blog-post__rate">
            <span class="starRate">${postRate}</span>
            <svg width="1.1em" height="1.1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
          </div>
          <div class="blog-post__info">
            <div class="blog-post__date">
              <span class="weekDay">${weeks[postDate.getDay()]}</span>
              <span class="formatDate">${postDateFormat}</span>
            </div>
            
            <div class="blog-post__title" title="${element.name}">${element.name}</div>
            <div class="blog-post__description">${element.detail}</div>
            <a href="../SinglePost/SinglePost.html" class="blog-post__cta" id="readButton" onClick="readPost('${
              element._id}', 1)">Read more</a>
          </div>
        </div>`;
    });

    document.getElementById("homepage__posts-wrapper").innerHTML = postsArray.join("");

    for (var i = 0; i < postsArray.length; i++) {
      if (
        document.getElementsByClassName("starRate")[i].innerText == "null" ||
        document.getElementsByClassName("starRate")[i].innerText == "0" ||
        document.getElementsByClassName("starRate")[i].innerText == "NaN"
      ) {
        document.getElementsByClassName("blog-post__rate")[i].style.display =
          "none";
      }
    }
  })
  .catch((error) => console.log(error));
}

getCurrentUser();
renderPosts(1);

