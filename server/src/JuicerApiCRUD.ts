import {UserDocumentInterface} from './models/user';


export class JuicerApiCRUD {
 
  public static async post(res: any, element: UserDocumentInterface) {
    try {
      await element.save();
      return res.status(201).send(element);
    } catch (error) {
      return res.status(400).send(error);
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
  }

  public static async patch(req: any, res: any, model: any) {
    try {
      const element = await model.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
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
  }
}