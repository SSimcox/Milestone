/**
 * Created by Steven on 12/6/2016.
 */


function Planet(m,px,py,vx,vy){
    this.mass = m;
    this.posx = px;
    this.posy = py;
    this.velx = vx;
    this.vely = vy;
    this.accelx = 0;
    this.accely = 0;
}

var ap = [vec4(0.5,0.25,0.0,1.0),vec4(0,0.25,0.0,1.0),vec4(0.5,0.0,0.2,1.0)];
var dp = [vec4(0.75,0.37,0.0,1.0),vec4(0,0.77,0.5,1.0),vec4(0.5,0.2,0.6,1.0)];
var sp = [vec4(1.0,0.5,0.0,1.0),vec4(0,1.0,0.75,1.0),vec4(0.5,0.5,1.0,1.0)];

var planets = [];
var oldPlanets = [];

var G = 6.67384E-11;
var interval = 0.001;
var iters = 40;

function firstCalc(){
    for(var i = 0; i < 3; ++i) {
        oldPlanets[i] = new Planet(getMass("m"+i), getInt("p"+i+"x"), getInt("p"+i+"y"), getInt("v"+i+"x"), getInt("v"+i+"y"));
        planets[i] = oldPlanets[i];
        planets[i].ap = ap[i];
        planets[i].dp = dp[i];
        planets[i].sp = sp[i];
    }
    //3.
    initialAcceleration(planets[0],oldPlanets[1],oldPlanets[2]);
    initialAcceleration(planets[1],oldPlanets[0],oldPlanets[2]);
    initialAcceleration(planets[2],oldPlanets[0],oldPlanets[1]);

    //4.
    for(var i = 0; i < 3; ++i) {
        firstHalfValue(oldPlanets[i], planets[i]);
    }
}

function nextCalc(){
    for(var i = 0; i < iters; ++i){
        initialAcceleration(oldPlanets[0],oldPlanets[1],oldPlanets[2]);
        initialAcceleration(oldPlanets[1],oldPlanets[0],oldPlanets[2]);
        initialAcceleration(oldPlanets[2],oldPlanets[0],oldPlanets[1]);
    }
    for(var i = 0; i < 3; ++i){
        updateVelocity(planets[i],oldPlanets[i]);
        updatePosition(planets[i],oldPlanets[i]);
        updateOldPosition(planets[i],oldPlanets[i]);
    }
}

function getInt(id){
    return parseInt($('#'+ id).val());
}

function getMass(id){
    var exponent = $('#'+ id).val().slice(2);
    console.log(exponent);
    return Math.pow(10,exponent);
}

//eq. 18-21
function initialAcceleration(change,p1,p2){
    change.accelx = G*p1.mass *(p1.posx - change.posx) / radius(change,p1);
    change.accely = G*p1.mass *(p1.posy - change.posy) / radius(change,p1);
    change.accelx += G*p2.mass *(p2.posx - change.posx) / radius(change,p2);
    change.accely += G*p2.mass *(p2.posy - change.posy) / radius(change,p2);
}

//eq. 25
function firstHalfValue(p,cur){
    p.posx = cur.posx +0.5*interval*cur.velx+0.25*(interval*interval)*cur.accelx;
    p.posy = cur.posy +0.5*interval*cur.vely+0.25*(interval*interval)*cur.accely;
}


function radius(p1,p2){
    var r = Math.pow(p1.posx - p2.posx,2) + Math.pow(p1.posy - p2.posy, 2);
    return Math.sqrt(r*r*r);
}

//eq. 23
function updateVelocity(change, old){
    change.velx = change.velx + interval * old.accelx;
    change.vely = change.vely + interval * old.accely;
}

//eq. 24
function updatePosition(change, old){
    change.posx = old.posx + 0.5 * interval * change.velx;
    change.posy = old.posy + 0.5 * interval * change.vely;
}

function updateOldPosition(change,old){
    old.posx = change.posx + 0.5 * interval * change.velx;
    old.posy = change.posy + 0.5 * interval * change.vely;
}

