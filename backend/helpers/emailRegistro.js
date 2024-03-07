import nodemailer from 'nodemailer'

const emailRegistro = async (datos) =>{
    var transport = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      });


      const { email, nombre, token  } = datos

      const info = await transport.sendMail({
        from: "APV - Adminitrador de Pacientes de veterinarios",
        to: email,
        subject: 'Comprueba tu Cuenta en APV',
        text: 'Comprueba tu cuenta en APV',
        html: `<p> hola: ${nombre}, comprueba tu cuenta en APV. </p>
          <p> Tu cuenta ya esta lista, solo debes comprobarla en el siguente enlace:
          <a href="${process.env.FROTEND_URL}/confirmar/${token}"> Comprobar Cuenta </a> </p> 
           
            <p> Si tu no creaste esta cuenta , ignora el mensaje <p>
           
           `
         
      });
      console.log("Mensaje enviado : %s", info.messageId)
}


export default emailRegistro