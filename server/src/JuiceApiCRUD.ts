import {JuiceDocumentInterface} from './models/juice';


export class JuiceApiCRUD {
    public static async postJuice(res: any, element: JuiceDocumentInterface) {
      try {
        await element.save();
        return res.status(201).send(element);
      } catch (error) {
        return res.status(500).send(error);
      }
    }
}