// scripts.js

let page = 1;

document.addEventListener('DOMContentLoaded', () => {
    fetchImages();

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            page++;
            fetchImages();
        }
    });
});

function fetchImages() {
    fetch(`/api/images?page=${page}`)
        .then(response => response.json())
        .then(data => {
            const gallery = document.querySelector('.gallery');
            data.forEach(image => {
                const img = document.createElement('img');
                img.src = image.url;
                gallery.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching images:', error));
}
