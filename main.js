//1. CANVAS
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//2. CONSTANTES
var interval;
var cuadros;
var sonidos = {
    ost: ('./sounds/koc.mp3'),
}
var imagenes = {
    human: ('./images/Characters/Humanity/Human-fighter_3.png'),   
    alien: ('./images/Characters/Covenant/Alien-spacecraft_3.png'),
    humanfireball: ('./images/Characters/Humanity/Human-fireball.png'),
    alienfireball: ('./images/Characters/Covenant/Alien-fireball.png'),
    fondo: ('./images/bg/Outer Space.jpg')
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

class Bala {
    constructor(character){
        this.y = character.y;
        this.width = 50;
        this.height = 50;
        this.x = character.x + this.width;
        this.vX = 20;
        this.image = new Image;
        this.image.src = imagenes.humanfireball;
        this.image.onload = function(){
            this.draw();
        }.bind(this)
}
draw(){
    this.x += this.vX;
    ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
}
}//Termina constructor de Bala

class BalaAlien {
    constructor(character){
        this.y = character.y;
        this.width = 50;
        this.height = 50;
        this.x = character.x - this.width;
        this.vX = -20;
        this.image = new Image;
        this.image.src = imagenes.alienfireball;
}
draw(){
    this.x += this.vX;
    ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
}
}//Termina constructor de BalaAlien


class Human {
    constructor(){
        this.width = 60;
        this.height = 60;
        this.x = 10;
        this.y = ((canvas.height/2) - (this.height/2)); // Posición inicial en el centro del mapa.
        this.balas = []; 
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

    class Alien {
        constructor(){
            this.width = 60;
            this.height = 60;
            this.x = canvas.width-100;
            this.y = ((canvas.height/2)-(this.height/2));
            this.balasAlien = []; 
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

//4. INSTANCIAS
var mapa = new Mapa();
var human = new Human();
var alien = new Alien();
//var alienfireball = new AlienFireball();
//var humanfireball = new HumanFireball();


//5. FUNCIONES PRINCIPALES
function update(){
    if(cuadros < 30 )cuadros++;
    ctx.clearRect(0,0,canvas.width,canvas.height); 
    mapa.draw();
    human.draw();
    alien.draw();
    drawDisparo();
    drawDisparoAlien();
    
}

function start(){
   // if (interval) return; <-- Para que se usó?
    interval = setInterval(update, 1000/60);
    sound.play()
}

//6. FUNCIONES AUXILIARESv
function crearDisparo(){
    var humanfireball = new Bala(human);
    human.balas.push(humanfireball);   
}
function drawDisparo(){
    human.balas.forEach(function(humanfireball){
        humanfireball.draw();
    });
}
//  *  *  * ALIEN SIDE  *  *  *
function crearDisparoAlien(){
    var alienfireball = new BalaAlien(alien);
    alien.balasAlien.push(alienfireball);   
}
function drawDisparoAlien(){
        alien.balasAlien.forEach(function(alienfireball){
        alienfireball.draw();
    });
}

//7. LISTENERS
addEventListener('keydown', function (h){
    switch(h.keyCode) {
        case 87:                                                                //ArrowUp
            if (human.y - (human.height/2 + 10)  < 0) return;                   // Si la posición en 'Y' de 'humano' menos la altura propia de 'humano'
            human.y -=30;                                                       // ES MAYOR QUE cero, entonces ya no avances hacia arriba;
            break;
        case 83:                                                                //ArrowDown
            if (human.y + human.height/2 + 50> (canvas.height)) return;
            human.y += 30;
            break;
        case 70:                                                                //KeyL
            crearDisparo();
            break;

//  *  *  * ACCIONES PARA ALIEN SIDE  *  *  *
        case 38:                                                                // KeyW -> UP
            if (alien.y - (alien.height/2 + 10)  < 0) return;                   // Si la posición en 'Y' de 'humano' menos la altura propia de 'humano'
            alien.y -=30;                                                       // ES MAYOR QUE cero, entonces ya no avances hacia arriba;
            // break;
            // if (alien.y - alien.height < 0) return;                          // Si la posición en 'Y' de 'alien' menos la altura propia de 'alien'    
            //alien.y -= 30;                                                    // ES MAYOR QUE cero, entonces ya no avances hacia arriba;
            break;
        case 40:                                                                // KeyS -> Down
            if (alien.y + alien.height/2 + 50> (canvas.height)) return;
            alien.y += 30;
            break;
        case 76:                                                                // KeyF
        crearDisparoAlien();
            break;
        }
    });

start();


/*
 multitudes
multiplayer
pantalla de seleccion
Arrlglasr clases
*/




/* 
  * * * * * SE PUEDE AHORRAR CODIGO INSTANCIADO PERSONAJES Y BALAS. * * * * *
*/
// class Character {
//     constructor(x,y,img){
//         this.x = x;
//         this.y = y;
//         this.width = 50;
//         this.height = 50;
//         this.image = new Image;
//         this.image.src = img;
//         this.image.onload = function(){
//             this.draw();
//         }.bind(this)
// }
// draw(){
//     ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
// }
// }

// class Human extends Character{
//     constructor(){
//         super (x,y,img,draw);
//         this.bala = [];
//     }
// }

// class Alien extends Character{
//     constructor(){
//         super (x,y,img,draw);
//         this.bala = [];
//     }
// }