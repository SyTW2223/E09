
export function handleErrors(err: any, res: any) {
  if(err.name === 'ValidationError') {
    return res.status(400).send({error: "La contraseña debe contener al menos ocho caracteres, un número y una mayúscula", fields: 'password'});
  }
  else if(err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);
  else res.status(500).send({error: 'Error desconocido'});
}
  
export  function handleDuplicateKeyError(err: any, res: any) {
  const field = Object.keys(err.keyValue);
  const code = 409;
  var campo = field[0];
  if (campo === 'name') {
    campo = 'nombre';
  } else {
    campo = 'correo electrónico';
  }
  res.status(code).send({error: `Ya existe una cuenta con ese ${campo}.`, fields: field});
}