import Pedido from './pedido.model';
import User from '../user/user.model';
import Restaurante from '../restaurante/restaurante.model';
import Producto from '../producto/producto.model';
export async function getPedido(req, res) {
  const id = req.body.id;

  Pedido.findOne({ _id: id }).then((pedido) => {
    if (!pedido) {
      // El pedido no existe en la base de datos
      res.status(401).send({ message: 'The order with ID ' + id + ' does not exist in the DB' });
    } else {
      //El pedido se encontro satisfactoriamente
      res.status(200).send({ pedido });
    }
  });
}

export async function createPedido(req, res) {
  try {
    const restID = req.body.restID;
    await Restaurante.findOneAndUpdate({ _id: restID }, { $inc: { numpedidos: 1 } });
    console.log(await Restaurante.findById({ _id: restID }));
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Please provide a user ID' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.tipo == 'cliente') {
      const { estado, address, productos } = req.body;
      const pedido = new Pedido({
        estado,
        address,
        user: user._id,
        productos,
      });
      const resultado = await pedido.save();
      user.pedidos.push(pedido._id);
      await user.save();
      res.status(200).json(resultado);
    } else {
      return res.status(404).json({ message: 'User type is not valid for ordering' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchPedido(req, res) {
  try {
    const id = req.body.id;
    const { estado } = req.body;
    const { address } = req.body;
    const pedidof = await Pedido.findById(id);
    if ((pedidof.estado = 'Creado')) {
      res.status(404).send({
        message: 'Order already in progress outside restaurant',
      });
    }
    const actualizado = await Pedido.updateOne(
      { _id: id },
      {
        estado: estado,
        address: address,
      }
    );
    res.status(200).send(await Pedido.findById({ _id: id }));
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function deletePedido(req, res) {
  const id = req.body.id;
  const borrado = true;
  // Soft Delete
  const producto = await User.findOneAndUpdate({ _id: id }, { isDeleted: borrado }, { new: true });
  if (producto) {
    res.send({
      message: 'Order deleted succesfully!',
    });
  } else {
    res.status(404).send({
      message: 'Order not found',
    });
  }
}
