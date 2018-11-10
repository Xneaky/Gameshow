'use strict';
var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('torneoCtrl', function ($scope, $rootScope, $uibModal, $http) {

    //Verificando si ha iniciado sesion
    $http.post('../../apis/check_session.php', {
        data: {params:  ''}
    }).success(function(data){
        if (!data) {
            window.location = '../../index.html';
        } else {
            $scope.permisos = data[0]; 
            console.log($scope.permisos);
            $scope.listarTorneos();
        }
    }).error(function(){
        alert('Error al intentar enviar el query.');
    });

    $scope.destroySession = function  () {
        //Destruyendo la sesion
        $http.post('../../apis/destroy_session.php', {
            data: {params:  ''}
        }).success(function(data){
            if (data) {
                window.location = '../../index.html';
            }
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };

    $scope.nuevoTorneo = function() {
        $scope.modalInstance = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'modalNuevoTorneo.html',
            controller: 'crearTorneoCtrl'
        });
    };

    $scope.infoTorneo = function(torneo) {
        $scope.infoTorneo = angular.copy(torneo);
        $scope.modalInfoTorneo = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'modalInfoTorneo.html',
            controller: 'infoTorneoCtrl'
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
});

app.controller('infoTorneoCtrl', function ($scope, $http, $uibModal, $uibModalInstance, $window) {

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

    $scope.registrar = function(infoTorneo, user) {

        var stringQuery ="INSERT INTO participantes (torneos_codTorneo, team_codTeams) VALUES (" +
             + infoTorneo.codTorneo + "," +
            "" + user.id_usuarios + ")";

        var consulta = {
            query: stringQuery,
            method: "POST"
        }
        $http.post('../../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            if (response == "1") {
                $scope.listarTorneos();
                administrarMensajeSweet({titulo:'Se ha registrado exitosamente', tipo:'success', texto: ''});
            } else {
                administrarMensajeSweet({titulo:'Error al actualizar', tipo:'error', texto: ''});
            }
        }).error(function(){
            administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
        });
    };

    $scope.cerrarModal = function() {
        $uibModalInstance.close();
        window.location.reload();
    };
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

    $scope.guardar = function(newTorneo) {
        if (!newTorneo.Nombre) {
            administrarMensajeSweet2({titulo:'El nombre no puede quedar vacio', tipo:'error', texto: ''});
            return false;
        }
        if (!newTorneo.tipo_torneo || newTorneo.tipo_torneo == "") {
            administrarMensajeSweet2({titulo:'Seleccione tipo de torneo', tipo:'error', texto: ''});
            return false;
        }
        if (isNaN(newTorneo.num_participantes)) {
            administrarMensajeSweet2({titulo:'Ingrese numero de participantes', tipo:'error', texto: ''});
            return false;
        }
        if (newTorneo.num_participantes > 64) {
            administrarMensajeSweet2({titulo:'El numero de participantes no debe ser mayor a 64', tipo:'error', texto: ''});
            return false;
        }
        if (newTorneo.num_participantes < 1) {
            administrarMensajeSweet2({titulo:'Ingrese numero de participantes', tipo:'error', texto: ''});
            return false;
        }
        var stringQuery = "INSERT INTO torneos (Nombre, activo, tipo_torneo, num_participantes,descripcion) VALUES (" +
        "'" + newTorneo.Nombre + "'," +
        "true," +
        "'" + newTorneo.tipo_torneo + "'," +
        "" + newTorneo.num_participantes + "," +
        "" + newTorneo.descripcion + ")";

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

    $scope.modificar = function(editarTorneo) {
        if (!editarTorneo.Nombre) {
            administrarMensajeSweet2({titulo:'El nombre no puede quedar vacio', tipo:'error', texto: ''});
            return false;
        }
        if (editarTorneo.tipo_torneo == "") {
            administrarMensajeSweet2({titulo:'Seleccione tipo de torneo', tipo:'error', texto: ''});
            return false;
        }
        if (isNaN(editarTorneo.num_participantes)) {
            administrarMensajeSweet2({titulo:'Ingrese numero de participantes', tipo:'error', texto: ''});
            return false;
        }
        if (editarTorneo.num_participantes > 64) {
            administrarMensajeSweet2({titulo:'El numero de participantes no debe ser mayor a 64', tipo:'error', texto: ''});
            return false;
        }
        if (editarTorneo.num_participantes < 1) {
            administrarMensajeSweet2({titulo:'Ingrese numero de participantes', tipo:'error', texto: ''});
            return false;
        }
        var stringQuery = "UPDATE torneos set  " + 
        "Nombre = '" + editarTorneo.Nombre + "', " +
        "tipo_torneo = '" + editarTorneo.tipo_torneo + "', " +
        "num_participantes = '" + editarTorneo.num_participantes + "', " +
        "descripcion = '" + editarTorneo.descripcion + "', " +
        "activo = '" + editarTorneo.activo + "' " +
        "where codTorneo = " + editarTorneo.codTorneo + "";
        var consulta = {
            query: stringQuery,
            method: "POST"
        }
        $http.post('../../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
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