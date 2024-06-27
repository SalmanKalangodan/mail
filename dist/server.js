"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the 'express' module along with 'Request' and 'Response' types from express
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
// Create an Express application
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
// Specify the port number for the server
const port = 3000;
// Define a route for the root path ('/')
app.get('/', (req, res) => {
    // Send a response to the client
    res.send('Hello, TypeScript + Node.js + Express!');
});
app.post('/mail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body.data;
    if (!data) {
        return res.json({ message: 'data not give' });
    }
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'drivematesservices@gmail.com',
            pass: process.env.pass
        }
    });
    let mailOptions = {
        from: 'drivematesservices@gmail.com',
        to: 'salmanmuthu757@gmail.com',
        subject: 'Test Email from Node.js',
        text: 'This is a test email sent from a Node.js app!'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.json({ message: 'mail send' });
}));
// Start the server and listen on the specified port
app.listen(port, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${port}`);
});
