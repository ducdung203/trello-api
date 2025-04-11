import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }

    const createColumn = await columnModel.createNew(newColumn)

    const getNewColumn = await columnModel.findOneById(createColumn.insertedId)

    if (getNewColumn) {
      //xử lí cấu trúc data trước khi trả về cho client
      getNewColumn.cards = []

      //cập nhật lại cardOrderIds cho collection boards
      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) { throw error }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updateColumn = await columnModel.update(columnId, updateData)


    return updateColumn
  } catch (error) { throw error }
}

const deleteItem = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId)
    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'column not found!')
    }
    //xóa column
    await columnModel.deleteOneById(columnId)

    //xóa toàn bộ card trong column đó
    await cardModel.deleteManyByColumnId(columnId)

    //xóa columnId trong mảng columnOrderIds của board
    await boardModel.pullColumnOrderIds(targetColumn)

    return { deleteResult: 'Column and its Cards deleted successfully! ' }
  } catch (error) { throw error }
}


export const columnService = {
  createNew,
  update,
  deleteItem
}