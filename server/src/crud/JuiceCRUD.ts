import {JuiceDocumentInterface} from '../models/juice';


export class JuiceCRUD {
  
  public static async postJuice(res: any, element: JuiceDocumentInterface) {
    try {
      await element.save();
      return res.status(201).send(element);
    } catch (error) {
      return res.status(500).send(error);
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
}