import usernameFactory from "./username/username.component";
import loggerFactory from "./utils/logger";
import $ from "cash-dom/dist/cash.min";

const usernameConfig = {
  prompt: 'User Name',
  name: 'username',
  value: '',
  type: 'text'
};
$(document).ready(() => {
  const usernameInput = usernameFactory(usernameConfig);
  usernameInput.stream.subscribe(loggerFactory('Username component'));
  $('body').append(usernameInput.view);
});
