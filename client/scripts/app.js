// YOUR CODE HERE:
var app = {
  message: {
    username: window.username,
    text: null,
    roomname: null
  },
  friends: [],
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages'
};

app.init = function() {
  $(document).ready(function() {

    $('.username').on('click', app.handleUsernameClick.bind(this));
    $('.submit').on('submit', app.handleSubmit.bind(this));
    $('.newRoom').on('change', app.renderRoom.bind(this));

  });
};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

};
app.handleUsernameClick = function(e) { 
  var newFriend = $(e.target).text();
  app.friends.push(newFriend);
};

app.handleSubmit = function(input) {
  //configure the message
  app.message.text = $('textarea').val();
  app.message.username = undefined;
  app.message.roomname = '';

};

app.fetch = function() {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: Object,
    contentType: 'application/json',
    success: function (data) {
      console.log('data is:', data);
      // test(data);
      // chatterbox = JSON.parse(data);
      console.log('chatterbox is: ', chatterbox); 
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();

};

app.renderMessage = function(message) {
  $('#chats').prepend('<p><a href="#" class="username">${message.userName}</a> ${message.text}</p>');
};

app.renderRoom = function(roomname) {
  $('#roomSelect').prepend('<option>${roomname}</option>');
  console.log('hi.');
};



// var filterRoom = function(obj) {
//   obj.results[0].text;
// };


// setInterval(function() {
//   $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//     url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
//     type: 'GET',
//     data: Object,
//     contentType: 'application/json',
//     success: function (data) {
//       console.log('data is:', data);
//       // test(data);
//       // chatterbox = JSON.parse(data);
//       console.log('chatterbox is: ', chatterbox); 
//     },
//     error: function (data) {
//       // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//       console.error('chatterbox: Failed to receive message', data);
//     }
//   }); }, 1000);

// setInterval(function() {
//   $.get(`http://parse.sfm6.hackreactor.com/chatterbox/classes/messages`, function (data) {
//     console.log(data);
//   }
//   ); }, 500);

// var test = function(obj) {
//   console.log(obj.results)
// };




