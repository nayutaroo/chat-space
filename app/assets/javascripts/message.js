$(function(){

  function buildHTML(message) {

    if (message.image){

      var html = `<div class="message">` +
      `<div class="message__info">` +
      `<div class="messenger">` +
      message.user_name +
      `</div>` +
      `<div class="time">` +
      message.created_at +
      `</div>` +
      `</div>` 

      if(message.body){
        html += 
        `<div class="message__text">` +
        message.body 
      }

      html +=
      `</div>` +
      `<img src="` + message.image + `" class="message__image" >` +
      `</div>`
    }
    else{
      var html = `<div class="message">` +
      `<div class="message__info">` +
      `<div class="messenger">` +
      message.user_name +
      `</div>` +
      `<div class="time">` +
      message.created_at +
      `</div>` +
      `</div>` 

      if(message.body){
        html += 
        `<div class="message__text">` +
        message.body 
      }
    }

    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var url = $(this).attr('action');
    var formData = new FormData(this);

    $.ajax({
      url:  url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.chat-main__message-list').append(html);
      // $('.btn__send').prop('disabled',false);
      $('form')[0].reset(); //フォームをリセットする
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
      $('.btn__send').prop('disabled',false);
    })

    $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
  })
})