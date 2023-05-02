import User from './user.model';

export async function getUser(req, res) {
  const email = req.body.email;
  const id = req.body.id;
  const password = req.body.password;

  if (email && password != null) {
    User.findOne(
      { _id: id }.then((user) => {
        res.status(200).send({ user });
      })
    );
  } else {
    User.findOne({ email: email }).then((user) => {
      if (!user) {
        res.status(401).send({ message: 'Incorrect credentials' });
      } else {
        if (user.password === password) {
          res.status(200).send({ user });
        } else {
          res.status(401).send({ message: 'Wrong password' });
        }
      }
    });
  }
}

export async function createUser(req, res) {
  try {
    const { firstname } = req.body;
    const { secondname } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const { numerocel } = req.body;
    const { tipo } = req.body;
    const { address } = req.body;
    const user = new User({
      firstname,
      secondname,
      email,
      password,
      numerocel,
      tipo,
      address,
    });
    const resultado = await user.save();
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchUser(req, res) {
  const id = req.body.id;
  const { firstname } = req.body;
  const { secondname } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const { numerocel } = req.body;
  const { tipo } = req.body;
  const { address } = req.body;

  const actualizado = await User.updateOne(
    { _id: id },
    {
      firstname: firstname,
      secondname: secondname,
      email: email,
      password: password,
      numerocel: numerocel,
      tipo: tipo,
      address: address,
    }
  );
  res.status(200).send(await User.findById({ _id: id }));
}

export async function deleteUser(req, res) {
  const id = req.body.id;
  const borrado = true;
  // Soft Delete
  const producto = await User.findOneAndUpdate({ _id: id }, { isDeleted: borrado }, { new: true });
  if (producto) {
    res.send({
      message: 'User deleted succesfully!',
    });
  } else {
    res.status(404).send({
      message: 'User not found',
    });
  }
}
