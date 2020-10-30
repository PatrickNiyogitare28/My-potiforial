let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let comments=[]
let blogImage = {};
let successToaster =  document.getElementById('successToaster')
let successMessage =  document.getElementById('successMessage')

function onSendQuery(){
   let name = document.getElementById('name').value;
   let email = document.getElementById('email').value;
   let query = document.getElementById('query').value;
   
   if(name=="" || email == "" || query == ""){
    let erroMessage = document.getElementById('errorMessage');
    triggerError('form');
     erroMessage.innerHTML = "Error: The form may contain empty required fields";
     }
     else{
         let successToaster =  document.getElementById('signUpToaster')
         successToaster.classList.toggle('active'); 
         db.collection('inquiries').doc().set({
            name: name,
            email: email,
            inquiry: query,
            date: date,
            time: time
        }).then(()=>{
            let successMessage = document.getElementById('successMessage');
            successMessage.innerHTML="Your Inquiry sent successfully!"
            document.getElementById('form').reset();
            let currentChars = document.getElementById('typedChars');
            currentChars.innerHTML=0
            setTimeout(()=>{
                successToaster.classList.remove('active');
            },3000)
        }).catch((error)=>{
            alert(error);
        })
     }
}

function onSubscribe(){
    let subscriptionEmail = document.getElementById('subscriptionEmail').value;
    let invalidSubEmail = validateSubscriptionEmail();
    console.log(invalidSubEmail)
    if(invalidSubEmail != true){
        let successToaster =  document.getElementById('signUpToaster')
        successToaster.classList.toggle('active'); 
        
        db.collection('subscriptions').doc().set({
            email: subscriptionEmail,
            date: date,
            time: time
        }).then(()=>{
            let successMessage = document.getElementById('successMessage');
            successMessage.innerHTML="Thank you for subscribing"
            document.getElementById('subscriptionEmail').value="";
            setTimeout(()=>{
                successToaster.classList.remove('active');
            },3000)
        }).catch((error)=>{
            alert(error);
        })
    }
}

function updateUserProfile(){
    let displayName = document.getElementById('profileName').value
    let phone = document.getElementById('profilePhone').value
    let email = document.getElementById('profileEmail').value
    let occupation = document.getElementById('occupation').value
    let address = document.getElementById('address').value
    
    auth.onAuthStateChanged(async(user)=>{
        if(!user){return window.location.href="../index.html"}
            successToaster.classList.toggle('active');
            successMessage.innerHTML="Updating profile...";
           user.updateEmail(email).catch((err)=> alert(err));
           user.updateProfile({
            displayName: displayName,
           
         })
        .then(()=>{ "Auth profile updated"})
        .catch((err)=>{ alert("error occured"+err)})
        const profileRef = db.collection('profiles').doc(`${user.uid}`);
        const doc = await profileRef.get();
        if (!doc.exists) {
            profileRef.set({
                 Names: displayName,
                 phoneNumber:phone,
                 occupation: occupation,
                 address: address,
              
           }).then(()=>{
               
           }).catch(error => alert(error))
        } else {
             
           profileRef.update({
              Names: displayName,
              phoneNumber:phone, 
              occupation: occupation,
              address: address,
              role:'stdUser'
          }).then(()=>{
              successMessage.innerHTML="Profile updated successfully";
              setTimeout(()=>{
                  successToaster.classList.remove('active');
              },3000)
              
     }).catch()
 }
})
}


function getBlogAttachement(event){
    if(event.target.files[0] != null){
        blogImage = event.target.files[0];
        successToaster.classList.toggle('active');
        successMessage.innerHTML="Attachement uploaded";
        setTimeout(() => {
          successToaster.classList.remove('active');
      }, 3000);
   }
}

