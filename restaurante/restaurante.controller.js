import Restaurante from './restaurante.model';

export async function getRestaurante(req, res) {
  const nombre = req.query.nombre;
  const categoria = req.query.categoria;
  const resid = req.query.resid;

  let filtro = {};

  if (nombre) {
    filtro.nombre = { $regex: nombre, $options: 'i' };
  }
  if (categoria) {
    filtro.categorias = categoria;
  }
  if (resid) {
    filtro.resid = resid;
  }

  Restaurante.find(filtro)
    .sort({ numpedidos: 'descending' })
    .then((restaurantes) => {
      if (restaurantes.length === 0) {
        a;
        res.status(404).send({
          message: 'No restaurant found with the information provided',
        });
      } else {
        res.status(200).send({ restaurantes });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: 'Error obtainig the infomation: ' + error });
    });
}

export async function createRestaurante(req, res) {
  try {
    const { nombre } = req.body;
    const { numerocel } = req.body;
    const { categorias } = req.body;
    const { address } = req.body;
    const restaurante = new Restaurante({
      nombre,
      numerocel,
      categorias,
      address,
    });
    const resultado = await restaurante.save();
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchRestaurante(req, res) {
  const id = req.body.id;
  const { nombre } = req.body;
  const { numerocel } = req.body;
  const { categorias } = req.body;
  const { address } = req.body;

  const actualizado = await Restaurante.updateOne(
    { _id: id },
    {
      nombre: nombre,
      numerocel: numerocel,
      categorias: categorias,
      address: address,
    }
  );
  res.status(200).send(await Restaurante.findById({ _id: id }));
}

export async function deleteRestaurante(req, res) {
  const id = req.body.id;
  const borrado = true;
  // Soft Delete
  const producto = await Restaurante.findOneAndUpdate(
    { _id: id },
    { isDeleted: borrado },
    { new: true }
  );
  if (producto) {
    res.send({
      message: 'Restaurant deleted succesfully!',
    });
  } else {
    res.status(404).send({
      message: 'Restaurant not found',
    });
  }
}
