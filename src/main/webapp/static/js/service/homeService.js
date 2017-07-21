'use strict';

angular.module('app').factory('homeService', ['$http', '$q', function($http, $q){

	
	var REST_SERVICE_URI = '/MagicLeapUI/logout/';
    var factory = {
    		logout : logout
        };

        return factory;
        
        
        function logout() {
        	 var deferred = $q.defer();
        	 
             $http.get(REST_SERVICE_URI)
             .then(
             function (response) {
                 deferred.resolve(response.data);
             },
             function(errResponse){
                 console.error('Error while logging out user service');
                 deferred.reject(errResponse);
             }
         );
         return deferred.promise;
        }
}]);
