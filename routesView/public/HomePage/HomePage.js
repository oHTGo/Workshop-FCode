// load posts to Homepage
// fetch('/api/topic')
// .then(response => response.json())
// .then(data => {
//     console.log(data);
//     let postDate = new Date(data.message[0].date);
//     let weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//     let postsArray =  document.getElementsByClassName("weekDay");
//     for (var i = 0; i < postsArray.length; i++) {
//         postsArray[i].innerHTML = `${weeks[postDate.getDay()]}`
//     }

//     let  formatDateArray = document.getElementsByClassName("formatDate");
//     for (var i = 0; i < postsArray.length; i++) {
//         formatDateArray[i].innerHTML = `${postDate.toLocaleDateString()}`
//     }

//     let starRateArray = document.getElementsByClassName('starRate');
//     for (var i = 0; i < postsArray.length; i++) {
//         starRateArray[i].innerHTML = `${data.message[0].review[0].star}`
//     }

//     let postTitleArray = document.getElementsByClassName('blog-post__title');
//     for (var i = 0; i < postsArray.length; i++) {
//         postTitleArray[i].innerHTML = `${data.message[0].name}`
//     }
// })
// .catch(error => console.log(error))

fetch("/api/topic")
  .then((response) => response.json())
  .then((data) => {
    let postsArray = data.message.map((element) => {
      let weeks = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let postDate = new Date(element.date);

      return `
        <div class="blog-post">
          <div class="blog-post__img">
            <img src="../img/5.png" alt="">
          </div>
          <div class="blog-post__info">
            <div class="blog-post__date">
              <span class="weekDay">${weeks[postDate.getDay()]}</span>
              <span class="formatDate">${postDate.toLocaleDateString()}</span>
            </div>
            <div class="blog-post__rate">
              <span class="starRate">${element.review[0].star}</span>
              <svg width="1.1em" height="1.1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            </div>
            <h1 class="blog-post__title">${element.name}</h1>
            <p class="blog-post__description">${element.detail}</p>
            <a href="../SinglePost/SinglePost.html" class="blog-post__cta">Read more</a>
          </div>
        </div>
      `;
    });

    postsArray = postsArray.join("");
    document.getElementById("homepagePosts").innerHTML = postsArray;
  })
  .catch((error) => console.log(error));
