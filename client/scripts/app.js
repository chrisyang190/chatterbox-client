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

$(document).ready(function() {
  app.init = function() {

    // $('.username').on('click', app.handleUsernameClick.bind(this));
    $('body').on('click', '.username', function(e) {
      e.preventDefault();
      console.log('username')
      app.handleUsernameClick(e);
    });
    // $('.submit').on('submit', app.handleSubmit);
    $('form').on('submit', function(e) {
      e.preventDefault();
      app.handleSubmit();
    });
    $('#roomselect').on('change', function() {
      if ($(this).val() === 'New Room...') {
        var roomName = prompt('What is the new name of your room?');
        app.renderRoom(roomName);
        console.log('THIS');
      }
    });

  };
  app.init();
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
  console.log(app.message);
  app.send(app.message);

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
      data.results.forEach(function(value) {
        if (value.roomname === $('#roomselect option:selected').text()) {
          app.renderMessage(value);
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
  if (app.friends.indexOf(message.username) > -1) {
    $('#chats').prepend(`<div><span><a href="#" class="username">${message.username}</a></span>  <b>${message.text}</b></div>`);
  } else {
    $('#chats').prepend(`<div><span><a href="#" class="username">${message.username}</a></span>  ${message.text}</div>`);
  }
};

app.renderRoom = function(roomname) {
  $('#roomselect').prepend(`<option>${roomname}</option>`);
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




