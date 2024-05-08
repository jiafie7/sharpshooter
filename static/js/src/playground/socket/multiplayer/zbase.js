class MultiPlayerSocket {
  constructor(playground) {
    this.playground = playground;

    this.ws = new WebSocket("ws://127.0.0.1:8000/wss/multiplayer/");

    this.start();
  }

  start() {}

  send_create_player() {
    this.ws.send(
      JSON.stringify({
        message: "hello acapp server",
      }),
    );
  }
}
