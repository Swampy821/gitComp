
myApp.controller('home', ['$scope', '$firebase',
        function($scope, $firebase) {
	var ref = new Firebase('https://amber-torch-2607.firebaseio.com/users/');
	$scope.users = $firebase(ref).$asArray();
	$scope.remove = function(index) {
		$scope.users.$remove(index);
	};

}]);