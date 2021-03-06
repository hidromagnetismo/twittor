
// import test from 'jest';
// import puppeteer from 'puppeteer';
const { GET, POST, PUT } = require('./src/restClientPuppeteer');
let __URL__, __DB__, Headers, Body, ResponseText, ResponseJSON;

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
        Headers = {
            'Content-Type': 'application/json'
        }
        const date = parseInt(Date.now());
        const email = `pablot${date}@registro.com`;
        Body = {
            "email": email,
            "password": "123456",
            "nombre": `Pablo ${date}`,
            "apellidos": `Tilotta ${date}`,
            "fechaNacimiento": "1970-06-30T00:00:00Z"
        }
        ResponseText = await POST(`${__URL__}/registro`, Headers, Body);

        // Verificando que el registro se haya realizado en la base de datos
        const DB_usuario = await (await db()).collection('usuarios').findOne({email: email});
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
    Headers = {
        'Content-Type': 'application/json'
    }
    Body = {
        "email": email,
        "password": password,
        "nombre": `Pablo ${date}`,
        "apellidos": `Tilotta ${date}`,
        "fechaNacimiento": "1970-06-30T00:00:00Z"
    }
    ResponseText = await POST(`${__URL__}/registro`, Headers, Body);

    // Verificando que el registro se haya realizado en la base de datos
    const DB_usuario = await (await db()).collection('usuarios').findOne({email: email});
    expect(DB_usuario.email).toBe(email);

    // Realizamos el login con el usuario previamente registrado/guardado
    Headers = {
        'Content-Type': 'application/json'
    }
    Body = {
        email,
        password
    }
    ResponseText = await POST(`${__URL__}/login`, Headers, Body);
    ResponseJSON = JSON.parse(ResponseText);

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
        
        Headers = {
            'Content-Type': 'application/json'
        }

        const __NO_EXIST__ = 'no@existo.tld';

        Body = {
            email: __NO_EXIST__,
            password: '123'
        }

        ResponseText = await POST(`${__URL__}/login`, Headers, Body);
        
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
        Headers = {
            'Content-Type': 'application/json'
        }
        Body = {
            "email": email,
            "password": password,
            "nombre": `Pablo ${date}`,
            "apellidos": `Tilotta ${date}`,
            "fechaNacimiento": "1970-06-30T00:00:00Z"
        }
        ResponseText = await POST(`${__URL__}/registro`, Headers, Body);

        // Verificando que el registro se haya realizado en la base de datos
        const DB_usuario = await (await db()).collection('usuarios').findOne({email: email});
        expect(DB_usuario.email).toBe(email);

        // Realizamos el login con el usuario previamente registrado/guardado
        Headers = {
            'Content-Type': 'application/json'
        }

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
        Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer${ResponseJSON.token}`
        }
        
        // Si no se esta enviando el ID del usuario
        ResponseText = await GET(`${__URL__}/verPerfil`, Headers);
        
        // la respuesta deberia ser:
        expect(ResponseText).toContain('Debe enviar el parámetro ID');
        
        ResponseText = await GET(`${__URL__}/verPerfil?id=${DB_usuario._id}`, Headers);
        ResponseJSON = JSON.parse(ResponseText);
        
        // Confirmando respuesta
        expect(ResponseJSON.id).toBeDefined();
        expect(ResponseJSON.id).toBe(DB_usuario._id.toString());
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
describe('Endpoint GET /modificarPerfil, modificando el perfil del usuario', () => {
    
    //.only
    //.skip
    it('Default', async () => {
        
        let {email, DB_usuario, ResponseJSON} = await registerAndLogin();
        
        // Realizando petición con el token obtenido
        Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer${ResponseJSON.token}`
        }

        const ubicacion = "Ciudad Autónoma de Buenos Aires";
        const biografia = "Profesional de los BITs, Analista Funcional SR, Programador experto desde hace mas de 31 años. Instructor de UDEMY y apasionado de la informática. #UDEMY";
        const sitioWeb = "https://www.pablotilotta.com";

        Body = {
            ubicacion,
            biografia,
            sitioWeb
        }

        ResponseText = await PUT(`${__URL__}/modificarPerfil`, Headers, Body);

        // Traemos la actualización de la base de datos
        const DB_usuario_update = await (await db()).collection('usuarios').findOne({email: email});


        // Tayendose el perfil luego de haber actualizado
        Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer${ResponseJSON.token}`
        }

        ResponseText = await GET(`${__URL__}/verPerfil?id=${DB_usuario._id}`, Headers);
        ResponseJSON = JSON.parse(ResponseText);

        // Confirmando respuesta
        expect(ResponseJSON.id).toBeDefined();
        expect(ResponseJSON.id).toBe(DB_usuario_update._id.toString());

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

        let {email, DB_usuario, ResponseJSON} = await registerAndLogin();

        // Enviando peticion 
        Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer${ResponseJSON.token}`
        }
        const date = parseInt(Date.now());
        const mensaje = `Es es mi primer tweet ${date}`;
        Body = {
            mensaje
        }
        ResponseText = await POST(`${__URL__}/tweet`, Headers, Body);

        const DB_tweet = await (await db()).collection('tweet').findOne({mensaje: mensaje});
        
        // Verificando que se haya registrado en la base de datos
        expect(DB_tweet.mensaje).toBe(mensaje);
        
        // Checando el usuario dueño del tweet:
        expect(DB_tweet.userid).toBe(DB_usuario._id.toString());

    });

});

















