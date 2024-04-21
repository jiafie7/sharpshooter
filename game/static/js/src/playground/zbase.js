class AcGamePlayground {
  constructor(root) {
    this.root = root;
    this.$playground = $(`<div class="ac-game-playground"></div>`);

    //this.hide();
    this.root.$ac_game.append(this.$playground);

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
        this.height * 0.15, // speed
        true // is_me
      )
    );

    // add enemy
    for (let i = 0; i < 5; i++) {
      new Player(
        this,
        this.width / 2,
        this.height / 2,
        this.height * 0.05,
        "blue",
        this.height * 0.15,
        false
      );
    }

    this.start();
  }

  start() {}

  show() {
    this.$playground.show();
  }

  hide() {
    this.$playground.hide();
  }
}
