
var express = require('express');
var router = express.Router();

var Burger = require('../models/')["Burger"];
var Customer = require('../models/')["Customer"];


router.get('/', function(req,res) {

	res.redirect('/burgers')
});


router.get('/burgers', function(req,res) {

	Burger.findAll({include:{model: Customer}})

	.then(function(burger_data){
		console.log(burger_data);

		return res.render('index', {burger_data})
	})
});


router.post('/burgers/create', function(req, res) {

	Burger.create({burger_name: req.body.burger_name})

	.then(function(newBurger){

		console.log(newBurger);

		res.redirect('/');
	});
});


router.put('/burgers/update', function(req,res){

	Customer.create({customer: req.body.customer})
	.then(function(theCustomer){
		return Burger.findOne({where:{id: req.body.burger_id}})
		.then(function(theBurger){
			return theBurger.setCustomer(theCustomer)
			.then(function(){
				return theBurger.updateAttributes({
					devoured: true
				}).then(function(){
					return res.redirect('/');
				})
			})
		})
	})
})

module.exports = router;