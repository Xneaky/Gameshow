'use strict';
var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('usuarioCtrl', function ($scope, $uibModal, $http) {
    $scope.usuarios = [];
    $scope.roles = [];

    $scope.nuevoUsuario = function(size) {
        $scope.modalInstance = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'modalNuevoUsuario.html',
            controller: 'crearUsuarioCtrl',
            size: size
        });
    };

    $scope.seleccionarUsuario = function(usuario) {
        $scope.editarUsuario = angular.copy(usuario);
        $scope.modalEditarUsuario = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'modalEditarUsuario.html',
            controller: 'editarUsuarioCtrl',
            //size: size
        });
    };

    $scope.listarUsuarios = function() {
        $scope.usuarios = [];
        var consulta = {
            query:"select * from vt_usuarios",
            method: "GET"
        }

        $http.post('../../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            $scope.usuarios = data
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };

    $scope.listarUsuarios();

    $scope.listarRoles = function() {
        $scope.roles = [];
        var consulta = {
            query:"select * from roles",
            method: "GET"
        }

        $http.post('../../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            console.log('data:' + JSON.stringify(data));
            $scope.roles = data;
            console.log('$scope.roles:' + $scope.roles.length);
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };

    $scope.listarRoles();

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

app.controller('crearUsuarioCtrl', function ($scope, $http, $uibModal, $uibModalInstance, $window) {
    $scope.newUsuario = {};

    var administrarMensajeSweet = function(conf) {
        $window.swal({
            title: conf.titulo,
            text: conf.texto,
            type: conf.tipo,
            showCancelButton: false
        },
        function(isConfirm){
            if (isConfirm)
               $uibModalInstance.close();
        });
    };

    $scope.guardar = function(newUsuario) {

        var stringQuery = "INSERT INTO usuarios (id_rol, nombre_usuario, apellido_usuario, email, pwd_usuario, activo) VALUES " +
        "('" + newUsuario.id_rol + "'," +
        "'" + newUsuario.nombre_usuario + "'," +
        "'" + newUsuario.apellido_usuario + "'," +
        "'" + newUsuario.email + "'," +
        "'" + newUsuario.email + "', true)";

        var consulta = {
            query: stringQuery,
            method: "POST"
        }

        $http.post('../../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            if (response == "1") {
                $scope.listarUsuarios();
                administrarMensajeSweet({titulo:'Usuario ingresado', tipo:'success', texto: ''});
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

app.controller('editarUsuarioCtrl', function ($scope, $http, $uibModal, $uibModalInstance, $window) {

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

    $scope.modificar = function(editarUsuario) {
        var stringQuery = "UPDATE usuarios set  " +
        "id_rol = '" + editarUsuario.id_rol + "', " +
        "nombre_usuario = '" + editarUsuario.nombre_usuario + "', " +
        "apellido_usuario = '" + editarUsuario.apellido_usuario + "', " +
        "activo = '" + editarUsuario.activo + "' " +
        "where id_usuario = '" + editarUsuario.id_usuario + "'";

        var consulta = {
            query: stringQuery,
            method: "POST"
        }

        $http.post('../../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            if (response == "1") {
                $scope.listarUsuarios();
                administrarMensajeSweet({titulo:'Usuario actualizado', tipo:'success', texto: ''});
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
