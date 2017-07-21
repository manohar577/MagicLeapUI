'use strict';

angular.module('app').controller('ctrlPost', ['$scope', '$rootScope', '$location', 'postService', function($scope, $rootScope, $location, postService) {
    var self = this;

    self.posts = [];
    self.updatePost={postid:'',postdetails:'',postdate:'',userid:'',posttitle:''};
    
    self.view = false;
    self.create = true;
    self.update = true;
    
    self.getAllPosts = getAllPosts;
    self.getUserPosts = getUserPosts;
    self.deletePost = deletePost;
    self.postClick = postClick;
    self.createPost = createPost;
    self.createPostClick = createPostClick;
    self.updatePost = updatePost;
    self.updatePostClick =updatePostClick; 
    
    	postService.fetchAllPosts()
            .then(
            function(data) {
            	var count = 0;
            	
            	for(var obj in data) {
            		var show = true;
            		
            		if(data[obj].userid ==$rootScope.userId )
            			show = false;
            			
            		var post = {
                			"postid":data[obj].postid,
            	    		 "postdetails":data[obj].postdetails,
            	    		 "postdate":data[obj].postdate,
            	    		 "userid":data[obj].userid,
            	    		 "posttitle":data[obj].posttitle,
            	    		 "show":show
                	};
            		 self.posts.push(post);
            	}
        	                 
            },
            function(errResponse){
                console.error('Error while fetching posts');
            }
        );
    	
    	function getAllPosts() { 
    	    self.view = false;
    	    self.create = true;
    	    self.update = true;
    		
    		 self.posts = [];
    		postService.fetchAllPosts()
            .then(
            function(data) {
            	var count = 0;
            	
            	for(var obj in data) {
            		var show = true;
            		
            		if(data[obj].userid ==$rootScope.userId )
            			show = false;
            			
            		var post = {
                			"postid":data[obj].postid,
            	    		 "postdetails":data[obj].postdetails,
            	    		 "postdate":data[obj].postdate,
            	    		 "userid":data[obj].userid,
            	    		 "posttitle":data[obj].posttitle,
            	    		 "show":show
                	};
            		 self.posts.push(post);
            	}
        	                 
            },
            function(errResponse){
                console.error('Error while fetching posts');
            }
        );
    	}
    	

    	function getUserPosts() { 
    	    self.view = false;
    	    self.create = true;
    	    self.update = true;
    	    
    		 self.posts = [];
    		postService.fetchUserPosts()
            .then(
            function(data) {
            	var count = 0;
            	
            	for(var obj in data) {
            		var show = true;
            		
            		if(data[obj].userid ==$rootScope.userId )
            			show = false;
            			
            		var post = {
                			"postid":data[obj].postid,
            	    		 "postdetails":data[obj].postdetails,
            	    		 "postdate":data[obj].postdate,
            	    		 "userid":data[obj].userid,
            	    		 "posttitle":data[obj].posttitle,
            	    		 "show":show
                	};
            		 self.posts.push(post);
            	}
        	                 
            },
            function(errResponse){
                console.error('Error while fetching user posts');
            }
        );
    	}
    	
    	function deletePost(postId) {
    	    self.view = false;
    	    self.create = true;
    	    self.update = true;
    		postService.deleteUserPost(postId)
            .then(
            function(data) {
            	getAllPosts();
        	                 
            },
            function(errResponse){
                console.error('Error while fetching user posts');
            }
        );
    	}
    	
    	function createPost() { 
    	    self.view = true;
    	    self.create = false;
    	    self.update = true;
    	    self.postdetails = "";
    	    self.posttitle = "";
    	    
    	}
    	
    	function updatePost(post) { 
    	    self.view = true;
    	    self.create = true;
    	    self.update = false;
    	    
    	    self.postdetails = "";
    	    self.posttitle = "";
    	    
    	    self.updatePost.postid = post.postid;
    	    self.updatePost.postdetails=post.postdetails;
    	    self.updatePost.posttitle = post.posttitle;
    	    
    	}
    	
    	function createPostClick() { 
    	    self.view = true;
    	    self.create = false;
    	    self.update = true;
    	    
    	    self.post={postid:'',postdetails:'',postdate:'',userid:'',posttitle:''};
    	    self.post.postdetails = self.postdetails;
    	    self.post.posttitle = self.posttitle;
    	    self.post.userid = $rootScope.userId;
    	    
    	    postService.createUserPosts(self.post)
            .then(
            function(data) {
            	getAllPosts();
        	                 
            },
            function(errResponse){
                console.error('Error while fetching user posts');
            }
        );
    	}
    	
    	function updatePostClick() { 
    	    self.view = true;
    	    self.create = true;
    	    self.update = false;
    	    
    	    self.post={postid:'',postdetails:'',postdate:'',userid:'',posttitle:''};
    	    
    	    if(self.updatepostdetails != undefined)
    	    self.post.postdetails = self.updatepostdetails;
    	    else  self.post.postdetails = self.updatePost.postdetails;
    	    if(self.updateposttitle != undefined)
    	    self.post.posttitle = self.updateposttitle;
    	    else self.post.posttitle = self.updatePost.posttitle;
    	    
    	    self.post.userid = $rootScope.userId;
    	    
    	    
    	    
    	    postService.updateUserPosts(self.post, self.updatePost.postid)
            .then(
            function(data) {
            	getAllPosts();
        	                 
            },
            function(errResponse){
                console.error('Error while fetching user posts');
            }
        );
    	}
    	
    	
    	 function postClick(postId) {
    		$rootScope.postId = postId;
    		$location.path("/comment");
    	}
    	
    	
}]);


