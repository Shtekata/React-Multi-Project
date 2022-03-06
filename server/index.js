import * as http from 'http'
import * as url from 'url'
import * as querystring from 'querystring'
import * as fs from 'fs'

const hostname = '0.0.0.0'
const port = 7777
const path = process.cwd() == '/' ? '/usr/local/app/server/' : './server'

http
  .createServer((req, res) => {
    const reqUrl = url.parse(req.url)
    const params = querystring.parse(reqUrl.query)
    switch (reqUrl.pathname) {
      case '/cats':
        res.writeHead(200, {'Content-Type': 'text/html'})
        fs.readFile(`${path}/views/cats.html`, (e, d) => {
          if (e) {
            console.log('some error')
            console.log(process.cwd())
            return
          }
          res.write(d)
          res.end()
        })
        break
      case '/dogs':
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write('Hello Dogs!')
        res.end()
        break
      default:
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.end()
        break
    }
  })
  .listen(port, () => console.log(`Server is listening at http://${hostname}:${port}/`))
