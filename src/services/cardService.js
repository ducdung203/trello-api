import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
  
    const newCard = {
      ...reqBody 
    }

    const createCard = await cardModel.createNew(newCard)

    const getNewCard = await cardModel.findOneById(createCard.insertedId)

     if (getNewCard) {
          //cập nhật lại cardOrderIds cho collection boards
          await columnModel.pushCardOrderIds(getNewCard)
        }

    return getNewCard
  } catch (error) { throw error }
}


export const cardService = {
  createNew
}