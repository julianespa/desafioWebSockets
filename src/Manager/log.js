const fs = require('fs')

const pathToLog = __dirname+"/../files/log.json"

class LogManager {
    add = async (obj) => {
        if (fs.existsSync(pathToLog)) {
            try {
                let data = await fs.promises.readFile(pathToLog,'utf-8')
                let log = JSON.parse(data)
                log.push(obj)
                await fs.promises.writeFile(pathToLog,JSON.stringify(log,null,2))
                return {status:'success',message:'message added'}
            
            } catch (error) {
                return {status:'error', error:error}
            }
        }else {
            try {
                await fs.promises.writeFile(pathToLog,JSON.stringify([obj],null,2))
                return {status:'success',message:'message added'}
            } catch (error) {
                return {status:'error', error:error}
            }
        }    
    }

    get = async () => {
        if(fs.existsSync(pathToLog)){
            try {
                let data = await fs.promises.readFile(pathToLog,'utf-8')
                let log = JSON.parse(data)
                return {status:'success',payload:log}
            } catch (error) {
                return {status:'error',error:error}
            }
        }
        else {
            return {status:'success',payload:[]}
        }
    }
}

module.exports = LogManager