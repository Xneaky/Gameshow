'use strict';
var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('jugadorCtrl', function ($scope, $uibModal, $http) {
    $scope.jugadores = [];

    $scope.nuevoJugador = function() {
        console.log('entrando');
        $scope.modalInstance = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'modalNuevoJugador.html',
            controller: 'crearJugadorCtrl'
        });
    };

    $scope.seleccionarJugador = function(jugador) {
        $scope.editarJugador = angular.copy(jugador);
        $scope.modaleditarJugador = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'modalEditarJugador.html',
            controller: 'editarJugadorCtrl'
        });
    };

    $scope.listarJugadores = function() {
        $scope.jugadores = [];
        var consulta = {
            query:"select * from jugadores",
            method: "GET"
        }

        $http.post('../../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            $scope.jugadores = data;
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };

    $scope.listarJugadores();

    $scope.cssEstado = function(activo) {
        var css = 'label-danger';
        if (activo == 1)
            css = 'label-info';
        return css;
    };

    $scope.etiquetaEstado = function(activo) {
        var etiqueta = 'Inactivo';
        if (activo == 1)
            etiqueta = 'Activo'
        return etiqueta;
    };

    console.log("jugadores");
});

app.controller('crearJugadorCtrl', function ($scope, $http, $uibModal, $uibModalInstance, $window) {
    $scope.newJugador = {};

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

    $scope.guardar = function(newJugador) {

        var stringQuery = "INSERT INTO jugadores (nombre_jugador, apellido_jugador, nickname_jugador, email, pwd_jugador, fecha_nacimiento, activo, team_codTeam, telefono_jugador) VALUES (" +
        "'" + newJugador.nombre_jugador + "'," +
        "'" + newJugador.apellido_jugador + "'," +
        "'" + newJugador.nickname_jugador + "'," +
        "'" + newJugador.email + "'," +
        "'" + newJugador.email + "'," +
        "'" + new Date(newJugador.fecha_nacimiento) + "', true, 0," +
            "'" + newJugador.telefono_jugador + "')";
        console.log("stringQuery : " + JSON.stringify(stringQuery));

        var consulta = {
            query: stringQuery,
            method: "POST"
        }
        $http.post('../../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            if (response == "1") {
                $scope.listarJugadores();
                administrarMensajeSweet({titulo:'Jugador ingresado', tipo:'success', texto: ''});
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

app.controller('editarJugadorCtrl', function ($scope, $http, $uibModal, $uibModalInstance, $window) {

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

    $scope.modificar = function(editarJugador) {
        var stringQuery = "UPDATE jugadores set  " + 
        "nombre_jugador = '" + editarJugador.nombre_jugador + "', " +
        "apellido_jugador = '" + editarJugador.apellido_jugador + "', " +
        "nickname_jugador = '" + editarJugador.nickname_jugador + "', " +
        "email = '" + editarJugador.email + "', " +
        "telefono_jugador = '" + editarJugador.telefono_jugador + "', " +
        "fecha_nacimiento = '" + editarJugador.fecha_nacimiento + "', " +
        "activo = '" + editarJugador.activo + "' " +
        "where codJugadores = " + editarJugador.codJugadores + "";
        var consulta = {
            query: stringQuery,
            method: "POST"
        }
        $http.post('../../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            console.log('stringQuery:' + JSON.stringify(stringQuery));
            if (response == "1") {
                $scope.listarJugadores();
                administrarMensajeSweet({titulo:'Jugador actualizado', tipo:'success', texto: ''});
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

angular
    .module('myApp')
