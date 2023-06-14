
const path = require('path');
const express = require('express')

const  app = express();

// const logger = (req,res,next)=>{
//     console.log('res')
//     next();
// }
// app.use(logger)
app.use(express.json());

app.use('/api',require('./routes/user'))

const port = process.env.port || 3000;

app.listen(port,()=> console.log(`running on port ${port}`))


