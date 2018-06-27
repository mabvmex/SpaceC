//1. CANVAS
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//2. CONSTANTES
var interval;
var cuadros;
var fire = [];
var sonidos = {
    ost: ('./sounds/koc.mp3'),
}
var imagenes = {
    human: ('./images/Characters/Humanity/Human-fighter_1.png'),   
    humanfireball: ('./images/Characters/Humanity/Human-fireball.png'),
    alien: ('./images/Characters/Covenant/Alien-spacecraft_1.png'),
    alienfireball: ('./images/Characters/Covenant/Alien-fireball.png'),
    fondo: ('./images/bg/Outer Space.jpg')
    //fondo: ('./images/bg/bg-1.png')
    //fondo: ('./images/bg/space-artworkjpg.jpg')
};
var sound = new Audio();
    sound.src = sonidos.ost;
    sound.loop = true;



//3. CLASES
class Mapa {
    constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = imagenes.fondo;
    this.image.onload = function(){
        this.draw();
    }.bind(this);
}
    draw(){
        this.x-=3; // Velocidad de desplazamiento hacia el origen de las 'X' de la imagen de fondo; (se regresa 'N'px en cada refresco)
        if(this.x < -this.width) this.x=0;  // Si la posición del fondo en 'X' es menor que su PROPIA LONGITUD, coloca la imagen en 'X' = 0
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image, this.x + this.width,this.y,this.width,this.height); //Dibujate en 'X' después de ti misma con la misma altura y misma longitud
    }
} //Termina la clase MAPA
      

class Human {
    constructor(){
        this.width = 50;
        this.height = 50;
        this.x = 10;
        this.y = ((canvas.height/2) - (this.height/2)); // Posición inicial en el centro del mapa.
        this.image = new Image();
        this.image.src = imagenes.human;
        this.image.onload = function(){
            this.draw();
        }.bind(this)
    }
    draw(){
        this.x, this.y;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }

} //Termina la clase Human

    class HumanFireball {
        constructor(){
            this.x = human.x + human.width; //posición automática delante de Character
            this.y = human.y;
            this.width = 40;
            this.height = 50;
            this.image = new Image();
            this.image.src = imagenes.humanfireball;
            this.image.onload = function(){
                this.draw();
            }.bind(this)
        }
        draw(){
            this.x, this.y;
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        }
    } //Termina la clase Humanfireball

    class Alien {
        constructor(){
            this.x = canvas.width-100; // 964;//canvas.width - 100;//
            this.y = 235;
            this.width = 50;
            this.height = 50;
            this.image = new Image();
            this.image.src = imagenes.alien;
            this.image.onload = function(){
                this.draw();
            }.bind(this)
        }
        draw(){
            this.x, this.y;
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        }
    } //Termina la clase Alien

    class AlienFireball {
        constructor(){
            this.x = 850; //this.x + human.x posicion automatica delante del human
            this.y = 35;
            this.width = 30;
            this.height = 40;
            this.image = new Image();
            this.image.src = imagenes.alienfireball;
            this.image.onload = function(){
                this.draw();
            }.bind(this)
        }
        draw(){
            this.x, this.y;
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        }
    } //Termina la clase AlienFireball


//4. INSTANCIAS
var mapa = new Mapa();
var human = new Human();
var humanFireball = new HumanFireball();
var alien = new Alien();
var alienFireball = new AlienFireball();

//5. FUNCIONES PRINCIPALES
function update(){
    cuadros++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    mapa.draw();
    human.draw();
    humanFireball.draw();
    alien.draw();
    alienFireball.draw();
}

function start(){
    if (interval) return;
    interval = setInterval(update, 1000/60);
    sound.play()

}

//6. FUNCIONES AUXILIARES
function disparar(){
    var fire = new Fuego(human);   //<-- Es el disparo -->
    human.humanFireball.push(fire);    // fire es el arreglo donde se guardan los diaparos.
}

function drawDisparo(){
    human.humanFireball.forEach(function(d){
        d.draw();
    });
}

//7. LISTENERS
addEventListener('keydown', function (e){
    switch(e.keyCode) {

    //     if (mario.x === 0) return //Si mario llegó a cero, ya no restes (return)
    //     mario.x -= 64;
    //     break;
    // case 39://Right arrow key
    // if (mario.x === canvas.width - mario.width) return 
    //     mario.x += 64;
    //     break;


        case 38: //ArrowUp
            if (human.y - (human.height/2 + 10)  < 0) return;    // Si la posición en 'Y' de 'humano' menos la altura propia de 'humano'
            human.y -=30;   
            sound.play()                       // ES MAYOR QUE cero, entonces ya no avances hacia arriba;
                break;
        case 40: //ArrowDown
            if (human.y + human.height/2 + 50> (canvas.height)) return;
            console.log(canvas.height)
                human.y += 30;
                break;
        case 76:  //KeyL
            console.log("Disparando con L");
            disparar();
            drawDisparo();
            break;
           
            //ACCIONES PARA ALIEN/UP2
        case 87: //KeyW -> UP
        if (alien.y - (alien.height/2 + 10)  < 0) return;    // Si la posición en 'Y' de 'humano' menos la altura propia de 'humano'
        alien.y -=30;                          // ES MAYOR QUE cero, entonces ya no avances hacia arriba;
            break;

            if (alien.y - alien.height < 0) return; // Si la posición en 'Y' de 'alien' menos la altura propia de 'alien'    
            alien.y -= 100;                         // ES MAYOR QUE cero, entonces ya no avances hacia arriba;
            break;
        case 83: //KeyS -> Down
        if (alien.y + alien.height/2 + 50> (canvas.height)) return;
        console.log(canvas.height)
            alien.y += 30;
            break;
        case 70: //KeyF
            disparar();
            drawDisparo();
            break;
    }
});

start();

// disparar balas
// multitudes
//multiplayer
//teclas simultaneas
//pantalla de seleccion
//Arrlglasr clases