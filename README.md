# ssr-react-based
server side rendeing using react framework 

## CSR(client-side-rendering) With basic react app
### simple basic layout of csr rendering 
![CSR-Basic structure](/src/Images/csr_basic.png)

1. basic react app localhost app call response 
![CSR-Localhost-api-call](/src/Images/csr_localhost.png)

The script tag causes second request to server
Which is bundle.js which has all our react application codebase
2. bundle.js
![CSR-budnle file](/src/Images/csr_bundle.png)


### both 1 and 2 
![csr-rendering-process](/src/Images/csr_time1.png)
![csr-coplete-rendering-process-with-react](/src/Images/csr_complete_round_trip.png)

Only aftet all these aboves steps completion we would see content on the screen.

## SSR (server-side-rendering) with react app

### basic rendering of ssr 
[!ssr-localhost](/src/Images/ssr_localhost.png)

Only html document response from the server which has all initial content to render.
Basic daigram -
![ssr-basic-structure](/src/Images/ssr_time.png)

### Behind the scene of rendering process
![ssr-complete-flow1](/src/Images/ssr_complete_floe_1.png)
![ssr-complete-flow2](/src/Images/ssr_complete_flow_2.png)



### code explaination

```javascript
    (req,res) => {
    const content = renderToString(<Home /> // Home a basic jsx file which has some text 
    );
    res.sent(content)
}
```
If we run the application after above changes we would get error
that is because, Since We are using jsx file in node js server application
Jsx is not valid js code.

## In the csr process our browser would handles this convertion, It always gets converted to es5 code before it gets executed in the browser

So the node env has no idea what is this jsx.

### To fix this issue we have to do manually convert this jsx to es5 

### basic flow of how this process works , Home1,Hom2,etc > index > Webpack -> Babel -> bundle.js 
### In the client side  - 
```bash
We will have bunch of jsx files ex: Home, app , etc
And we import all these bunch of files into index.js
And this entire tree of files get run through webpack and babel
And babel looks into all these file converts them into normal es5 
 - which is the final budnle.js
```

### So same thing we have to at server side manuualy 
To do this we have webpack.server.js file which will handle all this process
Webpack.server.js will convert server side jsx files into es5 code and have it in bundle.js in build folder
and we inject this bundle in the response
```javascript
    const content = renderToString(<Home/>
    );
    return `<html>
    <head>
    </head>
    <body>
        <div id="root"> ${content}</div>
        <script src = "bundle.js"></script>
    </body>
</html>`
```

### aftet the above step we should be able to see our Home component on the browser


**note : The event handles example onclick on button will not work here because 
In CSR - A js file will be loaded into browser and attached to dom and all event handlers work
But in SSR - we are not sending js file back to client, only just html
Since html is not very interactive we use react for dynamic interaction

### So to address this we have to ship down js from server to client to make event handles work or make UI responsive
	1. Render html - first send HTML document to client along with script tag
        so the scipt tag causes a following request back to server to send back bundle.js 
	2. Load up react application to handle event handles 

This is where we have to create webpack.client.js file
