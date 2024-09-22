async function handleErrors() {
    url ="IveNeverSeenSomeoneUnder40ProgramWithC.com"
    let response = await fetch(url);
    let result = await response.json();
    if(response.status == 400){
    res.status(400).send(JSON.stringify(result))
  }
}
handleErrors()