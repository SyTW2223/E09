import * as jwt from 'jsonwebtoken';
import { UserDocumentInterface } from '../models/user';
import { handleErrors } from './assets/handleErrors';
import { sendEmail } from './assets/sendEmail';

export class UserCRUD {

  public static async postSignUp(res: any, element: UserDocumentInterface) {
    try {
      await element.save();
      return res.status(201).send(element);
    } catch (error) {
      handleErrors(error, res);
    }
  }
 
  public static async postSignIn(res: any, req: any, model: any) {
    try {
      const element = await model.findOne({email:req.body.email, password:req.body.password});

      if (element) {
        jwt.sign({element}, 'secretkey', {'expiresIn': '86400s'}, (err: any, token: any) => {
          if (err) {
            return res.status(500).send({error: err});
          } else {
            return res.status(200).send({user: element, token});
          }
        });
      } else {
        return res.status(404).send({error:'Correo electrónico o contraseña incorrectos'});
      }
    } catch (error) {
      return res.status(500).send({error: error});
    }
  }

  public static async postPasswordReset(res: any, req: any, model: any) {
    try {
      const element = await model.findOne({email: req.body.email});

      if (element) {
        jwt.sign({element}, 'secretkey', {'expiresIn': '300s'}, (err: any, token: any) => {
          if (err) {
            return res.status(500).send(err);
          } else {
            sendEmail(res, req, token);
          }
        });
      } else {
        return res.status(404).send({error: 'Correo electrónico no registrado'});
      }
    } catch (error) {
      return res.status(500).send({error: error});
    }
  }

  public static getLoggedUser(req: any, res: any){
    const bearerHeader =  req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined'){
      const bearerToken = bearerHeader.split(" ")[1];

      jwt.verify(bearerToken, 'secretkey', (err: any, authData: any) => {
        if (err){
          return res.status(403).send({error: 'La sesión ha expirado'});
        } else {
          return res.status(200).send(authData);
        }
      });
    } else {
      return res.status(400).send({error: 'Debe proporcionarse un token'});
    }
  }

  public static async patchPassword(req: any, res: any, model: any) {
    const bearerHeader =  req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(" ")[1];

      jwt.verify(bearerToken, 'secretkey', async (err: any, authData: any) => {
        if (err) {
          return res.status(403).send({error: 'La sesión ha expirado'});
        } else {
          try {
            const element = await model.findByIdAndUpdate(authData.element._id, req.body, {
              new: true,
              runValidators: true,
            });
      
            if (!element) {
              return res.status(404).send({error: 'Elemento no encontrado'});
            }
        
            return res.status(200).send(element);
          } catch (err) {
            handleErrors(err, res);
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

      jwt.verify(bearerToken, 'secretkey', async (err: any, authData: any) => {
        if (err){
          return res.status(403).send({error: 'La sesión ha expirado'});
        } else {
          try {
            console.log(authData.element._id);
            console.log(req.query.id);
            if(authData.element._id !== req.query.id) {
              return res.status(403).send('Eliminación no permitida');
            }
            const element = await model.findByIdAndDelete(authData.element._id);
      
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


