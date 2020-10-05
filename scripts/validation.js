function validateSingUpData(name,email,password,veripassword){
    let erroMessage = document.getElementById('errorMessage');
    if(name == ""){
      triggerError('name');
      erroMessage.innerHTML = "Name is requered";
      return true;
    }
    
     if(email == ""){
      triggerError('email');
      erroMessage.innerHTML = "Email is required";
      return true;
     }
    if(password == "" || password.length < 6){
      triggerError('password');
      erroMessage.innerHTML = "Password should be atleast 6 chars";
      return true;
    }
    if(password != veripassword){
        triggerError('veripassword');
        erroMessage.innerHTML = "Wrong password verification";
        return true;
    }
  }
  

  function validateName(){
    $(()=>{
      let erroMessage = document.getElementById('errorMessage');
      let name = document.getElementById('name').value;
      if(name == ""){
        triggerError('name');
        erroMessage.innerHTML = "Name is requered";
        disableSignUpField('name');
        return true;
      }
      else if(name.length < 2 || name.length > 30){
        triggerError('name');
        erroMessage.innerHTML = "Name should be between 2 - 30 characters";
        disableSignUpField('name');
        return true;
      }
    })
    
  }

  function validateEmail(){
    let erroMessage = document.getElementById('errorMessage');
    let email = document.getElementById('email').value;
  
    var atposition=email.indexOf("@");  
    var dotposition=email.lastIndexOf(".");  
     
    if((atposition>1 && dotposition>atposition+2)){
      $(()=>{
        if($(`#email`).hasClass('dangerField')){ 
          $(`#email`).removeClass('dangerField');
          hideErrorBox();
         
        }
        reEnableForm();
      })
     }

   if (atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length){  
      triggerError('email');
      erroMessage.innerHTML = "Enter a valid email";
      disableSignUpField('email');
      return true;  
     }  
}


function validatePassword(){
   let password = document.getElementById('password').value;
   let erroMessage = document.getElementById('errorMessage');

   if(password.length < 6){
    triggerError('password');
    erroMessage.innerHTML = "Password should be altealist 6 characters";
    disableSignUpField('password');
    return true;  
    
   }
}
function validatePasswordVeri(){
  let password = document.getElementById('password').value;
  let passwordveri = document.getElementById('veripassword').value;
  let erroMessage = document.getElementById('errorMessage');

  if(password != passwordveri){
   triggerError('veripassword');
   erroMessage.innerHTML = "Worng password verfication";
   disableSignUpField('veripassword');
   return true;  
   
  }
}

function resetField(fieldName){
  let fieldValue = document.getElementById(`${fieldName}`).value;
  if(fieldName == "name"){
    if(fieldValue.length > 2 && fieldValue.length < 30){
      $(()=>{
        if($(`#${fieldName}`).hasClass('dangerField')){
          $(`#${fieldName}`).removeClass('dangerField');
          hideErrorBox();
          reEnableForm();
        }
        
      })
    } 
  }
  else if(fieldName == "password"){
       let password = document.getElementById('password').value;
       if(password >=6){
        $(`#${fieldName}`).removeClass('dangerField');
        hideErrorBox();
        reEnableForm();
       }
   }
  else if(fieldName == "veripassword"){
    let password = document.getElementById('password');
    let verify = document.getElementById('veripassword');
    if(password.value == verify.value){
      $(`#${fieldName}`).removeClass('dangerField');
      hideErrorBox();
      reEnableForm();
    }
  }
 }

function hideErrorBox(){
$(()=>{
  $('#errorBox').removeClass('active');
})
}

function disableSignUpField(fieldId){
  var form = document.getElementById("signup-form");
  var elements = form.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
      elements[i].readOnly = true;
  }
  document.getElementById(`${fieldId}`).readOnly = false;
  let button = document.getElementById('btn');
  button.readOnly = true;
  button.style.background ="#e2b080"
  button.style.cursor = 'no-drop';
  $(()=>{
    $('#btn').attr('disabled','disabled');
   
})
  
}

function reEnableForm(){
  var form = document.getElementById("signup-form");
  var elements = form.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
      elements[i].readOnly = false;
  }
  let button = document.getElementById('btn');
  button.readOnly = false;
  button.style.background ="#ED994B"
  button.style.cursor = 'pointer';
  $(()=>{
    $('#btn').removeAttr("disabled");
   
})
}