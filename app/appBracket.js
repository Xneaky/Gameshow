'use strict';
var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('bracketCtrl', function ($scope, $uibModal, $http) {
    $scope.torneos = [];
    //$scope.modulos = [];


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
        if (activo) 
            css = 'label-info';
        return css;
    };

    $scope.etiquetaEstado = function(activo) {
        var etiqueta = 'Inactivo';
        if (activo) 
            etiqueta = 'Activo'
        return etiqueta;
    };

    $scope.getTorneo = function(torneo) {
        var teamsArr = [];
        var itemsArr = [];
        var consulta = {
            query:"SELECT t1.nombre FROM team AS t1 INNER JOIN participantes AS t2 ON t1.codTeam = t2.team_codTeams WHERE t2.torneos_codTorneo = " + parseInt(torneo.codigoTorneo) + "",
            method: "GET"
        }

        $http.post('../../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(data){
            $scope.brackets = data;
            if (data) {
                var contador = 1;
                data.forEach(function(item) {
                    itemsArr.push(item.nombre)
                    if (contador == 2) {
                        teamsArr.push(itemsArr);
                        itemsArr = [];
                        contador = 1;
                    } else {
                        contador++;
                    }
                    if (data.length - 1 == data.indexOf(item)) {
                        var singleElimination = {
                            "teams": teamsArr,
                            "results": [
                                [
                                    
                                ]
                            ]
                        }
                        $('.bracket').bracket({
                            init: singleElimination,
                            teamWidth: 100,
                            scoreWidth: 30
                        });
                        $(".block").removeClass("loading");
                    }
                });
            } else {
                var singleElimination = {
                    "teams": teamsArr,
                    "results": [
                        [
                            
                        ]
                    ]
                }
                $('.bracket').bracket({
                    init: singleElimination,
                    teamWidth: 100,
                    scoreWidth: 30
                });
                $(".block").removeClass("loading");
            }
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    }
    $(document).ready(function(){
                $('#myDropDown').change(function(){
                    $(".block").addClass("loading");
                    //Selected value
                    var inputValue = $(this).val();

                    //Ajax for calling php function
                    $.post('obtener-teams.php', { dropdownValue: inputValue }, function(data) {
                        var teamsArr = [];
                        var itemsArr = [];

                    });
                });
            });
});


angular
    .module('myApp')
