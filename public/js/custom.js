function deleteEvent(){
    let btn = document.getElementById('deleteBtn');
    let id = btn.getAttribute('data-id');

 axios.delete('/events/delete/' + id)
  .then(function (response) {
    alert("Event was Deleted");
    window.location.href = '/events';
  }).catch(function (error) {
    console.log(error);
  })
}