mailalerton: function(){
    $('.mail_alert').click(function(){
            $.ajax({
                url:  '/mailalert/activate/' + $(this).attr('data-value'),
            });
        }
        $(this).toggleClass('icon-off');
    });
},