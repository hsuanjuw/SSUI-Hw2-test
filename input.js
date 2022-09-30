/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/
let selectedDiv;
let draggedDiv;
let draggedOffset_x;
let draggedOffset_y;

let mouse_x, mouse_y;

let mouseMoved;
let dbclicked = false;
let lastTouchedEndTime = 0;

let touchStartTime, touchEndTime, touchStarted;
let touchStartTime2, lastTouchStartTime = 0;

let resized = false;
let touch0_x, touch0_y, touch1_x, touch1_y;
let originalSize;

let targetDivs = document.querySelectorAll(".target");
targetDivs.forEach(target => {
    target.addEventListener("click", e => {
        console.log("click");
        e.stopPropagation();
        if (!mouseMoved) { // if mouse is not moving, change div color
            changeColor(e);             
        }
        else {
            mouseMoved = false;
        }
    } );

    target.addEventListener("mousedown", e => {
        //console.log("mousedown");
        if(!dbclicked){
            draggedDiv = e.target;
            draggedOffset_x = e.offsetX;
            draggedOffset_y = e.offsetY;

            mouse_x = e.clientX;
            mouse_y = e.clientY;
        }
    });

    target.addEventListener("mouseup", e => {
        //console.log("mouseup");
        draggedDiv = null;
        if (dbclicked) {
            dbclicked = false;
        }
    });

    target.addEventListener("dblclick", e => {
        //console.log("dbclick");
        dbclicked = true;
        draggedDiv = e.target;
        draggedOffset_x = e.offsetX;
        draggedOffset_y = e.offsetY;
        changeColor(e);
    });

    // Touch Events
    target.addEventListener("touchstart", e => {
        e.preventDefault();
        //e.stopPropagation();
        touchStartTime = new Date().getTime();

        if (e.touches.length === 1) {
            // click
            if(!dbclicked){
                console.log("db touch not on");
                draggedDiv = e.target;
            }
            mouse_x = e.touches[0].clientX;
            mouse_y = e.touches[0].clientY;
            draggedOffset_x = mouse_x - draggedDiv.getBoundingClientRect().left;
            draggedOffset_y = mouse_y - draggedDiv.getBoundingClientRect().top; 
        }
    });

    target.addEventListener("touchend", e => {
        touchEndTime = new Date().getTime();
        var touchTime = touchEndTime - touchStartTime;

        if (touchEndTime - lastTouchedEndTime < 500) { // double touch 
            console.log("db touch on");
            dbclicked = true;
            changeColor(e);
            draggedDiv = e.target;
        } 
        else{
            draggedDiv = null;
            if (mouseMoved) { // dragging 
                mouseMoved = false;
            }
            else if (dbclicked && touchTime < 500) { // db touch end 
                dbclicked = false;          
            } 
            else if (!dbclicked){ // one touch = click
                changeColor(e); 
            }
        }
        lastTouchedEndTime = touchEndTime;
    });

});

let bgDiv = document.querySelector("#workspace");
bgDiv.addEventListener("click", e => {
    if (selectedDiv != null) {
        selectedDiv.style.backgroundColor = "red";
    }
});

bgDiv.addEventListener("mousemove", e => {
    if (draggedDiv != null || dbclicked) {
        console.log("mousemove");
        console.log(dbclicked);
        followCursor(e);
        mouseMoved = true;
    }
});

bgDiv.setAttribute("tabindex", -1);
bgDiv.focus();
bgDiv.addEventListener("keydown", (e) => {
    //console.log("keydown");
    if (e.code == "Escape") {
        if (mouseMoved) {
            mouseMoved = false;
            dbclicked = false;
            draggedDiv.style.top =  `${mouse_y - draggedOffset_y}px`;
            draggedDiv.style.left= `${mouse_x - draggedOffset_x}px`;
            draggedDiv = null;                
        }
    }
});

