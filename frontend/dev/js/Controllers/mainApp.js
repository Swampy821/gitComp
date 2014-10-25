(function() {
	function git() {
		this.interval = 60*60*60;
	}

	git.prototype.averageCommits = function(repoArray) {

	};

	git.prototype.mostPopularLanguage = function(repoArray) {
		var languageObj = {}
		var topLanguage=null;
		var topCount=0;
		var keys;
		for(var i=0; i<repoArray.length; i++) {
			if(repoArray[i].language !== null) {
				if(languageObj[repoArray[i].language]===undefined) {
					languageObj[repoArray[i].language] = 1;
				}else{
					languageObj[repoArray[i].language]++;
				}
			}
		}
		
		keys = Object.keys(languageObj);
		for(var i=0; i<keys.length; i++) {
			if(languageObj[keys[i]]>topCount) {
				topCount = languageObj[keys[i]];
				topLanguage = keys[i];
			}
		}
		return topLanguage;
	};


	git.prototype.mostWatchedProject = function(repoArray) {
		var topProject=null;
		var topCount=0;
		for(var i=0; i<repoArray.length; i++) {
			if(repoArray[i].watchers>topCount) {
				topCount = repoArray[i].watchers;
				topProject = {
					project: repoArray[i].name,
					link: repoArray[i].html_url,
					count:repoArray[i].watchers
				};
			}
		}
		return topProject;
	};


	git.prototype.getUserAvatar = function(repoArray, username) {
		var userLink = null;
		for(var i=0; i<repoArray.length; i++) {
			if(repoArray[i].owner.login===username) {
				userLink = repoArray[i].owner.avatar_url;
				return userLink;
			}
		}
		return userLink;
	};

	git.prototype.mostIssues = function(repoArray) {
		var issueCount = -1;
		var topIssueProject = null;
		for(var i=0; i<repoArray.length; i++) {
			if(repoArray[i].open_issues_count>issueCount) {
				topIssueProject = repoArray[i];
				issueCount = repoArray[i].open_issues_count;
			}
		}
		return topIssueProject;
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
		if(timeStamp > $scope.users[index].timeStamp + git.interval || $scope.users[index].timeStamp === undefined) {
			$http.get('https://api.github.com/users/' + username + '/repos')
			  .success(function(data) {
			  	$scope.users[index].repoCount = data.length;
			  	$scope.users[index].timeStamp = timeStamp;
			  	$scope.users[index].topLanguage = git.mostPopularLanguage(data);
			  	$scope.users[index].mostWatchedProject = git.mostWatchedProject(data);
			  	$scope.users[index].avatar = git.getUserAvatar(data, username);
			  	$scope.users[index].mostIssues = git.mostIssues(data);
			  	$scope.users[index].repoObj = data;
			  	$scope.users.$save(index);
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