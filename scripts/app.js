let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

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
              address: address
          }).then(()=>{
     }).catch()
 }
})
}

let blogImage = {};
let successToaster =  document.getElementById('successToaster')
let successMessage =  document.getElementById('successMessage')
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
            setTimeout(()=>{
                successToaster.classList.remove('active');
            },3000)
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
           
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            
            // blogs.push({
            //     title: doc.data().blogTitle,
            //     body: doc.data().blogBody,
            //     date: doc.data().date,
            //     owner: "",
            //     imageURL: ""
            // });

        });
        setTimeout(() => {
           displayBlog();
        }, 5000);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    }); 
   
}
retreiveBlogs();


function displayBlog(){
  let title = document.getElementById('blogTitle');
  let image = document.getElementById('blogImage');
  let owner = document.getElementById('blogOwner')
  let date = document.getElementById('date');
  let blogBody = document.getElementById('blogBody');

  let size = blogs.length;
  console.log(blogs)
  title.innerHTML = blogs[size-1].title;
  image.src = blogs[size-1].imageURL;
  owner.innerHTML = blogs[size-1].owner;
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
              blogowner.innerHTML = blog.owner;
              blogdate.innerHTML = blog.date;
              blogContent.innerHTML = blog.body;
              $(window).scrollTop(0); 
         }
     })
 }

 