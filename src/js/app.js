import userNameFactory from "./component/userName";
import loggerFactory from "./utils/logger";
import $ from "jqlite/jqlite.min";

const userNameConfig = {
  prompt: 'User Name',
  name: 'userName',
  value: '',
  type: 'text'
};
$(document).ready(() => {
  const userNameInput = userNameFactory(userNameConfig);
  userNameInput.stream.subscribe(loggerFactory());
  $('body').append(userNameInput.view);
});
