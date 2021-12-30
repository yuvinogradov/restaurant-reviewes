import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"


const app = express()

app.use(cors())
app.use(express.json())  // наш сервер будет принимать json-ы в теле запроса (in a request body)

// lets specify some of the initial routs:
app.use("/api/v1/restaurants", restaurants)  // initial url. Общая процедура для API urls - указать что это API,
// его версию, и к чему оно относится
// Базовым URL будет 'localhost:PORT'
// второй параметр - маршрут (route) будет в файле restaurants
// если кто-то попытается пойти по адресу, который не существует:
app.use("*", (req, res) => res.status(404).json({ error: "not found" })) // второй параметр - функция, которая в res
// передаст статус и json с ошибкой


export default app  //мы экспортируем app как модуль

