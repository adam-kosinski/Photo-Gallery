window.addEventListener("load", function () {
    addImage(0);
});

function addImage(i){
    let cols = document.querySelectorAll(".column");
    let n_cols = cols.length;

    let div = document.createElement("div");
    div.classList.add("img_container");
    let img = document.createElement("img");
    img.src = "images/" + filenames[i];
    div.appendChild(img);

    let shortest;
    let min_height = Infinity;
    for(let j = 0; j < n_cols; j++){
        let col_height = cols[j].getBoundingClientRect().height;
        if(col_height < min_height){
            min_height = col_height;
            shortest = cols[j];
        }
    }

    shortest.appendChild(div);

    if(i+1 < filenames.length){
        img.addEventListener("load", function(){
            addImage(i+1);
            img.classList.add("loaded");
        });
    }
}