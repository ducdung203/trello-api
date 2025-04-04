/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
// import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service
    const createBoard = await boardService.createNew(req.body)

    //có kết quả thì trả về Client
    res.status(StatusCodes.CREATED).json(createBoard)


    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'test error')
  } catch (error) {next(error)}
}

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id
    //
    const board = await boardService.getDetails(boardId)

    res.status(StatusCodes.OK).json(board)


    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'test error')
  } catch (error) {next(error)}
}
const update = async (req, res, next) => {
  try {
    const boardId = req.params.id
    //
    const updateBoard = await boardService.update(boardId, req.body)

    res.status(StatusCodes.OK).json(updateBoard)


    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'test error')
  } catch (error) {next(error)}
}

const moveCardToDifferentColumn = async (req, res, next) => {
  try {
    //
    const result = await boardService.moveCardToDifferentColumn(req.body)

    res.status(StatusCodes.OK).json(result)


    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'test error')
  } catch (error) {next(error)}
}

export const boardController = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}
