
// import test from 'jest';
// import puppeteer from 'puppeteer';
const { GET, POST } = require('./src/restClientPuppeteer');
let __URL__, __DB__, headers, body, responseText, responseJSON;

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

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

sleep(500);

const DecodeJWT = token => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
};

const jwt_decode = require('jwt-decode');




const jwt = require('jsonwebtoken');
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

__DB__ = 'mongodb+srv://root:XWBXgUne3U2OmMax@cluster0.lji8t.mongodb.net/twittor?retryWrites=true&w=majority';
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
        headers = {
            'Content-Type': 'application/json'
        }
        const date = parseInt(Date.now()/1000);
        const email = `pablot${date}@registro.com`;
        body = {
            "email": email,
            "password": "123456",
            "nombre": `Pablo ${date}`,
            "apellidos": `Tilotta ${date}`,
            "fechaNacimiento": "1970-06-30T00:00:00Z"
        }
        responseText = await POST(`${__URL__}/registro`, headers, body);

        // Verificando que el registro se haya realizado en la base de datos
        const db_result = await (await db()).collection('usuarios').findOne({email: email});
        expect(db_result.email).toBe(email);

        // Volviendo a registrar el mismo usuario
        responseText = await POST(`${__URL__}/registro`, headers, body);

        // // Chequeando respuesta
        expect(responseText).toContain('Ya existe un usuario registrado con ese email');
    
    });

});












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
        
        // Creando el usuario
        const date = parseInt(Date.now()/1000);
        const email = `pablot${date}@registro.com`;
        const password = `123456_${date}`;
        
        // Registrando/guardando el usuario en MongoDB
        headers = {
            'Content-Type': 'application/json'
        }
        body = {
            "email": email,
            "password": password,
            "nombre": `Pablo ${date}`,
            "apellidos": `Tilotta ${date}`,
            "fechaNacimiento": "1970-06-30T00:00:00Z"
        }
        responseText = await POST(`${__URL__}/registro`, headers, body);

        // Verificando que el registro se haya realizado en la base de datos
        const db_result = await (await db()).collection('usuarios').findOne({email: email});
        expect(db_result.email).toBe(email);

        // Realizamos el login con el usuario previamente registrado/guardado
        headers = {
            'Content-Type': 'application/json'
        }
        body = {
            email,
            password
        }
        responseText = await POST(`${__URL__}/login`, headers, body);
        responseJSON = JSON.parse(responseText);

        // Chequeando respuesta
        expect(responseJSON.token).toBeDefined();

        const token_decoded = jwt_decode(responseJSON.token);

        // // Chequeando integridad de token
        expect(token_decoded.email).toBe(email);
        expect(token_decoded.email).toBe(db_result.email);

    });



    //.only
    //.skip
    it("Respuesta para usuario no resgistrado", async () => {
        
        headers = {
            'Content-Type': 'application/json'
        }

        const __NO_EXIST__ = 'no@existo.tld';

        body = {
            email: __NO_EXIST__,
            password: '123'
        }

        responseText = await POST(`${__URL__}/login`, headers, body);
        
        expect(responseText).toContain("Usuario y/o Contraseña inválidos");

    });



    //.only
    //.skip
    it('Respuesta para password incorrecto', async () => {
    
        // Creando el usuario
        const date = parseInt(Date.now()/1000);
        const email = `pablot${date}@registro.com`;
        const password = `contraseña_correcta`;
        
        // Registrando/guardando el usuario en MongoDB
        headers = {
            'Content-Type': 'application/json'
        }
        body = {
            "email": email,
            "password": password,
            "nombre": `Pablo ${date}`,
            "apellidos": `Tilotta ${date}`,
            "fechaNacimiento": "1970-06-30T00:00:00Z"
        }
        responseText = await POST(`${__URL__}/registro`, headers, body);

        // Verificando que el registro se haya realizado en la base de datos
        const db_result = await (await db()).collection('usuarios').findOne({email: email});
        expect(db_result.email).toBe(email);

        // Realizamos el login con el usuario previamente registrado/guardado
        headers = {
            'Content-Type': 'application/json'
        }

        const __INCORRECT__ = 'contraseña_incorrecta';
        
        body = {
            email,
            password: __INCORRECT__
        }
        
        responseText = await POST(`${__URL__}/login`, headers, body);

        // Chequenado respuesta
        expect(responseText).toContain('Usuario y/o Contraseña inválidos');

    });



});


