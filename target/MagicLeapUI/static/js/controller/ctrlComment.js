'use strict';

angular.module('app').controller('ctrlComment', ['$scope', '$rootScope', '$location', 'commentService', function($scope, $rootScope, $location, commentService) {
    var self = this;

    self.comments = [];
    self.updateComment={commentid:'',details:'',datetime:'',postid:'',userid:''};
    
    self.view = false;
    self.create = true;
    self.update = true;
    
    self.getAllComments = getAllComments;
    self.deleteComment = deleteComment;
    self.commentClick = commentClick;
    self.createComment = createComment;
    self.createCommentClick = createCommentClick;
    self.updateComment = updateComment;
    self.updateCommentClick =updateCommentClick; 
    
    commentService.fetchAllComments($rootScope.postId)
     .then(
     function(data) {
     	var count = 0;
     	
     	for(var obj in data) {
     		var show = true;
     		
     		if(data[obj].userid ==$rootScope.userId )
     			show = false;
     			
     		var comment = {
         			"commentid":data[obj].commentid,
     	    		 "details":data[obj].details,
     	    		 "datetime":data[obj].datetime,
     	    		 "userid":data[obj].userid,
     	    		 "postid":data[obj].postid,
     	    		 "show":show
         	};
     		 self.comments.push(comment);
     	}
 	                 
     },
     function(errResponse){
         console.error('Error while fetching comments');
     }
 );
    	
    	function getAllComments() { 
    	    self.view = false;
    	    self.create = true;
    	    self.update = true;
    		
    		 self.comments = [];
    		commentService.fetchAllComments($rootScope.postId)
            .then(
            function(data) {
            	var count = 0;
            	
            	for(var obj in data) {
            		var show = true;
            		
            		if(data[obj].userid ==$rootScope.userId )
            			show = false;
            			
            		var comment = {
                			"commentid":data[obj].commentid,
            	    		 "details":data[obj].details,
            	    		 "datetime":data[obj].datetime,
            	    		 "userid":data[obj].userid,
            	    		 "postid":data[obj].postid,
            	    		 "show":show
                	};
            		 self.comments.push(comment);
            	}
        	                 
            },
            function(errResponse){
                console.error('Error while fetching comments');
            }
        );
    	}
    	
    	
    	function deleteComment(commentId) {
    	    self.view = false;
    	    self.create = true;
    	    self.update = true;
    		commentService.deleteUserComment(commentId)
            .then(
            function(data) {
            	getAllComments();
        	                 
            },
            function(errResponse){
                console.error('Error while fetching user comments');
            }
        );
    	}
    	
    	function createComment() { 
    	    self.view = true;
    	    self.create = false;
    	    self.update = true;
    	    
    	    self.postdetails = "";
    	    
    	}
    	
    	function updateComment(comment) { 
    	    self.view = true;
    	    self.create = true;
    	    self.update = false;
    	    
    	    self.details = "";
    	    
    	    self.updateComment.commentid = comment.commentid;
    	    self.updateComment.details=comment.details;
    	    
    	}
    	
    	function createCommentClick() { 
    	    self.view = true;
    	    self.create = false;
    	    self.update = true;
    	    
    	    self.comment={commentid:'',details:'',datetime:'',postid:'',userid:''};
    	    self.comment.details = self.details;
    	    self.comment.postid = $rootScope.postId;
    	    self.comment.userid = $rootScope.userId;
    	    
    	    commentService.createUserComment(self.comment)
            .then(
            function(data) {
            	getAllComments();
        	                 
            },
            function(errResponse){
                console.error('Error while fetching user comments');
            }
        );
    	}
    	
    	function updateCommentClick() { 
    	    self.view = true;
    	    self.create = true;
    	    self.update = false;
    	    
    	    self.comment={commentid:'',details:'',datetime:'',postid:'',userid:''};
    	    
    	    if(self.updatecommentdetails != undefined)
    	    self.comment.details = self.updatecommentdetails;
    	    else  self.comment.details = self.updateComment.details;
    	    
    	    self.comment.userid = $rootScope.userId;
    	    self.comment.postid = $rootScope.postId;
    	    
    	    
    	    
    	    commentService.updateUserComment(self.comment, self.updateComment.commentid)
            .then(
            function(data) {
            	getAllComments();
        	                 
            },
            function(errResponse){
                console.error('Error while fetching user comments');
            }
        );
    	}
    	
    	
    	 function commentClick() {
    		$location.path("/posts");
    	}
    	
    	
}]);


