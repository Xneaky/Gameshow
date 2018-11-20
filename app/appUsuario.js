'use strict';

var usuarioCtrl = function($rootScope, $scope, $uibModal, $http) {
    $scope.usuarios = [];
    $scope.roles = [];
    $scope.jugadores = [];

    $scope.nuevoUsuario = function(size) {
        $scope.modalInstance = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: '../views/usuarios/modalNuevoUsuario.html',
            controller: crearUsuarioCtrl,
            size: size
        });
    };

    $scope.seleccionarUsuario = function(usuario) {
        $scope.editarUsuario = angular.copy(usuario);
        $scope.modalEditarUsuario = $uibModal.open({
            backdrop: 'static',
            scope: $scope,
            keyboard: false,
            templateUrl: '../views/usuarios/modalEditarUsuario.html',
            controller: editarUsuarioCtrl
        });
    };

    $scope.listarUsuarios = function() {
        $scope.usuarios = [];
        var consulta = {
            query:"select * from usuarios",
            method: "GET"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            console.log(JSON.stringify(data));
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

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            $scope.roles = data;
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };

    $scope.listarRoles();

    $scope.listarJugadores = function() {
        $scope.jugadores = [];
        var consulta = {
            query:"select nombre_jugador, apellido_jugador from jugadores where activo = 1",
            method: "GET"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            console.log('jugadores : ' + JSON.stringify(data));
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
};

usuarioCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http'];

var crearUsuarioCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
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
               $scope.modalInstance.close();
        });
    };

    $scope.guardar = function(newUsuario) {

        var stringQuery = "call InsertarUsuario ("+
        "'" + newUsuario.nombre_jugador + "'," +
        "'" + newUsuario.apellido_jugador + "'," +
        "'" + newUsuario.nickname_jugador + "'," +
        "'" + newUsuario.email + "'," +
        "'" + newUsuario.fecha_nacimiento + "'," +
        "1," +
        "" + newUsuario.telefono_jugador + "," +
        "'" + newUsuario.pais_jugador + "'," +
        "'" + newUsuario.direccion_jugador + "'," +
        "'" + newUsuario.usuario + "'," +
        "'" + newUsuario.email + "'," +
        "" + newUsuario.id_rol + ")";

        var consulta = {
            query: stringQuery,
            method: "POST"
        }

        $http.post('../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(response){
            console.log("consulta :" + JSON.stringify(consulta));
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
        $scope.modalInstance.close();
    };
};

crearUsuarioCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];

var editarUsuarioCtrl = function($rootScope, $scope, $uibModal, $http, $window) {
    var administrarMensajeSweet = function(conf) {
        $window.swal({
            title: conf.titulo,
            text: conf.texto,
            type: conf.tipo,
            showCancelButton: false
        },
        function(isConfirm){
            if (isConfirm){
                $scope.modalEditarUsuario.close();
            }
        });
    };

    $scope.modificar = function(editarUsuario) {
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
            console.log('stringQuery:' + JSON.stringify(stringQuery));
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
        $scope.modalEditarUsuario.close();
    };
};

editarUsuarioCtrl.$inject = ['$rootScope', '$scope', '$uibModal', '$http', '$window'];

angular
    .module('myApp')
    .controller('usuarioCtrl', usuarioCtrl)
    .controller('crearUsuarioCtrl', crearUsuarioCtrl)
    .controller('editarUsuarioCtrl', editarUsuarioCtrl);
