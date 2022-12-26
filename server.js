import express from "express"
const app = express()

app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

import mongoose from "mongoose"
import Document from "./models/Document.js"


try {
    mongoose.connect("mongodb+srv://Cluster54712:cllsclhIVHRc@cluster54712.encknda.mongodb.net/wastebin?retryWrites=true&w=majority/", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, () => console.log(" Mongoose is connected")
    )

} catch (e) {
    console.log("could not connect");
}


app.get("/", (req, res) => {
    const code = `Welcome to WasteBin!
Use the commands in the top right corner
to create a new file to share with others.`
    res.render('code-display', { code, language: 'plaintext' })
})

app.get("/new", (req, res) => {
    res.render("new")
})


app.post("/save", async (req, res) => {
    const value = req.body.value
    try {
        const document = await Document.create({ value })
        res.redirect(`/${document.id}`)
    } catch (e) {
        res.render("new", { value })
    }
})

app.get("/:id/duplicate", async (req, res) => {
    const id = req.params.id
    try {
        const document = await Document.findById(id)
        res.render("new", { value: document.value })
    } catch (e) {
        res.redirect(`/${id}`)
    }
})

app.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const document = await Document.findById(id)
        res.render("code-display", { code: document.value, id })
    } catch (e) {
        res.redirect("/")
    }
})


app.listen(process.env.PORT || 5004)
