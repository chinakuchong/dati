// index.js

let page = 1;
let sData;

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
            sData=data;
        })
        .catch(error => console.error('Error fetching images:', error));
}
