// index.js

let page = 1;

document.addEventListener('DOMContentLoaded',  () => {
    fetchImages();

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            page++;
            fetchImages();
        }
    });
});

function  fetchImages() {
    fetch(`/api/images?page=${page}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('#imglist').innerHTML='';
            let con='<ul>';
            for(f of data){
                con+='<li style="background:url({$f.url}) 287.66px 287.66px/0 0 no-report"></li>';
            }
            con+='</ul>';
        })
        .catch(error => console.error('Error fetching images:', error));
}

