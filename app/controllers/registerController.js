app.controller('registerController', function ($scope, $http, $location) {

    $scope.postUsuario = function(usuario, nombre, edad, genero, cargo, contrasena){
        var data = {
            usuario : usuario,
            nombre : nombre,
            edad : edad,
            genero : genero,
            cargo : cargo,
            contrasena: contrasena 
        }

        $http.post("http://localhost:9000/api/usuarios", JSON.stringify(data))
            .then(function(response){
                console.log(response);

                if (response.data) {
                    alert('Usuario creado exitosamente');
                    $location.path('/login');
          
                  } else {
                    alert('Datos incorrectos');
                  }

            }, function (error) {
                console.log(error);
            })
    }

});