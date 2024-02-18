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
    fetch(`/api/images?page=${page}`)
        .then(response => response.json())
        .then(data => {
            console.log(document.querySelector('#imglist').outerHTML);
            var template=document.querySelector('#imglist').innerHTML;
            var rendertmp=ejs.render(template,{data:data});
            document.querySelector('#imglist-con').innerHTML=rendertmp;

            console.log(ejs.renderFile('./pages/item.ejs', data, {}, function(err, str){
                // str => Rendered HTML string
            }));
        })
        .catch(error => console.error('Error fetching images:', error));
}
