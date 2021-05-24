function showCarInputFields() { //peidab ja näitab inputfieldi
    document.getElementById("CarInputFields").style.display = (document.getElementById("CarInputFields").style.display == "none") ? "" : "none";
}

function registerCar(){
    //leiame ja salvestame väärtused input väljadelt
    let values = [] //Auto mudel ja nr
    let form = document.getElementById("CarInputFields")
    for (let i = 0; i < form.children.length; i++) {
        const element = form.children[i];
        if (element.tagName == "INPUT"){
            values.push(element.value)
        }
        
    }
    console.log(values)

    //registreerime
    //TODO
}