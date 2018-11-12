'use strict';

var torneoCtrl = function($rootScope, $scope, $uibModal, $http) {
    $scope.nuevoTorneo = function() {
        $scope.modalInstance = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'torneos/modalNuevoTorneo.html',
            controller: crearTorneoCtrl
        });
    };

    $scope.infoTorneo = function(torneo) {
        $scope.infoTorneo = angular.copy(torneo);
        $scope.modalInfoTorneo = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'torneos/modalInfoTorneo.html',
            controller: infoTorneoCtrl
        });
    };

    $scope.seleccionarTorneo = function(torneo) {
        $scope.editarTorneo = angular.copy(torneo);
        $scope.modaleditarTorneo = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'torneos/modalEditarTorneo.html',
            controller: editarTorneoCtrl
        });
    };

    $scope.listarTorneos = function() {
        $scope.torneos = [];
        var consulta = {
            query:"select * from torneos",
            method: "GET"
        }

        $http.post('../apis/porcesaAPI.php', {
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
};

torneoCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http'];

var crearTorneoCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
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
                $scope.modalInstance.close();
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
        var stringQuery = "INSERT INTO torneos (Nombre, activo, tipo_torneo, num_participantes) VALUES (" +
        "'" + newTorneo.Nombre + "'," +
        "true," +
        "'" + newTorneo.tipo_torneo + "'," +
        "" + newTorneo.num_participantes + ")";

        var consulta = {
           query: stringQuery,
           method: "POST"
        }
        $http.post('../apis/porcesaAPI.php', {
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
        $scope.modalInstance.close();
    };
};

crearTorneoCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];

var editarTorneoCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
    var administrarMensajeSweet = function(conf) {
        $window.swal({
            title: conf.titulo,
            text: conf.texto,
            type: conf.tipo,
            showCancelButton: false
        },
        function(isConfirm){
            if (isConfirm){
                $scope.modaleditarTorneo.close();
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
        "activo = '" + editarTorneo.activo + "' " +
        "where codTorneo = " + editarTorneo.codTorneo + "";
        var consulta = {
            query: stringQuery,
            method: "POST"
        }
        $http.post('../apis/porcesaAPI.php', {
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
        $scope.modaleditarTorneo.close();
    };
};

editarTorneoCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];

var infoTorneoCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
    console.log('Informacion ' + JSON.stringify($rootScope.securityDataUser));
    var administrarMensajeSweet = function(conf) {
        $window.swal({
            title: conf.titulo,
            text: conf.texto,
            type: conf.tipo,
            showCancelButton: false
        },
        function(isConfirm){
            if (isConfirm){
                $scope.modalInfoTorneo.close();
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

    $scope.registrar = function(infoTorneo) {

        var stringQuery ="INSERT INTO participantes (torneos_codTorneo, team_codTeams) VALUES (" +
             + infoTorneo.codTorneo + "," +
            "" + $rootScope.securityDataUser.id_usuarios + ")";

        var consulta = {
            query: stringQuery,
            method: "POST"
        }
        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            if (response == "1") {
                $scope.listarTorneos();
                administrarMensajeSweet({titulo:'Se ha registrado exitosamente', tipo:'success', texto: ''});
                window.location.reload();
            } else {
                administrarMensajeSweet2({titulo:'Error al actualizar', tipo:'error', texto: ''});
                window.location.reload();
            }
        }).error(function(){
            administrarMensajeSweet2({titulo:'Error al enviar params', tipo:'error', texto: ''});
        });
    };

    $scope.cerrarModal = function() {
        $scope.modalInfoTorneo.close();
        window.location.reload();
    };
};

infoTorneoCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];

angular
    .module('myApp')
    .controller('torneoCtrl', torneoCtrl)
    .controller('crearTorneoCtrl', crearTorneoCtrl)
    .controller('editarTorneoCtrl', editarTorneoCtrl)
    .controller('infoTorneoCtrl', infoTorneoCtrl);