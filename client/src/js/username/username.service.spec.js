import usernameService from "./username.service"

describe('usernameService', () => {
  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  function mockEndPoint(url, response) {
    jasmine.Ajax.stubRequest(url).andReturn({
      "responseText": JSON.stringify(response)
    });
  }
});
