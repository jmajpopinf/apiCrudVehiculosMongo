var URLK = "http://localhost:9000";
app.controller('carosController', function ($scope, $http, $location) {

    $scope.data = [];

    var userLocal = localStorage.getItem('usuario');
    $scope.user = localStorage.getItem('usuario');
    console.log($scope.userIdLocal);
	//console.log(userLocal);
    if(!userLocal) {
		//localStorage.removeItem('usuario');
		$location.path('/login');
   	}else{
        $location.path('/reporteCaros');
    }

    getCaros();



    function getCaros() {
        $http({
        url: URLK + '/api/reporte3',
        method: 'GET'
        }).then(function (res) {
        $scope.data = res.data;
        console.log(res);

        $scope.labels = [];
        $scope.datos =[];
    
        Object.keys(res.data).forEach(function(key) { 
            $scope.labels.push(res.data[key].idMarca.descripcion);
            $scope.datos.push(res.data[key].costo);
        })

        /*
        //$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
        //$scope.datos = [300, 500, 100, 40, 120];
        $scope.type = 'polarArea';

        $scope.toggle = function () {
        $scope.type = $scope.type === 'polarArea' ?
        'pie' : 'polarArea';
        };
        */
       
        //---------------------------------------
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: $scope.labels,
                datasets: [{
                    label: 'Total',
                    data: $scope.datos,
                    fill: false,
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 3
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        //---------------------------------------

        });
    }

 });