function createNewBlog(){
    let user = auth.currentUser;
    if(!user){
        return window.location.href="../index.html";
    }
    let blogTitle = document.getElementById('newBlogTitle').value;
    let blogBody = document.getElementById('newBlogBody').value;
    const blogId = getBlogId();
    let blogForm = document.getElementById('blogForm'); 
    successToaster.classList.toggle('active');
    successMessage.innerHTML="Creating....";
     storage.ref(`blogs/${blogId}/blogImage.jpg`).put(blogImage).then(()=>{
        db.collection('blogs').doc(`${blogId}`).set({
            title: blogTitle,
            blogBody: blogBody,
            date: date,
            owner: user.uid,
            imageURL: `blogs/${blogId}/blogImage.jpg`
        }).then(()=>{
            blogForm.reset();
            successMessage.innerHTML="Blog created successfully"
            retreiveBlogs();
            setTimeout(()=>{
                successToaster.classList.remove('active');
            },3000)
            setTimeout(()=>{
                blogs.splice(0,blogs.length);
                listBlogs();
            },7000)
        })
         .catch(error => {
             console.log(error);
         })
    }).catch((error)=>{
        alert(error);
    })
}
let blogs = [];
function retreiveBlogs(){
    
    db.collection("blogs")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach((doc)=> {
             db.collection('profiles')
             .doc(`${doc.data().owner}`)
             .get()
             .then((profile)=>{
                console.log(profile.data().Names)
                storage.ref(doc.data().imageURL).getDownloadURL().then((imageURL)=>{
                     blogs.push({
                        blogId: doc.id, 
                        title: doc.data().title,
                        body: doc.data().blogBody,
                        date: doc.data().date,
                        owner: profile.data().Names,
                        imageURL: imageURL
                    });
                   }).catch((err)=>{
                  alert(err)
                })
            }).catch(error =>{ console.log("Profile Error"+error)})
           
          });
      })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    }); 
   
}



function displayBlog(){
  let title = document.getElementById('blogTitle');
  let image = document.getElementById('blogImage');
  let owner = document.getElementById('blogOwner')
  let date = document.getElementById('date');
  let blogBody = document.getElementById('blogBody');

  let size = blogs.length;
  
  title.innerHTML = blogs[size-1].title;
  image.src = blogs[size-1].imageURL;
  owner.innerHTML = ' by '+blogs[size-1].owner;
  date.innerHTML = blogs[size-1].date;
  blogBody.innerHTML= blogs[size-1].body;

  blogs.forEach(blog => {
      let otherBlogsContainer = document.getElementById('otherBlogs');

      let blogItem = document.createElement('div');
      blogItem.setAttribute('class','blog-item');

      let blogHeader = document.createElement('h3');
      let headerText = document.createTextNode(`${blog.title}`);
      blogHeader.appendChild(headerText);

      let blogImage = document.createElement('img');
      blogImage.setAttribute('src',`${blog.imageURL}`);
     
      let small = document.createElement('small');
      let smallText = document.createTextNode('Read');
      small.appendChild(smallText);
      small.setAttribute('onclick',`readBlog('${blog.title}')`)

      blogItem.appendChild(blogHeader);
      blogItem.appendChild(blogImage);
      blogItem.appendChild(small);
      otherBlogsContainer.appendChild(blogItem);
      
  })
 }

 function readBlog(title){
    let blogtitle = document.getElementById('blogTitle');
    let blogimage = document.getElementById('blogImage');
    let blogowner = document.getElementById('blogOwner')
    let blogdate = document.getElementById('date');
    let blogContent = document.getElementById('blogBody');

     blogs.forEach(blog =>{
         if(blog.title == title){
              blogtitle.innerHTML = blog.title;
              blogimage.src = blog.imageURL;
              blogowner.innerHTML = ' by '+blog.owner;
              blogdate.innerHTML = blog.date;
              blogContent.innerHTML = blog.body;
              $(window).scrollTop(0); 
         }
     })
 }

 function listBlogs(){
     $(()=>{ $('#loader').css('display','none')})
    let index = 1; 
    blogs.forEach(blog => {
         let table = document.getElementById('listblogs');
        let tr = document.createElement('tr');
        let indexTd = document.createElement('td');
        let indexText = document.createTextNode(`${index}`);
        indexTd.appendChild(indexText);

        let titleTd = document.createElement('td');
        let titleText = document.createTextNode(`${blog.title}`);
        titleTd.appendChild(titleText);

        let ownerTd = document.createElement('td');
        let ownerText = document.createTextNode(`${blog.owner}`);
        ownerTd.appendChild(ownerText);

        let dateTd = document.createElement('td');
        let dateText = document.createTextNode(`${blog.date}`);
        dateTd.appendChild(dateText);

        let commentTd = document.createElement('td');
        commentIcon = document.createElement('img');
        commentIcon.setAttribute('src','../assetes/icons/comments-solid.svg');
        commentTd.appendChild(commentIcon);
        commentTd.setAttribute('onclick',`triggerReadCommentsModal('open','${blog.blogId}')`)
        
        let editTd = document.createElement('td');
        let editIcon = document.createElement('img');
        editIcon.setAttribute('src','../assetes/icons/pen-solid.svg');
        editTd.appendChild(editIcon);
        editTd.setAttribute('onclick',`triggerEditBlogModal('open','${blog.blogId}')`)

        let deleteTd = document.createElement('td');
        let deleteIcon = document.createElement('img');
        deleteIcon.setAttribute('src','../assetes/icons/trash-alt-regular.svg');
        deleteTd.appendChild(deleteIcon);
        
       tr.appendChild(indexTd);
       tr.appendChild(titleTd);
       tr.appendChild(ownerTd);
       tr.appendChild(dateTd);
       tr.appendChild(commentTd);
       tr.appendChild(editTd);
       tr.appendChild(deleteTd);
       table.appendChild(tr);
        console.log(index);
       index++;

     })
     
 }

 
