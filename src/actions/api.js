
async function Login(data){
    return new Promise(async (resolve,reject) => {
        const response = await fetch('https://us-central1-kpscheckin.cloudfunctions.net/api/login',{
            method:'POST',
            headers:{
                Accept: 'application/json','Content-Type': 'application/json',
            },
            body:JSON.stringify({
                email:data.email,
                password:data.password
            })
        })
        const responseJson = await response.json()
        if(responseJson.message === "PASS"){
            resolve(responseJson)
        }
        else{
           reject(responseJson)
        }
    })
}

export const Api = {
    Login
}