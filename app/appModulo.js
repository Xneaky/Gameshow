'use strict';
var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('moduloCtrl', function ($scope, $uibModal, $http) {
    $scope.modulos = [];

    $scope.listar = function() {
        var consulta = {
            query:"SELECT * FROM modulos",
            method: "GET"
        }

        $http.post('../../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            $scope.modulos = data;
            console.log('data:' + data.length);
            console.log('datos:' + JSON.stringify(data));
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };

    $scope.listar();

    $scope.cssEstado = function(activo) {
        var css = 'label-danger';
        if (activo) 
            css = 'label-info';
        return css;
    };

    $scope.etiquetaEstado = function(activo) {
        var etiqueta = 'Inactivo';
        if (activo) 
            etiqueta = 'Activo'
        return etiqueta;
    };
});

app.directive('menuApp', function($parse) {

});