post = () => {
  const postObj = {
    name: document.getElementById("title-input").value,
    date: document.getElementById("example-datetime-local-input").value,
    detail: "Main content",
    note: document.getElementById("post__note").value,
  };
  console.log(postObj);
  // fetch("/api/topic", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(postObj),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("Success:", data);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
    
};
