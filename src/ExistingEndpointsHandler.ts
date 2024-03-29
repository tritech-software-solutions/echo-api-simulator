import fs, { readdirSync } from "fs";
const path = require("path");

class ExistingEndpointsHandler {
    simulatorFileNames: string[];
    dirname: string;

    constructor(path: string) {
        if (fs.existsSync(path)) {
            this.dirname = path;
            this.simulatorFileNames = readdirSync(path);
        }
    }

    private getParameterValues(fileContent: any): string[] {
        const parameterNames: string[] = [];
        const endpoint: string = Object.keys(fileContent)[0];
        const parameters = fileContent[endpoint].parameters;
        for (let i = 0; i < parameters.length; i++) {
            parameterNames.push(parameters[i].name);
        }
        return parameterNames;
    }

    private getContentsOfFiles() {
        const simulators: EndpointDisplay[] = [];
        for (const fileName of this.simulatorFileNames) {
            const fileContent: any = JSON.parse(fs.readFileSync(this.dirname + path.sep + fileName, `utf-8`));
            const simulator: EndpointDisplay = {
                name: fileName,
                endpoint: Object.keys(fileContent)[0],
                parameterNames: this.getParameterValues(fileContent),
            };
            console.log(simulator);
            simulators.push(simulator);
        }
        return simulators;
    }

    retrieveListOfEndpointDisplayValues(): EndpointDisplay[] {
        return this.getContentsOfFiles();
    }
}

export default ExistingEndpointsHandler;
