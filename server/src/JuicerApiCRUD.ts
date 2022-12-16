import {UserDocumentInterface} from './models/user';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';


const HOST = 'juicerappofficial@gmail.com'// email host
const USER = 'juicerappofficial@gmail.com'// email id
const PASS = 'plsoovkmdwvujbgb'// email password
const SERVICE = 'Gmail'// email service


export class JuicerApiCRUD {

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
        jwt.sign({element}, 'secretkey', {'expiresIn': '300s'}, (err: any, token: any) => {
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

  public static getUser(req: any, res: any){
    const bearerHeader =  req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined'){
      const bearerToken = bearerHeader.split(" ")[1];

      jwt.verify(bearerToken, 'secretkey', (err: any, authData: any) => {
        if (err){
          return res.status(403).send({error: 'La sesión ha expirado'});
        } else {
          return res.send(authData);
        }
      });
    } else {
      return res.status(400).send({error: 'Debe proporcionarse un token'});
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

  public static async get(res: any, filter: any, model: any) {
    try {
      const elements = await model.find(filter);

      if (elements.length !== 0) {
        return res.send(elements);
      }
      return res.status(404).send('Elemento no encontrado');
    } catch (error) {
      return res.status(500).send({error: error});
    }
  }
  /*
  public static async idGet(req: any, res: any, model: any) {
    try {
      const element = await model.findById(req.params.id);

      if (!element) {
        return res.status(404).send();
      }
      return res.send(element);
    } catch (error) {
      return res.status(500).send();
    }
  }*/

  public static async patch(req: any, res: any, model: any) {
    const bearerHeader =  req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(" ")[1];

      jwt.verify(bearerToken, 'secretkey', async (err: any, authData: any) => {
        if (err) {
          return res.status(403).send({error: 'La sesión ha expirado'});
        } else {
          try {
            const element = await model.findOneAndUpdate({name: authData.element.name}, req.body, {
              new: true,
              runValidators: true,
            });
      
            if (!element) {
              return res.status(404).send({error: 'Elemento no encontrado'});
            }
        
            return res.send(element);
          } catch (err) {
            handleErrors(err, res);
          }
        }
      });
    } else {
      return res.status(400).send({error: 'Debe proporcionarse un token'});
    }
  }
  /*
  public static async idPatch(req: any, res: any, model: any) {
    try {
      const element = await model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!element) {
        return res.status(404).send();
      }
      return res.send(element);
    } catch (error) {
      return res.status(400).send(error);
    }
  }*/

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


async function sendEmail(res: any, req: any, token: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: HOST,
      service: SERVICE,
      port: 587,
      secure: true,
      auth: {
          user: USER,
          pass: PASS,
      },
    });
    await transporter.sendMail({
      from: USER,
      to: req.body.email,
      subject: 'Password reset',
      text: `Click here to reset password: http://10.6.130.29/reset/${token}`,
    });
    return res.status(200).send("Correo electrónico enviado con éxito");
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function handleErrors(err: any, res: any) {
  try {
    if(err.name === 'ValidationError') {
      return res.status(400).send({error: "La contraseña debe contener al menos ocho caracteres, un número y una mayúscula", fields: 'password'});
    }
    if(err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);
  } catch(err) {
    res.status(500).send({error: 'Error desconocido'});
  }
}

function handleDuplicateKeyError(err: any, res: any) {
  const field = Object.keys(err.keyValue);
  console.log(field);
  const code = 409;
  var campo = field[0];
  if (campo === 'name') {
    campo = 'nombre';
  } else {
    campo = 'correo electrónico';
  }
  res.status(code).send({error: `Ya existe una cuenta con ese ${campo}.`, fields: field});
}
