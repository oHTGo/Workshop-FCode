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
    data.message.forEach((element) => {
      console.log(element);
      let weeks = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let postsArray = document.getElementsByClassName("weekDay");
      let postDate = new Date(element.date);
      for (var i = 0; i < postsArray.length; i++) {
        postsArray[i].innerHTML = `${weeks[postDate.getDay()]}`;
      }
    });
  })
  .catch((error) => console.log(error));
