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
      Login
    </div>
    <div class="ac-game-settings-username">
      <div class="ac-game-settings-item">
        <input type="text" placeholder="Username">
      </div>
    </div>
  </div>
  <div class="ac-game-settings-register">
  </div>
</div>
`);
    this.$login = this.$settings.find(".ac-game-settings-login");
    this.$login.hide();

    this.$register = this.$settings.find(".ac-game-settings-register");
    this.$register.hide();

    this.root.$ac_game.append(this.$settings);

    this.start();
  }

  start() {
    this.getinfo();
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
