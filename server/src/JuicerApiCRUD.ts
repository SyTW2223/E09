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
      return res.status(400).send(error);
    }
  }
 
  public static async postSignIn(res: any, req: any, model: any) {
    try {
      const element = await model.findOne({email:req.body.email, password:req.body.password});

      if (element) {
        jwt.sign({element}, 'secretkey', {'expiresIn': '300s'}, (err: any, token: any) => {
          if (err) {
            return res.status(500).send(err);
          } else {
            return res.status(200).send({user: element, token});
          }
        });
      } else {
        return res.status(404).send();
      }
    } catch (error) {
      return res.status(500).send();
    }
  }

  public static getUser(req: any, res: any){
    const bearerHeader =  req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];

        jwt.verify(bearerToken, 'secretkey', (err: any, authData: any) => {
          if (err){
              res.status(403).send();
          } else{
              res.send(authData);
          }
      });
    } else{
        res.status(403).send();
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
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  }


  public static async get(res: any, filter: any, model: any) {
    try {
      const elements = await model.find(filter);

      if (elements.length !== 0) {
        return res.send(elements);
      }
      return res.status(404).send();
    } catch (error) {
      return res.status(500).send();
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
    try {
      const bearerHeader =  req.headers['authorization'];
      const bearerToken = bearerHeader.split(" ")[1];

      jwt.verify(bearerToken, 'secretkey', async (err: any, authData: any) => {
        if (err) {
          res.status(403).send();
        } else {
          const element = await model.findOneAndUpdate({email: authData.user.email.toString()}, req.body, {
            new: true,
            runValidators: true,
          });
    
          if (!element) {
            return res.status(404).send();
          }
    
          return res.send(element);
        }
      });
    } catch (error) {
      return res.status(400).send(error);
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
  }*/
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
      text: `Click here to reset password: http://10.6.130.29/password-reset/${token}`,
    });
    return res.status(200).send("email sent sucessfully");
  } catch (error) {
    return res.status(500).send(error);
  }
}
