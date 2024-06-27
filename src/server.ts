// Import the 'express' module along with 'Request' and 'Response' types from express
import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

// Create an Express application
const app = express();
app.use(express.json())
dotenv.config()
// Specify the port number for the server
const port: number = 3000;

// Define a route for the root path ('/')
app.get('/', (req: Request, res: Response) => {
  // Send a response to the client
  res.send('Hello, TypeScript + Node.js + Express!');
});

app.post('/mail' ,  async(req : Request , res : Response) => {

   const data : any = req.body.data

   if(!data) {
    return res.json({message : 'data not give'})
   }

   const transporter =  nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'drivematesservices@gmail.com',
        pass : process.env.pass
    }
   })

   type MailOptions= {
    from: string;
    to: string;
    subject: string;
    text: string;
}
   let mailOptions : MailOptions = {
    from: 'drivematesservices@gmail.com',
    to: 'salmanmuthu757@gmail.com',
    subject: 'Test Email from Node.js',
    text: 'This is a test email sent from a Node.js app!'
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });





    res.json({message : 'mail send'})
})

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});