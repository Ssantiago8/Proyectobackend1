import Producto from './producto.model';
import Restaurante from '../restaurante/restaurante.model';
export async function getProducto(req, res) {
  const nombre = req.query.nombre;
  const categoria = req.query.categoria;

  let filtro = {};

  if (nombre) {
    filtro.nombre = nombre;
  }
  if (categoria) {
    filtro.categorias = categoria;
  }

  Producto.find(filtro)
    .then((productos) => {
      if (productos.length === 0) {
        res.status(404).send({
          message: 'No product found with the information provided',
        });
      } else {
        res.status(200).send({ productos });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: 'Error obtaining the info from the product: ' + error });
    });
}

export async function createProducto(req, res) {
  try {
    const restauranteId = req.body.restauranteId;
    const restaurante = await Restaurante.findById(restauranteId);

    const { nombre, descripcion, categorias, precio } = req.body;
    const producto = new Producto({
      nombre,
      descripcion,
      categorias,
      precio,
      restaurante: restaurante._id,
      nombreRestaurante: restaurante.nombre,
    });

    const resultado = await producto.save();
    restaurante.productos.push(producto._id);
    await restaurante.save();

    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchProducto(req, res) {
  const id = req.body.id;
  const { nombre } = req.body;
  const { descripcion } = req.body;
  const { categorias } = req.body;
  const { precio } = req.body;

  const actualizado = await Producto.updateOne(
    { _id: id },
    {
      nombre: nombre,
      descripcion: descripcion,
      categorias: categorias,
      precio: precio,
    }
  );

  res.status(200).send(await Producto.findById({ _id: id }));
}

export async function deleteProducto(req, res) {
  const id = req.body.id;
  const borrado = true;
  const producto = await Producto.findOneAndUpdate(
    { _id: id },
    { isDeleted: borrado },
    { new: true }
  );
  if (producto) {
    res.send({
      message: 'Product deleted succesfully!',
    });
  } else {
    res.status(404).send({
      message: 'Product not found',
    });
  }
}
