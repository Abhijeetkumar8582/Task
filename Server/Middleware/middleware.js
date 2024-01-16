function checkapiKey(req,res,next){
    const apikey = req.get('x-api-key')
    const server_api_Key = process.env.JWT_SECRET_KEY
    if(server_api_Key!==apikey){
        return res.send('invalidUser')
    }
    next()
}
export default checkapiKey