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
    this.ws.onmessage = function (e) {
      let data = JSON.parse(e.data);
      console.log(data);
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
}
