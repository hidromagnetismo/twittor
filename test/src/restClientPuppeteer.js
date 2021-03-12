
// ln -s ../../../../../../../../puppeteer/node_modules/puppeteer/ puppeteer
const puppeteer = require('puppeteer');

//   ,ad8888ba,   88888888888  888888888888  
//  d8"'    `"8b  88                88       
// d8'            88                88       
// 88             88aaaaa           88       
// 88      88888  88"""""           88       
// Y8,        88  88                88       
//  Y8a.    .a88  88                88       
//   `"Y88888P"   88888888888       88       

exports.GET = async (url, headers) => {
    // Create browser instance, and give it a first tab
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setExtraHTTPHeaders(headers);

    // Allows you to intercept a request; must appear before
    // your first page.goto()
    await page.setRequestInterception(true);

    // Request intercept handler... will be triggered with 
    // each page.goto() statement
    page.on('request', interceptedRequest => {

        // Here, is where you change the request method and 
        // add your post data
        var data = {
            'method': 'GET',
        };

        // Request modified... finish sending! 
        interceptedRequest.continue(data);
    });

    // Navigate, trigger the intercept, and resolve the response
    const response = await page.goto(url);     
    const responseBody = await response.text();
    
    // Close the browser - done! 
    await browser.close();

    return responseBody;
}

// 88888888ba     ,ad8888ba,     ad88888ba  888888888888  
// 88      "8b   d8"'    `"8b   d8"     "8b      88       
// 88      ,8P  d8'        `8b  Y8,              88       
// 88aaaaaa8P'  88          88  `Y8aaaaa,        88       
// 88""""""'    88          88    `"""""8b,      88       
// 88           Y8,        ,8P          `8b      88       
// 88            Y8a.    .a8P   Y8a     a8P      88       
// 88             `"Y8888Y"'     "Y88888P"       88       

exports.POST = async (url, headers, body) => {
    // Create browser instance, and give it a first tab
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setExtraHTTPHeaders(headers);

    // Allows you to intercept a request; must appear before
    // your first page.goto()
    await page.setRequestInterception(true);

    // Request intercept handler... will be triggered with 
    // each page.goto() statement
    page.on('request', interceptedRequest => {

        // Here, is where you change the request method and 
        // add your post data
        var data = {
            'method': 'POST',
            'postData': JSON.stringify(body)
        };

        // Request modified... finish sending! 
        interceptedRequest.continue(data);
    });

    // Navigate, trigger the intercept, and resolve the response
    const response = await page.goto(url);     
    const responseBody = await response.text();
    
    // Close the browser - done! 
    await browser.close();

    return responseBody;
}

// 88888888ba   88        88  888888888888  
// 88      "8b  88        88       88       
// 88      ,8P  88        88       88       
// 88aaaaaa8P'  88        88       88       
// 88""""""'    88        88       88       
// 88           88        88       88       
// 88           Y8a.    .a8P       88       
// 88            `"Y8888Y"'        88       

exports.PUT = async (url, headers, body) => {
    // Create browser instance, and give it a first tab
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setExtraHTTPHeaders(headers);

    // Allows you to intercept a request; must appear before
    // your first page.goto()
    await page.setRequestInterception(true);

    // Request intercept handler... will be triggered with 
    // each page.goto() statement
    page.on('request', interceptedRequest => {

        // Here, is where you change the request method and 
        // add your post data
        var data = {
            'method': 'PUT',
            'postData': JSON.stringify(body)
        };

        // Request modified... finish sending! 
        interceptedRequest.continue(data);
    });

    // Navigate, trigger the intercept, and resolve the response
    const response = await page.goto(url);     
    const responseBody = await response.text();
    
    // Close the browser - done! 
    await browser.close();

    return responseBody;
}

// 88888888ba,    88888888888  88           88888888888  888888888888  88888888888  
// 88      `"8b   88           88           88                88       88           
// 88        `8b  88           88           88                88       88           
// 88         88  88aaaaa      88           88aaaaa           88       88aaaaa      
// 88         88  88"""""      88           88"""""           88       88"""""      
// 88         8P  88           88           88                88       88           
// 88      .a8P   88           88           88                88       88           
// 88888888Y"'    88888888888  88888888888  88888888888       88       88888888888  

