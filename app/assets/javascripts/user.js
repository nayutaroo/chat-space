$(function(){
  var search_list = $('#user-search-result');

  function  appendUser(user){
    var html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
    </div>
    `
    search_list.append(html);
  }

  function appendErrMsgToHTML(){
    var html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">ユーザーが見つかりません</p>
    </div>
            `
    search_list.append(html);
  }

  function appendChatMember(name, id){
    var html = `
    <div class='chat-group-user'>
      <input name='group[user_ids][]' type='hidden' value='${id}'>
      <p class='chat-group-user__name'>${name}</p>
      <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
    </div>
    `
    $("#chat-group-users").append(html);
  }

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();   //フォームの値を取得して変数に代入する

    $.ajax({
      type: 'GET',    //HTTPメソッド
      url: '/users',       //users_controllerの、indexアクションにリクエストの送信先を設定する
      dataType: 'json',
      data: {keyword: input},   //テキストフィールドに入力された文字を設定する
    })
    .done(function(users){
       search_list.empty();
       if(users.length !== 0){
         users.forEach(function(user){
          appendUser(user);
         })
       }
       else if(input.length == 0){
          return false;
       }
       else{
        appendErrMsgToHTML();
       }
    })
    .fail(function(){
      alert("ユーザーの検索に失敗しました。");
    });
  });

  $(document).on('click', ".chat-group-user__btn--add", function(){
    data = $(this).data();
    $(this).parent().remove();
    appendChatMember(data.userName, data.userId);
  });

  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this).parent().remove();
  });
});