class Particle {
    constructor(width, height, pixelsImage, context, color){
        this.color = color
        this.context = context
        this.pixelsImage = pixelsImage
        this.height = height
        this.width = width
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.speed = 0;
        this.size = Math.random() * 2.5 + 0.2;
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);

    }
    update(){
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        if ((this.pixelsImage[this.position1])&&(this.pixelsImage[this.position1][this.position2])){
            this.speed = this.pixelsImage[this.position1][this.position2][0];
        }
        this.size = this.speed * 3;


        this.y -= 0.3;
        this.x += 0.3;
        if (this.y <= 0){
            this.y = this.height;
            this.x = Math.random() * this.width;
        }
        if (this.x >= this.width){
            this.x = 0;
            this.y = Math.random() * this.height;
        }
    }
    draw(){
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.context.fill();
    }
}

export default Particle