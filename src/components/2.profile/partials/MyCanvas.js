import React, {useState, useEffect, useRef, useContext} from "react"
import {AppContext} from "../../../App";

import {
    getFirestore, collection, getDocs,query,where
} from 'firebase/firestore'
import Particle from "./Particle"

const db = getFirestore()
const colRef = collection(db, 'Users')


const MyCanvas = ({gender}) => {
    const canvasRef = useRef(null)
    const { state: { user: userF } } = useContext(AppContext);

    function calculateRelativeBrightness(red, green, blue){
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        )/100;
    }

    useEffect(() => {
        let src
        let avatar64Height

        if (!userF?.uid) return;
        const start = async () => {
            try {
                const q = query(collection(db, "Users"), where("UID", "==", userF.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    src = doc.data().avatar64
                    avatar64Height = doc.data().avatar64Height
                })

            } catch (e) {console.log(e)}
        }

 
        start().then(() => {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            const myImage = new Image();
            myImage.src = src

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
            return () => {}
        })
    }, [userF])

    return (<><canvas style={{display: "block"}} ref={canvasRef}/></>)
}

export default MyCanvas