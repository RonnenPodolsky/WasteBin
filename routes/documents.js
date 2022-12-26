import express from "express"
const router = express.Router();
import Document from "../models/Document.js"


router.get("/", (req, res) => {
    const code = `Welcome to WasteBin!
Use the commands in the top right corner
to create a new file to share with others.`
    res.render('code-display', { code, language: 'plaintext' })
})


router.get("/new", (req, res) => {
    res.render("new")
})


router.post("/save", async (req, res) => {
    const value = req.body.value
    try {
        const document = await Document.create({ value })
        res.redirect(`/${document.id}`)
    } catch (e) {
        res.render("new", { value })
    }
})

router.get("/:id/duplicate", async (req, res) => {
    const id = req.params.id
    try {
        const document = await Document.findById(id)
        res.render("new", { value: document.value })
    } catch (e) {
        res.redirect(`/${id}`)
    }
})

router.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const document = await Document.findById(id)
        res.render("code-display", { code: document.value, id })
    } catch (e) {
        res.redirect("/")
    }
})

export { router as documentsRouter }