import {writable} from "svelte/store"
import {navigateTo} from "svelte-router-spa"
export const socket=io.connect("http://localhost:3301")
export const isLogin=writable(false)
export const userList=writable([])
export const typingUser=writable('')
export const activeGroup=writable('')

 socket.on('fetchUserGroups', async function(data){
     
    userList.set([]);
     let dt=await data.allGroups
  alert(JSON.stringify(dt))
userList.set(dt);
})
socket.on('someone_offline', async function(data){
    // let dt=await data.allUsers
//  alert("someone"+dt.length)
userList.set(dt);
})

socket.on('typing',function(data){
   
    typingUser.set(data)
})

// socket.on('fetchgroupchat',function(data){
//    alert("message is"+data)
//     // typingUser.set(data)
// })

socket.on('logout', function(g){
    // alert("me logout")
    localStorage.clear()
   navigateTo("login")
})

export const messages_all=writable([])
socket.on('messages_all',function(data){
    messages_all.set(data)
})
export const unseenMessages=writable([])

socket.on('notification',function(data){
    // alert("notify data"+JSON.stringify(data))
    unseenMessages.set(data)
    
})

export const groupMembers=writable([])
socket.on('fetchgroupusers',function(data){
    // alert("group member is "+JSON.stringify(data))
    groupMembers.set(data)
})

export const GroupMessages=writable([])
socket.on('fetchgroupchat',function(data){
    // alert("message g droped by someone is "+JSON.stringify(data))
    GroupMessages.set(data)
})



