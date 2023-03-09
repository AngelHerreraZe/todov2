const express = require('express');
const cors = require("cors");
const db = require('./utils/database')
const morgan = require('morgan');
const initModels = require('./models/initModels');
const userRoutes = require('./routes/users.routes');
const todosRouter = require('./routes/todos.routes');
const categoryRouter = require('./routes/categories.routes');
const PORT = 8000;

initModels();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))

db.authenticate()
    .then(() => console.log("Conexion a base de datos OK"))
    .catch((error) => console.log(error))

db.sync({alter: true})
    .then(() => console.log("Base de datos sincronizada"))
    .catch((error) => console.log(error));

app.use(userRoutes);
app.use(todosRouter);
app.use(categoryRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});