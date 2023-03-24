const ul = document.querySelector('ul');

function mouseDown(e) {
    if (e.target.tagName != "LI") return 0;
    clicked = e.target;
    elmX = clicked.getBoundingClientRect().left;
    elmY = clicked.getBoundingClientRect().top;
    gapX = e.clientX - elmX;
    gapY = e.clientY - elmY;
    //再びドラッグしようとするとtranslateが(0,0)になり、元の場所に戻ってしまう。
    //taranslateの値をtlX,tlYに保存し、加算する必要がある。
    if(String(e.target.outerHTML).match("translate")){
        let row = String(e.target.outerHTML).match(/translate\(.+\)/);
        let nums = row[0].match(/[0-9]{1,}/g);
        tlX = Number(nums[0]);
        tlY = Number(nums[1]);
        // console.log(`tlX, tlY =${tlX}, ${tlY}`);
    } else {
        tlX=0;
        tlY=0;
    }
    clicked.style.transform = `translate(${tlX + e.clientX-gapX-elmX}px, ${tlY + e.clientY-gapY-elmY}px)`;
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
};

function mouseMove(e){
    if(clicked){
        clicked.style.transform = `translate(${tlX + e.clientX-gapX-elmX}px, ${tlY + e.clientY-gapY-elmY}px)`;
    }
}

function mouseUp(){
    if(!clicked) return;
    elmX = clicked.getBoundingClientRect().left;
    elmY = clicked.getBoundingClientRect().top;
    clicked = null;
    elmX = null;
    elmY = null;
    gapX = null;
    gapY = null;
    mouseMove = null;
}


ul.addEventListener('mousedown', mouseDown);

//drag時の薄い影のようなものをなくす
document.addEventListener('dragstart', e=>{
    e.preventDefault();
})

