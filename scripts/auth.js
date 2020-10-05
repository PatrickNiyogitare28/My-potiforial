let file = {};
const addUser = ()=>{
    const signupForm = document.querySelector('#form');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const veripassword = document.getElementById('veripassword').value;
    const error = validateSingUpData(name,email,password,veripassword);
    if(!error){
        document.getElementById('signUpToaster').classList.toggle('active');
        auth.createUserWithEmailAndPassword(email,password).then(authUser => {
            const user = auth.currentUser;
            if(user){
               user.updateProfile({
                        displayName: name
                    }).then((result)=>{
                        console.log(result);
                        signupForm.reset();
                        window.location.href="../html/singin.html";
                    }).catch((err)=>{
                        alert(err)
                    })
                
            }
        }) .catch(error => {
            alert(error);
        })
    } 
    
}

function singUpUser(){
    const signupForm = document.querySelector('#form');
    try{
        db.collection('users').add({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            role: 'std-user'
        })
       signupForm.reset();
       window.location.href="../html/singin.html";
     }
    catch(error){
        alert("Error occured! "+error);
    }
}

function getUsers(){
    var docRef = db.collection("users");
    docRef.get().then((doc) => {
     console.log(doc)  
    }).catch((error)  =>{
        console.log("Error getting document:", error);
    });
}

function loginUser(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    document.getElementById('errorBox').classList.remove('active');
    document.getElementById('signInToaster').classList.toggle('active');
    auth.signInWithEmailAndPassword(email,password).then(cred => {
        console.log(cred.user);
        window.location.href = "../html/admin-dashboard.html";
    })
    .catch(error => {
       document.getElementById('signInToaster').classList.remove('active'); 
       document.getElementById('errorBox').classList.toggle('active');
       document.getElementById('errorMessage').innerHTML="Invalid Email or Password";
    })

}

function singOut(){
auth.signOut().then(()=>{
     window.location.href = "../index.html";
 })
}


function uploadProfileImage(event){
    if(event.target.files[0] != null){
        file = event.target.files[0];
        alert("Your profile image was uploaded");
    }
}


function triggerError(dangerInput){
  $(()=>{
         $('#errorBox').addClass('active');
         $(`#${dangerInput}`).addClass('dangerField');
    })
}

function resetSingInForm(){
   $(()=>{
        $('#errorBox').removeClass('active'); 
    })
}



