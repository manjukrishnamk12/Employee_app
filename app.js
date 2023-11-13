// Task1: initiate app and run server at 3000
    const mongoose = require('mongoose');
    const PORT = 3000;

    const express= require('express');
    const app =express();
    app.use(express.json());

    const path=require('path');
    app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 

    const EmpSchema = mongoose.Schema({
        name: String,
        position: String,
        location: String,
        salary: Number
    });
    const empData=mongoose.model('employeesdatas',EmpSchema);

    mongoose.connect('mongodb+srv://manjukrishnamk12:lkmnjuhduyr@cluster0.ugqsacu.mongodb.net/EmployeeDB?retryWrites=true&w=majority')
    .then(()=>{
        console.log('Connected to EmployeeDB');
    }).catch(()=>{
        console.error('Connection Failed');
    })
 

//Task 3 : write api with error handling and appropriate api mentioned in the TODO below
    //TODO: get data from db  using api '/api/employeelist'

    app.get('/api/employeelist', async(req, res) =>{
        try {
            const emp = await empData.find();
            res.status(200).json(emp);
        } catch (error) {
            res.status(404).json(error);
    }});

    //TODO: get single data from db  using api '/api/employeelist/:id'

    app.get('/api/employeelist/:id',async(req,res)=>{
        try {
            const id=req.params.id
            const emp = await empData.findById(id);
            res.status(200).json(emp);
        } catch(error) {
            res.status(404).json(error)
    }})

    //TODO: send data from db using api '/api/employeelist'
    //Request body format:{name:'',location:'',position:'',salary:''}
    
    app.post('/api/employeelist',async(req,res)=>{
        const inData = new empData({name: req.body.name,position: req.body.position,location: req.body.location,salary: req.body.salary}); 
        try{
            const emp = await inData.save();
            const data=await empData.find();
            res.status(200).json(data);
        } catch(error) {
            res.status(404).json(error);
    }});

    //TODO: delete a employee data from db by using api '/api/employeelist/:id'

    app.delete('/api/employeelist/:id',async(req,res)=>{
        try{
            const id = req.params.id;
            const emp=await empData.findByIdAndDelete(id);
            const data=await empData.find();
            res.json(data);
        }
        catch(error){
            res.status(404).json(error);        
    }});

    //TODO: Update  a employee data from db by using api '/api/employeelist'
    //Request body format:{name:'',location:'',position:'',salary:''}

    app.put('/api/employeelist',async(req,res)=>{
        try{
            const info=req.body;
            const emp= await empData.findOneAndUpdate({_id:info._id},info);
            const data=await empData.find();
            res.status(200).json(data);
        } catch(error) {
            res.status(404).json(error);        
    }});

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));});
app.listen(PORT,()=>{console.log(`Server is now listening on port ${PORT}`)});


