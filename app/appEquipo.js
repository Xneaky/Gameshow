'use strict';
//LoadModule rewrite_module modules/mod_rewrite.so

var equipoCtrl = function($rootScope, $scope, $uibModal, $http) {
    $scope.equipos = [];

    $scope.nuevoEquipo = function(size) {
        $scope.modalInstance = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: '../views/equipos/modalNuevoEquipo.html',
            controller: crearEquipoCtrl,
            size: size
        });
    };

    $scope.seleccionarEquipo = function(equipo) {
        $scope.editarEquipo = angular.copy(equipo);
        $scope.modalEditarEquipo = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: '../views/equipos/modalEditarEquipo.html',
            controller: editarEquipoCtrl
        });
    };

    $scope.listarEquipos = function() {
        $scope.equipos = [];
        var consulta = {
            query:"select * from equipos",
            method: "GET"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            console.log(JSON.stringify(data));
            $scope.equipos = data
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };

   // $scope.listarEquipos();

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

equipoCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http'];

var crearEquipoCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
    $scope.newEquipo = {};

    var administrarMensajeSweet = function(conf) {
        $window.swal({
            title: conf.titulo,
            text: conf.texto,
            type: conf.tipo,
            showCancelButton: false
        },
        function(isConfirm){
            if (isConfirm)
               $scope.modalInstance.close();
        });
    };

    $scope.guardar = function(newEquipo) {

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

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            if (response == "1") {
                $scope.listarEquipos();
                administrarMensajeSweet({titulo:'Equipo ingresado', tipo:'success', texto: ''});
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

crearEquipoCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];

var editarEquipoCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
    var administrarMensajeSweet = function(conf) {
        $window.swal({
            title: conf.titulo,
            text: conf.texto,
            type: conf.tipo,
            showCancelButton: false
        },
        function(isConfirm){
            if (isConfirm){
                $scope.modalEditarEquipo.close();
            }
        });
    };

    $scope.modificar = function(editarEquipo) {
        var stringQuery = "UPDATE usuarios set  " +
        "id_rol = '" + editarUsuario.id_rol + "', " +
        "nombre_usuario = '" + editarUsuario.nombre_usuario + "', " +
        "apellido_usuario = '" + editarUsuario.apellido_usuario + "', " +
        "email = '" + editarUsuario.email + "', " +
        "activo = '" + editarUsuario.activo + "' " +
        "where id_usuario = '" + editarUsuario.id_usuario + "'";

        var consulta = {
            query: stringQuery,
            method: "POST"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            if (response == "1") {
                $scope.listarEquipos();
                administrarMensajeSweet({titulo:'Equipo actualizado', tipo:'success', texto: ''});
            } else {
                administrarMensajeSweet({titulo:'Error al actualizar', tipo:'error', texto: ''});
            }
        }).error(function(){
            administrarMensajeSweet({titulo:'Error al enviar params', tipo:'error', texto: ''});
        });
    };

    $scope.cerrarModal = function() {
        $scope.modalEditarEquipo.close();
    };
};

editarEquipoCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];

angular
    .module('myApp')
    .controller('equipoCtrl', equipoCtrl)
    .controller('crearEquipoCtrl', crearEquipoCtrl)
    .controller('editarEquipoCtrl', editarEquipoCtrl);
