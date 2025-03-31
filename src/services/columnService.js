import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'

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


export const columnService = {
  createNew
}