
document.addEventListener("mousemove", function(event) {
    let circle = document.querySelector(".circle");
    // Assign position to the circle element

circle.style.left= event.x+ "px";
circle.style.top= event.y+ "px";

  //circle.style.transform=`translate(${event.x}px,${event.y}px)`

   
});
