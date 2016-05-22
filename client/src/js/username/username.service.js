import 'whatwg-fetch';

function isAvailable(username) {
  fetch('/api/username/ping')
    .then(response => {
      console.log(response);
    }); 
}

const usernameService = Object.freeze({
  isAvailable: isAvailable
});

export default usernameService;
