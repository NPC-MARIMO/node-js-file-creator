 const express = require('express')
 const path = require('path')
 const fs = require('fs')
 const app = express()
 const port = 3000
 

 app.use(express.json())
 app.use(express.urlencoded({extended : true}))

 app.set('view engine', 'ejs')

 app.use(express.static(path.join(__dirname, 'public')))

 app.get('/', (req, res) => {
    fs.readdir(`./files` , (err , files) => {
        res.render('index',{files : files})
    } )
 })

 app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('-')}.txt`, req.body.details , (err) => {
        res.redirect('/')
    })
 })
 app.get('/file/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err , data) => {
        res.render('show' , {filename : req.params.filename , data : data})
    })
 })

 app.listen(port , () => {
   console.log(`Example app listening on port ${port}`)
 })