//1. CANVAS
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//2. CONSTANTES
var interval;
var cuadros;

var imagenes = {
    human: ('./images/Characters/Humanity/Human-fighter_1.png'),   
    humanfireball: ('./images/Characters/Humanity/Human-fireball.png'),
    alien: ('./images/Characters/Covenant/Alien-spacecraft_1.png'),
    alienfireball: ('./images/Characters/Covenant/Alien-fireball.png'),
    fondo: ('./images/bg/Outer Space.jpg')
    //fondo: ('./images/bg/bg-1.png')
    //fondo: ('./images/bg/space-artworkjpg.jpg')
};
var fire = [];
var sonidos = { tema: ('./sounds/MarioMainTheme.mp3')};


//3. CLASES
class Tablero {
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
} //Termina la clase Tablero
      

class Human {
    constructor(){
        this.x = 10;
        this.y = 10;
        this.width = 50;
        this.height = 50;
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
            this.x = 120; //this.x + human.x posicion automatica delante del human
            this.y = 35;
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
            this.x = 924;//canvas.width - 100;//
            this.y = 20;
            this.width = 80;
            this.height = 90;
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
var tablero = new Tablero();
var human = new Human();
var humanFireball = new HumanFireball();
var alien = new Alien();
var alienFireball = new AlienFireball();

//5. FUNCIONES PRINCIPALES
function update(){
    cuadros++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    tablero.draw();
    human.draw();
    humanFireball.draw();
    alien.draw();
    alienFireball.draw();
}

function start(){
    if (interval) return;
    interval = setInterval(update, 1000/60);

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
        case 38: //ArrowUp
            if (human.y - human.height  < 0) return;    // Si la posición en 'Y' de 'humano' menos la altura propia de 'humano'
            human.y -=100;                          // ES MAYOR QUE cero, entonces ya no avances hacia arriba;
                break;
        case 40://ArrowDown
            if (human.y + human.height > canvas.height) return;
            console.log(canvas.height)
                human.y += 100;
                break;
        case 76:  //KeyL
            console.log("Disparando con L");
            disparar();
            drawDisparo();
            break;
           
            //ACCIONES PARA ALIEN/UP2
        case 87: //KeyW -> UP
            if (alien.y - alien.height < 0) return; // Si la posición en 'Y' de 'alien' menos la altura propia de 'alien'    
            alien.y -= 100;                         // ES MAYOR QUE cero, entonces ya no avances hacia arriba;
            break;
        case 83: //KeyS -> Down
            if (alien.y === 0) return;
            alien.y += 100;
            break;
        case 70: //KeyF
            disparar();
            drawDisparo();
            break;
    }
});

start();