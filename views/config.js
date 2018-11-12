'use strict';

var configState = function($routeProvider) {
    // Set default state
    $routeProvider
    .when('/usuarios', {
        templateUrl : 'usuarios/usuarios.html',
        data: {
            pageTitle: 'Usuarios'
        }
    })

    .when('/roles', {
        templateUrl : 'roles/roles.html',
        data: {
            pageTitle: 'Roles'
        }
    })

    .when('/jugadores', {
        templateUrl : 'jugadores/jugadores.html',
        data: {
            pageTitle: 'Jugadores'
        }
    })

    .when('/', {
        templateUrl : 'torneos/torneos.html',
        data: {
            pageTitle: 'Torneos'
        }
    })

    .when('/modulos', {
        templateUrl : 'modulos/modulos.html',
        data: {
            pageTitle: 'Modulos'
        }
    })

    .when('/brackets', {
        templateUrl : 'brackets/brackets.html',
        data: {
            pageTitle: 'Brackets'
        }
    })

    .when('/torneosj', {
        templateUrl : 'torneos/torneosJugador.html',
        data: {
            pageTitle: 'Torneos Jugador'
        }
    });
};

configState.$inject = ['$routeProvider'];

angular
    .module('myApp')
    .config(configState);