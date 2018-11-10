'use strict';
var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('bracketCtrl', function ($scope, $uibModal, $http, $window) {
    $scope.torneos = [];

    //Verificando si ha iniciado sesion
    $http.post('../../apis/check_session.php', {
        data: {params:  ''}
    }).success(function(data){
        if (!data) {
            window.location = '../../index.html';
        } else {
            $scope.permisos = data[0]; 
            console.log($scope.permisos);
            $scope.listarTorneos();
        }
    }).error(function(){
        alert('Error al intentar enviar el query.');
    });

    $scope.listarTorneos = function() {
        $scope.torneos = [];
        var consulta = {
            query:"select * from torneos where activo = 1",
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

    $scope.crearBracketBye = function(parametro, itemsArr = [], teamsArr = []) {
        var i = parametro;
        if (parametro > 4) {
            if (parametro > 8) {
                if (parametro > 16) {
                    if (parametro > 32) {
                        if (parametro > 64) {
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
                            return teamsArr;
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
                        return teamsArr;
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
                    return teamsArr;
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
                return teamsArr;
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
            return teamsArr;
        }
    }

    $scope.crearBracketBye2 = function(parametro, itemsArr = [], teamsArr = []) {
        if (parametro > 4) {
            if (parametro > 8) {
                if (parametro > 16) {
                    if (parametro > 32) {
                        if (parametro > 64) {
                            //No se ejecuta nada
                        } else {
                            var j = 1;
                            while (j < 65) {
                                if(itemsArr.length == 1) {
                                    itemsArr.push(null);
                                    teamsArr.push(itemsArr);
                                    itemsArr = [];
                                    j++;
                                } else {
                                    itemsArr.push(null);
                                    j++;
                                }
                            }
                            return teamsArr;
                        }
                    } else {
                        var j = 1;
                        while (j < 33) {
                            if(itemsArr.length == 1) {
                                itemsArr.push(null);
                                teamsArr.push(itemsArr);
                                itemsArr = [];
                                j++;
                            } else {
                                itemsArr.push(null);
                                j++;
                            }
                        }
                        return teamsArr;
                    }
                } else {
                    var j = 1;
                    while (j < 17) {
                        if(itemsArr.length == 1) {
                            itemsArr.push(null);
                            teamsArr.push(itemsArr);
                            itemsArr = [];
                            j++;
                        } else {
                            itemsArr.push(null);
                            j++;
                        }
                    }
                    return teamsArr;
                }
            } else {
                var j = 1;
                while (j < 9) {
                    if(itemsArr.length == 1) {
                        itemsArr.push(null);
                        teamsArr.push(itemsArr);
                        itemsArr = [];
                        j++;
                    } else {
                        itemsArr.push(null);
                        j++;
                    }
                }
                return teamsArr;
            }
        } else {
            var j = 1;
            while (j < 5) {
                if(itemsArr.length == 1) {
                    itemsArr.push(null);
                    teamsArr.push(itemsArr);
                    itemsArr = [];
                    j++;
                } else {
                    itemsArr.push(null);
                    j++;
                }
            }
            return teamsArr;
        }
    }

    function saveFn(data, userData) {
        //userData aloja la informacion del torneo
        //data es toda la informacion del bracket
        $(".block").addClass("loading");
        var consulta = {
            query:"select * from partidos where torneos_codTorneo = " + userData.codTorneo + "",
            method: "GET"
        }
        $http.post('../../apis/porcesaAPI.php', {
            data: {params:  consulta}
        }).success(function(items){
            if (items.length == 0) {
                var stringQuery = "INSERT INTO partidos (torneos_codTorneo, bracket) VALUES (" +
                "" + userData.codTorneo + "," +
                "'" + JSON.stringify(data) + "')";
                var consulta = {
                   query: stringQuery,
                   method: "POST"
                }
                $http.post('../../apis/porcesaAPI.php', {
                   data: {params:  consulta}
                }).success(function(response){
                   if (response == "1") {
                       $(".block").removeClass("loading");
                   } else {
                       administrarMensajeSweet2({titulo:'Error al enviar params', tipo:'error', texto: ''});
                       $(".block").removeClass("loading");
                   }
                }).error(function(){
                   administrarMensajeSweet2({titulo:'Error al enviar params', tipo:'error', texto: ''});
                   $(".block").removeClass("loading");
                });
            } else {
                var stringQuery = "UPDATE partidos set  " + 
                "bracket = '" + JSON.stringify(data) + "'" +
                "where torneos_codTorneo = " + userData.codTorneo + "";
                var consulta = {
                    query: stringQuery,
                    method: "POST"
                }
                $http.post('../../apis/porcesaAPI.php', {
                    data: {params:  consulta}
                }).success(function(response){
                    if (response == "1") {
                        $(".block").removeClass("loading");
                    } else {
                        administrarMensajeSweet2({titulo:'Error al enviar params', tipo:'error', texto: ''});
                        $(".block").removeClass("loading");
                    }
                }).error(function(){
                    administrarMensajeSweet2({titulo:'Error al enviar params', tipo:'error', texto: ''});
                    $(".block").removeClass("loading");
                });
            }
        }).error(function(){
            alert('Error al intentar enviar el query.');
        });
    }

    $scope.getTorneo = function(torneo) {
        //Bloque la pagina por los callbacks
        $(".block").addClass("loading");
        if (torneo != null) {
            var teamsArr = [];
            var itemsArr = [];
            var consulta;
            if (torneo.tipo_torneo == 'Equipos') {
                consulta = {
                    query:"SELECT t1.nombre FROM team AS t1 INNER JOIN participantes AS t2 ON t1.codTeam = t2.team_codTeams WHERE t2.torneos_codTorneo = " + parseInt(torneo.codTorneo) + "",
                    method: "GET"
                }
            } else {
                consulta = {
                    query:"SELECT CONCAT(t1.nombre, ' ', t1.apellido) AS nombre FROM usuarios AS t1 INNER JOIN participantes AS t2 ON t1.id_usuarios = t2.team_codTeams WHERE t2.torneos_codTorneo = " + parseInt(torneo.codTorneo) + "",
                    method: "GET"
                }
            }

            //Query para traer los participantes, los tomo en cuenta cuando esta tabla ya tenga registros y no tenga resultados
            $http.post('../../apis/porcesaAPI.php', {
                data: {params:  consulta}
            }).success(function(bracket) {
                if (bracket.length == 4 || bracket.length == 8 || bracket.length == 16 || bracket.length == 32 || bracket.length == 64) {
                    var consulta = {
                        query:"select * from partidos where torneos_codTorneo = " + torneo.codTorneo + "",
                        method: "GET"
                    }
                    //Con este query verifico si hay algun bracket con resultados
                    $http.post('../../apis/porcesaAPI.php', {
                        data: {params:  consulta}
                    }).success(function(result){
                        if (result.length > 0) {
                            //Si entra aqui es porque ya hay resultados en la tabla partidos
                            var singleEliminations = JSON.parse(result[0].bracket);
                            $('.playoff').bracket({
                                init: singleEliminations,
                                skipConsolationRound: true,
                                teamWidth: 100,
                                scoreWidth: 30,
                                save: saveFn,
                                userData: torneo,
                                disableToolbar: true,
                                disableTeamEdit: true
                            });
                            $(".block").removeClass("loading");
                            return false;
                        } else {
                            //Caso contrario, armo el bracket con los participantes
                            bracket.forEach(function(item) {
                                itemsArr.push(item.nombre);
                                if (itemsArr.length == 2) {
                                    teamsArr.push(itemsArr);
                                    itemsArr = [];
                                }
                                if (bracket.length - 1 == bracket.indexOf(item)) {
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
                                        save: saveFn,
                                        userData: torneo,
                                        disableToolbar: true,
                                        disableTeamEdit: true
                                    });
                                    $(".block").removeClass("loading");
                                }
                            });
                        }
                    }).error(function(){
                        alert('Error al intentar enviar el query.');
                    });
                } else {
                    if (bracket.length == 0) {
                        var registros = $scope.crearBracketBye2(torneo.num_participantes, itemsArr, teamsArr);
                        var singleEliminations = {
                            "teams": registros,
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
                    } else {
                        bracket.forEach(function(item) {
                            itemsArr.push(item.nombre);
                            if (itemsArr.length == 2) {
                                teamsArr.push(itemsArr);
                                itemsArr = [];
                            }
                            if (bracket.length - 1 == bracket.indexOf(item)) {
                                var registros = $scope.crearBracketBye(bracket.length, itemsArr, teamsArr);
                                var singleEliminations = {
                                    "teams": registros,
                                    "results": [
                                        [
                                            
                                        ]
                                    ]
                                }
                                $('.playoff').bracket({
                                    init: singleEliminations,
                                    teamWidth: 100,
                                    scoreWidth: 30,
                                    save: saveFn,
                                    disableToolbar: false,
                                    disableTeamEdit: false
                                });
                                $(".block").removeClass("loading");
                            }
                        });
                    }
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
