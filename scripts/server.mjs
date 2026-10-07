import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('../dist/',import.meta.url)));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
export function makeServer(){return createServer(async(req,res)=>{
 const headers={'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','X-Frame-Options':'DENY','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self' https:; base-uri 'self'; form-action 'self' mailto:; frame-ancestors 'none'"};
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{...headers,Allow:'GET, HEAD'});res.end();return;}
 try{let path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=resolve(root,'.'+path);if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403,headers);res.end('Forbidden');return;}let code=200;try{if((await stat(file)).isDirectory()){if(!path.endsWith('/')){res.writeHead(308,{...headers,Location:path+'/'});res.end();return;}file=resolve(file,'index.html');}}catch{file=resolve(root,'404.html');code=404;}let body;try{body=await readFile(file);}catch{file=resolve(root,'404.html');body=await readFile(file);code=404;}res.writeHead(code,{...headers,'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':extname(file)==='.woff2'?'public, max-age=31536000, immutable':'no-cache'});res.end(req.method==='HEAD'?undefined:body);}catch{res.writeHead(400,headers);res.end('Bad request');}
 });}
if(process.argv[1]===fileURLToPath(import.meta.url)){const port=Number(process.env.PORT||3000);makeServer().listen(port,'0.0.0.0',()=>console.log(`CodeCrab server listening on port ${port}`));}
