$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html = `<div class="MessageList__Field">
                    <div class="MessageList__Field__Info">
                      <div class="MessageList__Field__Info__Username">
                        ${message.user_name}
                      </div>
                      <div class="MessageList__Field__Info__Date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="MessageList__Field__Comment">
                      <p class="Message__body">
                        ${message.body}
                      </p>
                      <img class="Message__image" src="${message.image}">
                    </div>
                  </div>`
      return html;
    }
    else {
      let html = `<div class="MessageList__Field">
                    <div class="MessageList__Field__Info">
                      <div class="MessageList__Field__Info__Username">
                        ${message.user_name}
                      </div>
                      <div class="MessageList__Field__Info__Date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="MessageList__Field__Comment">
                      <p class="Message__body">
                        ${message.body}
                      </p>
                    </div>
                  </div>`
      return html;
    };
  }
  $('.Form').on('submit',function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.MessageList').append(html);
      $('.MessageList').animate({ scrollTop: $('.MessageList')[0].scrollHeight});
      $('.Form')[0].reset();
      $('.MessageForm__Textbox__SendButton').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});