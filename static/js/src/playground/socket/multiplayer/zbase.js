class MultiPlayerSocket {
  constructor(playground) {
    this.playground = playground;

    this.ws = new WebSocket("ws://127.0.0.1:8000/wss/multiplayer/");

    this.start();
  }

  start() {
    this.receive();
  }

  receive() {
    let outer = this;
    this.ws.onmessage = function (e) {
      let data = JSON.parse(e.data);
      uuid = data.uuid;
      if (uuid === outer.uuid) return false;

      let event = data.event;
      if (event === "create_player") {
        outer.receive_create_player(uuid, outer.username, outer.photo);
      } else if (event === "move_to") {
        outer.receive_move_to(uuid, data.tx, data.ty);
      }
    };
  }

  send_create_player(username, photo) {
    let outer = this;
    this.ws.send(
      JSON.stringify({
        event: "create player", // 'event'
        uuid: outer.uuid, // 'uuid'
        username: username, // 'username'
        photo: photo, // 'photo'
      }),
    );
  }

  get_player(uuid) {
    let players = this.playground.players;
    for (let i = 0; i < players.length; i++) {
      if (players[i].uuid === uuid) return players[i];
    }
    return null;
  }

  receive_create_player(uuid, username, photo) {
    let player = new Player(
      this.playground,
      this.playground.width / 2 / this.scale,
      0.5,
      0.05,
      "white",
      0.2,
      "enemy",
      username,
      photo,
    );
    player.uuid = uuid;
    this.playground.players.push(player);
  }

  send_move_to(tx, ty) {
    let outer = this;
    this.ws.send(
      JSON.stringify({
        event: "move_to",
        uuid: outer.uuid,
        tx: tx,
        ty: ty,
      }),
    );
  }

  receive_move_to(uuid, tx, ty) {
    let player = this.get_player(uuid);

    if (player) player.move_to(tx, ty);
  }
}
