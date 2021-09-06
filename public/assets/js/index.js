const photos = document.querySelectorAll('.carousel-photo')
const scrollTriggerDiv = document.getElementById('scroll-trigger')


function removeHidden(photo) {
    setTimeout(function () {
        photo.classList.add('show')
    }, 100)
}

window.addEventListener('scroll', () => {
    if ( scrollTriggerDiv.getBoundingClientRect().top <= 100 ) {
        photos.forEach(photo => {
            removeHidden(photo)
        })
    }
})

window.addEventListener('load', () => {
    if ( scrollTriggerDiv.getBoundingClientRect().top <= 100 ) {
        photos.forEach(photo => {
            removeHidden(photo)
        })
    }
})