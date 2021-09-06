const photos = document.querySelectorAll('.carousel-photo')


function removeHidden(photo) {
    setTimeout(function () {
        photo.classList.add('show')
    }, 100)
}

window.addEventListener('scroll', () => {
    photos.forEach(photo => {
        removeHidden(photo)
    })
})