var app = angular.module('main-App');

app.factory('LoginService', function(){
    
    
    var user = 'Prueba';
    return{
        getUser : function(){
            var usuario = user;
            return usuario;
        }

    };

});