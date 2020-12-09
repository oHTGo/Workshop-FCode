fetch("/api/topic")
  .then((response) => response.json())
  .then((data) => {
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
      let postDateFormat = postDate.getDate() + ' ' + months[postDate.getMonth()] + ', ' + postDate.getFullYear();

      return `
        <div class="blog-post">
          <div class="blog-post__img">
            <img src="../img/5.png" alt="">
          </div>
          <div class="blog-post__rate">
            <span class="starRate">${element.review[0]}</span>
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
            
            <h1 class="blog-post__title">${element.name}</h1>
            <p class="blog-post__description">${element.detail}</p>
            <a href="../SinglePost/SinglePost.html" class="blog-post__cta">Read more</a>
          </div>
        </div>`;
    });

    document.getElementById("homepage__posts-wrapper").innerHTML = postsArray;

    for (var i = 0; i < postsArray.length; i++) {
      if (
        document.getElementsByClassName("starRate")[i].innerText == "null" ||
        document.getElementsByClassName("starRate")[i].innerText == "undefined"
      ) {
        document.getElementsByClassName("blog-post__rate")[i].style.display =
          "none";
      }
    }
  })
  .catch((error) => console.log(error));