let newBlogImage="";
function getNewBlogImage(event){
   if(event.target.files[0] != null){
       newBlogImage = event.target.files[0];
   }
} 
function updateBlog(){
    let blogId = document.getElementById('blogId').value;
    let blogHeader = document.getElementById('blogHeader').innerHTML;
    let blogContent = document.getElementById('blogContent').innerHTML;
    
    let successToaster =  document.getElementById('successToaster')
    let successMessage = document.getElementById('successMessage');

    
    successToaster.classList.toggle('active');
    successMessage.innerHTML = "Updating blog.."

    if(newBlogImage != ""){
        storage.ref(`blogs/${blogId}/blogImage.jpg`).put(newBlogImage)
    }
    db.collection('blogs').doc(blogId).update({
        title: blogHeader,
        blogBody: blogContent
    })
    .then(() => {
       successMessage.innerHTML = "Blog updted"
        setTimeout(()=>{
            successToaster.classList.remove('active')
        },3000)
        retreiveBlogs()
    })
    .catch(function(error) {
        // The document probably doesn't exist.
       alert("Error updating document: ", error);
    });
    
}

var inquiriesArr =[];
function getInquiries(){
   
  db.collection('inquiries').get().then((inquiries)=>{
        inquiries.forEach((query)=>{
            inquiriesArr.push({
                person: query.data().name,
                email: query.data().email,
                date: query.data().date,
                time: query.data().time,
                message: query.data().inquiry
            })
        })
    }).catch(error=> alert(error))
}
getInquiries();

function displayEquiries(){
    
   let itemsContainer =document.getElementById('notification-items-container');
   document.getElementById('inquiryLoader').setAttribute('hidden',true);
   inquiriesArr.forEach((element)=>{
       itemsContainer.innerHTML+=`
       <div class="notification-item">
       <p><i class="fa fa-envelope nav-icon" aria-hidden="true"></i>
           <span class="note-title">${element.person}   <a target="_blank" href = "mailto: ${element.email}"> ${element.email}</a></span> 
            ${element.message}
           <small>2${element.time}    ${element.date}</small></p>
       <input type="checkbox" name="" id="" class="checkbox" >
   </div>
       `
   })
  
   
}

function onSendComment(){
    let user = auth.currentUser;
    let commentText = document.getElementById('commentText').value;
    let commDate = date;
    let commTime = time;
    let blogId = document.getElementById('blogId').value;
    

    successToaster.classList.toggle('active');
    successMessage.innerHTML = "Sending..."
    db.collection('comments').doc().set({
        commenter: user.uid,
        comment: commentText,
        date: commDate,
        time: commTime,
        blogId: blogId
    }).then(()=>{
         successMessage.innerHTML="Comment sent.";
         setTimeout(()=>{
             successToaster.classList.remove('active');
         })
    })
    .catch((err)=>{
        alert(err)
    })
}

function fetchComments(blogId){
//  alert("Hello"+blogId)
  let commentTable = document.getElementById('commentsTable');
//   let commentRows = "";  
  db.collection('comments').doc().where("blogId", "==", `${blogId}`).get().then((comments)=>{
      comments.forEach((com)=>{
          db.collection('profiles').doc(com.commenter).get().then((commenter)=>{
            commentTable.innerHTML+=`
              <tr>
              <td>${commenter.Names}</td>
              <td>${com.comment}</td>
              <td>${com.time}  ${com.date}</td>
              <td><img src="../assetes/icons/trash-alt-regular.svg" alt="trash icon"></td>
          </tr>
              `
          }).catch((profileError)=>{
              alert("ProfileError: "+profileError)
          })
      })
  }).catch((commentError)=>{
    //   alert("CommentError: "+commentError)
  })

//   commentTable.appendChild(commentRows);
}

setTimeout(()=>{
    displayEquiries()
},7000)