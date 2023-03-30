import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [form,setForm] =useState({})

  const [users,setUsers]=useState([])
  
const handleForm=(e)=>{
  console.log(e.target.value,e.target.name)
  setForm({
    ...form ,
    [e.target.name] :e.target.value
    
    })


}

//fetching

const handleSubmit= async(e)=>{
  e.preventDefault()
 
  const res =await axios({
    method: 'post',
    url: "http://localhost:8080/full",
    data: form
    
  });
  console.log(res.data)

}

const getAllUsers =async ()=>{
   const res= await axios({
    method: 'get',
    url: "http://localhost:8080/full",
  
  });
  const doc=res.data
  setUsers(doc)
}

useEffect(()=>{
  getAllUsers()
},[users])

const handleDelete=(e)=>{
  const id=e.currentTarget.id
  axios({
    method: 'delete',
    url: `http://localhost:8080/full/${id}`,
    
  });
   

}

  return (


    <div className="App">
      <div>{JSON.stringify(form)}</div>
      <form onSubmit={handleSubmit}>
        <label>name</label>
        <input type={"text"} placeholder={"name"} name={"name"} onChange={handleForm}></input>
        <label>code</label>

        <input type={"text"} placeholder={"code"} name={"code"} onChange={handleForm}></input>

      <button type="submit">submit</button>
      </form>
      <div><ul>
        
        {users.map(user=>
          <li key={user._id}>{user.name},{user.code}
           <button id={user._id} onClick={handleDelete}>dlt</button>
           </li> 
         

        )}

        </ul></div>
    </div>
  );
}

export default App;
