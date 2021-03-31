
// import test from 'jest';
// import puppeteer from 'puppeteer';
const { GET, POST, PUT, DELETE, POST_FILE, GET_FILE } = require('./src/restClientPuppeteer');
let __URL__, __DB__, Headers, Body, Response, ResponseText, ResponseJSON, Data;

const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
exec("ps aux | grep \"node_modules/puppeteer\" | grep -v grep | awk '{print $2}' | { while read PID; do kill -9 $PID; done }");

async function db () {
    try {
        const MongoClient = require('mongodb').MongoClient;
        const client = await MongoClient.connect(__DB__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        // console.log('Testing MongoClient is conected');
        return client.db('twittor');
    } catch (e) {
        console.log(e);
    }
}

function cl(value) {
    console.log(value);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

sleep(500);
jest.setTimeout( 60 *1000);

const DecodeJWT = token => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
};

const jwt_decode = require('jwt-decode');
const faker = require('faker');
const { ObjectId } = require('mongodb');




const jwt = require('jsonwebtoken');
const { URLSearchParams } = require('url');
var path = require("path");
var __DIR_APP__ = path.resolve(".");
// const config = require('../src/config');
const secret = 'MastersDelDesarrollo_grupoDeFacebook'; // jwt/jwt.go








                                                    
//             88888888ba,    88888888ba               
//             88      `"8b   88      "8b              
//             88        `8b  88      ,8P              
//             88         88  88aaaaaa8P'              
//             88         88  88""""""8b,              
//             88         8P  88      `8b              
//             88      .a8P   88      a8P              
//             88888888Y"'    88888888P"               
                                                    
// 888888888888                          888888888888  

__DB__ = 'mongodb+srv://root:XDwJ2WgmXeLYCzUw@cluster0.lji8t.mongodb.net/twittor?retryWrites=true&w=majority';
__DB__ = 'mongodb://root:123456@localhost:27017';







//             88        88  88888888ba   88                       
//             88        88  88      "8b  88                       
//             88        88  88      ,8P  88                       
//             88        88  88aaaaaa8P'  88                       
//             88        88  88""""88'    88                       
//             88        88  88    `8b    88                       
//             Y8a.    .a8P  88     `8b   88                       
//              `"Y8888Y"'   88      `8b  88888888888              
                                                                
// 888888888888                                      888888888888  

__URL__ = 'https://twittornat.herokuapp.com';
__URL__ = 'http://127.0.0.1:8080';












// 88888888ba                           88                                               
// 88      "8b                          ""               ,d                              
// 88      ,8P                                           88                              
// 88aaaaaa8P'  ,adPPYba,   ,adPPYb,d8  88  ,adPPYba,  MM88MMM  8b,dPPYba,   ,adPPYba,   
// 88""""88'   a8P_____88  a8"    `Y88  88  I8[    ""    88     88P'   "Y8  a8"     "8a  
// 88    `8b   8PP"""""""  8b       88  88   `"Y8ba,     88     88          8b       d8  
// 88     `8b  "8b,   ,aa  "8a,   ,d88  88  aa    ]8I    88,    88          "8a,   ,a8"  
// 88      `8b  `"Ybbd8"'   `"YbbdP"Y8  88  `"YbbdP"'    "Y888  88           `"YbbdP"'   
//                          aa,    ,88                                                   
//                           "Y8bbdP"                                                    
                                                                                      
// 88        88                                                  88                      
// 88        88                                                  ""                      
// 88        88                                                                          
// 88        88  ,adPPYba,  88       88  ,adPPYYba,  8b,dPPYba,  88   ,adPPYba,          
// 88        88  I8[    ""  88       88  ""     `Y8  88P'   "Y8  88  a8"     "8a         
// 88        88   `"Y8ba,   88       88  ,adPPPPP88  88          88  8b       d8         
// Y8a.    .a8P  aa    ]8I  "8a,   ,a88  88,    ,88  88          88  "8a,   ,a8"         
//  `"Y8888Y"'   `"YbbdP"'   `"YbbdP'Y8  `"8bbdP"Y8  88          88   `"YbbdP"'          

//      .only
//      .skip
describe('Endpoint POST /registro, registro de usuario', () => {

    //.only
    //.skip
    it('Default', async () => {

        // Enviando peticion 
        const Headers = {
            'Content-Type': 'application/json'
        }
        const date = parseInt(Date.now());
        const email = `pablot${date}@registro.com`;
        const Body = {
            "email": email,
            "password": "123456",
            "nombre": `Pablo ${date}`,
            "apellidos": `Tilotta ${date}`,
            "fechaNacimiento": "1970-06-30T00:00:00Z"
        }
        let ResponseText = await POST(`${__URL__}/registro`, Headers, Body);

        // Verificando que el registro se haya realizado en la base de datos
        const DB_usuario = await (await db()).collection('usuarios').findOne({email: email});
        expect(DB_usuario._id).toBeDefined();
        expect(DB_usuario.email).toBe(email);

        // Volviendo a registrar el mismo usuario
        ResponseText = await POST(`${__URL__}/registro`, Headers, Body);

        // // Chequeando respuesta
        expect(ResponseText).toContain('Ya existe un usuario registrado con ese email');
    
    });

});






















async function registerAndLogin() {
    // Creando el usuario
    const date = parseInt(Date.now());
    const email = `pablot${date}@registro.com`;
    const password = `123456_${date}`;

    // Registrando/guardando el usuario en MongoDB
    const Headers = {
        'Content-Type': 'application/json'
    }
    let Body = {
        "email": email,
        "password": password,
        "nombre": `Pablo ${date}`,
        "apellidos": `Tilotta ${date}`,
        "fechaNacimiento": "1970-06-30T00:00:00Z"
    }
    let ResponseText = await POST(`${__URL__}/registro`, Headers, Body);

    // Verificando que el registro se haya realizado en la base de datos
    const DB_usuario = await (await db()).collection('usuarios').findOne({email: email});
    expect(DB_usuario.email).toBe(email);

    // Realizamos el login con el usuario previamente registrado/guardado
    Body = {
        email,
        password
    }
    ResponseText = await POST(`${__URL__}/login`, Headers, Body);
    const ResponseJSON = JSON.parse(ResponseText);

    // Chequeando respuesta
    // expect(ResponseJSON.token).toBeDefined();
    expect(ResponseJSON.token).toBeDefined();

    const token_decoded = jwt_decode(ResponseJSON.token);

    // Chequeando integridad del token
    expect(token_decoded.email).toBe(email);
    expect(token_decoded.email).toBe(DB_usuario.email);

    return {email, DB_usuario, ResponseJSON};
}


// 88                                    88               
// 88                                    ""               
// 88                                                     
// 88           ,adPPYba,    ,adPPYb,d8  88  8b,dPPYba,   
// 88          a8"     "8a  a8"    `Y88  88  88P'   `"8a  
// 88          8b       d8  8b       88  88  88       88  
// 88          "8a,   ,a8"  "8a,   ,d88  88  88       88  
// 88888888888  `"YbbdP"'    `"YbbdP"Y8  88  88       88  
//                           aa,    ,88                   
//                            "Y8bbdP"                    

//      .only
//      .skip
describe('Endpoint POST /login, login', () => {

    //.only
    //.skip
    it('Default', async () => {
        await registerAndLogin();
    });



    //.only
    //.skip
    it("Respuesta para usuario no resgistrado", async () => {
        
        const Headers = {
            'Content-Type': 'application/json'
        }

        const __NO_EXIST__ = 'no@existo.tld';

        const Body = {
            email: __NO_EXIST__,
            password: '123'
        }

        const ResponseText = await POST(`${__URL__}/login`, Headers, Body);
        
        expect(ResponseText).toContain("Usuario y/o Contraseña inválidos");

    });



    //.only
    //.skip
    it('Respuesta para password incorrecto', async () => {
    
        // Creando el usuario
        const date = parseInt(Date.now());
        const email = `pablot${date}@registro.com`;
        const password = `contraseña_correcta`;
        
        // Registrando/guardando el usuario en MongoDB
        const Headers = {
            'Content-Type': 'application/json'
        }
        let Body = {
            "email": email,
            "password": password,
            "nombre": `Pablo ${date}`,
            "apellidos": `Tilotta ${date}`,
            "fechaNacimiento": "1970-06-30T00:00:00Z"
        }
        let ResponseText = await POST(`${__URL__}/registro`, Headers, Body);

        // Verificando que el registro se haya realizado en la base de datos
        const DB_usuario = await (await db()).collection('usuarios').findOne({email: email});
        expect(DB_usuario.email).toBe(email);

        // Realizamos el login con el usuario previamente registrado/guardado
        const __INCORRECT__ = 'contraseña_incorrecta';
        
        Body = {
            email,
            password: __INCORRECT__
        }
        
        ResponseText = await POST(`${__URL__}/login`, Headers, Body);

        // Chequenado respuesta
        expect(ResponseText).toContain('Usuario y/o Contraseña inválidos');
        
    });
    
    
    
});














// 88                                    88                  "8a        
// 88                                    ""                    "8a      
// 88                                                            "8a    
// 88           ,adPPYba,    ,adPPYb,d8  88  8b,dPPYba,            "8a  
// 88          a8"     "8a  a8"    `Y88  88  88P'   `"8a           a8"  
// 88          8b       d8  8b       88  88  88       88         a8"    
// 88          "8a,   ,a8"  "8a,   ,d88  88  88       88       a8"      
// 88888888888  `"YbbdP"'    `"YbbdP"Y8  88  88       88     a8"        
//                           aa,    ,88                                 
//                            "Y8bbdP"                                  

// 8b           d8                                                      
// `8b         d8'                                                      
//  `8b       d8'                                                       
//   `8b     d8'  ,adPPYba,  8b,dPPYba,                                 
//    `8b   d8'  a8P_____88  88P'   "Y8                                 
//     `8b d8'   8PP"""""""  88                                         
//      `888'    "8b,   ,aa  88                                         
//       `8'      `"Ybbd8"'  88                                         



// 88888888ba                             ad88  88  88                  
// 88      "8b                           d8"    ""  88                  
// 88      ,8P                           88         88                  
// 88aaaaaa8P'  ,adPPYba,  8b,dPPYba,  MM88MMM  88  88                  
// 88""""""'   a8P_____88  88P'   "Y8    88     88  88                  
// 88          8PP"""""""  88            88     88  88                  
// 88          "8b,   ,aa  88            88     88  88                  
// 88           `"Ybbd8"'  88            88     88  88                  

//      .only
//      .skip
describe('Endpoint GET /verPerfil, perfil del usuario luego de haberse logueado', () => {
    
    //.only
    //.skip
    it('Default', async () => {
        
        let {email, DB_usuario, ResponseJSON} = await registerAndLogin();
        
        // Realizando petición con el token obtenido
        const Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer${ResponseJSON.token}`
        }
        
        // Si no se esta enviando el ID del usuario
        let ResponseText = await GET(`${__URL__}/verPerfil`, Headers);
        
        // la respuesta deberia ser:
        expect(ResponseText).toContain('Debe enviar el parámetro ID');
        
        ResponseText = await GET(`${__URL__}/verPerfil?id=${DB_usuario._id}`, Headers);
        ResponseJSON = JSON.parse(ResponseText);
        
        // Confirmando respuesta
        expect(ResponseJSON._id).toBeDefined();
        expect(ResponseJSON._id).toBe(DB_usuario._id.toString());
        expect(ResponseJSON.email).toBeDefined();
        expect(ResponseJSON.email).toBe(email);
        expect(ResponseJSON.email).toBe(DB_usuario.email);
        
        // importante
        expect(ResponseJSON.password).toBeUndefined();
        
    });
    
});














// 88b           d88                        88  88     ad88  88                                      
// 888b         d888                        88  ""    d8"    ""                                      
// 88`8b       d8'88                        88        88                                             
// 88 `8b     d8' 88   ,adPPYba,    ,adPPYb,88  88  MM88MMM  88   ,adPPYba,  ,adPPYYba,  8b,dPPYba,  
// 88  `8b   d8'  88  a8"     "8a  a8"    `Y88  88    88     88  a8"     ""  ""     `Y8  88P'   "Y8  
// 88   `8b d8'   88  8b       d8  8b       88  88    88     88  8b          ,adPPPPP88  88          
// 88    `888'    88  "8a,   ,a8"  "8a,   ,d88  88    88     88  "8a,   ,aa  88,    ,88  88          
// 88     `8'     88   `"YbbdP"'    `"8bbdP"Y8  88    88     88   `"Ybbd8"'  `"8bbdP"Y8  88          
                                                                                                  
                                                                                                  
                                                                                                  
// 88888888ba                             ad88  88  88                                               
// 88      "8b                           d8"    ""  88                                               
// 88      ,8P                           88         88                                               
// 88aaaaaa8P'  ,adPPYba,  8b,dPPYba,  MM88MMM  88  88                                               
// 88""""""'   a8P_____88  88P'   "Y8    88     88  88                                               
// 88          8PP"""""""  88            88     88  88                                               
// 88          "8b,   ,aa  88            88     88  88                                               
// 88           `"Ybbd8"'  88            88     88  88                                               

//      .only
//      .skip
describe('Endpoint PUT /modificarPerfil, modificando el perfil del usuario', () => {
    
    //.only
    //.skip
    it('Default', async () => {
        
        let {email, DB_usuario, ResponseJSON} = await registerAndLogin();
        
        // Realizando petición con el token obtenido
        const Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer${ResponseJSON.token}`
        }

        const ubicacion = "Ciudad Autónoma de Buenos Aires";
        const biografia = "Profesional de los BITs, Analista Funcional SR, Programador experto desde hace mas de 31 años. Instructor de UDEMY y apasionado de la informática. #UDEMY";
        const sitioWeb = "https://www.pablotilotta.com";

        const Body = {
            ubicacion,
            biografia,
            sitioWeb
        }

        let ResponseText = await PUT(`${__URL__}/modificarPerfil`, Headers, Body);

        // Traemos la actualización de la base de datos
        const DB_usuario_update = await (await db()).collection('usuarios').findOne({email: email});


        // Tayendose el perfil luego de haber actualizado
        ResponseText = await GET(`${__URL__}/verPerfil?id=${DB_usuario._id}`, Headers);
        ResponseJSON = JSON.parse(ResponseText);

        // Confirmando respuesta
        expect(ResponseJSON._id).toBeDefined();
        expect(ResponseJSON._id).toBe(DB_usuario_update._id.toString());

        expect(ResponseJSON.email).toBeDefined();
        expect(ResponseJSON.email).toBe(email);
        expect(ResponseJSON.email).toBe(DB_usuario_update.email);

        expect(ResponseJSON.ubicacion).toBeDefined();
        expect(ResponseJSON.ubicacion).toBe(ubicacion);
        expect(ResponseJSON.ubicacion).toBe(DB_usuario_update.ubicacion);

        expect(ResponseJSON.biografia).toBeDefined();
        expect(ResponseJSON.biografia).toBe(biografia);
        expect(ResponseJSON.biografia).toBe(DB_usuario_update.biografia);

        expect(ResponseJSON.sitioWeb).toBeDefined();
        expect(ResponseJSON.sitioWeb).toBe(sitioWeb);
        expect(ResponseJSON.sitioWeb).toBe(DB_usuario_update.sitioWeb);
        
        // importante
        expect(ResponseJSON.password).toBeUndefined();
        
    });
    
});













// 88888888ba     ,ad8888ba,     ad88888ba  888888888888                     
// 88      "8b   d8"'    `"8b   d8"     "8b      88                          
// 88      ,8P  d8'        `8b  Y8,              88                          
// 88aaaaaa8P'  88          88  `Y8aaaaa,        88                          
// 88""""""'    88          88    `"""""8b,      88                          
// 88           Y8,        ,8P          `8b      88                          
// 88            Y8a.    .a8P   Y8a     a8P      88                          
// 88             `"Y8888Y"'     "Y88888P"       88                          
                                                                          
                                                                          
                                                                          
//           d8                                                              
//         ,8P'  ,d                                                   ,d     
//        d8"    88                                                   88     
//      ,8P'   MM88MMM  8b      db      d8   ,adPPYba,   ,adPPYba,  MM88MMM  
//     d8"       88     `8b    d88b    d8'  a8P_____88  a8P_____88    88     
//   ,8P'        88      `8b  d8'`8b  d8'   8PP"""""""  8PP"""""""    88     
//  d8"          88,      `8bd8'  `8bd8'    "8b,   ,aa  "8b,   ,aa    88,    
// 8P'           "Y888      YP      YP       `"Ybbd8"'   `"Ybbd8"'    "Y888  

//      .only
//      .skip
describe('Endpoint POST /tweet, insertar un Tweet', () => {

    //.only
    //.skip
    it('Default', async () => {

        const {email, DB_usuario, ResponseJSON} = await registerAndLogin();

        // Enviando peticion 
        const Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer${ResponseJSON.token}`
        }
        const date = parseInt(Date.now());
        const mensaje = `Es es mi primer tweet ${date}`;
        const Body = {
            mensaje
        }
        const ResponseText = await POST(`${__URL__}/tweet`, Headers, Body);

        const DB_tweet = await (await db()).collection('tweet').findOne({mensaje: mensaje});
        
        // Verificando que se haya registrado en la base de datos
        expect(DB_tweet.mensaje).toBe(mensaje);
        
        // Checando el usuario dueño del tweet:
        expect(DB_tweet._userId).toBeDefined();
        expect(DB_tweet._userId.toString()).toBe(DB_usuario._id.toString());

    });

});

















//   ,ad8888ba,   88888888888  888888888888                                  
//  d8"'    `"8b  88                88                                       
// d8'            88                88                                       
// 88             88aaaaa           88                                       
// 88      88888  88"""""           88                                       
// Y8,        88  88                88                                       
//  Y8a.    .a88  88                88                                       
//   `"Y88888P"   88888888888       88                                       
                                                                          
                                                                          
                                                                          
//           d8                                                              
//         ,8P'  ,d                                                   ,d     
//        d8"    88                                                   88     
//      ,8P'   MM88MMM  8b      db      d8   ,adPPYba,   ,adPPYba,  MM88MMM  
//     d8"       88     `8b    d88b    d8'  a8P_____88  a8P_____88    88     
//   ,8P'        88      `8b  d8'`8b  d8'   8PP"""""""  8PP"""""""    88     
//  d8"          88,      `8bd8'  `8bd8'    "8b,   ,aa  "8b,   ,aa    88,    
// 8P'           "Y888      YP      YP       `"Ybbd8"'   `"Ybbd8"'    "Y888  

//      .only
//      .skip
describe('Endpoint GET /tweet, leer los tweets de un usuario', () => {
    
    //.only
    //.skip
    it('Default', async () => {
        
        // Registro y login para obtener el Token
        let {email, DB_usuario, ResponseJSON} = await registerAndLogin();

        const userId = DB_usuario._id.toString();
        
        const numero_tweets = 18;

        // Rel
        for (let i=0; i<numero_tweets; i++) {
            await (await db()).collection('tweet').insertOne({
                // _userId: DB_usuario._id,
                _userId: ObjectId(userId),
                mensaje: faker.lorem.paragraph(),
                fecha: new Date()
            });
        }

        // Enviando peticion 
        const Headers = {
            'Content-Type': 'application/json',
        }

        let ResponseText = await GET(`${__URL__}/tweet?userId=${userId}&limit=${numero_tweets}&page=1`, Headers);
        ResponseJSON = JSON.parse(ResponseText);

        expect(ResponseJSON.length).toBe(numero_tweets);
        
        for (let i=0; i<numero_tweets; i++) {
            expect(ResponseJSON[i]._userId).toBe(userId);
            expect(ResponseJSON[i].mensaje).toBeDefined();
            expect(ResponseJSON[i].fecha).toBeDefined();
        }
        
        // Chequenado las posibles respuestas
        
        ResponseText = await GET(`${__URL__}/tweet?userId=${userId}&limit=${numero_tweets}&page=2`, Headers);
        ResponseJSON = JSON.parse(ResponseText);
        expect(ResponseJSON).toBeNull();
        
        ResponseText = await GET(`${__URL__}/tweet?userId=${userId}&limit=${numero_tweets}&page=0`, Headers);
        expect(ResponseText).toContain("page debe ser mayor o igual a 1");        
        
        ResponseText = await GET(`${__URL__}/tweet?userId=${userId}&limit=${numero_tweets+1}&page=1`, Headers);
        expect(ResponseText).toContain("limit debe estar comprendido entre 1 y 18");

    });
 
    
    //.only
    //.skip
    it.skip('Paginación, NOTA: el test tarda mas de 20 segundos __SKIP__', async () => {
        
        // Registro y login para obtener el Token
        let {email, DB_usuario, ResponseJSON} = await registerAndLogin();

        const userId = DB_usuario._id.toString();
        
        const numero_tweets = 18;

        // Rel
        for (let i=0; i<numero_tweets; i++) {
            await (await db()).collection('tweet').insertOne({
                // _userId: DB_usuario._id,
                _userId: ObjectId(userId),
                mensaje: faker.lorem.paragraph(),
                fecha: new Date()
            });
        }

        // Enviando peticiones 
        const Headers = {
            'Content-Type': 'application/json',
        }

        let ResponseText;

        for (let j=1; j<=numero_tweets; j++) {
            let limit = j;
            let leftExpresion = ""
            for (let i=1; i<=Math.ceil(numero_tweets/limit); i++) {
                if (i*limit>numero_tweets) {
                    let count = numero_tweets-(i-1)*limit;
                    leftExpresion += ` + ${count}`;
                    ResponseText = await GET(`${__URL__}/tweet?userId=${userId}&limit=${limit}&page=${i}`, Headers);
                    ResponseJSON = JSON.parse(ResponseText);
                    expect(ResponseJSON.length).toBe(count);
                } else {
                    leftExpresion += ` + ${limit}`;
                    ResponseText = await GET(`${__URL__}/tweet?userId=${userId}&limit=${limit}&page=${i}`, Headers);
                    ResponseJSON = JSON.parse(ResponseText);
                    expect(ResponseJSON.length).toBe(limit);
                }

            }

            console.log(`${leftExpresion} = ${numero_tweets}`);
        }
        
    });

});













// 88888888ba,    88888888888  88           88888888888  888888888888  88888888888  
// 88      `"8b   88           88           88                88       88           
// 88        `8b  88           88           88                88       88           
// 88         88  88aaaaa      88           88aaaaa           88       88aaaaa      
// 88         88  88"""""      88           88"""""           88       88"""""      
// 88         8P  88           88           88                88       88           
// 88      .a8P   88           88           88                88       88           
// 88888888Y"'    88888888888  88888888888  88888888888       88       88888888888  
                                                                                 
                                                                                 
                                                                                 
//           d8                                                                     
//         ,8P'  ,d                                                   ,d            
//        d8"    88                                                   88            
//      ,8P'   MM88MMM  8b      db      d8   ,adPPYba,   ,adPPYba,  MM88MMM         
//     d8"       88     `8b    d88b    d8'  a8P_____88  a8P_____88    88            
//   ,8P'        88      `8b  d8'`8b  d8'   8PP"""""""  8PP"""""""    88            
//  d8"          88,      `8bd8'  `8bd8'    "8b,   ,aa  "8b,   ,aa    88,           
// 8P'           "Y888      YP      YP       `"Ybbd8"'   `"Ybbd8"'    "Y888         

//      .only
//      .skip
describe('Endpoint DELETE /tweet, eliminar un tweet', () => {
    //.only
    //.skip
    it('Default', async () => {

        // Primero creamos el Tweet a que luego se va a eliminar

        // Creamos el usuario y nos logueamos
        const {email, DB_usuario, ResponseJSON} = await registerAndLogin();

        // Creando el tweet
        const Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer${ResponseJSON.token}`
        }
        const date = parseInt(Date.now());
        const mensaje = `Es es mi primer tweet ${date}`;
        const Body = {
            mensaje
        }
        let ResponseText = await POST(`${__URL__}/tweet`, Headers, Body);

        let DB_tweet = await (await db()).collection('tweet').findOne({mensaje: mensaje});
        
        // Verificando que se haya registrado en la base de datos
        expect(DB_tweet.mensaje).toBe(mensaje);
        
        // Checando el usuario dueño del tweet:
        expect(DB_tweet._userId).toBeDefined();
        expect(DB_tweet._userId.toString()).toBe(DB_usuario._id.toString());


        // Ahora procedemos a borrar el tweet previamente creado
        ResponseText = await DELETE(`${__URL__}/tweet?id=${DB_tweet._id.toString()}`, Headers);

        // Confirmamos que se haya borrado
        DB_tweet = await (await db()).collection('tweet').findOne({mensaje: mensaje});
        
        expect(DB_tweet).toBeNull()
    });

});

















// 88888888ba     ,ad8888ba,     ad88888ba  888888888888                            
// 88      "8b   d8"'    `"8b   d8"     "8b      88                                 
// 88      ,8P  d8'        `8b  Y8,              88                                 
// 88aaaaaa8P'  88          88  `Y8aaaaa,        88                                 
// 88""""""'    88          88    `"""""8b,      88                                 
// 88           Y8,        ,8P          `8b      88                                 
// 88            Y8a.    .a8P   Y8a     a8P      88                                 
// 88             `"Y8888Y"'     "Y88888P"       88                                 
                                                                                 
                                                                                 
                                                                                 
//           d8                                                                     
//         ,8P'                                      ,d                             
//        d8"                                        88                             
//      ,8P'  ,adPPYYba,  8b       d8  ,adPPYYba,  MM88MMM  ,adPPYYba,  8b,dPPYba,  
//     d8"    ""     `Y8  `8b     d8'  ""     `Y8    88     ""     `Y8  88P'   "Y8  
//   ,8P'     ,adPPPPP88   `8b   d8'   ,adPPPPP88    88     ,adPPPPP88  88          
//  d8"       88,    ,88    `8b,d8'    88,    ,88    88,    88,    ,88  88          
// 8P'        `"8bbdP"Y8      "8"      `"8bbdP"Y8    "Y888  `"8bbdP"Y8  88          

//      .only
//      .skip
describe('Endpoint POST /avatar, subir la imagen del Avatar al servidor', () => {
    
    //.only
    //.skip
    it('Default', async () => {

        // Creamos el usuario y nos logueamos
        let {email, DB_usuario, ResponseJSON} = await registerAndLogin();

        // Llenamos la data especificando el archivo a subir y su clave=key para obtenerlo del Request
        let Data = {
            authorization: `Bearer${ResponseJSON.token}`,
            key: 'avatar',
            filePath: `${__dirname}/resources/avatars/Liscano.Natanael.PNG`
            // filePath: `${__dirname}/resources/avatars/Diosymar`
            // filePath: `${__dirname}/resources/avatars/Pablo-Tilotta.jpeg`
        };

        // Realizando petición, subida de la imagen
        const ResponseText = await POST_FILE(`${__URL__}/avatar`, Data);
        
        // Chequeando que el archivo se haya subido y que se haya registrado en la base de datos
        DB_usuario = await (await db()).collection('usuarios').findOne({_id: DB_usuario._id});
        const file_match = await (await exec(`ls "${__DIR_APP__}/uploads/avatars/" | grep "${DB_usuario.avatar}" | grep -v grep`)).stdout;
        expect(file_match).toContain(DB_usuario.avatar);

        // Chequeando que el MD5 del archivo original coincida con el subido al servidor
        const MD5_original = await (await exec(`md5sum "${Data.filePath}" | awk '{ print \$1 }'`)).stdout;
        const MD5_uploaded = await (await exec(`md5sum "${__DIR_APP__}/uploads/avatars/${DB_usuario.avatar}" | awk '{ print \$1 }'`)).stdout;
        expect(MD5_uploaded).toBe(MD5_original);

    });

});













//   ,ad8888ba,   88888888888  888888888888                                         
//  d8"'    `"8b  88                88                                              
// d8'            88                88                                              
// 88             88aaaaa           88                                              
// 88      88888  88"""""           88                                              
// Y8,        88  88                88                                              
//  Y8a.    .a88  88                88                                              
//   `"Y88888P"   88888888888       88                                              
                                                                                 
                                                                                 
                                                                                 
//           d8                                                                     
//         ,8P'                                      ,d                             
//        d8"                                        88                             
//      ,8P'  ,adPPYYba,  8b       d8  ,adPPYYba,  MM88MMM  ,adPPYYba,  8b,dPPYba,  
//     d8"    ""     `Y8  `8b     d8'  ""     `Y8    88     ""     `Y8  88P'   "Y8  
//   ,8P'     ,adPPPPP88   `8b   d8'   ,adPPPPP88    88     ,adPPPPP88  88          
//  d8"       88,    ,88    `8b,d8'    88,    ,88    88,    88,    ,88  88          
// 8P'        `"8bbdP"Y8      "8"      `"8bbdP"Y8    "Y888  `"8bbdP"Y8  88          

//      .only
//      .skip
describe('Endpoint GET /avatar, obtiene el archivo/recurso imagen del Avatar por medio del ID de un usuario', () => {
    
    //.only
    //.skip
    it('Default', async () => {

        // Creamos el usuario y nos logueamos
        const {email, DB_usuario, ResponseJSON} = await registerAndLogin();

        // Llenamos la data especificando el archivo a subir y su clave=key para obtenerlo del Request
        let Data = {
            authorization: `Bearer${ResponseJSON.token}`,
            key: 'avatar',
            filePath: `${__dirname}/resources/avatars/Liscano.Natanael.PNG`
            // filePath: `${__dirname}/resources/avatars/Diosymar`
            // filePath: `${__dirname}/resources/avatars/Pablo-Tilotta.jpeg`
        };

        // Realizamos la petición, subida de la imagen
        const ResponseText = await POST_FILE(`${__URL__}/avatar`, Data);

        // Obteniendo el archivo previamente subido
        const { Response, File } = await GET_FILE(`${__URL__}/avatar?userId=${DB_usuario._id.toString()}`, null);

        // Chequeando MD5
        let MD5_original = await (await exec(`md5sum "${Data.filePath}" | awk '{ print \$1 }'`)).stdout;
        let MD5_downloaded = await (await exec(`md5sum "${File}" | awk '{ print \$1 }'`)).stdout;
        expect(MD5_downloaded).toBe(MD5_original);

        // Chequeando funcionamiento del MD5 en su no coincidencia!
        Data = {
            // filePath: `${__dirname}/resources/avatars/Liscano.Natanael.PNG`
            filePath: `${__dirname}/resources/avatars/Diosymar`
            // filePath: `${__dirname}/resources/avatars/Pablo-Tilotta.jpeg`
        };
        MD5_original = await (await exec(`md5sum "${Data.filePath}" | awk '{ print \$1 }'`)).stdout;
        MD5_downloaded = await (await exec(`md5sum "${File}" | awk '{ print \$1 }'`)).stdout;
        expect(MD5_downloaded).not.toBe(MD5_original);

    });

});













                                                                                         
// 88888888ba     ,ad8888ba,     ad88888ba  888888888888                                    
// 88      "8b   d8"'    `"8b   d8"     "8b      88                                         
// 88      ,8P  d8'        `8b  Y8,              88                                         
// 88aaaaaa8P'  88          88  `Y8aaaaa,        88                                         
// 88""""""'    88          88    `"""""8b,      88                                         
// 88           Y8,        ,8P          `8b      88                                         
// 88            Y8a.    .a8P   Y8a     a8P      88                                         
// 88             `"Y8888Y"'     "Y88888P"       88                                         
                                                                                         
                                                                                         
                                                                                         
//           d8  88                                                                         
//         ,8P'  88                                                                         
//        d8"    88                                                                         
//      ,8P'     88,dPPYba,   ,adPPYYba,  8b,dPPYba,   8b,dPPYba,    ,adPPYba,  8b,dPPYba,  
//     d8"       88P'    "8a  ""     `Y8  88P'   `"8a  88P'   `"8a  a8P_____88  88P'   "Y8  
//   ,8P'        88       d8  ,adPPPPP88  88       88  88       88  8PP"""""""  88          
//  d8"          88b,   ,a8"  88,    ,88  88       88  88       88  "8b,   ,aa  88          
// 8P'           8Y"Ybbd8"'   `"8bbdP"Y8  88       88  88       88   `"Ybbd8"'  88          

//      .only
//      .skip
describe('Endpoint POST /banner, subir la imagen del Banner al servidor', () => {
    
    //.only
    //.skip
    it('Default', async () => {

        // Creamos el usuario y nos logueamos
        let {email, DB_usuario, ResponseJSON} = await registerAndLogin();

        // Llenamos la data especificando el archivo a subir y su clave=key para obtenerlo del Request
        const Data = {
            authorization: `Bearer${ResponseJSON.token}`,
            key: 'banner',
            filePath: `${__dirname}/resources/banners/web-designer`
            // filePath: `${__dirname}/resources/banners/programing.python.jpeg`
            // filePath: `${__dirname}/resources/banners/banner-pablo-tilotta.jpg`
        };

        // Realizando petición, subida de la imagen
        const ResponseText = await POST_FILE(`${__URL__}/banner`, Data);
        
        // Chequeando que el archivo se haya subido y que se haya registrado en la base de datos
        DB_usuario = await (await db()).collection('usuarios').findOne({_id: DB_usuario._id});
        const file_match = await (await exec(`ls "${__DIR_APP__}/uploads/banners/" | grep "${DB_usuario.banner}" | grep -v grep`)).stdout;
        expect(file_match).toContain(DB_usuario.banner);

        // Chequeando que el MD5 del archivo original coincida con el subido al servidor
        const MD5_original = await (await exec(`md5sum "${Data.filePath}" | awk '{ print \$1 }'`)).stdout;
        const MD5_uploaded = await (await exec(`md5sum "${__DIR_APP__}/uploads/banners/${DB_usuario.banner}" | awk '{ print \$1 }'`)).stdout;
        expect(MD5_uploaded).toBe(MD5_original);

    });

});

















//   ,ad8888ba,   88888888888  888888888888                                                 
//  d8"'    `"8b  88                88                                                      
// d8'            88                88                                                      
// 88             88aaaaa           88                                                      
// 88      88888  88"""""           88                                                      
// Y8,        88  88                88                                                      
//  Y8a.    .a88  88                88                                                      
//   `"Y88888P"   88888888888       88                                                      
                                                                                         
                                                                                         
                                                                                         
//           d8  88                                                                         
//         ,8P'  88                                                                         
//        d8"    88                                                                         
//      ,8P'     88,dPPYba,   ,adPPYYba,  8b,dPPYba,   8b,dPPYba,    ,adPPYba,  8b,dPPYba,  
//     d8"       88P'    "8a  ""     `Y8  88P'   `"8a  88P'   `"8a  a8P_____88  88P'   "Y8  
//   ,8P'        88       d8  ,adPPPPP88  88       88  88       88  8PP"""""""  88          
//  d8"          88b,   ,a8"  88,    ,88  88       88  88       88  "8b,   ,aa  88          
// 8P'           8Y"Ybbd8"'   `"8bbdP"Y8  88       88  88       88   `"Ybbd8"'  88          

//      .only
//      .skip
describe('Endpoint GET /banner, obtiene el archivo/recurso imagen del Banner por medio del ID de un usuario', () => {
    
    //.only
    //.skip
    it('Default', async () => {

        // Creamos el usuario y nos logueamos
        const {email, DB_usuario, ResponseJSON} = await registerAndLogin();

        // Llenamos la data especificando el archivo a subir y su clave=key para obtenerlo del Request
        let Data = {
            authorization: `Bearer${ResponseJSON.token}`,
            key: 'banner',
            filePath: `${__dirname}/resources/banners/web-designer`
            // filePath: `${__dirname}/resources/banners/programing.python.jpeg`
            // filePath: `${__dirname}/resources/banners/banner-pablo-tilotta.jpg`
        };

        // Realizamos la petición, subida de la imagen
        const ResponseText = await POST_FILE(`${__URL__}/banner`, Data);

        // Obteniendo el archivo previamente subido
        const { Response, File } = await GET_FILE(`${__URL__}/banner?userId=${DB_usuario._id.toString()}`, null);

        // Chequeando MD5
        let MD5_original = await (await exec(`md5sum "${Data.filePath}" | awk '{ print \$1 }'`)).stdout;
        let MD5_downloaded = await (await exec(`md5sum "${File}" | awk '{ print \$1 }'`)).stdout;
        expect(MD5_downloaded).toBe(MD5_original);

        // Chequeando funcionamiento del MD5 en su no coincidencia!
        Data = {
            // filePath: `${__dirname}/resources/banners/web-designer`
            filePath: `${__dirname}/resources/banners/programing.python.jpeg`
            // filePath: `${__dirname}/resources/banners/banner-pablo-tilotta.jpg`
        };
        MD5_original = await (await exec(`md5sum "${Data.filePath}" | awk '{ print \$1 }'`)).stdout;
        MD5_downloaded = await (await exec(`md5sum "${File}" | awk '{ print \$1 }'`)).stdout;
        expect(MD5_downloaded).not.toBe(MD5_original);

    });

});

















// 88888888ba     ,ad8888ba,     ad88888ba  888888888888                                        
// 88      "8b   d8"'    `"8b   d8"     "8b      88                                             
// 88      ,8P  d8'        `8b  Y8,              88                                             
// 88aaaaaa8P'  88          88  `Y8aaaaa,        88                                             
// 88""""""'    88          88    `"""""8b,      88                                             
// 88           Y8,        ,8P          `8b      88                                             
// 88            Y8a.    .a8P   Y8a     a8P      88                                             
// 88             `"Y8888Y"'     "Y88888P"       88                                             
                                                                                             
                                                                                             
                                                                                             
//           d8                       88                          88                            
//         ,8P'                       88                          ""                            
//        d8"                         88                                                        
//      ,8P'  8b,dPPYba,   ,adPPYba,  88  ,adPPYYba,   ,adPPYba,  88   ,adPPYba,   8b,dPPYba,   
//     d8"    88P'   "Y8  a8P_____88  88  ""     `Y8  a8"     ""  88  a8"     "8a  88P'   `"8a  
//   ,8P'     88          8PP"""""""  88  ,adPPPPP88  8b          88  8b       d8  88       88  
//  d8"       88          "8b,   ,aa  88  88,    ,88  "8a,   ,aa  88  "8a,   ,a8"  88       88  
// 8P'        88           `"Ybbd8"'  88  `"8bbdP"Y8   `"Ybbd8"'  88   `"YbbdP"'   88       88  

//      .only
//      .skip
describe('Endpoint POST /relacion, crea la relecion "Seguir" de un usuario con otro.', () => {

    //.only
    //.skip
    it('Default', async () => {

        // Registramos el usuario a "Seguir"
        let {email, DB_usuario, ResponseJSON} = await registerAndLogin();
        const userRelacionId = DB_usuario._id.toString();

        // Registramos el usuario que "Seguirá"
        ({email, DB_usuario, ResponseJSON} = await registerAndLogin());
        const userId = DB_usuario._id.toString();

        // Enviando peticion
        const Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer${ResponseJSON.token}`
        }
        const Body = {};

        let ResponseText = await POST(`${__URL__}/relacion?userRelacionId=${userRelacionId}`, Headers, Body);
        
        // Verificando que se haya registrado en la base de datos
        const DB_relacion = await (await db()).collection('relacion').findOne({
            _userId: ObjectId(userId),
            _userRelacionId: ObjectId(userRelacionId)
        });
        expect(DB_relacion._userId.toString()).toBe(userId);
        expect(DB_relacion._userRelacionId.toString()).toBe(userRelacionId);
        
        // Chequeamos que un usuario no se pueda "Seguir" a sí mismo
        ResponseText = await POST(`${__URL__}/relacion?userRelacionId=${userId}`, Headers, Body);
        expect(ResponseText).toContain('"userRelacionId" debe ser diferente del ID del usuario')
        
        // Chequeamos que no se pueda insertar el mismo registro duplicado
        ResponseText = await POST(`${__URL__}/relacion?userRelacionId=${userRelacionId}`, Headers, Body);
        expect(ResponseText).toContain('Ocurrió un error al intentar insertar relación Ya existe el registro en la BD')

    });

});














// 88888888ba,    88888888888  88           88888888888  888888888888  88888888888              
// 88      `"8b   88           88           88                88       88                       
// 88        `8b  88           88           88                88       88                       
// 88         88  88aaaaa      88           88aaaaa           88       88aaaaa                  
// 88         88  88"""""      88           88"""""           88       88"""""                  
// 88         8P  88           88           88                88       88                       
// 88      .a8P   88           88           88                88       88                       
// 88888888Y"'    88888888888  88888888888  88888888888       88       88888888888              
                                                                                             
                                                                                             
                                                                                             
//           d8                       88                          88                            
//         ,8P'                       88                          ""                            
//        d8"                         88                                                        
//      ,8P'  8b,dPPYba,   ,adPPYba,  88  ,adPPYYba,   ,adPPYba,  88   ,adPPYba,   8b,dPPYba,   
//     d8"    88P'   "Y8  a8P_____88  88  ""     `Y8  a8"     ""  88  a8"     "8a  88P'   `"8a  
//   ,8P'     88          8PP"""""""  88  ,adPPPPP88  8b          88  8b       d8  88       88  
//  d8"       88          "8b,   ,aa  88  88,    ,88  "8a,   ,aa  88  "8a,   ,a8"  88       88  
// 8P'        88           `"Ybbd8"'  88  `"8bbdP"Y8   `"Ybbd8"'  88   `"YbbdP"'   88       88  

//      .only
//      .skip
describe('Endpoint DELETE /relacion, realiza el borrado de la relacion entre usuarios', () => {
    
    //.only
    //.skip
    it('Default', async () => {

        // Registramos el usuario a "Seguir"
        let {email, DB_usuario, ResponseJSON} = await registerAndLogin();
        const userRelacionId = DB_usuario._id.toString();

        // Registramos el usuario que "Seguirá"
        ({email, DB_usuario, ResponseJSON} = await registerAndLogin());
        const userId = DB_usuario._id.toString();

        // Creamos una relacion
        const Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer${ResponseJSON.token}`
        }
        const Body = {};
        let ResponseText = await POST(`${__URL__}/relacion?userRelacionId=${userRelacionId}`, Headers, Body);

        // Verificando que se haya registrado en la base de datos
        let DB_relacion = await (await db()).collection('relacion').findOne({
            _userId: ObjectId(userId),
            _userRelacionId: ObjectId(userRelacionId)
        });
        expect(DB_relacion._userId.toString()).toBe(userId);
        expect(DB_relacion._userRelacionId.toString()).toBe(userRelacionId);

        // Ahora procedemos a borrar la relacion previamente creada
        ResponseText = await DELETE(`${__URL__}/relacion?userRelacionId=${userRelacionId}`, Headers);
        
        // Verificamos que la realacion ya no exista en la base de datos
        DB_relacion = await (await db()).collection('relacion').findOne({
            _userId: ObjectId(userId),
            _userRelacionId: ObjectId(userRelacionId)
        });
        expect(DB_relacion).toBeNull();

    });

});















//   ,ad8888ba,   88888888888  888888888888                                                     
//  d8"'    `"8b  88                88                                                          
// d8'            88                88                                                          
// 88             88aaaaa           88                                                          
// 88      88888  88"""""           88                                                          
// Y8,        88  88                88                                                          
//  Y8a.    .a88  88                88                                                          
//   `"Y88888P"   88888888888       88                                                          
                                                                                             
                                                                                             
                                                                                             
//           d8                       88                          88                            
//         ,8P'                       88                          ""                            
//        d8"                         88                                                        
//      ,8P'  8b,dPPYba,   ,adPPYba,  88  ,adPPYYba,   ,adPPYba,  88   ,adPPYba,   8b,dPPYba,   
//     d8"    88P'   "Y8  a8P_____88  88  ""     `Y8  a8"     ""  88  a8"     "8a  88P'   `"8a  
//   ,8P'     88          8PP"""""""  88  ,adPPPPP88  8b          88  8b       d8  88       88  
//  d8"       88          "8b,   ,aa  88  88,    ,88  "8a,   ,aa  88  "8a,   ,a8"  88       88  
// 8P'        88           `"Ybbd8"'  88  `"8bbdP"Y8   `"Ybbd8"'  88   `"YbbdP"'   88       88  

//      .only
//      .skip
describe('Endpoint GET /relacion, chequea si hay relacion entre 2 usuarios', () => {

    //.only
    //.skip
    it('Default', async () => {

        // Registramos el usuario a "Seguir"
        let {email, DB_usuario, ResponseJSON} = await registerAndLogin();
        const userRelacionId = DB_usuario._id.toString();

        // Registramos el usuario que "Seguirá"
        ({email, DB_usuario, ResponseJSON} = await registerAndLogin());
        const userId = DB_usuario._id.toString();

        // Enviando peticion
        const Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer${ResponseJSON.token}`
        }
        const Body = {};

        let ResponseText = await POST(`${__URL__}/relacion?userRelacionId=${userRelacionId}`, Headers, Body);
        
        // Verificando que se haya registrado en la base de datos
        const DB_relacion = await (await db()).collection('relacion').findOne({
            _userId: ObjectId(userId),
            _userRelacionId: ObjectId(userRelacionId)
        });
        expect(DB_relacion._userId.toString()).toBe(userId);
        expect(DB_relacion._userRelacionId.toString()).toBe(userRelacionId);
        
        // Probamos este endpoint para consultar si hay relacion entre estos 2 usuarios
        ResponseText = await GET(`${__URL__}/relacion?userRelacionId=${userRelacionId}`, Headers, Body);
        ResponseJSON = JSON.parse(ResponseText);

        // Confirmando respuesta
        expect(ResponseJSON.status).toBeDefined();
        expect(ResponseJSON.status).toBeTruthy();

        // Eliminamos la relacion
        ResponseText = await DELETE(`${__URL__}/relacion?userRelacionId=${userRelacionId}`, Headers);

        // Probamos nuevamente
        ResponseText = await GET(`${__URL__}/relacion?userRelacionId=${userRelacionId}`, Headers, Body);
        ResponseJSON = JSON.parse(ResponseText);

        // Confirmando respuesta
        expect(ResponseJSON.status).toBeDefined();
        expect(ResponseJSON.status).toBeFalsy();
    });

});












async function getListaUsuarios(__USUARIO_ID__, __SEARCH__, __TYPE__, __LIMIT__,__PAGE__) {

    const __OPERATOR__ = {
        'new': '$ne',
        'follow': '$eq',
    }

    const DB_cursor = await (await db()).collection('usuarios').aggregate([
        {$match: {$and: [
            {nombre: {$regex: '(?i)'+__SEARCH__}},
            {_id: {$ne: ObjectId(__USUARIO_ID__)}},
        ]}},
        {$lookup:{
            from: 'relacion',
            let: {local_id: '$_id'},
            pipeline: [
                {$match:{$expr: {$eq: ['$_userRelacionId', '$$local_id']}}}, 
                {$project: {_userId: 1, _id: 0}},
            ],
            as: 'relaciones',
        }},
        {$match: {'relaciones._userId': {[__OPERATOR__[__TYPE__]]: ObjectId(__USUARIO_ID__)}}},
        {$project: {relaciones: 0}},
        {$sort: {nombre: 1}},
        {$skip: (__PAGE__-1)*__LIMIT__},
        {$limit: __LIMIT__},
    ]);
 
    return await DB_cursor.toArray();
}

//   ,ad8888ba,   88888888888  888888888888                                                                                                        
//  d8"'    `"8b  88                88                                                                                                             
// d8'            88                88                                                                                                             
// 88             88aaaaa           88                                                                                                             
// 88      88888  88"""""           88                                                                                                             
// Y8,        88  88                88                                                                                                             
//  Y8a.    .a88  88                88                                                                                                             
//   `"Y88888P"   88888888888       88                                                                                                             
                                                                                                                                                
                                                                                                                                                
                                                                                                                                                
//           d8  88  88                                  88        88                                                  88                          
//         ,8P'  88  ""               ,d                 88        88                                                  ""                          
//        d8"    88                   88                 88        88                                                                              
//      ,8P'     88  88  ,adPPYba,  MM88MMM  ,adPPYYba,  88        88  ,adPPYba,  88       88  ,adPPYYba,  8b,dPPYba,  88   ,adPPYba,   ,adPPYba,  
//     d8"       88  88  I8[    ""    88     ""     `Y8  88        88  I8[    ""  88       88  ""     `Y8  88P'   "Y8  88  a8"     "8a  I8[    ""  
//   ,8P'        88  88   `"Y8ba,     88     ,adPPPPP88  88        88   `"Y8ba,   88       88  ,adPPPPP88  88          88  8b       d8   `"Y8ba,   
//  d8"          88  88  aa    ]8I    88,    88,    ,88  Y8a.    .a8P  aa    ]8I  "8a,   ,a88  88,    ,88  88          88  "8a,   ,a8"  aa    ]8I  
// 8P'           88  88  `"YbbdP"'    "Y888  `"8bbdP"Y8   `"Y8888Y"'   `"YbbdP"'   `"YbbdP'Y8  `"8bbdP"Y8  88          88   `"YbbdP"'   `"YbbdP"'  

//      .only
//      .skip
describe('Endpoint GET /listaUsuarios, Retorna la lista de usuarios que se estan(follow)/o nó (new) siguiendo por el usuario', () => {

    //.only
    //.skip
    it('Default', async () => {

        // Registramos el usuario a "Seguir"
        let {email, DB_usuario, ResponseJSON} = await registerAndLogin();
        const user_1_relacionId = DB_usuario._id.toString();

        // Registramos el usuario que "Seguirá"
        ({email, DB_usuario, ResponseJSON} = await registerAndLogin());
        const userId = DB_usuario._id.toString();

        // Creamos la relación entre los 2 últimos usuarios creados
        const Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer${ResponseJSON.token}`
        }
        const Body = {};

        let ResponseText = await POST(`${__URL__}/relacion?userRelacionId=${user_1_relacionId}`, Headers, Body);
        
        // Registramos un tercer usuario que no se relacionará
        ({email, DB_usuario, ResponseJSON} = await registerAndLogin());
        const user_2_relacionId = DB_usuario._id.toString();
        
        
        // Probamos el endpoint /listaUsuarios para 'new'
        let search = "pablo";
        let type = "new";
        let limit = 18;
        let page = 1;
        let searchQueryParam = (new URLSearchParams([['search',search]])).toString();
        ResponseText = await GET(`${__URL__}/listaUsuarios?${searchQueryParam}&type=${type}&limit=${limit}&page=${page}`, Headers, Body);
        ResponseJSON = JSON.parse(ResponseText);
        // Verificando directamente en la base de datos
        let DB_listaUsuarios = await getListaUsuarios(userId, search, type, limit, page);
        // Confirmando respuesta
        expect(ResponseJSON.length).toBe(DB_listaUsuarios.length);
        expect(ResponseJSON[0]._id).toBe(DB_listaUsuarios[0]._id.toString());
        
        // cl(ResponseJSON);
        // cl(DB_listaUsuarios);
        
        // Probamos el endpoint /listaUsuarios para 'follow'
        search = "pablo";
        type = "follow";
        limit = 18;
        page = 1;
        searchQueryParam = (new URLSearchParams([['search',search]])).toString();
        ResponseText = await GET(`${__URL__}/listaUsuarios?${searchQueryParam}&type=${type}&limit=${limit}&page=${page}`, Headers, Body);
        ResponseJSON = JSON.parse(ResponseText);
        // Verificando directamente en la base de datos
        DB_listaUsuarios = await getListaUsuarios(userId, search, type, limit, page);
        // Confirmando respuesta
        expect(ResponseJSON.length).toBe(DB_listaUsuarios.length);
        expect(ResponseJSON[0]._id).toBe(DB_listaUsuarios[0]._id.toString());
        
        // cl(ResponseJSON);
        // cl(DB_listaUsuarios);

    });
    
});
















//   ,ad8888ba,   88888888888  888888888888                                                                                                                              
//  d8"'    `"8b  88                88                                                                                                                                   
// d8'            88                88                                                                                                                                   
// 88             88aaaaa           88                                                                                                                                   
// 88      88888  88"""""           88                                                                                                                                   
// Y8,        88  88                88                                                                                                                                   
//  Y8a.    .a88  88                88                                                                                                                                   
//   `"Y88888P"   88888888888       88                                                                                                                                   
                                                                                                                                                                      
                                                                                                                                                                      
                                                                                                                                                                      
//           d8                                                               ad88888ba                                         88           88                          
//         ,8P'  ,d                                                   ,d     d8"     "8b                                        ""           88                          
//        d8"    88                                                   88     Y8,                                                             88                          
//      ,8P'   MM88MMM  8b      db      d8   ,adPPYba,   ,adPPYba,  MM88MMM  `Y8aaaaa,     ,adPPYba,   ,adPPYb,d8  88       88  88   ,adPPYb,88   ,adPPYba,   ,adPPYba,  
//     d8"       88     `8b    d88b    d8'  a8P_____88  a8P_____88    88       `"""""8b,  a8P_____88  a8"    `Y88  88       88  88  a8"    `Y88  a8"     "8a  I8[    ""  
//   ,8P'        88      `8b  d8'`8b  d8'   8PP"""""""  8PP"""""""    88             `8b  8PP"""""""  8b       88  88       88  88  8b       88  8b       d8   `"Y8ba,   
//  d8"          88,      `8bd8'  `8bd8'    "8b,   ,aa  "8b,   ,aa    88,    Y8a     a8P  "8b,   ,aa  "8a,   ,d88  "8a,   ,a88  88  "8a,   ,d88  "8a,   ,a8"  aa    ]8I  
// 8P'           "Y888      YP      YP       `"Ybbd8"'   `"Ybbd8"'    "Y888   "Y88888P"    `"Ybbd8"'   `"YbbdP"Y8   `"YbbdP'Y8  88   `"8bbdP"Y8   `"YbbdP"'   `"YbbdP"'  
//                                                                                                     aa,    ,88                                                        
//                                                                                                      "Y8bbdP"                                                         

//      .only
//      .skip
describe('Endpoint GET /tweetSeguidos, Lee los tweets de todos los que seguimos', () => {

    //.only
    //.skip
    it('Default', async () => {



        // Registramos el primer usuario a "Seguir"
        let {email, DB_usuario, ResponseJSON} = await registerAndLogin();
        const user_1_relacionId = DB_usuario._id.toString();

        // Dicho usuario envía un tweet 
        const Headers_user_1 = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer${ResponseJSON.token}`
        }
        let date = parseInt(Date.now());
        let mensaje = `Soy el primer usuario, este es mi primer tweet ${date}`;
        let Body = {
            mensaje
        }
        let ResponseText = await POST(`${__URL__}/tweet`, Headers_user_1, Body);



        // Registramos el segundo usuario a "Seguir"
        ({email, DB_usuario, ResponseJSON} = await registerAndLogin());
        const user_2_relacionId = DB_usuario._id.toString();

        // Este usuario no relacionado tambien envía un tweet 
        Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer${ResponseJSON.token}`
        }
        date = parseInt(Date.now());
        mensaje = `Soy el segundo usuario, este es mi primer tweet ${date}`;
        Body = {
            mensaje
        }
        ResponseText = await POST(`${__URL__}/tweet`, Headers, Body);



        // Registramos el usuario que "Seguirá" a estos dos últimos usuarios
        ({email, DB_usuario, ResponseJSON} = await registerAndLogin());
        const userId = DB_usuario._id.toString();

        // El usuario que seguirá tambien envía un tweet 
        const Headers_seguidor = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer${ResponseJSON.token}`
        }
        date = parseInt(Date.now());
        mensaje = `Soy el tercer usuario principal/seguidor y este es mi primer tweet ${date}`;
        Body = {
            mensaje
        }
        ResponseText = await POST(`${__URL__}/tweet`, Headers_seguidor, Body);



        // Creamos la relación entre los 2 últimos usuarios creados
        Body = {};
        
        ResponseText = await POST(`${__URL__}/relacion?userRelacionId=${user_1_relacionId}`, Headers_seguidor, Body);
        ResponseText = await POST(`${__URL__}/relacion?userRelacionId=${user_2_relacionId}`, Headers_seguidor, Body);



        // Registramos un cuarto usuario que seguirá al tercero
        ({email, DB_usuario, ResponseJSON} = await registerAndLogin());
        const user_3_id = DB_usuario._id.toString();

        // Este usuario tambien envía un tweet 
        Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer${ResponseJSON.token}`
        }
        date = parseInt(Date.now());
        mensaje = `Soy el cuarto usuario no relacionado con el tercero y este es mi primer tweet ${date}`;
        Body = {
            mensaje
        }
        ResponseText = await POST(`${__URL__}/tweet`, Headers, Body);
        ResponseText = await POST(`${__URL__}/relacion?userRelacionId=${userId}`, Headers, Body);



        // Finalmente el primer usuario envía un segundo tweet 
        date = parseInt(Date.now());
        mensaje = `Soy el primer usuario, este es mi segundo tweet ${date}`;
        Body = {
            mensaje
        }
        ResponseText = await POST(`${__URL__}/tweet`, Headers_user_1, Body);



        // Probamos el endpoint siendo el usuario principal
        Body = {};
        const limit = 18;
        const page = 1;
        ResponseText = await GET(`${__URL__}/tweetSeguidos?limit=${limit}&page=${page}`, Headers_seguidor, Body);
        ResponseJSON = JSON.parse(ResponseText);



        // Confirmamos respuesta
        const skip = (page - 1) * limit
        const DB_cursor = await (await db()).collection('relacion').aggregate([
            {$match: {_userId: ObjectId(userId)}},
            {$lookup:{
                from: 'tweet',
                localField: '_userRelacionId',
                foreignField: '_userId',
                as: 'tweet',
            }},
            {$unwind: '$tweet'},
            {$sort: {'tweet.fecha': -1}},
            {$skip: skip},
            {$limit: limit},
        ]);
        const DB_relacion = await DB_cursor.toArray();

        const expectCountTweets = 3;

        expect(DB_relacion.length).toBe(expectCountTweets);
        expect(ResponseJSON.length).toBe(expectCountTweets);

        ResponseJSON.forEach((relation, index) => {
            expect(relation._id).toBe(                                  DB_relacion[index]._id.toString());
            expect(relation._userId).toBe(                              DB_relacion[index]._userId.toString());
            expect(relation._userRelacionId).toBe(                      DB_relacion[index]._userRelacionId.toString());
            expect(relation.tweet._id).toBe(                            DB_relacion[index].tweet._id.toString());
            expect(relation.tweet.mensaje).toBe(                        DB_relacion[index].tweet.mensaje);
            expect((new Date(relation.tweet.fecha)).toString()).toBe(   DB_relacion[index].tweet.fecha.toString());
        });



    });

});















// // robo3t > DB twittor (Right Click) > Open Shell:
// {
//     db.usuarios.remove({});
//     db.tweet.remove({});
//     db.relacion.remove({});
// }
