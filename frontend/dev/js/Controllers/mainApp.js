(function() {
	function git() {}

	git.prototype.averageCommits = function(repoArray) {

	}

	window.git = new git();
})();





myApp.controller('mainApp', ['$scope', '$firebase', '$http',
        function($scope, $firebase, $http) {
	var ref = new Firebase('https://amber-torch-2607.firebaseio.com/users/');
	var fire = $firebase(ref);
	$scope.users = fire.$asArray(); 
	$scope.getGitData = function(username, index) {
		var timeStamp = new Date().getTime();
		if(timeStamp > $scope.users[index].timeStamp + 200000 || $scope.users[index].timeStamp === undefined) {
			$http.get('https://api.github.com/users/' + username + '/repos')
			  .success(function(data) {
			  	$scope.users[index].repoCount = data.length;
			  	$scope.users[index].timeStamp = timeStamp;
			  	$scope.users.$save(index);
			  	console.log('update called on index ' + index);
			  });
		}
	};
	$scope.update = function() {
		for(var i=0; i<$scope.users.length; i++) {
			$scope.getGitData($scope.users[i].username, i);
		}
	};
	$scope.users.$loaded().then(function() {
		$scope.update();
	});

	$scope.$watch('state.start', function(oldVal, newVal) {
		if(newVal===true) {
			$scope.update();
		}
	});

}]);