'use strict';

var app = angular.module('app',["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
    	templateUrl: 'static/views/login.html',
        controller:	'ctrlLogin',
        controllerAs: 'ctrlLogin'
    })
     .when("/register", {
    	templateUrl: 'static/views/Register.html',
        controller:	'ctrlRegister',
        controllerAs: 'ctrlRegister'
    })
    .when("/admin", {
    	templateUrl: 'static/views/Admin.html',
        controller:	'ctrlAdmin',
        controllerAs: 'ctrlAdmin'
    })
    .when("/comment", {
    	templateUrl: 'static/views/Comments.html',
        controller:	'ctrlComment',
        controllerAs: 'ctrlComment'
    })
    .when("/posts", {
    	templateUrl: 'static/views/Posts.html',
        controller:	'ctrlPost',
        controllerAs: 'ctrlPost'
    });
});


