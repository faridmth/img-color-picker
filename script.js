
let pallete = document.querySelector('.pallete')
let plusBtn = document.querySelector('.plus')
let minceBtn = document.querySelector('.mince')
let hexInp = document.querySelector('.hex-inp')
let rgbInp = document.querySelector('.rgb-inp')
let hexCopy = document.querySelector('.hex-copy')
let rgbCopy = document.querySelector('.rgb-copy')
let showClrReal = document.querySelector('#show-clr-rgb')
let showClr = document.querySelector('.show-clr')
let colorPN = 8;



rgbInp.value='rgb(62,176,210)'
hexInp.value='3eb0d2'
showClr.style.backgroundColor= 'rgb(62,176,210)'


// Get pixel data from the clicked point
document.querySelector("#img").addEventListener('mousemove', ()=> {
    showClrReal.style.backgroundColor= getColor()
});
document.querySelector("#img").addEventListener('click', ()=>{
    let clr = getColor()
    rgbInp.value=clr
    hexInp.value=rgbToHex(clr)
    showClr.style.backgroundColor= clr

});




getPal(colorPN)

plusBtn.addEventListener('click',()=>{
    if(colorPN<15){
        colorPN++
        getPal(colorPN)
        
    }
})
minceBtn.addEventListener('click',()=>{
    if(colorPN>4){
        colorPN--
        getPal(colorPN)
    }
    
})
hexCopy.addEventListener('click',()=>{
    hexInp.select();
    hexInp.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(hexInp.value);
})
rgbCopy.addEventListener('click',()=>{
    rgbInp.select();
    rgbInp.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(rgbInp.value);
})



//upload
let upBtn = document.querySelector('#up-btn')
upBtn.addEventListener('click',()=>{
    document.getElementById('fileInput').click()

})
document.getElementById('fileInput').addEventListener('change', function() {
    var file = this.files[0];
    var reader = new FileReader();
    console.log('1')
    reader.onload = function(event) {
        document.querySelector("#img").src = event.target.result;
        setTimeout(() => {
           plusBtn.click()
           minceBtn.click()
           console.log('2')

        }, 1000);
        setTimeout(() => {
            plusBtn.click()
            minceBtn.click()
            console.log('3')

         }, 3000);
    }

    reader.readAsDataURL(file);
    
});









// functions
function getPal(noc){
    pallete.innerHTML=""
    let colors;
    while(colors==null){
        pallete.innerHTML=""
        var colorThief = new ColorThief();
        colors = colorThief.getPalette(document.querySelector("#img"),noc);    
    }

    for(i=0;i<colors.length;i++){
        let newDiv = document.createElement('div')
        let newPointDiv = document.createElement('div')
        newPointDiv.style.display='none'
        newDiv.addEventListener('click',()=>{
            let points = document.querySelectorAll('.pallete div div')
            points.forEach(point => {
                point.style.display='none'
            });
            newPointDiv.style.display='block'
            console.log(newDiv.style.backgroundColor)
            rgbInp.value=newDiv.style.backgroundColor
            hexInp.value=rgbToHex(newDiv.style.backgroundColor)
            showClr.style.backgroundColor= newDiv.style.backgroundColor
        
        })
        
        newDiv.style.backgroundColor = `rgb(${colors[i][0]},${colors[i][1]},${colors[i][2]})`;
        newDiv.appendChild(newPointDiv)
        pallete.appendChild(newDiv)
    }
 

  
}


function getColor(){
    // Assuming you have an image element with id 'myImage'
    var img = document.querySelector("#img");
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    // Set canvas dimensions to match image
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image onto the canvas
    context.drawImage(img, 0, 0, img.width, img.height);

    var x = event.offsetX;
    var y = event.offsetY;
    var pixelData = context.getImageData(x, y, 1, 1).data;
    var color = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] + ')';
    return color
}
function rgbToHex(rgb) {
    var values = rgb.match(/\d+/g);
    var r = parseInt(values[0]);
    var g = parseInt(values[1]);
    var b = parseInt(values[2]);

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    var red = componentToHex(r);
    var green = componentToHex(g);
    var blue = componentToHex(b);

    return "#" + red + green + blue;
}

var rgbColor = "rgb(228,241,241)";
var hexColor = rgbToHex(rgbColor);

