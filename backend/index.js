import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv" // позволяет получить доступ к переменным окружения

dotenv.config() // загружаем переменные окружения

const MongoClient = mongodb.MongoClient //получаем доступ к MongoClient

const port = process.env.PORT || 8000  // таким образом получаем доступ к переменной окружения

// console.log('-------------------')
// console.log(dotenv)
// console.log(process.env)
// console.log(process.env.RESTREVIEWS_DB_URI)
// подключаемся к БД:
MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {//настройки подключения к бд
        // poolSize: 50,  // только 50 человек могут законнектиться одновременно
        wtimeoutMS: 2500, //таймаут запроса
        useNewUrlParser: true // использовать новый парсер    
    }
)
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => { // создаем асинхронную функцию
        app.listen(port, () => {   // ЗАПУСКАЕМ СЕРВЕР после того, как законнектились к БД 
            console.log(`listening on port ${port}`)
        })
    }
    )