'use strict';

angular.module('app').factory('commentService', ['$http', '$q', '$rootScope', function($http, $q, $rootScope){

    var REST_SERVICE_URI = '/MagicLeapUI/getComments/';
    var REST_SERVICE_URI_DELETE = '/MagicLeapUI/Comment/delete/';
    var REST_SERVICE_URI_CREATE = '/MagicLeapUI/Comment/create/';
    var REST_SERVICE_URI_UPDATE = '/MagicLeapUI/Comment/update/';

    var factory = {
    		fetchAllComments: fetchAllComments,
    		deleteUserComment:deleteUserComment,
    		createUserComment:createUserComment,
    		updateUserComment:updateUserComment
    };
    return factory;
    
    function fetchAllComments(postId) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI+	postId)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching posts');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
    function deleteUserComment(commentId) {
    	
    	var deferred = $q.defer();
        $http.get(REST_SERVICE_URI_DELETE+commentId)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while deleting user posts');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
    function createUserComment(comment) {
    	var deferred = $q.defer();
    	
    	 $http({method: 'post', url: REST_SERVICE_URI_CREATE+$rootScope.userId, data:comment,cache: false}).success(function(data, status, headers, config) {
    	    	// resolving the promise
    	    	deferred.resolve(data); 
    	    }).error(function(data, status, headers, config) { 

    	    		deferred.reject("Error while creating user comment");
    	    		}); 
    	    	return deferred.promise;
    }
    
    function updateUserComment(comment, commentid) {
    	var deferred = $q.defer();
    	
    	 $http({method: 'post', url: REST_SERVICE_URI_UPDATE+commentid, data:comment,cache: false}).success(function(data, status, headers, config) {
    	    	// resolving the promise
    	    	deferred.resolve(data); 
    	    }).error(function(data, status, headers, config) { 

    	    		deferred.reject("Error while updating user comment");
    	    		}); 
    	    	return deferred.promise;
    }updateUserPosts


}]);
