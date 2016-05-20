package ca.wbac.timesheet.username;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsernameController {
	
	@Autowired
	UsernameService usernameService;

    @RequestMapping("/greeting")
    public String hello() {
        return "Hello, World!";
    }
    
    @RequestMapping("/username")
    public boolean isAvailable() {
    	return usernameService.isAvailable("hello");
    }
}
