<script>
  import { navigateTo } from "svelte-router-spa";
  import { socket, isLogin } from "./store";
  import axios from "axios";
  import { onMount } from "svelte";
  let grpName;

  let img;
  let loginStatus = "";
  let allGroups=[]
  function selectGroup(event){
      grpName=event.target.value
  }

  const  allgroupsFn=async()=>{
  const option = {
      method: "get",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      mode: "cors"
    };
    let allUsers = await fetch("http://localhost:3301/api/getGroupData", option);
    let jsonData = await allUsers.json();
     console.table("data is" + JSON.stringify(jsonData));
     if(jsonData.groupStatus=="GetSuccess"){
allGroups=jsonData.allGroups
     }
  }
  onMount(() => {
  allgroupsFn()
     
  });


  const postGroupFn = async () => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        groupName: grpName,
       userId: localStorage.getItem("userId")
      })
    };
    let response = await fetch(
      "http://localhost:3301/api/addInGroup",
      options
    );
    let groupSt = await response.json();
    alert(JSON.stringify(groupSt))
    if (groupSt.groupStatus == "Created") {
      alert("success")
    
    } else {
    
    }
  };

  const deleteWholeGroup=async()=>{
         const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        groupName: grpName,
    
      })
    };
    let response = await fetch(
      "http://localhost:3301/api/deleteGroup",
      options
    );
    let groupSt = await response.json();
    alert(JSON.stringify(groupSt))
    if (groupSt.groupStatus == "DeleteSuccess") {
      alert("success")
      allgroupsFn()
    
    } else {
    
    }
  }
</script>

<center>

  <div class="container">
    <h3>Join Group</h3>
    <br />
<!-- {JSON.stringify(users)} -->
    

    <label for="GroupName" />
   
<select class="custom-select" id="inputGroupSelect01" on:change={selectGroup}>
            <option selected>Choose...</option>
{#each allGroups as group}
     <!-- content here -->
     {#if localStorage.getItem("userId")!=group.userId}
      <option value={group.groupName} >{group.groupName}</option>
      {/if}
             
       
           
           
{/each}
            
                </select>
   
      
               
    <button on:click={postGroupFn}>Join Group</button>
    <button on:click={deleteWholeGroup}>delete Group</button>
  </div>
</center>
