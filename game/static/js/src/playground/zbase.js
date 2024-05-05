class AcGamePlayground {
  constructor(root) {
    this.root = root;
    this.$playground = $(`<div class="ac-game-playground"></div>`);

    this.hide();
    this.root.$ac_game.append(this.$playground);

    this.start();
  }

  get_random_color() {
    let colors = ["blue", "red", "green", "yellow", "pink", "purple"];
    return colors[Math.floor(Math.random() * 6)];
  }

  start() {
    let outer = this;
    $(window).resize(function () {
      outer.resize();
    });
  }

  resize() {
    console.log("resize");

    this.width = this.$playground.width();
    this.height = this.$playground.height();
    let unit = Math.min(this.width / 16, this.height / 9);
    this.width = unit * 16;
    this.height = unit * 9;
    this.scale = this.height;
  }

  show() {
    this.$playground.show();

    this.resize();

    this.width = this.$playground.width();
    this.height = this.$playground.height();
    this.game_map = new GameMap(this);
    this.players = [];
    this.players.push(
      new Player(
        this,
        this.width / 2, // x coordinate
        this.height / 2, // y coordinate
        this.height * 0.05, // radius
        "white", // color
        this.height * 0.3, // speed
        true, // is_me
      ),
    );

    // add enemy
    for (let i = 0; i < 5; i++) {
      this.players.push(
        new Player(
          this,
          this.width / 2,
          this.height / 2,
          this.height * 0.05,
          this.get_random_color(),
          this.height * 0.1,
          false,
        ),
      );
    }
  }

  hide() {
    this.$playground.hide();
  }
}
