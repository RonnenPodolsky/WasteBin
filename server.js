import dotenv from 'dotenv'
dotenv.config();

import express from "express"
const app = express()
import { documentsRouter } from './routes/documents.js'

import connectDB from './config/db.js'
connectDB();

app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use('/', documentsRouter)

app.listen(process.env.PORT || 5000)