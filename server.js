const express = require('express');
const app = express();
const PORT = 5000;
const odb = require('oracledb');
const cors = require('cors');

app.use(cors());

odb.outFormat= odb.OUT_FORMAT_OBJECT;

async function getConnected(req,res){
    try{
        const conn = await odb.getConnection({
            user:'HR',
            password:'123',
            connectString:'localhost/xe'
        });
        return conn;        
    }catch(err){
        console.log('errror from connection function',err)
    }
}


async function fetchDataCustomers(){
    try{
        const conn = await getConnected();
        const result =  await conn.execute('SELECT * FROM hr.customers');
        return result.rows;
    }catch(err){
            console.log('error from fetchDatafunction:',err);
    }


}

app.get('/',(req,res)=>{
    res.send('hello world !');
})
app.get('/customers',async (req,res)=>{
    try{
        const odbRes = await fetchDataCustomers();
        res.send(odbRes);
    }catch(err){
        console.log('error from /customers function :',err);
        res.send(`error from /customers function: ${err}`);
    }
})

app.listen(5000,()=>{console.log(`listen to port ${PORT}`)})