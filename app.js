const express =  require("express")
const dotenv = require("dotenv")
const mongoose = require('mongoose');
const cors = require("cors");

const app = express()

app.use(cors())
app.use(express.json({extended: true}))
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/link", require("./routes/link.routes"))
app.use("/s", require("./routes/redirect.routes"))


dotenv.config()
const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
        app.listen(PORT, () => console.log(`App start on port ${PORT}`))
    } catch (e) {
        console.log(`Error during connection to the database: ${e}`)
    }
}

start()
