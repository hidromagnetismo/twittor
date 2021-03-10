
// ln -s ../../../../../../../../puppeteer/node_modules/puppeteer/ puppeteer
const puppeteer = require('puppeteer');



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


