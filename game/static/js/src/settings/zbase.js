class Settings {
  constructor(root) {
    this.root = root;
    this.platform = "WEB";
    if (this.root.AcOS) this.platform = "ACAPP";

    this.username = "";
    this.photo = "";

    this.$settings = $(`
<div class="ac-game-settings">
  <div class="ac-game-settings-login">
    <div class="ac-game-settings-title">
      Sharpshooter
    </div>
    <div class="ac-game-settings-username">
      <div class="ac-game-settings-item">
        <input type="text" placeholder="Username">
      </div>
    </div>
    <div class="ac-game-settings-password">
      <div class="ac-game-settings-item">
        <input type="password" placeholder="Password">
      </div>
    </div>
    <div class="ac-game-settings-submit">
      <div class="ac-game-settings-item">
        <button>Log In</button>
      </div>
    </div>
    <div class="ac-game-settings-tool">
      <div class="ac-game-settings-error-message">
      </div>
      <div class="ac-game-settings-option">
        Sign up
      </div>
    </div>
    <div class="ac-game-settings-github">
      <div class="ac-game-settings-third-party">
        <a href="#" class="ac-game-settings-login-link">
          <img src="http://127.0.0.1:8000/static/image/settings/github_logo.png">
          <span>Continue with GitHub</span>
        </a>
      </div>
    </div>
  </div>

  <div class="ac-game-settings-register">
    <div class="ac-game-settings-title">
      Sharpshooter
    </div>
    <div class="ac-game-settings-username">
      <div class="ac-game-settings-item">
        <input type="text" placeholder="Username">
      </div>
    </div>
    <div class="ac-game-settings-password ac-game-settings-password-first">
      <div class="ac-game-settings-item">
        <input type="password" placeholder="Password">
      </div>
    </div>
    <div class="ac-game-settings-password ac-game-settings-password-second">
      <div class="ac-game-settings-item">
        <input type="password" placeholder="Confirm password">
      </div>
    </div>
    <div class="ac-game-settings-submit">
      <div class="ac-game-settings-item">
        <button>Sign Up</button>
      </div>
    </div>
    <div class="ac-game-settings-tool">
      <div class="ac-game-settings-error-message">
      </div>
      <div class="ac-game-settings-option">
        Log in
      </div>
    </div>
    <div class="ac-game-settings-github">
      <div class="ac-game-settings-third-party">
        <a href="#" class="ac-game-settings-login-link">
          <img src="http://127.0.0.1:8000/static/image/settings/github_logo.png">
          <span>Continue with GitHub</span>
        </a>
      </div>
    </div>

  </div>

</div>
`);
    this.$login = this.$settings.find(".ac-game-settings-login");
    this.$login_username = this.$login.find(".ac-game-settings-username input");
    this.$login_password = this.$login.find(".ac-game-settings-password input");
    this.$login_submit = this.$login.find(".ac-game-settings-submit button");
    this.$login_error_message = this.$login.find(
      ".ac-game-settings-error-message",
    );
    this.$login_register = this.$login.find(".ac-game-settings-option");

    this.$login.hide();

    this.$register = this.$settings.find(".ac-game-settings-register");
    this.$register_username = this.$register.find(
      ".ac-game-settings-username input",
    );
    this.$register_password = this.$register.find(
      ".ac-game-settings-password-first input",
    );
    this.$register_password_confirm = this.$register.find(
      ".ac-game-settings-password-second input",
    );
    this.$register_submit = this.$register.find(
      ".ac-game-settings-submit button",
    );
    this.$register_error_message = this.$register.find(
      ".ac-game-settings-error-message",
    );
    this.$register_login = this.$register.find(".ac-game-settings-option");

    this.$register.hide();

    this.$acwing_login = this.$settings.find(".ac-game-settings-github a");

    this.root.$ac_game.append(this.$settings);

    this.start();
  }

  start() {
    if (this.platform === "ACAPP") {
      this.getinfo_acapp();
    } else {
      this.getinfo_web();
      this.add_listening_events();
    }
  }

  add_listening_events() {
    let outer = this;
    this.add_listening_events_login();
    this.add_listening_events_register();

    this.$acwing_login.click(function () {
      outer.acwing_login();
    });
  }

  add_listening_events_login() {
    let outer = this;

    this.$login_register.click(function () {
      outer.register();
    });
    this.$login_submit.click(function () {
      outer.login_on_remote();
    });
  }

  add_listening_events_register() {
    let outer = this;

    this.$register_login.click(function () {
      outer.login();
    });
    this.$register_submit.click(function () {
      outer.register_on_remote();
    });
  }

  acwing_login() {
    $.ajax({
      url: "http://127.0.0.1:8000/settings/acwing/web/apply_code/",
      type: "GET",
      success: function (resp) {
        if (resp.result === "success") {
          window.location.replace(resp.apply_code_url);
        }
      },
    });
  }

  // log in to server
  login_on_remote() {
    let outer = this;
    let username = this.$login_username.val();
    let password = this.$login_password.val();
    this.$login_error_message.empty();

    $.ajax({
      url: "http://127.0.0.1:8000/settings/login/",
      type: "GET",
      data: {
        username: username,
        password: password,
      },
      success: function (resp) {
        console.log(resp);
        if (resp.result === "success") {
          location.reload();
        } else {
          outer.$login_error_message.html(resp.result);
        }
      },
    });
  }

  // register to server
  register_on_remote() {
    let outer = this;

    let username = this.$register_username.val();
    let password = this.$register_password.val();
    let password_confirm = this.$register_password_confirm.val();
    this.$register_error_message.empty();

    $.ajax({
      url: "http://127.0.0.1:8000/settings/register/",
      type: "GET",
      data: {
        username: username,
        password: password,
        password_confirm: password_confirm,
      },
      success: function (resp) {
        if (resp.result === "success") {
          location.reload();
        } else {
          outer.$register_error_message.html(resp.result);
        }
      },
    });
  }

  // log out from server
  logout_on_remote() {
    if (this.platform === "ACAPP") return false;

    $.ajax({
      url: "http://127.0.0.1:8000/settings/logout/",
      type: "GET",
      success: function (resp) {
        if (resp.result === "success") {
          location.reload();
        }
      },
    });
  }

  // open register page
  register() {
    this.$login.hide();
    this.$register.show();
  }

  // open login page
  login() {
    this.$register.hide();
    this.$login.show();
  }

  acapp_login(appid, redirect_uri, scope, state) {
    let outer = this;

    this.root.AcOS.api.oauth2.authorize(
      appid,
      redirect_uri,
      scope,
      state,
      function (resp) {
        if (resp.result === "success") {
          (outer.username = resp.username),
            (outer.photo = resp.photo),
            outer.hide();
          outer.root.menu.show();
        }
      },
    );
  }

  getinfo_acapp() {
    let outer = this;

    $.ajax({
      url: "http://127.0.0.1:8000/settings/acwing/acapp/apply_code/",
      type: "GET",
      success: function (resp) {
        if (resp.result === "success") {
          outer.acapp_login(
            resp.appid,
            resp.redirect_uri,
            resp.scope,
            resp.state,
          );
        }
      },
    });
  }

  getinfo_web() {
    let outer = this;

    $.ajax({
      url: "http://127.0.0.1:8000/settings/getinfo/",
      type: "GET",
      data: {
        platform: outer.platform,
      },
      success: function (resp) {
        console.log(resp);
        if (resp.result === "success") {
          outer.username = resp.username;
          outer.photo = resp.photo;
          outer.hide();
          outer.root.menu.show();
        } else {
          outer.login();
        }
      },
    });
  }

  hide() {
    this.$settings.hide();
  }

  show() {
    this.$settings.show();
  }
}
