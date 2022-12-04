const registerButton = document.querySelector("button.register");
const loginButton = document.querySelector("button.login");
const registerForm = document.querySelector("form#register");
const loginForm = document.querySelector("form#login");
const keepAliveCheckbox = document.querySelector("input#keepSignin");
const submitButton = document.querySelector('input[type="submit"]');
const dialog = document.querySelector("dialog");

function showRegisterForm() {
  registerForm.style.display = "flex";
  loginForm.style.display = "none";
}

function showLoginForm() {
  loginForm.style.display = "flex";
  registerForm.style.display = "none";
}

function checkForm() {
  if (registerForm.style.display == "flex") {
    document.querySelector("button.register").style.color = "red";
    document.querySelector("button.login").style.color = "blue";
  }
  if (loginForm.style.display == "flex") {
    document.querySelector("button.login").style.color = "red";
    document.querySelector("button.register").style.color = "blue";
  }
}

function showDialog(ok, username, errorMessage, mode) {
  let timer = 5;
  setInterval(() => {
    dialog.style.display = "flex";
    if (mode == "Login" && ok) {
      dialog.innerHTML = `
      <div><h1>${mode} success</h1></div>
      <div>Welcome back, ${username}</div>
      <div>Redirecting to homepage in ${timer} ...</div>
      <button id="redirect">OK</button>`;
      dialog.classList.add("success");
    } else if (mode == "Register" && ok) {
      dialog.innerHTML = `
      <div><h1>${mode} success</h1></div>
      <div>Welcome, ${username}</div>
      <div>Redirecting to homepage in ${timer} ...</div>
      <button id="redirect">OK</button>`;
      dialog.classList.add("success");
    } else {
      dialog.innerHTML = `
      <div><h1>${mode} failed</h1></div>
      <div>${errorMessage}</div>
      <div>Redirecting to login page in ${timer} ...</div>
      <button id="redirect">OK</button>`;
      dialog.classList.remove("success");
    }
    timer--;

    const redirectButton = document.querySelector("button#redirect");
    redirectButton.addEventListener("click", redirect);
    function redirect() {
      if (dialog.classList.contains("success")) {
        window.location = "/upload.html";
      } else {
        window.location = "/index.html";
      }
    }
  }, 1000);
}


function regEventListener_showRegForm(){
  registerButton.addEventListener("click", showRegisterForm);
}

function logEventListener_showLogForm() {
  loginButton.addEventListener("click", showLoginForm);
}

function regEventListener_checkForm() {
  registerButton.addEventListener("click", checkForm);
}

function logEventListener_checkForm() {
  loginButton.addEventListener("click", checkForm);
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const keepAlive = keepAliveCheckbox.checked;
  const username = loginForm.username.value;
  const password = loginForm.password.value;

  const res = await fetch("/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
      keepAlive: keepAlive,
    }),
  });

  const result = await res.json();

  showDialog(res.ok, username, result.error, "Login");
  if (res.ok) {
    setTimeout(() => {
      window.location = "/upload.html";
    }, 6000);
  } else {
    setTimeout(() => {
      window.location = "/index.html";
    }, 6000);
  }
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = registerForm.username.value;
  const password_1 = registerForm.password_1.value;
  const password_2 = registerForm.password_2.value;

  const res = await fetch("/register", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password_1: password_1,
      password_2: password_2,
    }),
  });

  const result = await res.json();

  showDialog(res.ok, username, result.error, "Register");
  if (res.ok) {
    setTimeout(() => {
      window.location = "/upload.html";
    }, 6000);
  } else {
    setTimeout(() => {
      window.location = "/index.html";
    }, 6000);
  }
});

loginForm.style.display = "flex";
checkForm();


async function main(){
  // showRegisterForm()
  showLoginForm()
  checkForm()
  // showDialog()
  regEventListener_showRegForm()
  logEventListener_showLogForm()
  regEventListener_checkForm()
  logEventListener_checkForm()

}

main()