'use strict';

var perfilCtrl = function($rootScope, $scope, $uibModal, $http) {
    $scope.roles = [];
    $scope.modulos = [];

    $scope.seleccionarPerfil = function(perfil) {
        $scope.editarPerfil = angular.copy(perfil);
        $scope.modaleditarPerfil = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: 'perfil/modalEditarPerfil.html',
            controller: editarPerfilCtrl
        });
    };

};

perfilCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http'];


var editarPerfilCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
    var administrarMensajeSweet = function(conf) {
        $window.swal({
                title: conf.titulo,
                text: conf.texto,
                type: conf.tipo,
                showCancelButton: false
            },
            function(isConfirm){
                if (isConfirm){
                    $scope.modaleditarPerfil.close();
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

    $scope.modificar = function(editarPerfil) {
        var stringQuery = "UPDATE torneos set  " +
            "Nombre = '" + editarTorneo.Nombre + "', " +
            "tipo_torneo = '" + editarTorneo.tipo_torneo + "', " +
            "num_participantes = '" + editarTorneo.num_participantes + "', " +
            "activo = '" + editarTorneo.activo + "', " +
            "descripcion = '" + editarTorneo.descripcion + "' " +
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
        $scope.modaleditarPerfil.close();
    };
};

editarPerfilCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];

angular
    .module('myApp')
    .controller('perfilCtrl', perfilCtrl)
    .controller('editarPerfilCtrl', editarPerfilCtrl);
