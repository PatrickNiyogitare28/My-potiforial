let image = document.getElementById('profile-image');
let bannerProfileImage = document.getElementById('banner-profile-image');
let profileImage = document.getElementById('profileImage');
let updatableUserId="";

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
    
    if(user.phoneNumber){
      document.getElementById('profilePhone').value = phoneNumber;
    }
  
  var docRef = db.collection("profiles").doc(`${user.uid}`);

  docRef.get().then(function(doc) {
    if (doc.exists) {
        // alert(JSON.stringify(doc))
      //  console.log(doc.data().phoneNumber)

       if(doc.data().occupation){
           document.getElementById('occupation').value = doc.data().occupation
       }
      if(doc.data().address){
          document.getElementById('address').value = doc.data().address
      }
      if(doc.data().phoneNumber){
         document.getElementById('profilePhone').value = doc.data().phoneNumber
      }
       let usersRouter = document.getElementById('users-router');
       let logsRouter = document.getElementById('logs-router');
       let notificationsRouter = document.getElementById('notifications-router');
       let usersControl = document.getElementById('users-control');
       let logsControl = document.getElementById('logs-control');
       let notificationControl = document.getElementById('notifications-control');
       let userType = document.getElementById("userType")

       if(doc.data().role == 'admin'){
          userType.innerHTML = "Admin";
          usersRouter.removeAttribute('hidden');
          logsRouter.removeAttribute('hidden');
          notificationsRouter.removeAttribute('hidden');
          usersControl.removeAttribute('hidden');
          logsControl.removeAttribute('hidden');
          notificationControl.removeAttribute('hidden');
          
        }
       
       else{
          userType.innerHTML="Std User";
         
       }
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




function changeRole(){
  let roleSelect = document.getElementById('changeRoles');
  db.collection('profiles').doc(`${updatableUserId}`).get().then((updatableUser)=>{
    if(updatableUser.data().role == 'admin'){
      roleSelect.innerHTML=`
      <option value="2">Admin</option>
      <option value="1">Stardard User</option>
    `
    }
    else{
        roleSelect.innerHTML=`
        <option value="1">Stardard User</option>
        <option value="2">Admin</option>
        `
    }
  })
}

function updateUserRole(){
  let successToaster =  document.getElementById('successToaster')
  let successMessage =  document.getElementById('successMessage')

  let newRole = document.getElementById('changeRoles');
  if(newRole.value == 2){
    db.collection('profiles').doc(`${updatableUserId}`).update({
      role: 'admin'
    }).then(()=>{
      successToaster.classList.toggle('active');
      successMessage.innerHTML="User Role updated to admin";
      setTimeout(()=>{
         successToaster.classList.remove('active');
      },4000)
    })
  }
  else{
    db.collection('profiles').doc(`${updatableUserId}`).update({
      role: 'stdUser'
    }).then(()=>{
      successToaster.classList.toggle('active');
      successMessage.innerHTML="User Role updated to stardardUser";
      setTimeout(()=>{
         successToaster.classList.remove('active');
      },4000)
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


function triggerUpdateUserModal(userId){
  updatableUserId=userId;
  changeRole();
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
function triggerEditBlogModal(event,blogId){
  setEditableBlog(blogId)
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

function setEditableBlog(blogId){
  let blogPostId = document.getElementById('blogId');
  let blogHeader = document.getElementById('blogHeader');
  let blogContent = document.getElementById('blogContent');
  let blogImage = document.getElementById('blogImage');
  let blogDate = document.getElementById('blogDate');
  let blogOwner = document.getElementById('blogOwner');


    blogs.forEach(blog => {
      if(blog.blogId == blogId){
          blogPostId.value = blog.blogId,
          blogHeader.innerHTML = blog.title,
          blogContent.innerHTML = blog.body,
          blogImage.src = blog.imageURL,
          blogDate.innerHTML = blog.date,
          blogOwner.innerHTML = blog.owner
      }
    })
}

function triggerReadCommentsModal(event,blogId){
  // alert("calling.")
  

  $(()=>{
    let readCommentsModal = document.getElementById('readCommentsModal');
    if(event == 'open'){
      fetchComments(blogId);
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

