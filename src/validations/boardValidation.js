
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'


const createNew = async (req, res, next) => {
  const correctConditon = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  })

  try {
    //chỉ định abortEarly: false để hiển thị nhiều lỗi validation
    await correctConditon.validateAsync(req.body, { abortEarly: false })
    // validaton dữ liệu xong hợp lệ thì cho request đi tiếp sang controller
    next()

  } catch (error) {
    // console.log(error)
    // const errorMessage = new Error(error).message
    // const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
const update = async (req, res, next) => {
  //lưu ý không dùng required() với trường hợp update vì có thể không truyền vào trường nào đó
  const correctConditon = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE)
  })

  try {
    //chỉ định abortEarly: false để hiển thị nhiều lỗi validation
    await correctConditon.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true //cho phép các trường không nằm trong điều kiện validation
    })
    next()

  } catch (error) {
    // console.log(error)
    // const errorMessage = new Error(error).message
    // const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const moveCardToDifferentColumn = async (req, res, next) => {
  //lưu ý không dùng required() với trường hợp update vì có thể không truyền vào trường nào đó
  const correctConditon = Joi.object({
    currentCardId: Joi.string().required().pattern(OBJECT_ID_RULE).messages(OBJECT_ID_RULE_MESSAGE),

    prevColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).messages(OBJECT_ID_RULE_MESSAGE),
    prevCardOrderIds: Joi.array().required().items(Joi.string().pattern(OBJECT_ID_RULE).messages(OBJECT_ID_RULE_MESSAGE)),

    nextColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).messages(OBJECT_ID_RULE_MESSAGE),
    nextCardOrderIds: Joi.array().required().items(Joi.string().pattern(OBJECT_ID_RULE).messages(OBJECT_ID_RULE_MESSAGE))

  })

  try {
    //chỉ định abortEarly: false để hiển thị nhiều lỗi validation
    await correctConditon.validateAsync(req.body, { abortEarly: false })
    next()

  } catch (error) {
    // console.log(error)
    // const errorMessage = new Error(error).message
    // const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const boardValidation = {
  createNew,
  update,
  moveCardToDifferentColumn
}