'use strict';

var perfilCtrl = function($rootScope, $scope, $uibModal, $http) {

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
        var stringQuery = "UPDATE jugadores set  " +
            "nombre_jugador = '" + editarPerfil.nombre_jugador + "', " +
            "apellido_jugador = '" + editarPerfil.apellido_jugador + "', " +
            "nickname_jugador = '" + editarPerfil.nickname_jugador + "', " +
            "email = '" + editarPerfil.email + "', " +
            "telefono_jugador = '" + editarPerfil.telefono_jugador + "', " +
            "fecha_nacimiento = '" + editarPerfil.fecha_nacimiento + "', " +
            "pais_jugador = '" + editarPerfil.pais_jugador + "', " +
            "direccion = '" + editarPerfil.direccion + "' " +
            "where codJugadores = " + editarPerfil.jugadores_codJugadores + "";
        var consulta = {
            query: stringQuery,
            method: "POST"
        }
        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            console.log("consulta :" + JSON.stringify(consulta));
            if (response == "1") {
                administrarMensajeSweet({titulo:'Perfil actualizado', tipo:'success', texto: ''});
            } else {
                administrarMensajeSweet({titulo:'Error al actualizar', tipo:'error', texto: ''});
            }
        }).error(function(){
            administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
        });
    };

    $scope.cerrarModal = function() {
        $scope.modaleditarPerfil.close();
        window.location.reload();
    };
};

editarPerfilCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];

angular
    .module('myApp')
    .controller('perfilCtrl', perfilCtrl)
    .controller('editarPerfilCtrl', editarPerfilCtrl);
