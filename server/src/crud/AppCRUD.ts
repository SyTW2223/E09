import {UserDocumentInterface} from '../models/user';
import { JuiceDocumentInterface } from '../models/juice';
import * as jwt from 'jsonwebtoken';

export class AppCRUD {

  // POST
  public static async post(req:any, res: any, element: UserDocumentInterface|JuiceDocumentInterface) {
    const bearerHeader =  req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined'){
      const bearerToken = bearerHeader.split(" ")[1];

      jwt.verify(bearerToken, 'secretkey', async (err: any) => {
        if (err){
          return res.status(403).send({error: 'La sesión ha expirado'});
        } else {
          try {
            await element.save();
            return res.status(201).send(element);
          } catch (error) {
            return res.status(400).send({error: error});
          }
        }
      });
    } else {
      return res.status(400).send({error: 'Debe proporcionarse un token'});
    }
  }

  // GET
  public static async get(res: any, filter: any, model: any) {
    try {
      const elements = await model.find(filter);

      if (elements.length !== 0) {
        return res.status(200).send(elements);
      }
      return res.status(404).send('Elemento no encontrado');
    } catch (error) {
      return res.status(500).send({error: error});
    }
  }

  // PATCH
  public static async patch(req: any, res: any, model: any) {
    const bearerHeader =  req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(" ")[1];

      jwt.verify(bearerToken, 'secretkey', async (err: any) => {
        if (err) {
          return res.status(403).send({error: 'La sesión ha expirado'});
        } else {
          try {
            const element = await model.findByIdAndUpdate(req.query.id, req.body, {
              new: true,
              runValidators: true,
            });
      
            if (!element) {
              return res.status(404).send({error: 'Elemento no encontrado'});
            }
        
            return res.status(200).send(element);
          } catch (err) {
            return res.status(400).send({error: err});
          }
        }
      });
    } else {
      return res.status(400).send({error: 'Debe proporcionarse un token'});
    }
  }

  // DELETE
  public static async delete(req: any, res: any, model: any) {
    const bearerHeader =  req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined'){
      const bearerToken = bearerHeader.split(" ")[1];

      jwt.verify(bearerToken, 'secretkey', async (err: any) => {
        if (err){
          return res.status(403).send({error: 'La sesión ha expirado'});
        } else {
          try {
            const element = await model.findByIdAndDelete(req.query.id);
      
            if (!element) {
              return res.status(404).send();
            }
      
            return res.status(200).send(element);
          } catch (error) {
            return res.status(400).send();
          }
        }
      });
    } else {
      return res.status(400).send({error: 'Debe proporcionarse un token'});
    }
  }

}