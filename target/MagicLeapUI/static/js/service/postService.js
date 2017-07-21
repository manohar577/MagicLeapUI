'use strict';

angular.module('app').factory('postService', ['$http', '$q', '$rootScope', function($http, $q, $rootScope){

    var REST_SERVICE_URI = '/MagicLeapUI/getPosts/';
    var REST_SERVICE_URI_GET = '/MagicLeapUI/getUserPosts/';
    var REST_SERVICE_URI_DELETE = '/MagicLeapUI/post/delete/';
    var REST_SERVICE_URI_CREATE = '/MagicLeapUI/post/create/';
    var REST_SERVICE_URI_UPDATE = '/MagicLeapUI/post/update/';

    var factory = {
    		fetchAllPosts: fetchAllPosts,
    		fetchUserPosts: fetchUserPosts,
    		deleteUserPost:deleteUserPost,
    		createUserPosts:createUserPosts,
    		updateUserPosts:updateUserPosts
    };
    return factory;
    
    function fetchAllPosts() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI+	$rootScope.userId)
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
    
    function fetchUserPosts() {
    	var deferred = $q.defer();
        $http.get(REST_SERVICE_URI_GET+	$rootScope.userId)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching user posts');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
    function deleteUserPost(postId) {
    	
    	var deferred = $q.defer();
        $http.get(REST_SERVICE_URI_DELETE+postId)
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
    
    function createUserPosts(post) {
    	var deferred = $q.defer();
    	
    	 $http({method: 'post', url: REST_SERVICE_URI_CREATE+$rootScope.userId, data:post,cache: false}).success(function(data, status, headers, config) {
    	    	// resolving the promise
    	    	deferred.resolve(data); 
    	    }).error(function(data, status, headers, config) { 

    	    		deferred.reject("Error while creating user posts");
    	    		}); 
    	    	return deferred.promise;
    }
    
    function updateUserPosts(post, postid) {
    	var deferred = $q.defer();
    	
    	 $http({method: 'post', url: REST_SERVICE_URI_UPDATE+postid, data:post,cache: false}).success(function(data, status, headers, config) {
    	    	// resolving the promise
    	    	deferred.resolve(data); 
    	    }).error(function(data, status, headers, config) { 

    	    		deferred.reject("Error while updating user posts");
    	    		}); 
    	    	return deferred.promise;
    }updateUserPosts


}]);
