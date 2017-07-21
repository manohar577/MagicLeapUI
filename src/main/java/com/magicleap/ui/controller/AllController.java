package com.magicleap.ui.controller;
 
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.magicleap.ui.model.Comment;
import com.magicleap.ui.model.Post;
import com.magicleap.ui.model.User;
 
@RestController
public class AllController {
 
    
    RestTemplate restTemplate = new RestTemplate();
    
    @Autowired 
    private HttpSession httpSession;
    
    Properties prop = new Properties();
	InputStream input = null;
	 String URL = "";
    
    AllController() {
    	try {
			input = AllController.class.getClassLoader().getResourceAsStream("/config.properties");
            prop.load(input);
            URL = prop.getProperty("url");
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	catch (IOException e) {
            e.printStackTrace();
        }
    }
    
 

    
    @RequestMapping(value = "/login/", method = RequestMethod.POST)
    public ResponseEntity<User> userLogin(@RequestBody User user) {
        User userObj = new User();
		try {
			userObj = restTemplate.postForObject(URL+"/user", user, User.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        if(userObj.getEmail() == null){
            return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
        }
        httpSession.setAttribute("userId",user.getUserId());
        return new ResponseEntity<User>(userObj, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/register/", method = RequestMethod.POST)
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        String res = "";
		try {
			res = restTemplate.postForObject(URL+"/user/create", user, String.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        if(res != null){
            return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<String>(res, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/getPosts/{id}", method = RequestMethod.GET)
    public ResponseEntity<Post[]> getAllPosts(@PathVariable("id") String userId) {
    	Post[] postArray = null;
    	ResponseEntity<Post[]> responseEntity ;
    	if(httpSession.getAttribute("userId").equals(userId)) {
		try {
			responseEntity = restTemplate.getForEntity(URL+"/posts", Post[].class);
			postArray=responseEntity.getBody();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        if(postArray == null ){
            return new ResponseEntity<Post[]>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<Post[]>(postArray, HttpStatus.OK);
    	}
    	else return new ResponseEntity<Post[]>(HttpStatus.NO_CONTENT);
    }
    
    @RequestMapping(value = "/getUserPosts/{id}", method = RequestMethod.GET)
    public ResponseEntity<Post[]> getUserPosts(@PathVariable("id") String userId) {
    	Post[] postArray = null;
    	ResponseEntity<Post[]> responseEntity ;
    	if(httpSession.getAttribute("userId").equals(userId)) {
		try {
			responseEntity = restTemplate.getForEntity(URL+"/post/"+userId, Post[].class);
			postArray=responseEntity.getBody();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        if(postArray == null ){
            return new ResponseEntity<Post[]>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<Post[]>(postArray, HttpStatus.OK);
    	}
    	else return new ResponseEntity<Post[]>(HttpStatus.NO_CONTENT);
    }
    
    
    @RequestMapping(value = "/post/create/{id}", method = RequestMethod.POST)
    public ResponseEntity<Post> createUserPosts(@PathVariable("id") String userId, @RequestBody Post post) {
    	Post postRes = new Post();
    	if(httpSession.getAttribute("userId").equals(userId)) {
		try {
			postRes = restTemplate.postForObject(URL+"/post/create", post ,Post.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        if(postRes == null ){
            return new ResponseEntity<Post>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<Post>(postRes, HttpStatus.OK);
    	}
    	else return new ResponseEntity<Post>(HttpStatus.NO_CONTENT);
    }
    
    
    @RequestMapping(value = "/post/update/{id}", method = RequestMethod.POST)
    public ResponseEntity<Void> updateUserPosts(@PathVariable("id") String postid, @RequestBody Post post) {
		try {
			restTemplate.put(URL+"/post/update/"+postid, post);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return new ResponseEntity<Void>( HttpStatus.OK);
    }
    
    @RequestMapping(value = "/post/delete/{id}", method = RequestMethod.GET)
    public ResponseEntity<Void> deleteUserPosts(@PathVariable("id") String postId) {
		try {
			 restTemplate.delete(URL+"/post/delete/"+postId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    
    @RequestMapping(value = "/getComments/{id}", method = RequestMethod.GET)
    public ResponseEntity<Comment[]> getAllComments(@PathVariable("id") String postId) {
    	Comment[] commentArray = null;
    	ResponseEntity<Comment[]> responseEntity ;
		try {
			responseEntity = restTemplate.getForEntity(URL+"/comment/"+postId, Comment[].class);
			commentArray=responseEntity.getBody();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        if(commentArray == null ){
            return new ResponseEntity<Comment[]>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<Comment[]>(commentArray, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/Comment/create/{id}", method = RequestMethod.POST)
    public ResponseEntity<Comment> createUserComments(@PathVariable("id") String userId, @RequestBody Comment comment) {
    	Comment postRes = new Comment();
    	if(httpSession.getAttribute("userId").equals(userId)) {
		try {
			postRes = restTemplate.postForObject(URL+"/comment/create", comment ,Comment.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        if(postRes == null ){
            return new ResponseEntity<Comment>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<Comment>(postRes, HttpStatus.OK);
    	}
    	else return new ResponseEntity<Comment>(HttpStatus.NO_CONTENT);
    }
    
    @RequestMapping(value = "/Comment/update/{id}", method = RequestMethod.POST)
    public ResponseEntity<Void> updateUserComments(@PathVariable("id") String commentid, @RequestBody Comment comment) {
		try {
			restTemplate.put(URL+"/comment/update/"+commentid, comment);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return new ResponseEntity<Void>( HttpStatus.OK);
    }
    
    @RequestMapping(value = "/Comment/delete/{id}", method = RequestMethod.GET)
    public ResponseEntity<Void> deleteUserComments(@PathVariable("id") String commentId) {
		try {
			 restTemplate.delete(URL+"/comment/delete/"+commentId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public ResponseEntity<String> logout() {
    	String returnValue = null;
		try {
			 httpSession.invalidate();
			 returnValue = "session invalidated";
		} catch (Exception e) {
			e.printStackTrace();
		}
        if(returnValue == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);

        return new ResponseEntity (HttpStatus.OK);
    }
}