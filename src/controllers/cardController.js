
import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'
// import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {
    const createBoard = await cardService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createBoard)

  } catch (error) {next(error)}
}

export const cardController = {
  createNew
}
