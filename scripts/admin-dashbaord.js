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
function triggerEditBlogModal(event){
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