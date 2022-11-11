import axios from 'axios';
import React,{useState,useEffect} from 'react'

function CustomersList() {
    const [data,setData]= useState([]);

    const fetchData= async ()=>{
        try{
            const {data,status} = await axios("http://localhost:5000/customers");
            status===200 && setData(data);
            console.log(data);
        }catch(err){
            console.log('error from  fetchdata client function:',err)
        }

    }
    useEffect(()=>{
        fetchData()
    },[]);
  return (
    <div>
       <h1> CustomersList </h1>
       {data.length>0 && data.map(({FIRST_NAME
},index)=>(
            <div key={index}><h1 >firstName :- 
            {FIRST_NAME
            }</h1></div>
       ))}
    </div>

  )
}

export default CustomersList