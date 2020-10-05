function onSendQuery(){
   let name = document.getElementById('name').value;
   let email = document.getElementById('name').value;
   let query = document.getElementById('query').value;
   
   if(name=="" || email == "" || query == ""){
    let erroMessage = document.getElementById('errorMessage');
    triggerError('form');
     erroMessage.innerHTML = "Error: The form may contain empty required fields";
     }
     else{
        document.getElementById('signUpToaster').classList.toggle('active');
         
     }
}