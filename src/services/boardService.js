
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

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
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }
    //Deep clone Board mới, tránh ảnh hưởng đến dữ liệu gốc, tùy mục đích về sau mà cần hay không
    const resBoard = cloneDeep(board)
    //đưa card về đúng column của nó
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })

    //xóa mang card ở resBoard
    delete resBoard.cards

    return resBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails
}