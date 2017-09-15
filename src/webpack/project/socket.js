function socketFunc(socket) {
  socket.on('test', (param) => {
    console.log('client socket event test');
  });
}

export {socketFunc};