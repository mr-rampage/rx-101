import userNameFactory from "./component/userName";
import loggerFactory from "./component/logger";

let userNameInput = userNameFactory('username', '');
userNameInput.stream.subscribe(loggerFactory());
document.body.appendChild(userNameInput.view);
