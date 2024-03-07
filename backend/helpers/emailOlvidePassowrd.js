import nodemailer from 'nodemailer'

const emailOlvidePassword = async (datos) =>{
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
        subject: 'Restablece tu password  ',
        text: 'Restablece tu password ',
        html: `<p> hola: ${nombre}, has solicitado restablecer tu password. </p>

          <p>  sigue el siguiente  enlace:
          <a href="${process.env.FROTEND_URL}/olvide-password/${token}"> Restablecer password </a> </p> 
           
           `
         
      });
      console.log("Mensaje enviado : %s", info.messageId)
}


export default emailOlvidePassword