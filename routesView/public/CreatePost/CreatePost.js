post = () => {
    const postObj = {
        name : document.getElementById('title-input').value,
        date : document.getElementById('example-datetime-local-input').value,
        detail : document.getElementById('main-content').value,
        note : document.getElementById('post__note').value
    }
    console.log(postObj);
    
}