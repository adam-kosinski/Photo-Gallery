let centerElement; //see getCenterElement()
let last_resize_time = -Infinity; //see scroll event handler

window.addEventListener("load", function () {
    addImage(0);
    centerElement = document.querySelector(".img_container"); //start at 0 scroll, so just use the first image
});

function addImage(i) {
    let cols = document.querySelectorAll(".column");
    let n_cols = cols.length;

    let div = document.createElement("div");
    div.classList.add("img_container");
    div.addEventListener("click", function(){
        openImage(div);
    });

    let img = document.createElement("img");
    img.src = "images/small/" + filenames[i];
    img.dataset.filename = filenames[i];
    img.classList.add("grid_image");
    div.appendChild(img);

    let shortest;
    let min_height = Infinity;
    for (let j = 0; j < n_cols; j++) {
        let col_height = cols[j].getBoundingClientRect().height;
        if (col_height < min_height) {
            min_height = col_height;
            shortest = cols[j];
        }
    }

    shortest.appendChild(div);

    img.addEventListener("load", function () {
        if (i + 1 < filenames.length) addImage(i + 1);
        
        img.classList.add("loaded");
    });
}





//keep track of the most center element so that when we resize the window, we can scroll to it
window.addEventListener("scroll", function(){
    if(last_resize_time + 50 < performance.now()){ //hack to prevent scrollIntoView from triggering a scroll event and changing the center element
        centerElement = getCenterElement();
    }
});
window.addEventListener("resize", function(){
    last_resize_time = performance.now();
    centerElement.scrollIntoView({block: "center"});
});
function getCenterElement(){
    let window_center = 0.5*window.innerHeight;
    let best;
    let min_diff = Infinity;

    document.querySelectorAll(".img_container").forEach(div => {
        let rect = div.getBoundingClientRect();
        let center = rect.top + 0.5*rect.height;
        let diff = Math.abs(center - window_center);
        if(diff < min_diff){
            min_diff = diff;
            best = div;
        }
    });

    return best;
}



function openImage(container){
    let img = container.firstElementChild;
    let rect = img.getBoundingClientRect();
    let zoom_img_container = document.getElementById("zoom_img_container");

    let img_copy = zoom_img_container.querySelector("img");
    img_copy.src = container.firstElementChild.src;
    img_copy.style.top = rect.top + "px";
    img_copy.style.left = rect.left + "px";
    img_copy.style.width = rect.width + "px";

    // img_copy.style.setProperty("--big-width")

    zoom_img_container.classList.add("visible");
}