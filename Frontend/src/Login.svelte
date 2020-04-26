<script>
import {navigateTo} from "svelte-router-spa";
import {socket,isLogin} from "./store"
let username;
let password;
let loginStatus='';
const loginFn = async()=>{
    const options = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  },
  body: JSON.stringify({
    username:username,
    password:password
  })
    }
    let response=await fetch("http://localhost:3301/api/signIn",options)
let loginInfo=await response.json()
if(loginInfo.signInStatus==='authorized'){
    
    localStorage.setItem("userToken",loginInfo.userDetail.token);
    localStorage.setItem("userId",loginInfo.userDetail.userId);
    isLogin.set(true)
   socket.emit("online",loginInfo.userDetail.userId)

   navigateTo('/dashboard')
    
}
else{
    loginStatus="Invalid  Login"
}
   
}
</script>
<center><div>
<h3>Login to Chat App</h3>
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
<button on:click={loginFn}>Login</button>

</div>
</center>