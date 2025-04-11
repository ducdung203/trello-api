
import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'
// import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {
    const createBoard = await columnService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createBoard)

  } catch (error) {next(error)}
}

const update = async (req, res, next) => {
  try {
    const columnId = req.params.id
    //
    const updateColumn = await columnService.update(columnId, req.body)

    res.status(StatusCodes.OK).json(updateColumn)


    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'test error')
  } catch (error) {next(error)}
}

const deleteItem = async (req, res, next) => {
  try {
    const columnId = req.params.id
    const result = await columnService.deleteItem(columnId)

    res.status(StatusCodes.OK).json(result)


    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'test error')
  } catch (error) {next(error)}
}

export const columnController = {
  createNew,
  update,
  deleteItem
}
