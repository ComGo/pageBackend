const express = require("express");
const cors = require("cors");
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'handyhouse.contacto@gmail.com',
        pass: 'vuqzmmsqmgocnrcc'
    }
});

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.get("/email/:correo/:mensaje/:nombre", (req, res) => {
    var mailOptions = {
        from: 'handyhouse.contacto@gmail.com',
        to: req.params.correo,
        subject: "Correo de contacto automatico.",
        html: '<html><div>'
            + '<img src="Poner direccion de imagen de handhouse"'
            + ' alt="Imagen Logo" height="100px">'
            + '<p>Recibimos tu solicitud, a la brevedad nos ponemos en contacto contigo.</p><br><b>Atentamente HandyHouse<b>'
            + '</div></html>'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {

            mailOptions = {
                from: 'handyhouse.contacto@gmail.com',
                to: 'handyhouse.contacto@gmail.com',
                subject: "Correo de aviso automatico.",
                text: "" + req.params.nombre + " se comunico , diciendo: " +
                    req.params.mensaje + ", con el correo de contacto vinculado: " + req.params.correo + "."
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Emails enviados.");
                }
            });
        }
    });
});

app.get("/", (req, res) => {
    res.status(200).json({ Hola: "si jalo" });
})


app.listen(PORT, () => {
    console.log("Servidor en el puerto " + PORT);
});