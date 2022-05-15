const express = require("express");
const fs = require('fs')
const path = require('path')

let notes = require("../utils/notes").reverse(); // Takes the notes fromt the notes.js
												// and reverses it so it is newest first
const todaysHash = require("../utils/utils");

const router = express.Router(); // Initialising the router of the app

function write(){
	/* Dumps the notes to the notes.json file */
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
	res.render('enter');
})
.post((req, res) => {
	notes.push({ ...req.body, ...todaysHash }); // Pushes an object containing
												// 1. The request body
												// 2. The hashing corresponding to the date 
	write();
	res.redirect('/')
})

router.get('/delete/:id', (req, res) => {
	notes = notes.filter((element) => {
		return req.params.id !== element.hash
	}) // Removes the element from the notes array
	write()
	res.redirect('/')
})

router
.route('/edit/:id')
.get((req, res) => {
	res.render('enter', {
		inputVvalue: notes.filter(element => {
						return element.hash === req.params.id
					})[0].title, // Replaces the title
		textAreaValue: notes.filter(element => {
						return element.hash === req.params.id
					})[0].details // Replaces the details
	})
})

module.exports = router;
