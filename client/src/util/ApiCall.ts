export async function Post(data: string, url: string): Promise<Response> {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Origin': 'http://localhost:3001' },
        body: data
    };
    let ret: Response = new Response();
    await fetch(process.env.REACT_APP_SERVER_URL + url, requestOptions).then(response => {
        console.debug(response);
        ret = response;
    }).catch(error => {
        console.error('error', error);
        ret = error;
    });
    return ret;
}

export async function Put(data: string, url: string): Promise<Response> {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Origin': 'http://localhost:3001' },
        body: data
    };
    let ret: Response = new Response();
    await fetch(process.env.REACT_APP_SERVER_URL + url, requestOptions).then(response => {
        console.debug(response);
        ret = response;
    }).catch(error => {
        console.error('error', error);
        ret = error;
    });
    return ret;
}

export async function Get(url: string): Promise<Response> {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'GET',
        headers: { 'Origin': 'http://localhost:3001' },
    };
    let ret: Response = new Response();
    await fetch(process.env.REACT_APP_SERVER_URL + url, requestOptions).then(response => {
        console.debug(response);
        ret = response;
    }).catch(error => {
        console.error('error', error);
        ret = error;
    });
    return ret;
}