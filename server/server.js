  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDfWf72M8Zffs8W9GANnVlj2O_q5k4I8qk",
    authDomain: "bookreview-eacc8.firebaseapp.com",
    projectId: "bookreview-eacc8",
    storageBucket: "bookreview-eacc8.appspot.com",
    messagingSenderId: "55853167784",
    appId: "1:55853167784:web:d17e935f93833c1fc8fe9d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //setup variables
  var db = firebase.database();
  var reviews = document.getElementById("reviews");
  var reviewsRef = db.ref("/reviews");

  reviewForm.addEventListener("submit", e =>{
      e.preventDefault();//prevent reloading

    var fullName = document.getElementById("fullName");
    var message = document.getElementById("message");
    var hiddenId= document.getElementById("hiddenId");

    var id = hiddenId.value || Date.now();

    db.ref("reviews/" + id).set({
        fullName: fullName.value,
        message: message.value,
        createdAt: firebase.database.ServerValue.TIMESTAMP 
    });
  })


  reviewsRef.on("child_added", data =>{
      var li = document.createElement("li");
      li.id = data.key;
      li.innerHTML = reviewTemplate(data.val());
      reviews.appendChild(li);
  })

  reviews.addEventListener("click", e => {
      updateReview(e);
      deleteReview(e);
  });

  reviewsRef.on("child_changed", data =>{
      var reviewNode = document.getElementById(data.key);
      reviewNode.innerHTML = reviewTemplate(data.val());
  })


  reviewsRef.on("child_removed", data =>{
    var reviewNode = document.getElementById(data.key);
    reviewNode.parentNode.removeChild(reviewNode);
})


  function deleteReview(e) {
      var reviewNode = e.target.parentNode;

      if (e.target.classList.contains("delete")){
          var id = reviewNode.id;
          db.ref("reviews/" + id).remove();
        
      }
  }


  function updateReview(e) {
      var reviewNode = e.target.parentNode;

      if (e.target.classList.contains("edit")){
          fullName.value = reviewNode.querySelector(".fullName").innerText;
          message.value = reviewNode.querySelector(".message").innerText;

          hiddenId.value = reviewNode.id;
          Materialize.updateTextFields();
      }
  }

  function reviewTemplate({ fullName, message, createdAt}) {
      var createdAtFormatted = new Date(createdAt);

      return`
        <div>
            <label>Full Name:</label>
            <label class= "fullName"><strong>${ fullName }</strong></label>
        </div>
        <div>
            <label>Message:</label>
            <label class= "message">${ message }</label>
            <br/>
        </div>

        <div>
            <label>Created:</label>
            <label class= "createdAt">${ createdAtFormatted }</label>
            <br/>
        </div>

            <button class="waves-effect waves-light btn delete">Delete</button>
            <button class="waves-effect waves-light btn edit">Update</button>

            <br><br>
        
      `
  }

  export default reviewTemplate;