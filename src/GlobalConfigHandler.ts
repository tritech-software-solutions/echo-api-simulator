import fs from 'fs';

class GlobalConfigHandler {

    globalConfigPath: string;
    apiPort: number;
    interfacePort: number;
    endpointConfigPath: string;
    echoBaseRoute: string;
    apiBaseRoute: string;

    constructor(globalConfigPath) {
        this.globalConfigPath = globalConfigPath;
    }

    retrieveGlobalConfig() {
        const globalConfig = JSON.parse(fs.readFileSync(this.globalConfigPath , `utf-8`));

        try {
            this.apiPort = parseInt(globalConfig.apiport) | 3001;
            this.interfacePort = parseInt(globalConfig.interfacePort) | 3002;
            this.endpointConfigPath = globalConfig.endpoint.configpath;
            this.echoBaseRoute = globalConfig.endpoint.echobaseroute;
            this.apiBaseRoute = globalConfig.endpoint.apiprefix
        }
        catch (err) {
            console.error(err)
        }
    }
}

export default GlobalConfigHandler;