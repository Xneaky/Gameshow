'use strict';
var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('torneoCtrl', function ($scope, $uibModal, $http) {
    $scope.jugadores = [];

    $scope.nuevoTorneo = function() {
        console.log('entrando');
        $scope.modalInstance = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'modalNuevoTorneo.html',
            controller: 'crearTorneoCtrl'
        });
    };

    $scope.seleccionarTorneo = function(torneo) {
        $scope.editarTorneo = angular.copy(torneo);
        $scope.modaleditarTorneo = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'modalEditarTorneo.html',
            controller: 'editarTorneoCtrl'
        });
    };

    $scope.listarTorneos = function() {
        $scope.torneos = [];
        var consulta = {
            query:"select * from torneos",
            method: "GET"
        }

        $http.post('../../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            $scope.torneos = data;
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };

    $scope.listarTorneos();

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

    console.log("torneos");
});

app.controller('crearTorneoCtrl', function ($scope, $http, $uibModal, $uibModalInstance, $window) {
    $scope.newTorneo = {};
    $scope.numeroParticipantes = [];
    for (var i = 1; i < 65; i++) { 
        $scope.numeroParticipantes.push(i);
    }
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

    $scope.guardar = function(newTorneo) {

        var stringQuery = "INSERT INTO torneos (Nombre, activo, tipo_torneo, num_participantes) VALUES (" +
        "'" + newTorneo.Nombre + "'," +
        "true," +
        "'" + newTorneo.tipo_torneo + "'," +
        "" + newTorneo.num_participantes + ")";

        console.log("stringQuery : " + JSON.stringify(stringQuery));

       var consulta = {
           query: stringQuery,
           method: "POST"
       }
       $http.post('../../apis/porcesaAPI.php', {
           data: {params:  consulta}
       }).success(function(response){
           if (response == "1") {
               $scope.listarTorneos();
               administrarMensajeSweet({titulo:'Torneo ingresado', tipo:'success', texto: ''});
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

app.controller('editarTorneoCtrl', function ($scope, $http, $uibModal, $uibModalInstance, $window) {

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

    $scope.modificar = function(editarTorneo) {
        var stringQuery = "UPDATE torneos set  " + 
        "Nombre = '" + editarTorneo.Nombre + "', " +
        "tipo_torneo = '" + editarTorneo.tipo_torneo + "', " +
        "num_participantes = '" + editarTorneo.num_participantes + "', " +
        "activo = '" + editarTorneo.activo + "' " +
        "where codTorneo = " + editarTorneo.codTorneo + "";
        var consulta = {
            query: stringQuery,
            method: "POST"
        }
        $http.post('../../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            console.log('stringQuery:' + JSON.stringify(stringQuery));
            if (response == "1") {
                $scope.listarTorneos();
                administrarMensajeSweet({titulo:'Torneo actualizado', tipo:'success', texto: ''});
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