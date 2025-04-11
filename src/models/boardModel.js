/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { BOARD_TYPES } from '~/utils/constants'
import { columnModel } from './columnModel'
import { cardModel } from './cardModel'

// Define Collection (Name & Schema)
const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),

  type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),

  columnOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt'] // Các trường không được phép update

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}


const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const createBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
    return createBoard
  } catch (error) { throw new Error(error) }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
    return result
  } catch (error) { throw new Error(error) }
}


// Query tổng hợp (aggregate) để lấy toàn bộ card và column về board
const getDetails = async (id) => {
  try {
    // const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
      { $match: {
        _id: new ObjectId(id),
        _destroy: false
      } },
      { $lookup: {
        from: columnModel.COLUMN_COLLECTION_NAME,
        localField: '_id',
        foreignField: 'boardId',
        as: 'columns'
      } },
      { $lookup: {
        from: cardModel.CARD_COLLECTION_NAME,
        localField: '_id',
        foreignField: 'boardId',
        as: 'cards'
      } }
    ]).toArray()
    return result[0] || null
  } catch (error) { throw new Error(error) }
}

// push 1 columnId vào mảng columnOrderIds của board
const pushColumnOrderIds = async (column) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(column.boardId) },
      { $push: { columnOrderIds: new ObjectId(column._id) } },
      { returnDocument: 'after' }
    )

    return result
  } catch (error) { throw new Error(error) }
}

const update = async (boardId, updateData) => {
  try {
    //lọc những trường không được phép update
    Object.keys(updateData).forEach((fieldname) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldname)) {
        delete updateData[fieldname]
      }
    })

    if (updateData.columnOrderIds) {
      updateData.columnOrderIds = updateData.columnOrderIds.map((columnId) => (new ObjectId(columnId)))
    }
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(boardId) },
      { $set: updateData },
      { returnDocument: 'after' } //trả về bản ghi sau khi update
    )

    return result
  } catch (error) { throw new Error(error) }
}

//lấy 1 phần tử trong mảng columnOrderIds của board
//dùng $pull để lấy 1 phần tử ra khỏi mảng rồi xóa nó
const pullColumnOrderIds = async (column) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(column.boardId) },
      { $pull: { columnOrderIds: new ObjectId(column._id) } },
      { returnDocument: 'after' }
    )

    return result
  } catch (error) { throw new Error(error) }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
  pushColumnOrderIds,
  update,
  pullColumnOrderIds
}
