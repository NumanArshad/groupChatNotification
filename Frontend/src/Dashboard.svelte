<script>
import {Navigate,navigateTo} from "svelte-router-spa";
import {socket,userList,unseenMessages,isLogin,activeGroup} from "./store"
import {onMount} from "svelte"



let List=[];
function groupNav(user){
     socket.emit('active_group',{'userId':user.userId,'groupName':user.groupName})
     activeGroup.set(user.groupName)
     navigateTo("groupchat/"+user.groupName)
}
function send(){
//\\  alert(localStorage.getItem("userList").length)

socket.emit("disconnected"
,localStorage.getItem("userId"))
isLogin.set(false)
localStorage.clear();
}

function allbtn(){
     socket.emit("fetch_messages")
     navigateTo("all")
}
let unseen=[]
unseenMessages.subscribe((uns)=>unseen=uns)

userList.subscribe(list=>{
  
    List=list
})
</script>

<center><h3>My Dashboard </h3></center>

<ul>

{#each List as user}
<li>   <button on:click={()=>groupNav(user)}
  ><i>{user.groupName}</i>
  <br />
  </button> 

 </li>
{/each}
 
</ul>
    