window.addEventListener("load", function () {
    let cols = document.querySelectorAll(".column");
    let n_cols = cols.length;

    let i = 0;

    let interval = setInterval(function(){

        let img = document.createElement("img");
        img.src = "images/small/" + filenames[i];

        let shortest;
        let min_height = Infinity;
        for(let j = 0; j < n_cols; j++){
            let col_height = cols[j].getBoundingClientRect().height;
            if(col_height < min_height){
                min_height = col_height;
                shortest = cols[j];
            }
        }

        shortest.appendChild(img);

        i++;
        if(i == filenames.length) clearInterval(interval);
    }, 10);
});