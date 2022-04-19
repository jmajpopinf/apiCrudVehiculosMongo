var URLC = "http://localhost:9000";
app.controller('compradosController', function ($scope, $http, $location) {

    $scope.data = [];

    var userLocal = localStorage.getItem('usuario');
    $scope.user = localStorage.getItem('usuario');
    console.log($scope.userIdLocal);
	//console.log(userLocal);
    if(!userLocal) {
		//localStorage.removeItem('usuario');
		$location.path('/login');
   	}else{
        $location.path('/reporteComprados');
    }

    getComprados();


    function getComprados() {
        $http({
        url: URLC + '/api/reporte2',
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
        //$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        //$scope.datos = [300, 500, 100];
        });
        
    }

    

 });