bgDiv.addEventListener("touchmove", e => {
    if ( draggedDiv!= null || dbclicked) {
        //console.log("touchmove");
        followCursor(e.touches[0]);
        mouseMoved = true;
    } 
    else if(resized && selectedDiv!= null){
        console.log("start resizing");
        //var divWidth = parseInt(selectedDiv.style.width,10);
        //var newLength = Math.abs(e.touches[0].clientX  - e.touches[1].clientX) - Math.abs(touch0_x - touch1_x);  
        var newDivWidth = Math.abs(e.touches[0].clientX  - e.touches[1].clientX);
        if (newDivWidth >= 10 ){
            if(e.touches[0].clientX < e.touches[1].clientX){
                draggedDiv.style.left= `${e.touches[0].clientX }px`;
            }
            else{
                draggedDiv.style.left= `${e.touches[1].clientX }px`;
            }
            
            selectedDiv.style.width = newDivWidth.toString() + "px";
        }
        console.log(selectedDiv.style.width);
        //console.log(newLength);
        //console.log(newDivWidth);

        //selectedDiv.style.width = newDivWidth.toString() + "px";
        //console.log(selectedDiv.style.width);
    }
});

bgDiv.addEventListener("touchstart", e => {
    touchStartTime2 = new Date().getTime();
    if (e.touches.length === 1){
        touchStarted = true;
    }
    else if (e.touches.length === 2) {
        touch0_x = e.touches[0].clientX;
        touch0_y = e.touches[0].clientY;
        touch1_x = e.touches[1].clientX;
        touch1_y = e.touches[1].clientY;
        console.log(touchStartTime2);
        console.log(lastTouchStartTime);

        if( touchStartTime2 - lastTouchStartTime < 1500 || !touchStarted){
            console.log("resizing");
            resized = true;
            originalSize = parseInt(selectedDiv.style.width,10);
        }
        else{
            console.log("cancel dragging");
            mouseMoved = false;
            dbclicked = false;
            draggedDiv.style.top =  `${mouse_y - draggedOffset_y}px`;
            draggedDiv.style.left= `${mouse_x - draggedOffset_x}px`;
            draggedDiv = null;             
        }
    
        lastTouchStartTime = touchStartTime2;
    // if (e.touches.length === 1){
    //     touchStarted = true;
    // }
    // else if (e.touches.length === 2) {
    //     touch0_x = e.touches[0].clientX;
    //     touch0_y = e.touches[0].clientY;
    //     touch1_x = e.touches[1].clientX;
    //     touch1_y = e.touches[1].clientY;

    //     if(!touchStarted){
    //         console.log("resizing");
    //         resized = true;
    //         originalSize = parseInt(selectedDiv.style.width,10);
    //     }
    //     else{
    //         console.log("cancel dragging");
    //         mouseMoved = false;
    //         dbclicked = false;
    //         draggedDiv.style.top =  `${mouse_y - draggedOffset_y}px`;
    //         draggedDiv.style.left= `${mouse_x - draggedOffset_x}px`;
    //         draggedDiv = null;             
    //     }
        // if (touchStartTime - lastTouchedTime > 500) { 
        //     console.log("cancel dragging");
        //     mouseMoved = false;
        //     dbclicked = false;
        //     draggedDiv.style.top =  `${mouse_y - draggedOffset_y}px`;
        //     draggedDiv.style.left= `${mouse_x - draggedOffset_x}px`;
        //     draggedDiv = null;  
        // }
        // else {
        //     console.log("resizing");
        //     resized = true;
        // }          
    }
});

bgDiv.addEventListener("touchend", e => {
    if(e.touches.length === 1) {
        resized = false;
        touchStarted = false;
    }
});

function changeColor(e){
    if (selectedDiv != null) {
        selectedDiv.style.backgroundColor = "red";
    }
    e.target.style.backgroundColor = "blue";
    selectedDiv = e.target; 
}

function followCursor(e){
    draggedDiv.style.top =  `${e.clientY - draggedOffset_y}px`;
    draggedDiv.style.left= `${e.clientX - draggedOffset_x}px `;
}


