'use strict';

var mainCtrl = function($rootScope, $scope, $http) {
    
    $rootScope.securityDataUser = {};

    var consulta = {
        method: "customDataUser"
    }

    $http.post('../apis/getDataUser.php', {
        data: {params:  consulta}
    }).success(function(data){
        $rootScope.securityDataUser = data[0];
    }).error(function(){
        alert('Error al intentar enviar el query.');
    });

    $scope.cerrarSession = function() {
        $http.post('../apis/logout.php', {
            data: {params:  consulta}
        }).success(function(data){
            console.log("data: " + JSON.stringify(data));
            window.location = '../index.php';
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    };
};

mainCtrl.$inject = ['$rootScope', '$scope', '$http'];

angular
    .module('myApp')
    .controller('mainCtrl', mainCtrl);