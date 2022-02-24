if ($('#contact-form')) {
    document.querySelector('#contact-form').addEventListener('submit', (e) => {
        
    e.preventDefault();

    const thisForm = document.querySelector('#contact-form');
    thisForm.querySelector('.loading').classList.add('d-block');
    thisForm.querySelector('.error-message').classList.remove('d-block');
    thisForm.querySelector('.sent-message').classList.remove('d-block');

    email_form_submit(thisForm);
});
}

function email_form_submit(thisForm) {

    // let subject = $('#subject').val();
    // let remote = $('#remote');
    // let email = $('#email').val();
    // let message = $('#message').val();
    // let hireDate =( $('#hire-date').val() ) ? $('#hire-date').val() : (new Date()).toLocaleDateString('fr-CA'); 

    let name = $('#name').val();
    let email = $('#email').val();
    let subject = $('#subject').val();
    let message = $('#message').val();
    let hireDate =( $('#hire-date').val() ) ? $('#hire-date').val() : (new Date()).toLocaleDateString('fr-CA'); 

    let emailContent = `DATE: ${hireDate}\nNAME: ${name}\nEMAIL: ${email}\nMESSAGE: ${message}`;
    
    // if ($('#remote:checked')) {
    //     subject += " (REMOTE)";
    // }
    console.log("Email Body")
    console.log(emailContent)

    $.ajax({
        method: 'POST',
        url: '/service/send',
        dataType: 'json',
        accepts: 'application/json',
        data: {
            name: subject,
            message: emailContent
        },
        success: (data) => {
            thisForm.querySelector('.loading').classList.remove('d-block'); 
            thisForm.querySelector('.sent-message').classList.add('d-block');
        },
        error: (err) => {
            displayError(thisForm, err);
        },
        complete: (data) => {
            thisForm.reset();
        }
    });


    // fetch(action, {
    //   method: 'POST',
    //   body: formData,
    //   headers: {'X-Requested-With': 'XMLHttpRequest'}
    // })
    // .then(response => {
    //   if( response.ok ) {
    //     return response.text()
    //   } else {
    //     throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
    //   }
    // })
    // .then(data => {
    //   thisForm.querySelector('.loading').classList.remove('d-block');
    //   if (data.trim() == 'OK') {
    //     thisForm.querySelector('.sent-message').classList.add('d-block');
    //     thisForm.reset(); 
    //   } else {
    //     throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
    //   }
    // })
    // .catch((error) => {
    //   displayError(thisForm, error);
    // });
}

function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error.responseJSON.content;
    thisForm.querySelector('.error-message').classList.add('d-block');

    setTimeout(() => {
        thisForm.querySelector('.error-message').innerHTML = "";
        thisForm.querySelector('.error-message').classList.remove('d-block');
    }, 8000)
}