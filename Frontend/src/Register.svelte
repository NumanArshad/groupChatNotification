<script>
import {navigateTo} from "svelte-router-spa";
import {socket,isLogin} from "./store"
import axios from "axios"
let username;
let password;
let img;
let loginStatus='';

function img_base64(event){
const formData = new FormData();
    formData.append('file', event.target.files[0])
    alert(JSON.stringify(formData))
    // this.props.handleupload(formData)
axios.post('http://localhost:3301/upload', formData,
      {
        onUploadProgress: progressEvent => {
 //   if(!isNaN(progressEvent.loaded/progressEvent.total*100)){
          console.log("Upload progress :" + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
          //this.setState({completed:Math.round(progressEvent.loaded/progressEvent.total*100)})
          //}

        }
      }).then
      (res => {
         alert(JSON.stringify(res.data))
        if(res.data.uploadStatus=="success"){
          
          img="http://localhost:3301/"+res.data.imgName
          
        }
      
        // this.setState({ columns: Object.keys(res.data.Alldata[0]), alldata: res.data.Alldata })
      })

// var file=event.target.files[0]
// var reader=new FileReader()
// if(file){
//   reader.onload=function(evt){
//     img=evt.target.result
//   }
// }
// reader.readAsDataURL(file)

}

const registerFn = async()=>{
    const options = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  },
  body: JSON.stringify({
    username:username,
    password:password,
    profile_img:img
  })
    }
    let response=await fetch("http://localhost:3301/api/registerUser",options)
let loginInfo=await response.json()
if(loginInfo.registerStatus==='created'){
    
    localStorage.setItem("userToken",loginInfo.userId);
//     localStorage.setItem("userId",loginInfo.userDetail.userId);
//     isLogin.set(true)
//    socket.emit("online",loginInfo.userDetail.userId)
isLogin.set(true)
   navigateTo('/dashboard')
    
}
else{
    loginStatus="Invalid  Login"
}
   
}
</script>
<center><div>
<h3>Register Chat App</h3>
<br />

<div style="color:red">{loginStatus}</div>

<label for="username"></label>
<input name="username" type="text" on:input={(event)=>{username=event.target.value}} />  
<br />
<br />
<label for="password"></label>
<input name="password" type="text" on:input={(event)=>{password=event.target.value}} /> 
<br />
<br />
<label for="profile_img"></label>
<input name="profile_img" type="file" on:input={img_base64}  /> 
<br />
<br />
<!-- {img} -->
<img src={img}  alt="krnj" style="height:150px;width:150px"/>
<button on:click={registerFn}>Register</button> 

</div>
</center>