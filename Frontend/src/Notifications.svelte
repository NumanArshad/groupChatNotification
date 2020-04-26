<script>
import {navigateTo} from "svelte-router-spa"
import {socket,unseenMessages,isLogin,activeGroup} from "./store"
import moment from "moment"
let unseen=[]
let activeGr;
activeGroup.subscribe((grp)=>activeGr=activeGroup)
unseenMessages.subscribe((uns)=>unseen=uns)

function openSelected_GroupChat(msg){
  // alert("is selected"+msg.myUnseenChat.recipentId+" grp is")
   socket.emit('active_group',{'userId':msg.myUnseenChat.recipentId,'groupName':msg.myUnseenChat.group.groupName})
     navigateTo("groupchat/"+msg.myUnseenChat.group.groupName)
}
function dashboardNav(){
   socket.emit('leaveGroup',{"userId":localStorage.getItem("userId"),"targetGroup":activeGr})
   activeGroup.set('')
    navigateTo('/dashboard')
}
function createGroupNav(){
  navigateTo('/newGroup')
}
function joinGroupNav(){
  navigateTo('/joinGroup')
}
function logoutUser(){
  socket.emit("disconnected"
,localStorage.getItem("userId"))
isLogin.set(false)
localStorage.clear();
}
</script>

<style>

.nav-pills .nav-link.active, .nav-pills .show > .nav-link{
  background-color: #17A2B8;
}
.dropdown-menu{
  top: 60px;
  right: 0px;
  left: unset;
  width: 460px;
  box-shadow: 0px 5px 7px -1px #c1c1c1;
  padding-bottom: 0px;
  padding: 0px;
}
.dropdown-menu:before{
  content: "";
  position: absolute;
  top: -20px;
  right: 12px;
  border:10px solid #343A40;
  border-color: transparent transparent #343A40 transparent;
}
.head{
  padding:5px 15px;
  border-radius: 3px 3px 0px 0px;
}
.footer{
  padding:5px 15px;
  border-radius: 0px 0px 3px 3px; 
}
.notification-box{
  padding: 10px 0px; 
  cursor:pointer
}
.bg-gray{
  background-color: #eee;
}
@media (max-width: 640px) {
    .dropdown-menu{
      top: 50px;
      left: -16px;  
      width: 290px;
    } 
    .nav{
      display: block;
    }
    .nav .nav-item,.nav .nav-item a{
      padding-left: 0px;
    }
    .message{
      font-size: 13px;
    }
}
</style>


 
      <div class="row">
        <div class="col-lg-12 ">
          <nav class="navbar navbar-expand-lg bg-info rounded">
            <!-- <a class="navbar-brand text-light" href="#">Logo</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button> -->

            <div class="collapse navbar-collapse" id="navbarSupportedContent" style="display: unset !important;">
              <ul class="nav nav-pills mr-auto justify-content-end">
                <li class="nav-item active" on:click={dashboardNav}>
                  <a class="nav-link text-light">Home <span class="sr-only">(current)</span></a>
                </li>
                 <li class="nav-item active" on:click={createGroupNav}>
                  <a class="nav-link text-light">Create group</a>
                </li>
                 <li class="nav-item active" on:click={joinGroupNav}>
                  <a class="nav-link text-light">Join group</a>
                </li>
              
                <li class="nav-item dropdown">
              
                  <a class="nav-link text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  
                    <i class="fa fa-bell">  <span class="badge badge-danger">{unseen.length}</span></i>
                  </a>
                    <ul class="dropdown-menu">
                      <li class="head text-light bg-dark">
                        <div class="row">
                          <div class="col-lg-12 col-sm-12 col-12">
                            <span>Notifications {unseen.length}</span>
                            <!-- <a href="" class="float-right text-light">Mark all as read</a> -->
                          </div>
                      </li>
                     {#each unseen as msg,index}
                        <!-- content here -->
                        {#if index%2==0}
                      <li class="notification-box"   on:click={()=>openSelected_GroupChat(msg)}>
                             <div class="row">
                              <div class="col-lg-3 col-sm-3 col-3 text-center">
                            <img src={msg.myUnseenChat.Sender.profile_img} class="w-50 rounded-circle">
                             </div>    
                          <div class="col-lg-8 col-sm-8 col-8">
                          
                            <strong class="text-info"> {msg.myUnseenChat.Sender.username} in {msg.myUnseenChat.group.groupName}</strong>
                            <div>
                            {msg.myUnseenChat.message} 
                            </div>
                            <small class="text-warning">
                            {moment(msg.myUnseenChat.createdOn).format('LLL')} </small>
                          </div>    
                         </div>
                        </li>
                        {:else}
                           <li class="notification-box bg-gray"   on:click={()=>openSelected_GroupChat(msg)}>
                        <div class="row">
                          <div class="col-lg-3 col-sm-3 col-3 text-center">
                            <img src={msg.myUnseenChat.Sender.profile_img} class="w-50 rounded-circle">
                          </div>    
                          <div class="col-lg-8 col-sm-8 col-8">
                          
                            <strong class="text-info"> {msg.myUnseenChat.Sender.username} in {msg.myUnseenChat.group.groupName}</strong>
                            <div>
                            {msg.myUnseenChat.message} 
                            </div>
                            <small class="text-warning">{moment(msg.myUnseenChat.createdOn).format('LLL')} </small>
                          </div>    
                        </div>
                         </li>
                        {/if}
                       
                     {/each}
                      
                      <!-- <li class="notification-box bg-gray">
                        <div class="row">
                          <div class="col-lg-3 col-sm-3 col-3 text-center">
                            <img src="/demo/man-profile.jpg" class="w-50 rounded-circle">
                          </div>    
                          <div class="col-lg-8 col-sm-8 col-8">
                            <strong class="text-info">David John</strong>
                            <div>
                              Lorem ipsum dolor sit amet, consectetur
                            </div>
                            <small class="text-warning">27.11.2015, 15:00</small>
                          </div>    
                        </div>
                      </li>
                      <li class="notification-box">
                        <div class="row">
                          <div class="col-lg-3 col-sm-3 col-3 text-center">
                            <img src="/demo/man-profile.jpg" class="w-50 rounded-circle">
                          </div>    
                          <div class="col-lg-8 col-sm-8 col-8">
                            <strong class="text-info">David John</strong>
                            <div>
                              Lorem ipsum dolor sit amet, consectetur
                            </div>
                            <small class="text-warning">27.11.2015, 15:00</small>
                          </div>    
                        </div>
                      </li>
                      <li class="footer bg-dark text-center">
                        <a href="" class="text-light">View All</a>
                      </li> -->
                    </ul>
                </li>
                  <li class="nav-item" on:click={logoutUser}>
                  <a class="nav-link text-light" href="#">Logout</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
 