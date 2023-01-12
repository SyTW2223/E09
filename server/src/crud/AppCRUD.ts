import {UserDocumentInterface} from '../models/user';
import { JuiceDocumentInterface } from '../models/juice';
import * as jwt from 'jsonwebtoken';
import { handleErrors } from './assets/handleErrors';

export class AppCRUD {

  public static async post(res: any, element: UserDocumentInterface|JuiceDocumentInterface) {
    try {
      await element.save();
      return res.status(201).send(element);
    } catch (error) {
      handleErrors(error, res);
    }
  }

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
  
  public static async idGet(req: any, res: any, model: any) {
    try {
      const element = await model.findById(req.params.id);

      if (!element) {
        return res.status(404).send();
      }
      return res.status(200).send(element);
    } catch (error) {
      return res.status(500).send({error: error});
    }
  }

  public static async patch(req: any, res: any, filter: any, model: any) {
    const bearerHeader =  req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(" ")[1];

      jwt.verify(bearerToken, 'secretkey', async (err: any) => {
        if (err) {
          return res.status(403).send({error: 'La sesión ha expirado'});
        } else {
          try {
            const element = await model.findOneAndUpdate(filter, req.body, {
              new: true,
              runValidators: true,
            });
      
            if (!element) {
              return res.status(404).send({error: 'Elemento no encontrado'});
            }
        
            return res.send(element);
          } catch (err) {
            return res.status(500).send({error: err});
          }
        }
      });
    } else {
      return res.status(400).send({error: 'Debe proporcionarse un token'});
    }
  }

  public static async idPatch(req: any, res: any, model: any) {
    const bearerHeader =  req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(" ")[1];

      jwt.verify(bearerToken, 'secretkey', async (err: any) => {
        if (err) {
          return res.status(403).send({error: 'La sesión ha expirado'});
        } else {
          try {
            const element = await model.findByIdAndUpdate(res.params.id, req.body, {
              new: true,
              runValidators: true,
            });
      
            if (!element) {
              return res.status(404).send({error: 'Elemento no encontrado'});
            }
        
            return res.send(element);
          } catch (err) {
            return res.status(500).send({error: err});
          }
        }
      });
    } else {
      return res.status(400).send({error: 'Debe proporcionarse un token'});
    }
  }

  public static async delete(req: any, res: any, model: any) {
    try {
      const element = await model.findOneAndDelete({name: req.query.name.toString()});

      if (!element) {
        return res.status(404).send();
      }

      return res.send(element);
    } catch (error) {
      return res.status(400).send();
    }
  }

  public static async idDelete(req: any, res: any, model: any) {
    try {
      const element = await model.findByIdAndDelete(req.params.id);

      if (!element) {
        return res.status(404).send();
      }

      return res.send(element);
    } catch (error) {
      return res.status(400).send();
    }
  }
}