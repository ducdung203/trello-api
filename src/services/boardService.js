/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  try {
    //Xử lí logic dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    //Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào trong Database
    const createBoard = await boardModel.createNew(newBoard)


    //Lấy bản ghi board sau khi gọi (tùy mục đích mà cần hay k)
    const getNewBoard = await boardModel.findOneById(createBoard.insertedId)

    //Làm thêm các xử lý logic khác với các Collection khác tùy đặc thù dự án ..
    //Bắn email, notification về cho admin khi có 1 cái board mới được tạo...

    //Trả kết quả về, trong Service luôn phải có return
    return getNewBoard
  } catch (error) { throw error }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if(!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }
    return board
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails
}