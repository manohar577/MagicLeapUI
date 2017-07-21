'use strict';

angular.module('app').factory('loginService', ['$http', '$q', function($http, $q){

    var REST_SERVICE_URI = '/MagicLeapUI/login/';
    var factory = {
        getUser: getUser
    };
    
    self.user={userId:null,password:'',name:'',address:'',phone:'',email:''};
    return factory;

    function getUser(id, password) {
    var deferred = $q.defer();
    self.user.userId = id;
    self.user.password = password;
    	

    $http({method: 'post', url: REST_SERVICE_URI, data:self.user,cache: false}).success(function(data, status, headers, config) {
    	// resolving the promise
    	deferred.resolve(data); 
    }).error(function(data, status, headers, config) { 

    		deferred.reject("Invalid UserName or Password");
    		}); 
    	return deferred.promise;
    }


}]);
