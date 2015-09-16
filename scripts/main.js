'use strict';
$(document).ready(function(){
//variables
  var $form = $('form');

//event listeners
  $form.submit(function(e){
    e.preventDefault()
    if($('#username').val() !== '' && $('#message').val() !==''){
      $.post(
      'http://tiyfe.herokuapp.com/collections/anvil-chat',
      {user: {username: $('#username').val(),
              message: $('#message').val(),
              timecreated: moment().format('MMMM Do YYYY, h:mm:ss a')
      }},
      function onPostRequestComplete(response){
        console.log('post', response)
      },
      'json'
      );
    }else{
      console.log('username or message can\'t be blank')
    }
    render()
  });

  $('#delete-server').click(deleteServer)
  setInterval(render,2000);
//functions

  function render(){
      $.get(
        'http://tiyfe.herokuapp.com/collections/anvil-chat',
        function(response) {
          $('#chat-box').text('')
          if(response === []){
            console.log('nothing here yet')
          }else{

            for(var i = 0; i < response.length; i ++){
              $('#chat-box').append('<div class="emote">'+response[i]['user[username]'] +' | '
                + response[i]['user[message]'] +'  '
                +'<sub>'+response[i]['user[timecreated]']+'</sub>'+'</div')
            }
            $('.emote').emoticonize();
          }
      },
      'json'
      );
    };

  function deleteServer(){
    $.get('http://tiyfe.herokuapp.com/collections/anvil-chat',
      function(response){
        response.forEach(function(response){
          $.ajax({url:'http://tiyfe.herokuapp.com/collections/anvil-chat'+'/'+response._id, method: 'delete'})
        }
      )},
      'json');
    $('#chat-box').text('')
  }


});
