/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = angular.module('festivalapp', ['angular.filter', 'firebase', 'ngMap', 'ngStorage', 'ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                templateUrl: "dashboard.html"
            })
            .when("/login", {
                templateUrl: "login.html"
            })
            .when("/stages", {
                templateUrl: "stage-index.html"
            })
            .when("/map", {
                templateUrl: "map-index.html"
            })
            .when("/disclaimer", {
                templateUrl: "disclaimer-index.html"
            });
});


