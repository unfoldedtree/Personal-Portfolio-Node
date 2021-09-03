const title = document.getElementById("modal-title")
const body = document.getElementById("modal-body")

if ($('#hireForm')) {
    document.querySelector('#hireForm').addEventListener('submit', (e) => {
    e.preventDefault();
    let subject = $('#subject').val();
    let remote = $('#remote');
    let email = $('#email').val();
    let message = $('#message').val();
    let hireDate =( $('#hire-date').val() ) ? $('#hire-date').val() : (new Date()).toLocaleDateString('fr-CA'); 

    let emailContent = `DATE: ${hireDate}\nEMAIL: ${email}\nMESSAGE: ${message}`;
    
    if ($('#remote:checked')) {
        subject += " (REMOTE)";
    }

    $.ajax({
        method: 'POST',
        url: '/service/send',
        dataType: 'json',
        accepts: 'application/json',
        data: {
            name: subject,
            message: emailContent
        },
        success: (data) => { title.innerHTML = data.title; body.innerHTML = data.content },
        error: (err) => {},
        complete: (data) => {
            // console.log(data)
            $('#hireForm')[0].reset();
            $('#modal-1').modal('show');
        }
    });

});
}