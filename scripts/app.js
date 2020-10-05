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
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
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