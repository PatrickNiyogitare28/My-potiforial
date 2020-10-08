let image = document.getElementById('profile-image');
let bannerProfileImage = document.getElementById('banner-profile-image');
let profileImage = document.getElementById('profileImage');

auth.onAuthStateChanged(async(user)=>{
  if(!user){
    window.location.href="../index.html";
  }
  else{
    image.src='../assetes/default-avatar.jpg';
    bannerProfileImage.src = '../assetes/default-avatar.jpg';
    profileImage.src = '../assetes/default-avatar.jpg';

    document.getElementById('displayName').innerHTML = user.displayName;
    document.getElementById('profileName').value = user.displayName;
    document.getElementById('profileEmail').value= user.email
    if(user.phoneNumber){
      document.getElementById('profilePhone').value= user.phoneNumber;
  }
    if(user.photoURL != null){
      storage.ref(user.photoURL).getDownloadURL().then((imageURL)=>{
        image.src = imageURL;
        bannerProfileImage.src = imageURL;
        profileImage.src = imageURL;
    }).catch((err)=>{
      alert(err)
    })
    }
     console.log(user);
    if(user.phoneNumber){
      document.getElementById('profilePhone').value = phoneNumber;
    }
  
  var docRef = db.collection("profiles").doc(`${user.uid}`);

  docRef.get().then(function(doc) {
    if (doc.exists) {
      //  console.log(doc.data().phoneNumber)
       document.getElementById('occupation').value = doc.data().occupation
       document.getElementById('address').value = doc.data().address
       document.getElementById('profilePhone').value = doc.data().phoneNumber
    } else {
       doc.set({
          Names: user.displayName
       })
       
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
   retreiveBlogs();
   setTimeout(()=>{
    listBlogs();
   },10000)
  }
})


let proImage = {}
function uploadProfileImage(event){
  if(event.target.files[0] != null){
    proImage = event.target.files[0];
    document.getElementById('save-image-btn').style.display="block";
  }
}
function changeMyProfilePicture(){
  let user = auth.currentUser;
  if(user){
    document.getElementById('successToaster').classList.toggle('active');
    storage.ref('users/'+user.uid+'/profile.jpg').put(proImage).then(res =>{
      user.updateProfile({
        photoURL: `users/${user.uid}/profile.jpg`
    }).then(res=>{
      window.location.reload();
    }).catch(error =>{
      alert(error);
    })
    }).catch(err =>{
      alert(err);
    })
  }
}

$(()=>{
    $('#darshboard-router').click(()=>{
       hideWrappers(); 
       showWrapper('darshbaord-container')
       markActiveRouter('darshboard-router');
    })
    
    $('#profile-router').click(()=>{
        hideWrappers();
        showWrapper('profile-container');
        markActiveRouter('profile-router');
      })

    $('#users-router').click(()=>{
        hideWrappers();
        showWrapper('users-container')
        markActiveRouter('users-router');
    })
  
    $('#blogs-router').click(()=>{
      hideWrappers();
      showWrapper('blogs-container')
      markActiveRouter('blogs-router');
  })

  $('#logs-router').click(()=>{
    hideWrappers();
    showWrapper('logs-container')
    markActiveRouter('logs-router');
   })

   $('#notifications-router').click(()=>{
    hideWrappers();
    showWrapper('notifications-container')
    markActiveRouter('notifications-router');
 })

   
})
function hideWrappers(){
  $(()=>{
    var anyClass = $('#contents-wrapper').find('.subpage')
        anyClass.addClass('hide-page')
    var hasActive = $('#navigation').find('.active-router');
        hasActive.removeClass('active-router');  

  })  
}
function showWrapper(wrapperId){
    $(()=>{
     
        $(`#${wrapperId}`).removeClass('hide-page');
      })  
}
function markActiveRouter(routerId){
  $(()=>{
    $(`#${routerId}`).addClass('active-router');
  })
}

function onNavigate(routerId){
 document.getElementById(`${routerId}`).click();
}

function triggerFileInput(fieldId){
  document.getElementById(`${fieldId}`).click();
}


function triggerUpdateUserModal(){
  $(()=>{
    var modal = document.getElementById("myModal");
    $('#myModal').fadeIn();
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
    $('#myModal').fadeOut();
      }
     window.onclick = function(event) {
      if (event.target == modal) {
        $('#myModal').fadeOut();
      }
    }
  })  
 
}
function triggerBlogModal(event){
  $(()=>{
    let createBlogModal = document.getElementById('createBlogModal');
    if(event == 'open'){
      $('#createBlogModal').fadeIn();
    }  
    else if(event == 'close'){
      $('#createBlogModal').fadeOut();
    }
    window.onclick = (event)=>{
      if(event.target == createBlogModal){
        $('#createBlogModal').fadeOut();
      }
    }
  })
}
function triggerEditBlogModal(event,title){
  if(title != ''){
    alert(title)
  }
  $(()=>{
    let editBlogModal = document.getElementById('editBlogModal');
    if(event == 'open'){
      $('#editBlogModal').fadeIn();
    }  
    else if(event == 'close'){
      $('#editBlogModal').fadeOut();
    }
    window.onclick = (event)=>{
      if(event.target == editBlogModal){
      $('#editBlogModal').fadeOut();
      }
    }
  })
  
}

function triggerReadCommentsModal(event){
  $(()=>{
    let readCommentsModal = document.getElementById('readCommentsModal');
    if(event == 'open'){
      $('#readCommentsModal').fadeIn();
    }  
    else if(event == 'close'){
      $('#readCommentsModal').fadeOut();
    }
    window.onclick = (event)=>{
      if(event.target == readCommentsModal){
      $('#readCommentsModal').fadeOut();
       }
    }
  })
}
function triggerCreateNewUserModal(event){
  let modal = document.getElementById('createNewUser')
  $(()=>{
    if(event == 'open'){
      $('#createNewUser').fadeIn();
    }  
    else if(event == 'close'){
      $('#createNewUser').fadeOut();
    }
  })
  window.onclick = function(event) {
    if (event.target == modal) {
      $('#createNewUser').fadeOut();
    }
  }
}

function checkNotifications(){
  $(()=>{
   var checkbox = $('#notification-items-container').find('.checkbox');
    checkbox.prop( "checked", true )
  })
}

function toggleDashboardSidebar(){
  $(()=>{
    let sidebar = $('#sidebar-container');
    let main = $('#main-content-container');
    if(sidebar.hasClass('hide')){
         sidebar.removeClass('hide');
         main.removeClass('full');
    }
    else{
       sidebar.addClass('hide');
       main.addClass('full');
    }
  })
}

function createUser(){
  const name = document.getElementById('newUser-name').value;
  const email = document.getElementById('newUser-email').value;
  const password = document.getElementById('newUser-password').value;

  auth.createUser({
    email:email,
    displayName: name,
    password: password
  }).then((user)=>{
     alert(user);
  }).catch((error)=>{
    alert(error);
  })
}