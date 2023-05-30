import app from "./app";
import  AppDataSource  from "./data-source";

AppDataSource.initialize().then( () => {
    console.log("Database connected !")

    app.listen(process.env.PORT, () => {
        console.log("Server is running")
    })
}).catch((error: any) => {

    console.log(error)
})