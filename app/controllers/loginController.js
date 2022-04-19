app.controller('loginController', function ($scope, $http, $location, $rootScope) {

   $scope.home = function(username, password){
       $http.get('http://localhost:9000/api/usuarios?usuario='+username+'&contrasena='+password).then(data =>{
        
        if(data.data !== null){
            localStorage.setItem('usuario', data.data.usuario);
            localStorage.setItem('idUsuario', data.data._id);
            $location.path('/home');
            //console.log(data.data)
            //alert("Bienvenido");
            
        }else{
            alert('Datos incorrectos');
        }
        
       })
   }
});