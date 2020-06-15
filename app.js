const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDatabase = require('./util/database');
const studentRoutes = require('./routes/student');
const facultyRoutes = require('./routes/faculty');
const subjectRoutes = require('./routes/subject');
const port = process.env.PORT || 8081;
const path = require('path')

connectDatabase()
    .then(() => {
        console.log('Connected to database');
        app.listen(port, () => {
            console.log('Server started on port ' + port);
        })
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
})
app.use("/api/student", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/subject", subjectRoutes);
