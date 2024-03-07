
import mongoose from 'mongoose';

const conectarDB = async () => {
  try{
   const db = await mongoose.connect(process.env.MONGO_URI,{
    useNewURlParser: true,
    useUnifiedTopology: true,
   });


   const url = `${db.connection.host}: ${db.connection.port}`;

  }catch(error){
    console.log(`error: ${error.message}`);
    process.exit(1)
  }
}

export default conectarDB;