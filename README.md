# proxyactive
Proxy for handling non-HTTPS URLs.  We believe in an open Internet of Things.

Include in your express application
-----------------------------------
```bash
    npm install --save proxyactive
```

Express app example:

```js
var express = require('express')
var proxyactive = require('proxyactive')

var app = express()

app = proxyactive(app)

app.listen(7000)
```    

Visit http://localhost:7000/proxy?url=http://www.google.com/ and google main page will be rendered.

Installation
------------

```bash
    npm install -g proxyactive
```

You may need to run the above as super-user (prefix the command with sudo).
Log output is JSON format using bunyan. If you want a pretty log output, install it.

```bash
    npm install -g bunyan
```

Examples
--------

__Run with default route (/proxy)__

```bash
    proxyactive
```

__Run with a different route__
   
```bash
    proxyactive -p route_name
```

__Run with pretty log output__

```bash
    proxyactive | bunyan
```


What's next?
------------

This is an active work in progress.  Expect regular changes and updates, as well as improved documentation! 


License
-------

MIT License

Copyright (c) 2016 reelyActive

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.


