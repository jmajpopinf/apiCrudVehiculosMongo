var URL = "http://localhost:9000";
app.controller('PostController', function ($scope, $http, $location) {

  //$scope.usuario = null;
  //$scope.dni = null;
  //$scope.correo = null;


  $scope.data = [];
  $scope.dataMarca = [];

  var userLocal = localStorage.getItem('usuario');
  $scope.userIdLocal = localStorage.getItem('idUsuario');
  //console.log($scope.userIdLocal);
	//console.log(userLocal);
   if(!userLocal) {
		//localStorage.removeItem('usuario');
		$location.path('/login');
   	}

  getMarcas();
  getResultsPage();

  

  function getResultsPage() {
    $http({
      url: URL + '/api/vehiculos/'+$scope.userIdLocal,
      method: 'GET'
    }).then(function (res) {
      $scope.data = res.data;
      console.log(res);
    });
  }

  function getMarcas() {
    $http({
      url: URL + '/api/marcas',
      method: 'GET'
    }).then(function (res) {
      $scope.dataMarca = res.data;
      console.log(res);
    });
  }

  $scope.postdata = function () {
    var data = {
      idUsuario: $scope.userIdLocal,
      idMarca: this.marca,
      modelo: this.modelo,
      color: this.color,
      costo: this.costo
    }

    //console.log(data);



    $http.post("http://localhost:9000/api/vehiculos", JSON.stringify(data))
      .then(function (response) {
        console.log(response);

        if (response.data) {
          console.log("Datos enviados");

          getResultsPage();

          //locationreload();
          //variables extras para comprobar el resultado
          //$scope.Marca = data.marca;
          //$scope.Modelo = data.modelo;
          //$scope.Color = data.color;
          //$scope.Precio = data.precio;
        } else {
          alert("Error al enviar datos");
        }
      }, function (error) {
        console.log(error);
      })
      

  }

  /*
  $scope.saveAdd = function(){
    $http({
      url: URL + '/api/pacientes',
      method: 'POST',
      data: $scope.form
    }).then(function(data){
      $scope.data.push(data);
      $(".modal").modal("hide");
    });
  }
  */

  $scope.edit = function (id_Vehiculo, id_Usuario, id_Marca, modelo, color, precio, fecha) {

    /*
    var data = {
      id_vehiculo: id_Vehiculo,
      id_usuario: id_Usuario,
      id_marca : id_Marca,
      modelo: modelo,
      color: color,
      precio: precio,
      fecha: fecha
    }
    */

    $scope.idVehiculoE = id_Vehiculo;
    $scope.idUsuarioE = id_Usuario;
    $scope.idMarcaE = id_Marca; 
    $scope.modeloE = modelo;
    $scope.colorE = color;
    $scope.costoE = precio;
    $scope.fechaE = fecha;

    //saveData($scope.idVehiculoE, $scope.idUsuarioE, $scope.idMarcaE, $scope.modeloE, $scope.colorE, $scope.costoE, $scope.fechaE);
  }

  $scope.saveData = function () {
    var dataE = {
      //idVehiculo: this.idVehiculoE,
      idUsuario: this.idUsuarioE,
      idMarca: this.idMarcaE,
      modelo: this.modeloE,
      color: this.colorE,
      costo: this.costoE  
    }

    console.log(this.idVehiculoE);
    console.log(dataE);

    $http.put("http://localhost:9000/api/vehiculos/"+ this.idVehiculoE, JSON.stringify(dataE))
      .then(function (response) {
        console.log(response);

        if (response.data) {
          console.log("Datos enviados");
          //$scope.msgE = "Datos enviados";
          //locationreload();
          getResultsPage();

        } else {
          console.log("Error al enviar datos");
          //$scope.msg = "Error al enviar datos";
        }
      }, function (error) {
        console.log();
      })
  }


  /*
   $scope.saveEdit = function(){
     $http({
       url: URL + '/api/pacientes?id='+$scope.form.id,
       method: 'POST',
       data: $scope.form
     }).then(function(data){
       $(".modal").modal("hide");
         $scope.data = apiModifyTable($scope.data,data.PacienteId,data);
     });
   }
   */

  $scope.remove = function (id) {
    var result = confirm("Are you sure delete this post?");
    if (result) {
      $http({
        url: URL + '/api/vehiculos/' + id,
        method: 'DELETE'
      }).then(function (data) {
        getResultsPage();
      });
    }
  }


  /* METODO ALTERNATIVO DELETE
  $scope.delete = function(id){
    console.log(id);
    $http.delete("http://localhost:8080/angularJsCrud/api/pacientes?id=" + id)
      .then(function(response){
        console.log(response);
        if(response.data){
          $scope.msgD = "Datos eliminados";
        }else{
          $scope.msgD = "Error al enviar los datos";
        }
      })
  }
  */


  $scope.getUsuatio = function(){
    var usuario = localStorage.getItem('usuario');
    return usuario;
  }



  $scope.removeUsuario = function(){
    localStorage.removeItem('usuario');
    localStorage.removeItem('idUsuario');
  }

  $scope.doSearch = function()
        {
            const tableReg = document.getElementById('datos');
            const searchText = document.getElementById('searchTerm').value.toLowerCase();
            let total = 0;
 
            // Recorremos todas las filas con contenido de la tabla
            for (let i = 1; i < tableReg.rows.length; i++) {
                // Si el td tiene la clase "noSearch" no se busca en su cntenido
                if (tableReg.rows[i].classList.contains("noSearch")) {
                    continue;
                }
 
                let found = false;
                const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
                // Recorremos todas las celdas
                for (let j = 0; j < cellsOfRow.length && !found; j++) {
                    const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                    // Buscamos el texto en el contenido de la celda
                    if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                        found = true;
                        total++;
                    }
                }
                if (found) {
                    tableReg.rows[i].style.display = '';
                } else {
                    // si no ha encontrado ninguna coincidencia, esconde la
                    // fila de la tabla
                    tableReg.rows[i].style.display = 'none';
                }
            }
 
            // mostramos las coincidencias
            const lastTR=tableReg.rows[tableReg.rows.length-1];
            const td=lastTR.querySelector("td");
            lastTR.classList.remove("hide", "red");
            if (searchText == "") {
                lastTR.classList.add("hide");
            } else if (total) {
                td.innerHTML="Se ha encontrado "+total+" coincidencia"+((total>1)?"s":"");
            } else {
                lastTR.classList.add("red");
                td.innerHTML="No se han encontrado coincidencias";
            }
        }

});