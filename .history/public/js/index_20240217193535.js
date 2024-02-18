// index.js

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
    alert('a');
    fetch(`/api/images?page=${page}`)
        .then(response => response.json())
        .then(data => {
            var template=$('#imglist').html();
            var rendertmp=ejs.render(template,{data:data});
            $('#imglist-con').html(rendertmp);
        })
        .catch(error => console.error('Error fetching images:', error));
}
