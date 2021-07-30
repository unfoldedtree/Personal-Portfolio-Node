
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
        url: 'https://formsubmit.co/wmcmahan14@gmail.com',
        dataType: 'json',
        accepts: 'application/json',
        data: {
            name: subject,
            message: emailContent
        },
        success: (data) => {},
        error: (err) => {},
        complete: () => {
            $('#hireForm')[0].reset();
            $('#modal-1').modal('show');
        }
    });

});
}