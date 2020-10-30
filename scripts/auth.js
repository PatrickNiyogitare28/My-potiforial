let file = {};
let todayDate = new Date();
let theDate = todayDate.getFullYear()+'-'+(todayDate.getMonth()+1)+'-'+todayDate.getDate();

const addUser = ()=>{
    const signupForm = document.querySelector('#form');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const veripassword = document.getElementById('veripassword').value;
    const error = validateSingUpData(name,email,password,veripassword);
    if(!error){
        document.getElementById('signUpToaster').classList.toggle('active');
        auth.createUserWithEmailAndPassword(email,password).then(async authUser => {
            const user = auth.currentUser;
            if(user){
                const profileRef = db.collection('profiles').doc(`${user.uid}`);
                const doc = await profileRef.get();
                if (!doc.exists) {
                        profileRef.set({
                        Names: name,
                        email: email,
                        role: 'stdUser',
                        createdDate: theDate
                       
                }).then(()=>{
               
           }).catch(error => alert(error)) 
        }
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
function getUsers(){
    let usersTable = document.getElementById('usersTable');
    let index = 0;
    db.collection('profiles').get().then((users)=>{
      users.forEach((user)=>{
          index+=1;
          usersTable.innerHTML+=`
      <tr>
        
          <td>${index}</td>
          <td>${user.data().Names}</td>
          <td>${user.data().email}</td>
          <td>${user.data().createdDate}</td>
          <td class="offline">Offline</td>
          <td onclick="triggerUpdateUserModal('${user.id}')" id="myBtn" class="action-edit">
             <img src="../assetes/icons/pen-solid.svg" alt="pen icon">
          </td>
          <td class="action-delete">
             <img src="../assetes/icons/trash-alt-regular.svg" alt="trash icon">
          </td>
       </tr>
          `
      })
    })
}
getUsers();

