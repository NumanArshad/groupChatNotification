<script>
import {routes} from "./routes";
import {Router} from "svelte-router-spa";
import  {onMount} from "svelte";
import {navigateTo} from "svelte-router-spa";
 import {userList,isLogin} from "./store";
import Notifications from "./Notifications.svelte"

const params={validCheck:true}
export let is_login;
isLogin.subscribe((state)=>{
  is_login=state
})
// onMount(async()=>{
//   // alert("hahah")
  
//     const option={
//         method:"get",
//     headers: {
    
//     'Content-Type': 'application/json;charset=UTF-8',
//     'Authorization':'brearer '+localStorage.getItem("userToken")
//   },
//    mode: 'cors',
//     }
//   let allUsers=await fetch("http://localhost:3301/api/allUser",option)
//  let jsonData=await allUsers.json()
 
// // userList.length===undefined?userList.set(jsonData.allUsers):null;
//  if(jsonData.tokenStatus==='invalid-token'){
//      localStorage.clear();
//         // alert("login")
//      navigateTo("/register");
  
//  }
//  else{
  
//  }
 

// })
</script>
{#if is_login===true}
<Notifications />
 <br />
<Router {routes} />
   <!-- content here -->
{:else}

 
<Router {routes} />
   <!-- else content here -->
{/if}


