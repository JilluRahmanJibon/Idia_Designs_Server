import express, { Application } from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
 

const app:Application =express()



// parser 
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Idia_Designs server is running...")
})


// application routes 
app.use("/api/v1",router)

// global error handler 
app.use(globalErrorHandler);

export default  app