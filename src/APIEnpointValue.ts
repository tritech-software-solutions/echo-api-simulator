type APIEndpointValue = {
    status: number;
    parameters: Parameter[];
    headers: Header[];
    body: {[key: string]: string};  
}