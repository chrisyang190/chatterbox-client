// YOUR CODE HERE:
var app = {
  message: {
    username: window.username,
    text: null,
    roomname: null
  },
  friends: [],
  rooms: [],
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages'
};

$(document).ready(function() {
  app.init = function() {

    // $('.username').on('click', app.handleUsernameClick.bind(this));
    $('body').on('click', '.username', function(e) {
      e.preventDefault();
      console.log('username');
      app.handleUsernameClick(e);
    });
    // $('.submit').on('submit', app.handleSubmit);
    $('form').on('submit', function(e) {
      e.preventDefault();
      app.handleSubmit();
      $('.textbox').val('');
    });
    $('.newroom').on('click', function() {
      var roomName = prompt('What is the new name of your room?');
      app.rooms.push(roomName);
      app.renderRoom(roomName);
      $('#roomselect').val(roomName);

      console.log('THIS');
    });

  };
  app.init();
  app.fetch();
  setInterval(app.fetch.bind(app), 2000);
  // app.fetch();
});

app.send = function(message) {
  console.log('APP SEND TEST');
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
  // $(e.target).addClass('bold');
  console.log('ETARGET:', e.target);
  app.friends.push(newFriend);
  console.log('Friends pushed: ', app.friends);
};

app.handleSubmit = function() {
  //configure the message
  app.message.text = $('.textbox').val();
  app.message.username = window.location.search.slice(10);
  app.message.roomname = $('#roomselect option:selected').text();
  // console.log(app.message);
  app.send(app.message);

};
var newMessages = [];
app.fetch = function() {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: {'order': '-createdAt'},
    contentType: 'application/json',
    success: function (data) {
      console.log('data is:', data);

      newMessages = [];
      data.results.forEach(function(value) {
        newMessages.push(value);
      });
      $('#chats').children('div').remove();
      newMessages.forEach(function(value) {
        if (value.roomname === $('#roomselect option:selected').text()) {
          app.renderMessage(value);
        }
      });

      // $('#roomselect').children('option').remove();
      data.results.forEach(function(value) {
        // console.log(app.rooms);
        console.log(JSON.stringify(value.roomname));
        var roomname = value.roomname.toString();
        if (app.rooms.indexOf(value.roomname) === -1) {
          app.rooms.push(value.roomname);
          app.renderRoom(value.roomname);
        }
      });
      
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
  var username = JSON.stringify(message.username);
  var text = JSON.stringify(message.text);

  // var username = message.username.toString();
  // var text = message.text.toString();
  console.log(`${username}  ${text}`);
  if (app.friends.indexOf(message.username) > -1) {
    // var username = $('<p></p>');
    // username.text();
    $('#chats').append(`<div class='message'><span><a href="#" class="username">${username}</a></span>  <b>${text}</b></div>`);
  } else {
    $('#chats').append(`<div class='message'><span><a href="#" class="username">${username}</a></span>  ${text}</div>`);
  }
  // $('.message').slice(20).remove();
};

app.renderRoom = function(roomname) {
  $('#roomselect').prepend(`<option>${roomname}</option>`);
  // console.log('hi.');
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




