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
            // document.querySelector('#imglist').innerHTML='';
            let con='';
            for(f of data){
                con+=`<li style="background:url(${f.url}) 0 0 /  309px 309px ">
                <div class="img_info">
                  <span class="heart_img"></span><span class="num">999</span><span class="msg_img"></span><span class="num">666</span>
                </div>
                </li>`;
            }
            document.querySelector('#imglist ul').insertAdjacentHTML('beforeend',con);
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
