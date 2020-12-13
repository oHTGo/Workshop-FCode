fetch("/api/user")
  .then((response) => response.json())
  .then((data) => {
    let usersArray = data.message.map((user) => {
      return `<option value="${user._id}">${user.name}</option>`;
    });
    document
      .getElementById("defaultOption")
      .insertAdjacentHTML("afterend", usersArray);
  })
  .catch((error) => console.log(error));

// myStorage = window.localStorage;

// fetch("/api/topic")
//   .then((response) => response.json())
//   .then((data) => {
//     var objectAuthor = {name : data.message[0].author.name, _id : data.message[0].author._id }
//     myStorage.setItem('object', JSON.stringify(objectAuthor));
//   })
//   .catch((error) => console.log(error));
//   console.log(JSON.parse(myStorage.getItem('object')))

  
post = () => {
  let partner = document.getElementById("partnerSelection");
  let groupAuthor = [
    
    {
      _id: document.getElementById("partnerSelection").value,
      name: partner.options[partner.selectedIndex].text,
    }
  ];

  const postObj = {
    name: document.getElementById("title-input").value,
    date: document.getElementById("example-datetime-local-input").value,
    detail: CKEDITOR.instances['main-content'].getData(),
    note: document.getElementById("post__note").value,
    group: groupAuthor,
  };
  console.log(postObj);
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
      alert('Succsessfully post!');
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Get data 

// async function fetchExam() {
//   try {
//       const response = await fetch('/api/topic', {
//           method: 'GET',
//           credentials: 'same-origin'
//       });
//       const exam = await response.json();
//       return exam;
//   } catch (error) {
//       console.error(error);
//   }
// }
// var object = 
// async function renderExam() {
//   const exam = await fetchExam();
//    //console.log(exam.message[0].author);
//   return exam.message[0].author;
// };




