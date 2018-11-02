var app = angular.module('login_register_app', []);
app.controller('login_register_controller', function($scope, $http){
    $scope.closeMsg = function(){
    };

    $scope.login_form = true;

    $scope.showRegister = function(){
        $scope.login_form = false;
        $scope.register_form = true;
    };

    $scope.showLogin = function(){
        $scope.register_form = false;
        $scope.login_form = true;
    };


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

            var stringQuery = "INSERT INTO usuarios (nombre, apellido, email, nickname, pwd) VALUES " +
                "('" + newUsuario.nombre_usuario + "'," +
                "'" + newUsuario.apellido_usuario + "'," +
                "'" + newUsuario.email + "'," +
                "'" + newUsuario.nickname + "'," +
                "'" + newUsuario.email + "')";

            var consulta = {
                query: stringQuery,
                method: "POST"
            }

            $http.post('../../apis/porcesaAPI.php', {
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
            $uibModalInstance.close();
        };
    });


});
