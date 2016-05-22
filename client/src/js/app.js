import usernameFactory from "./username/username.component";
import loggerFactory from "./utils/logger";
import $ from "cash-dom/dist/cash.min";
import usernameService from "./username/username.service";

const usernameConfig = {
  prompt: 'User Name',
  name: 'username',
  value: '',
  type: 'text'
};
$(document).ready(() => {
  const usernameInput = usernameFactory(usernameConfig);
  usernameInput.stream.subscribe(loggerFactory());
  $('body').append(usernameInput.view);
  usernameService.isAvailable();
});
