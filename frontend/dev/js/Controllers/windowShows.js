
myApp.controller('windowShows', ['$scope',
        function($scope) {
       	$scope.state = {
       		start:true,
       		app:false
       	};
		$scope.start = function() {
			$scope.state.start=false;
			$scope.state.app = true;
		};
		$scope.back = function() {
			$scope.state.start = true;
			$scope.state.app = false;
		};
}]);