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
                con+=`<li style="background:url(${f.url}) 0 0 /  287px 287px "></li>`;
            }
            con+='</ul>';
            document.querySelector('#imglist').innerHTML=con;
            addEvent(document.querySelectorAll('#imglist li'));
        })
        .catch(error => console.error('Error fetching images:', error));
}

function addEvent(obj){
    for(f of obj){
        f.addEventListener('mouseover',(event)=>{
            // event.target.append("<div></div>")
        });
    }
}
