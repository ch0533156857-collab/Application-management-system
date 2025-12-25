const baseURL = 'http://localhost:4000';

function getHeaders() {
   const token = localStorage.getItem('token');
   return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ` `
   };
}

export async function get(endpoint: string) {
    const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'GET',
        headers: getHeaders(),
    });
    if(!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }
    return response.json();
}

export async function post(endpoint: string, data: any) {
    const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    if(!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }
    return response.json();
}

export async function put(endpoint: string, data: any) {
    const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    if(!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }   
    return response.json();
}

export async function del(endpoint: string) {
    const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    if(!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }
    return response.json();
}

