const url = "http://localhost:3004/users";

export function* signIn(username, password) {
  console.debug("Fetching user to be signed in.");
  const response = yield fetch(
    `${url}?username=${username}&password=${password}`
  );
  const responseJson = yield response.json();

  if (responseJson.length === 0 || !responseJson[0]) {
    console.debug(
      "Throwing error || data fetched: " + JSON.stringify(response)
    );
    throw new Error("Invalid username or password.");
  }

  return responseJson[0];
}

export function* signUp(
  user = {
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    phone: null,
    password: null
  }
) {
  console.debug("User Sign up service called");

  let userCreationFailed = false;
  let errorMessage = null;

  let currentUser = null;

  // Check if user is already exists.
  const userFromServer = yield fetch(`${url}?username=${user.username}`);

  if (userFromServer && userFromServer.length) {
    userCreationFailed = true;
    errorMessage = `User already exists with email: ${user.email}`;
  }

  if (userCreationFailed) {
    throw new Error(errorMessage);
  }

  const init = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  };
  const response = yield fetch(`${url}`, init);
  const responseJson = yield response.json();
  return responseJson;
}
