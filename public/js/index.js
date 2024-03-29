// index.js

let page = 1;
var isRun=true;

document.addEventListener('DOMContentLoaded', () => {
    fetchImages();

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY+100 >= document.body.offsetHeight) {
            if(isRun){
                setTimeout(function() {
                    fetchImages();
                    isRun=true;
                }, 300);
                isRun = false;
            }
        }
    });
});

function fetchImages() {
    fetch(`/api/images?page=${page}`)
        .then(response => response.json())
        .then(data => {
            // document.querySelector('#imglist').innerHTML='';
            let con = '';
            if (data.list.length > 0) {
                for (f of data.list) {
                    con += `<li style="background:url(${f.url}) 0 0 /  309px 309px ">
                  <div class="img_info">
                    <span class="heart_img"></span><span class="num">${f.like}</span><span class="msg_img"></span><span class="num">${f.msg}</span>
                  </div>
                  </li>`;
                }
                document.querySelector('#imglist ul').insertAdjacentHTML('beforeend', con);
                addEvent(document.querySelectorAll('#imglist li'));
                page++;

            }
        })
        .catch(error => console.error('Error fetching images:', error));
}

function addEvent(obj) {
    for (f of obj) {
        f.removeEventListener('mouseover',()=>{});
        f.removeEventListener('mouseleave',()=>{});
        f.addEventListener('mouseover', (event) => {
            event.target.querySelector('.img_info').style.display = 'flex';
        });
        f.addEventListener('mouseleave', (event) => {
            event.target.querySelector('.img_info').style.display = 'none';
        });
    }
}