exports.DELETE = async (url, headers) => {
    // Create browser instance, and give it a first tab
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setExtraHTTPHeaders(headers);

    // Allows you to intercept a request; must appear before
    // your first page.goto()
    await page.setRequestInterception(true);

    // Request intercept handler... will be triggered with 
    // each page.goto() statement
    page.on('request', interceptedRequest => {

        // Here, is where you change the request method and 
        // add your post data
        var data = {
            'method': 'DELETE',
            // 'postData': JSON.stringify(body)
        };

        // Request modified... finish sending! 
        interceptedRequest.continue(data);
    });

    // Navigate, trigger the intercept, and resolve the response
    const response = await page.goto(url);     
    const responseBody = await response.text();
    
    // Close the browser - done! 
    await browser.close();

    return responseBody;
}

// 88888888ba     ,ad8888ba,     ad88888ba  888888888888  
// 88      "8b   d8"'    `"8b   d8"     "8b      88       
// 88      ,8P  d8'        `8b  Y8,              88       
// 88aaaaaa8P'  88          88  `Y8aaaaa,        88       
// 88""""""'    88          88    `"""""8b,      88       
// 88           Y8,        ,8P          `8b      88       
// 88            Y8a.    .a8P   Y8a     a8P      88       
// 88             `"Y8888Y"'     "Y88888P"       88       
                                                       
                                                       
                                                       
// 88888888888  88  88           88888888888              
// 88           88  88           88                       
// 88           88  88           88                       
// 88aaaaa      88  88           88aaaaa                  
// 88"""""      88  88           88"""""                  
// 88           88  88           88                       
// 88           88  88           88                       
// 88           88  88888888888  88888888888              

exports.POST_FILE = async (url, data) => {
    // const browser = await puppeteer.launch({headless: false});
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    
    await page.setRequestInterception(true);
    
    let first = true;
    page.on('request', interceptedRequest => {
        if (first) {
            interceptedRequest.respond({
                status: 200,
                contentType: 'text/html; charset=utf-8',
                body: ` <!DOCTYPE html>
                        <html>
                            <body>
                                <input type="file" id="fileUpload"/>
                            </body>
                        </html>`
            });
        } else {
            interceptedRequest.continue();
        }
        first = false;
    });

    await page.goto(url);

    await page.waitForSelector('#fileUpload');
    const input = await page.$('#fileUpload');
    await input.uploadFile(data.filePath);

    const responseBody = await page.evaluate(async (url, data) => {
        var formData = new FormData();
        var key = data.key;
        var value = document.querySelector('#fileUpload').files[0];
        formData.append(key, value);

        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': data.authorization
            },
            body: formData
        }).then(response => response.text());

        return result;
    }, url, data);

    // await page.screenshot({path: `screenshot.jpg`});
    await browser.close();
    return responseBody;
}

//   ,ad8888ba,   88888888888  888888888888   
//  d8"'    `"8b  88                88        
// d8'            88                88        
// 88             88aaaaa           88        
// 88      88888  88"""""           88        
// Y8,        88  88                88        
//  Y8a.    .a88  88                88        
//   `"Y88888P"   88888888888       88        
                                           
                                           
                                           
// 88888888888  88  88           88888888888  
// 88           88  88           88           
// 88           88  88           88           
// 88aaaaa      88  88           88aaaaa      
// 88"""""      88  88           88"""""      
// 88           88  88           88           
// 88           88  88           88           
// 88           88  88888888888  88888888888  

var fs = require("fs");

exports.GET_FILE = async (url, data) => {
    // const browser = await puppeteer.launch({headless: false});
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
  
    var Response = await page.goto(url);
    
    var url_extension = url.split('.').pop();
    var Resource_extension = Response._headers['content-type'].split('/').pop();
    
    var url_extension_standardized = url_extension.toLowerCase();
    url_extension_standardized = (url_extension_standardized=='jpg')?'jpeg':url_extension_standardized;
    
    if (url_extension_standardized.match(/jpeg|png|gif/)) {
        __FILE__ = `${__dirname}/../tmp/${url.split('/').pop()}`;
    } else {
        __FILE__ = `${__dirname}/../tmp/${url.split('/').pop()}.${Resource_extension}`;
    }
    
    await fs.writeFile(__FILE__, await Response.buffer(), function(err) {
        if(err) {
            return console.log(err);
        }
    });

    // await page.screenshot({path: `screenshot.jpg`});
    await browser.close();

    return {
        Response: Response,
        File: __FILE__
    };
}


