import GlobalConfigHandler from './GlobalConfigHandler';
import InterfaceHandler from './InterfaceHandler';
import RequestHandler from './RequestHandler';

const globalConfigPath: string = `././gconfig.json`;
const globalConfig = new GlobalConfigHandler(globalConfigPath);
globalConfig.retrieveGlobalConfig();

const test: RequestHandler = new RequestHandler(globalConfig);
const testInterface: InterfaceHandler = new InterfaceHandler(globalConfig);

testInterface.runRequest();

