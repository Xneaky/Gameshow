'use strict';
var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('bracketCtrl', function ($scope, $uibModal, $http) {
    $scope.torneos = [];

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

    $scope.getTorneo = function(torneo) {
        $(".block").addClass("loading");
        if (torneo.codigoTorneo != null) {
            var teamsArr = [];
            var itemsArr = [];
            var consulta = {
                query:"SELECT t1.nombre FROM team AS t1 INNER JOIN participantes AS t2 ON t1.codTeam = t2.team_codTeams WHERE t2.torneos_codTorneo = " + parseInt(torneo.codigoTorneo) + "",
                method: "GET"
            }

            $http.post('../../apis/porcesaAPI.php', {
                data: {params:  consulta}
            }).success(function(data) {
                if (data.length == 4 || data.length == 8 || data.length == 16 || data.length == 32 || data.length == 64) {
                    data.forEach(function(item) {
                        itemsArr.push(item.nombre);
                        if (itemsArr.length == 2) {
                            teamsArr.push(itemsArr);
                            itemsArr = [];
                        }
                        if (data.length - 1 == data.indexOf(item)) {
                            var singleEliminations = {
                                "teams": teamsArr,
                                "results": [
                                    [
                                        
                                    ]
                                ]
                            }
                            $('.playoff').bracket({
                                init: singleEliminations,
                                skipConsolationRound: true,
                                teamWidth: 100,
                                scoreWidth: 30,
                                determineWinner: function(match) {
                                    switch(match.data) { 
                                        case 1: [match.a, match.b]; // first team is the winner
                                        case 2: return [match.b, match.a]; // second team is the winner
                                        default : return []; // no winner yet
                                    }
                                }
                            });
                            $(".block").removeClass("loading");
                        }
                    });
                } else {
                    var i = data.length;
                    data.forEach(function(item) {
                        itemsArr.push(item.nombre);
                        if (itemsArr.length == 2) {
                            teamsArr.push(itemsArr);
                            itemsArr = [];
                        }
                        if (data.length - 1 == data.indexOf(item)) {
                            if (data.length > 4) {
                                if (data.length > 8) {
                                    if (data.length > 16) {
                                        if (data.length > 32) {
                                            if (data.length > 64) {
                                                //No se ejecuta nada
                                            } else {
                                                while (i < 65) {
                                                    if(itemsArr.length == 1) {
                                                        itemsArr.push(null);
                                                        teamsArr.push(itemsArr);
                                                        itemsArr = [];
                                                        i++;
                                                    } else {
                                                        itemsArr.push(null);
                                                        i++;
                                                    }
                                                }
                                            }
                                        } else {
                                            while (i < 33) {
                                                if(itemsArr.length == 1) {
                                                    itemsArr.push(null);
                                                    teamsArr.push(itemsArr);
                                                    itemsArr = [];
                                                    i++;
                                                } else {
                                                    itemsArr.push(null);
                                                    i++;
                                                }
                                            }
                                        }
                                    } else {
                                        while (i < 17) {
                                            if(itemsArr.length == 1) {
                                                itemsArr.push(null);
                                                teamsArr.push(itemsArr);
                                                itemsArr = [];
                                                i++;
                                            } else {
                                                itemsArr.push(null);
                                                i++;
                                            }
                                        }
                                    }
                                } else {
                                    while (i < 9) {
                                        if(itemsArr.length == 1) {
                                            itemsArr.push(null);
                                            teamsArr.push(itemsArr);
                                            itemsArr = [];
                                            i++;
                                        } else {
                                            itemsArr.push(null);
                                            i++;
                                        }
                                    }
                                }
                            } else {
                                while (i < 5) {
                                    if(itemsArr.length == 1) {
                                        itemsArr.push(null);
                                        teamsArr.push(itemsArr);
                                        itemsArr = [];
                                        i++;
                                    } else {
                                        itemsArr.push(null);
                                        i++;
                                    }
                                }
                            }
                            var singleEliminations = {
                                "teams": teamsArr,
                                "results": [
                                    [
                                        
                                    ]
                                ]
                            }
                            $('.playoff').bracket({
                                init: singleEliminations,
                                teamWidth: 100,
                                scoreWidth: 30
                            });
                            $(".block").removeClass("loading");
                        }
                    });
                }
            }).error(function(){
                alert('Error al intentar enviar el query.');
            });
        } else {
            $(".playoff").empty();
            $(".block").removeClass("loading");
        }
    }
});


angular
    .module('myApp')
