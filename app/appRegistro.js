'use strict';
var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('loginCtrl', function ($scope, $uibModal, $http, $window) {

    $scope.nuevoUsuario = function(size) {
        $scope.modalInstance = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'views/usuarios/modalRegistroUsuario.html',
            controller: 'crearUsuarioCtrl',
            size: size
        });
    };

    var administrarMensajeSweet2 = function(conf) {
        $window.swal({
            title: conf.titulo,
            text: conf.texto,
            type: conf.tipo,
            showCancelButton: false
        },
        function(isConfirm){
            //Se cierra automaticamente
        });
    };

    $scope.loggin = function(user) {
        var iinn = "select * from usuarios where activo = 1 and email = '" + user.email + "' and pwd = '" + user.pwd + "'"
        var consulta = {
            query: iinn,
            method: "GET"
        }

        $http.post('apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            if (data.length == 0) {
                administrarMensajeSweet2({titulo:'Usuario y contraseña incorrecto', tipo:'error', texto: ''});
            } else {
                $http.post('apis/data_session.php', {
                    sesion: {params:  data}
                }).success(function(result){
                    if (result[0].id_rol == 3) {
                        window.location = 'views/torneos/torneosJugador.html';
                    } else {
                        window.location = 'views/torneos/torneos.html';
                    }
                }).error(function(){
                    alert('Error al intentar enviar el query.');
                });
            }
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    }
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

        var stringQuery = "INSERT INTO usuarios (id_rol, nombre, apellido, email, username, pwd, activo) VALUES " +
            "('3'," +
            "'" + newUsuario.nombre_usuario + "'," +
            "'" + newUsuario.apellido_usuario + "'," +
            "'" + newUsuario.email + "'," +
            "'" + newUsuario.username + "'," +
            "'" + newUsuario.pwd + "', true)";

        var consulta = {
            query: stringQuery,
            method: "POST"
        }

        $http.post('apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            if (response == "1") {
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

app.directive('menuApp', function($parse) {

});
