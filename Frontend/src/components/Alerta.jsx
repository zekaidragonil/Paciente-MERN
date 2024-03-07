


const Alerta = ({alerta}) =>{
    return(
        <div className={`${alerta.error ? 'from-red-400 to-red-600' :
         'from-indigo-400 to-indigo-600'} bg-gradient-to-br text-center uppercase rounded-xl 
          font-bold text-white text-sm p-3 mb-10`} >
             {alerta.msg}
        </div>
    )
}
export default Alerta;