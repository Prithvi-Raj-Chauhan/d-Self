const express = require("express");
let notes = require("../utils/notes").reverse();
const fs = require('fs')
const path = require('path')
const todaysHash = require("../utils/utils");

const router = express.Router();

function write(){
	fs.writeFileSync(
		path.join(__dirname, '../data/notes.json'), JSON.stringify({'notes': notes})
		)
}

router.get("/", (req, res) => {
	  res.render('home', {
		  notes: notes,
		  customstyle: `<link rel="stylesheet" href="style.css">`
	  });
});

router.route('/enter')
.get((req, res) => {
	res.render('enter')
})
.post((req, res) => {
	notes.push({ ...req.body, ...todaysHash })
	write()
	res.redirect('/')
})

router.get('/delete/:id', (req, res) => {
	console.log(req.params.id)
	notes = notes.filter((element) => {
		return req.params.id !== element.hash
	})
	write()
	console.log(notes)
	res.redirect('/')
})

router
.route('/edit/:id')
.get((req, res) => {
	res.render('enter', {
		inputVvalue: notes.filter(element => {
			return element.hash === req.params.id
		})[0].title,
		textAreaValue: notes.filter(element => {
			return element.hash === req.params.id
		})[0].details
	})
})

module.exports = router;
