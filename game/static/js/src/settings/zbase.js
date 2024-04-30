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
      ".ac-game-settings-error-message"
    );
    this.$login_register = this.$login.find(".ac-game-settings-option");

    this.$login.hide();

    this.$register = this.$settings.find(".ac-game-settings-register");
    this.$register_username = this.$register.find(
      ".ac-game-settings-username input"
    );
    this.$register_password = this.$register.find(
      ".ac-game-settings-password-first input"
    );
    this.$register_password_confirm = this.$register.find(
      ".ac-game-settings-password-second input"
    );
    this.$register_submit = this.$register.find(
      ".ac-game-settings-submit button"
    );
    this.$register_error_message = this.$register.find(
      ".ac-game-settings-error-message"
    );
    this.$register_login = this.$register.find(".ac-game-settings-option");

    this.$register.hide();

    this.root.$ac_game.append(this.$settings);

    this.start();
  }

  start() {
    this.getinfo();
    this.add_listening_events();
  }

  add_listening_events() {
    this.add_listening_events_login();
    this.add_listening_events_register();
  }

  add_listening_events_login() {
    let outer = this;

    this.$login_register.click(function () {
      outer.register();
    });
  }

  add_listening_events_register() {
    let outer = this;

    this.$register_login.click(function () {
      outer.login();
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

  getinfo() {
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
