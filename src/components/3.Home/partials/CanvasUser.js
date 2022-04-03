import React, {useRef, useEffect} from "react"
import Particle from "../../2.profile/partials/Particle";
import {getDocs} from "firebase/firestore";

const CanvasUser = ({gender, avatar64, avatar64Height}) => {
    const canvasRef = useRef(null)


    function calculateRelativeBrightness(red, green, blue){
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        )/100;
    }


    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        const myImage = new Image();
        myImage.src = avatar64

        canvas.width = window.innerWidth;
        canvas.height = avatar64Height;

        setTimeout(() => {
            context.drawImage(myImage, 0, 0, canvas.width, canvas.height);
            const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
            context.clearRect(0, 0, canvas.width, canvas.height);

            let particlesArray = [];
            const numberOfParticles = 2000;

            let mappedImage = [];
            for (let y = 0; y < canvas.height; y++){
                let row = [];
                for (let x = 0; x < canvas.width; x++){
                    const red = pixels.data[(y * 4 * pixels.width) + (x * 4)];
                    const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)];
                    const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)];
                    const brightness = calculateRelativeBrightness(red, green, blue);
                    let cellBrightness;
                    let cellColor;
                    const cell = [
                        cellBrightness = brightness,
                        cellColor = 'rgb(' + red + ',' + green + ',' + blue + ')'
                    ];
                    row.push(cell);
                }
                mappedImage.push(row);
            }

            const color = gender === "kobieta" ? "red" : "blue"
            function init(){
                for (let i = 0; i < numberOfParticles; i++){
                    particlesArray.push(new Particle(canvas.width, canvas.height, mappedImage, context, color));
                }
            }
            init();

            function animate(){
                context.globalAlpha = 0.8;
                context.fillStyle = 'rgb(0, 0, 0)';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.globalAlpha = 0.1;
                for (let i = 0; i < particlesArray.length; i++){
                    particlesArray[i].update();
                    context.globalAlpha = particlesArray[i].speed * 0.2;
                    particlesArray[i].draw();
                }
                requestAnimationFrame(animate);
            }
            animate();

        }, 0)


    }, [])

    return (<canvas style={{display: "block"}} ref={canvasRef}/>)
}

export default CanvasUser