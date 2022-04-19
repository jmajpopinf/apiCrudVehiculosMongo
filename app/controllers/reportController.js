var URLV = "http://localhost:9000";
app.controller('reportController', function ($scope, $http, $location) {

    //$scope.data = [];
    //console.log($scope.data);

    var userLocal = localStorage.getItem('usuario');
    $scope.user = localStorage.getItem('usuario');
    console.log($scope.userIdLocal);
	//console.log(userLocal);
    if(!userLocal) {
		//localStorage.removeItem('usuario');
		$location.path('/login');
   	}else{
        $location.path('/reporteVendidos');
    }

    getVendidos();

    function getVendidos() {
        $http({
        url: URLV + '/api/reporte1',
        method: 'GET'
        }).then(function (res) {
        $scope.data = res.data;
        console.log(res);

        $scope.labels = [];
        $scope.datos =[];
    
        Object.keys(res.data).forEach(function(key) { 
            $scope.labels.push(res.data[key].marcas[0].descripcion);
            $scope.datos.push(res.data[key].total);
        })
          
        
        
        //$scope.labels = ["hola", "In-Store Sales", "Mail-Order Sales"];
        //$scope.datos = [300, 500, 100];
        });
    }

   

 });