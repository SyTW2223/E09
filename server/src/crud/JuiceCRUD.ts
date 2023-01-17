import * as jwt from 'jsonwebtoken';

export class JuiceCRUD {

  public static async patchLike(req: any, res: any, model: any) {
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
}