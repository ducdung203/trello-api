/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'


//khởi tạo 1 đối tượng trelloDatabaseInstance ban đầu là null(vì chưa connect)
let trelloDatabaseInstance = null

//khởi tạo đối tượng mongoClientInstance để kết nối tới mongodb
const mongoClientInstance =new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

//kết nối tới Database
export const CONNECT_DB = async () =>{
  //Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()

  //kết nối thành công lấy Database theo tên và gán ngược lại nó vào biến trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

//chỉ goi khi đã kết nối đc database
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}

//đóng kết nối khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}