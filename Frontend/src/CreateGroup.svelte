<script>
  import { navigateTo } from "svelte-router-spa";
  import { socket, isLogin } from "./store";
  import axios from "axios";
  import { onMount } from "svelte";
  let grpName;

  let img;
  let loginStatus = "";
  let users=[]
  // onMount(async () => {
  //   const option = {
  //     method: "get",
  //     headers: {
  //       "Content-Type": "application/json;charset=UTF-8",
  //       Authorization: "brearer " + localStorage.getItem("userToken")
  //     },
  //     mode: "cors"
  //   };
  //   let allUsers = await fetch("http://localhost:3301/api/allUser", option);
  //   let jsonData = await allUsers.json();
  //    console.table("data is" + JSON.stringify(jsonData));
  //    users=jsonData.allUsers
  // });

  function img_base64(event) {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    alert(JSON.stringify(formData));
    axios
      .post("http://localhost:3301/upload", formData, {
        onUploadProgress: progressEvent => {
          if (!isNaN((progressEvent.loaded / progressEvent.total) * 100)) {
            console.log(
              "Upload progress :" +
                Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                "%"
            );
          }
        }
      })
      .then(res => {
        alert(JSON.stringify(res.data));
        if (res.data.uploadStatus == "success") {
          img = "http://localhost:3301/" + res.data.imgName;
        }
      });
  }

  const postGroupFn = async () => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        groupName: grpName,
       userId: localStorage.getItem("userId"),
        groupImg: img
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
      // localStorage.setItem("userId", groupSt.userId);
  
      // isLogin.set(true);
      // navigateTo("/dashboard");
    } else {
      loginStatus = "Invalid  Login";
    }
  };
</script>

<center>

  <div class="container">
    <h3>Create mbfvs Group</h3>
    <br />
<!-- {JSON.stringify(users)} -->
    <div style="color:red">{loginStatus}</div>

    <label for="GroupName" />
    <input
      name="GroupName"
      type="text"
      on:input={event => {
        grpName = event.target.value;
      }} />
 
    <br />
    <br />
    <label for="profile_img" />
    <input name="profile_img" type="file" on:input={img_base64} />
    <br />
    <br />

    <!-- {img} -->
    <img src={img} alt="krnj" style="height:150px;width:150px" />
       <!-- <select class="custom-select" id="inputGroupSelect01">
      
                   <option selected>Choose...</option>

              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
                </select> -->
               
    <button on:click={postGroupFn}>Create Group</button>

  </div>
</center>
