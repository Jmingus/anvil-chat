(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
$(document).ready(function () {
  //variables
  var $form = $('form');

  //event listeners
  $form.submit(function (e) {
    e.preventDefault();
    if ($('#username').val() !== '' && $('#message').val() !== '') {
      chatBot($('#message').val());
      $.post('http://tiyfe.herokuapp.com/collections/anvil-chat', { user: { username: $('#username').val(),
          message: $('#message').val(),
          timecreated: moment().format('MMMM Do YYYY, h:mm:ss a')
        } }, function onPostRequestComplete(response) {
        console.log('post', response);
        playSound();
      }, 'json');
    } else {
      console.log('username or message can\'t be blank');
    }
    render();
  });

  $('#delete-server').click(deleteServer);
  setInterval(render, 2000);
  //functions

  function render() {
    $.get('http://tiyfe.herokuapp.com/collections/anvil-chat', function (response) {
      $('.row').text('');
      if (response === []) {
        console.log('nothing here yet');
      } else {

        for (var i = 0; i < response.length; i++) {
          $('.row').append('<div class="small-9 columns emote"><p><strong>' + response[i]['user[username]'] + '</strong>:' + response[i]['user[message]'] + '  ' + '<sub style="float:right;bottom: -3.25em">' + response[i]['user[timecreated]'] + '</sub></p>' + '</div><hr/>');
        }
        $('.emote').emoticonize();
      }
    }, 'json');
  };

  function chatBot(string) {
    $('#bot-box').text('');
    var $botBox = $('#bot-box');
    if (string.toLowerCase() === 'amiright') {
      $botBox.append('<div>You are so right?</div>');
    }
  };

  function playSound() {
    var audio = $('audio')[0];
    audio.play();
  }

  function deleteServer() {
    $.get('http://tiyfe.herokuapp.com/collections/anvil-chat', function (response) {
      response.forEach(function (response) {
        $.ajax({ url: 'http://tiyfe.herokuapp.com/collections/anvil-chat' + '/' + response._id, method: 'delete' });
      });
    }, 'json');
    $('.row').text('');
  }
});

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map