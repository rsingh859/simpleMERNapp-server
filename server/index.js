import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRouter from './routes/posts.js';
dotenv.config();
const app = express();



//Setting up Body-parser and cors
app.use(bodyParser.json({ limit : "30mb", extended: "true"}));
app.use(bodyParser.urlencoded({ limit : "30mb", extended: "true"}));
app.use(cors());

app.use('/posts', postRouter);

const PORT = process.env.PORT || 4000;

//Connect to the DB
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(process.env.PORT, () => console.log(`Server up and running at port: ${PORT}`)))
.catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false);
