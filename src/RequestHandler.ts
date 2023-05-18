import EndpointHandler from "./EndpointHandler";
import express from "express";
import GlobalConfigHandler from "./GlobalConfigHandler";

const app = express();

class RequestHandler {
    
    private echoBaseRoute: string;
    private apiPort: number;
    private response: any;
    private searchUrlPrefix: string;
    private endpointRetrievals: EndpointHandler;

    constructor(globalConfig: GlobalConfigHandler) {
        this.apiPort = globalConfig.apiPort;
        this.echoBaseRoute = globalConfig.echoBaseRoute;
        this.searchUrlPrefix = globalConfig.apiBaseRoute
        this.endpointRetrievals = new EndpointHandler(globalConfig.endpointConfigPath);
        this.response = null;
        this.endpointRetrievals.retrieveAPIConfigs(globalConfig.endpointConfigPath);
    }

    runRequest() {
        
        app.all("*", ((req, res, next) => {
            const sentBaseUrl: string = req.originalUrl.slice(0,this.echoBaseRoute.length);
            if (sentBaseUrl === this.echoBaseRoute) {
                const searchUrl = "/" + req.originalUrl.slice(this.echoBaseRoute.length);
                
                this.response = this.endpointRetrievals.matchURLParamters(searchUrl);
                if (this.response != undefined){
                    res.send(
                        {
                            requesttype: req.method,
                            status: this.response.status, 
                            headers: this.response.headers,
                            body: this.response.body[req.method]
                        }
                    )    
                }
                else {
                    res.send(`{cannot ${req.method}}`)
                }
            }

        }).bind(this));

        app.listen(this.apiPort, () => {
            app.emit(`app started`);
            console.log(`Server is listening on port ${this.apiPort}`)
        })
    }




}

export default RequestHandler;