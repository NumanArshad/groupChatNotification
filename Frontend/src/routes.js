
// import {Router,Route,Link} from "svelte-routing";
import Dashboard from "./Dashboard.svelte"
//  import App from "./App.svelte"
import Login from "./Login.svelte"
//  import All from "./All.svelte"
import Group from "./Group.svelte"
// import Router from "svelte-spa-router"
import Register from "./Register.svelte"
import CreateGroup from "./CreateGroup.svelte"
import JoinGroup from "./JoinGroup.svelte"
const routes=[
    {name:'joinGroup',
    component:JoinGroup},
    {name:'newGroup',
    component:CreateGroup},
    {name:'register',
component:Register},
{name:'login',
component:Login},
   ,  {name:'dashboard',
   component:Dashboard},
//    ,  {name:'all',
//    component:All},
   {name:'groupChat/:grNm',
   component:Group},
    // '*':Post
]


export {routes}
