package ca.wbac.timesheet.username;

import org.springframework.stereotype.Service;

@Service
class UsernameService {

	boolean isAvailable(String username) {
		return true;
	}
}
