'use strict';

var usuarioCtrl = function($rootScope, $scope, $uibModal, $http) {
    $scope.usuarios = [];
    $scope.roles = [];

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

        var stringQuery = "INSERT INTO usuarios (id_rol, nombre_usuario, apellido_usuario, email, usuario, pwd, activo) VALUES " +
        "('" + newUsuario.id_rol + "'," +
        "'" + newUsuario.nombre_usuario + "'," +
        "'" + newUsuario.apellido_usuario + "'," +
        "'" + newUsuario.email + "'," +
        "'" + newUsuario.username + "'," +
        "'" + newUsuario.email + "', true)";

        var consulta = {
            query: stringQuery,
            method: "POST"
        }

        $http.post('../apis/porcesaAPI.php', {
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
        "usuario = '" + editarUsuario.usuario + "', " +
        "activo = '" + editarUsuario.activo + "' " +
        "where id_usuarios = '" + editarUsuario.id_usuarios + "'";

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