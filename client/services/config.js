export const LOCAL_URL = 'http://127.0.0.1:8000/';

const setHeaders = () => {
  let headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'POST, PUT, GET, PATCH, DELETE, OPTIONS'
  });
  return headers;
}

export const getReq = async (label, url) => {
  try{
    const reqParams = {
      method: 'GET',
      headers: setHeaders()
    }

    const url_completa = new URL(LOCAL_URL + url);
    const resp = await fetch(url_completa, reqParams);
    
    if (resp.status < 300) {
      const json = await resp.json();
      return json;
    }
    return null;
  }catch(e){
    console.log(`Houve um problema ao carregar ${label}: `+e);
  }
}