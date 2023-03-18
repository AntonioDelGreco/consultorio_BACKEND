import { Router } from 'express';
import { Formulario } from '../managers/Manager.contacto.js';

const router = Router();

router.post('/contacto', async (req, res) => {
    const { nombre, celular, consulta } = req.body;
    if (!nombre || !celular || !consulta) return res.status(400).json({error:true, message:'Valores incompletos.'});
    const formulario = new Formulario(nombre, celular, consulta);
    const { name, cel, question } = formulario.sinEspacios();
    if (!name || !cel || !question) return res.status(400).json({error:true, message:'Revise la consulta. Faltan completar campos'});
    if (!formulario.validacion()) return res.status(400).json({error:true, message:'El nombre, celular o la consulta no cumplen con los requisitos de validacion. Asegurese de que su nombre este bien escrito, su celular sean 10 numeros sin letras o simbolos.'})
    const mail = await formulario.enviarMail();
    if (!mail) {
      return res.status(200).json({error:false, message:'Su email se envio exitosamente.'});
    } else{
      return res.status(500).json({error:true, message:'Su email fallo en ser enviado, pruebe mas tarde porfavor.'})
    }  
  })

export default router;
