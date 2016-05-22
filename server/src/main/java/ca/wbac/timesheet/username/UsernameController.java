package ca.wbac.timesheet.username;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

@RestController
@RequestMapping(value = "/api/username")
public class UsernameController {
	
	@Autowired
  UsernameService usernameService;

  @RequestMapping(value = "ping")
  public String ping() {
    return "pong";
  }
	
  @RequestMapping(value = "{username}", params = {"isValid"})
  public DeferredResult<Boolean> isValid(@PathVariable String username) {
        DeferredResult<Boolean> result = new DeferredResult<>();
        usernameService.isValid(username).subscribe(
        		isValid -> result.setResult(isValid),
        		e -> result.setErrorResult(e));
    	return result;
  }
}
