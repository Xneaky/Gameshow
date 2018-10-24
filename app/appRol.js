'use strict';
var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('rolCtrl', function ($scope, $uibModal, $http) {
    $scope.roles = [];
    $scope.modulos = [];

    $scope.nuevoRol = function(size) {
        $scope.modalInstance = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'modalNuevoRol.html',
            controller: 'crearRolCtrl',
            size: size
        });
    };

    $scope.seleccionarRol = function(rol) {
        console.log("rol : " + JSON.stringify(rol));
        $scope.editarRol = angular.copy(rol);
        $scope.editarRol.modulos = ["4","3"];
        $scope.modalEditarRol = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'modalEditarRol.html',
            controller: 'editarRolCtrl'
        });
    };

    $scope.listarRoles = function() {
        $scope.roles = [];
        var consulta = {
            query:"select * from roles",
            method: "GET"
        }

        $http.post('../../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            $scope.roles = data;
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };

    $scope.listarRoles();

    $scope.listarModulos = function() {
        $scope.modulos = [];
        var consulta = {
            query:"select * from modulos",
            method: "GET"
        }

        $http.post('../../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            $scope.modulos = data;
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };

    $scope.listarModulos();

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

app.controller('crearRolCtrl', function ($scope, $http, $uibModal, $uibModalInstance, $window) {
    $scope.newRol = {};

    var administrarMensajeSweet = function(conf) {
        $window.swal({
            title: conf.titulo,
            text: conf.texto,
            type: conf.tipo,
            showCancelButton: false
        },
        function(isConfirm){
            if (isConfirm){
               $uibModalInstance.close();
            }
        });
    };

    $scope.guardar = function(newRol) {

        var stringQuery = "INSERT INTO roles (nombre_rol, modulos, descripcion_rol, activo) VALUES (" +
        "'" + newRol.nombre_rol + "'," +
        "'" + newRol.modulos + "'," +
        "'" + newRol.descripcion_rol + "', true)";

        var consulta = {
            query: stringQuery,
            method: "POST"
        }
        $http.post('../../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            if (response == "1") {
                $scope.listarRoles();
                administrarMensajeSweet({titulo:'Ról ingresado', tipo:'success', texto: ''});
            } else {
                administrarMensajeSweet({titulo:'Error al ingresar', tipo:'error', texto: ''});
            }
        }).error(function(){
            administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
        });
    };

    $scope.cerrarModal = function() {
        $uibModalInstance.close();
    };
});

app.controller('editarRolCtrl', function ($scope, $http, $uibModal, $uibModalInstance, $window) {

    var administrarMensajeSweet = function(conf) {
        $window.swal({
            title: conf.titulo,
            text: conf.texto,
            type: conf.tipo,
            showCancelButton: false
        },
        function(isConfirm){
            if (isConfirm){
                $uibModalInstance.close();
            }
        });
    };

    $scope.modificar = function(editarRol) {
        var stringQuery = "UPDATE roles set  " + 
        "nombre_rol = '" + editarRol.nombre_rol + "', " +
        "modulos = '" + editarRol.modulos + "', " +
        "descripcion_rol = '" + editarRol.descripcion_rol + "', " +
        "activo = '" + editarRol.activo + "' " +
        "where id_rol = '" + editarRol.id_rol + "'";
        var consulta = {
            query: stringQuery,
            method: "POST"
        }
        $http.post('../../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            console.log('stringQuery:' + JSON.stringify(stringQuery));
            if (response == "1") {
                $scope.listarRoles();
                administrarMensajeSweet({titulo:'Ról actualizado', tipo:'success', texto: ''});
            } else {
                administrarMensajeSweet({titulo:'Error al actualizar', tipo:'error', texto: ''});
            }
        }).error(function(){
            administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
        });
    };

    $scope.cerrarModal = function() {
        $uibModalInstance.close();
    };
});

app.directive('menuApp', function($parse) {

});
