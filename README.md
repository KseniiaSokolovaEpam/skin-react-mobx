##Start server (on localhost:8000)
Copy pithon server to file "server.py", <br/>

Use command: 
### ` server.py `
to start the server

###Pithon server:

```python
import SimpleHTTPServer
class CORSHTTPRequestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def send_head(self):
        """Common code for GET and HEAD commands.
        This sends the response code and MIME headers.
        Return value is either a file object (which has to be copied
        to the outputfile by the caller unless the command was HEAD,
        and must be closed by the caller under all circumstances), or
        None, in which case the caller has nothing further to do.
        """
        path = self.translate_path(self.path)
        f = None
        if os.path.isdir(path):
            if not self.path.endswith('/'):
                # redirect browser - doing basically what apache does
                self.send_response(301)
                self.send_header("Location", self.path + "/")
                self.end_headers()
                return None
            for index in "index.html", "index.htm":
                index = os.path.join(path, index)
                if os.path.exists(index):
                    path = index
                    break
            else:
                return self.list_directory(path)
        ctype = self.guess_type(path)
        try:
            # Always read in binary mode. Opening files in text mode may cause
            # newline translations, making the actual size of the content
            # transmitted *less* than the content-length!
            f = open(path, 'rb')
        except IOError:
            self.send_error(404, "File not found")
            return None
        self.send_response(200)
        self.send_header("Content-type", ctype)
        fs = os.fstat(f.fileno())
        self.send_header("Content-Length", str(fs[6]))
        self.send_header("Last-Modified", self.date_time_string(fs.st_mtime))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Expose-Headers", "Access-Control-Allow-Origin")
        self.send_header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        self.end_headers()
        return f


if __name__ == "__main__":
    import os
    import SocketServer

    PORT = 8000

    Handler = CORSHTTPRequestHandler
    #Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

    httpd = SocketServer.TCPServer(("", PORT), Handler)

    print "serving at port", PORT
    httpd.serve_forever()
```


## Build html5-skin.js
### `npm run build`

## Use your html file or debug page
[Example](http://debug.ooyala.com/ea/index.html?ec=lmOGd1ZDE6MhK0I_Lw3IGeRHyksy_8np&pbid=242f532f58ad4b2e9192f84fd4ff727d&pcode=pyaDkyOqdnY0iQC2sTO4JeaXggl9&core_player=%2F%2Fplayer.ooyala.com%2Fstatic%2Fv4%2Fcandidate%2Flatest%2Fcore.min.js&video_plugins=%2F%2Fplayer.ooyala.com%2Fstatic%2Fv4%2Fcandidate%2Flatest%2Fvideo-plugin%2Fmain_html5.min.js&html5_skin=%2F%2Flocalhost%3A8000%2Fprojects%2Fskin-react-mobx%2Fbuild%2Fhtml5-skin.js&skin_asset=%2F%2Flocalhost%3A8000%2Fprojects%2Fskin-react-mobx%2Fbuild%2Fhtml5-skin.css&skin_config=%2F%2Fraw.githubusercontent.com%2FPlaybackWebTest%2FJsonFiles%2FPlayerSkin%2Fskin-default.json&trackingLevel=unset)