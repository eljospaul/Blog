$("#submit-form").submit((e)=>{
    e.preventDefault()
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwM4NvhNom5r2JneUwD1i-vDd2ph4qj51YphA31fht4QmYbOZzwkGxRBc3FXwg_9f5S/exec",
        data: $("#submit-form").serialize(),
        method: "post",
        success: function (response){
            window.location.href="/sent.html"
        },
        error: function (err){
            alert("Something Error")

        }
    })
})