import { Request, Response, ErrorRequestHandler } from "express";
import logging from "../config/logging";
import { Courses } from "../models/Courses";
import { Videos } from "../models/Videos";

class VideoController {
   static home(req: Request, res: Response, err: ErrorRequestHandler) {
      res.status(200).json({msg: 'Video / Home'})
   }

   static getAll(req: Request, res: Response, err: ErrorRequestHandler) {
      res.status(200).json({msg: 'Get all videos..'})
   }

   static async create(req: Request, res: Response, err: ErrorRequestHandler) {
      const { name, url } = req.body
      const idCourse = (<any>req).params.idcourse
      const idUser:string = (<any>req).userId
      try {
         const createVideo = await Videos.create({ name, url })
         const pushedToCourse = await Courses.findByIdAndUpdate(idCourse, { $push: { 'videosId': createVideo.id } }, { new: true })
         logging.info('CREATE VIDEO', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(201).json({ msg: 'Creating new video is success..', createVideo: createVideo, pushedToCourse: pushedToCourse?.videosId })
         
      } catch (err) {
         logging.warn('CREATE VIDEO', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         // res.status(500).json({msg: 'Creating new video is failed..', error: err})  
         throw ({name: 'Failed_created'})
      }
   }

   static async getOne(req: Request, res: Response, err: ErrorRequestHandler) {
      const idVideo = (<any>req).params.idvideo
      
      try {
         const oneVideo = await Videos.findById(idVideo)
         res.status(200).json({ message: 'Success get this one video..', data: oneVideo })
      } catch (err) {
         res.status(200).json({ message: 'Failed get this one video..', data: err })
      }
   }

   
}

export default VideoController