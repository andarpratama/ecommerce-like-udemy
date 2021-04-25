import {Request, Response, NextFunction} from 'express'
import logging from '../config/logging'

const NAMESPACE = 'Sample Controller'

class sampleController {
   static getPing(req: Request, res: Response) {
      logging.info(NAMESPACE, `Sample route calles`)
      return res.status(200).json({mgs: 'pong'})
   }
}

export default sampleController