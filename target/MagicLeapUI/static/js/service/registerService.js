'use strict';

angular.module('app').factory('registerService', ['$http', '$q', function($http, $q){

    var REST_SERVICE_URI = '/MagicLeapUI/register/';

    var factory = {
    		createUser: createUser
    };
    self.user={userId:null,password:'',name:'',address:'',phone:'',email:''};
    return factory;
    
    function createUser(userId, userName,address, phone,email,password ) {
    	var deferred = $q.defer();
        self.user.userId = userId;
        self.user.password = password;
        self.user.address = address;
        self.user.phone = phone
        self.user.email =email;
        self.user.name = userName;
        	

        $http({method: 'post', url: REST_SERVICE_URI, data:self.user,cache: false}).success(function(data, status, headers, config) {
        	// resolving the promise
        	deferred.resolve(data); 
        }).error(function(data, status, headers, config) { 

        		deferred.reject("error while creating user");
        		}); 
        	return deferred.promise;
        }

}]);
