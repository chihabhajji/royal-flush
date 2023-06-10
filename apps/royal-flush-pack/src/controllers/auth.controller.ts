import { compareSync, hashSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { USER_REPOSITORY } from '../services/user.service';
import { ERole } from '../../../../libs/royal-flush-shared/src/lib/constants/roles.enum';

export const registerUser = async (req, res) => {
  const body = req.body;
  const exists = await USER_REPOSITORY.count({
    where: { email: body.email },
  });
  if (exists > 0) {
    return res.status(409).json({ message: 'Email already exists' });
  }
  const hashedPassword = hashSync(body.password, 12);
  delete body.password;
  return USER_REPOSITORY.create({ ...body, password: hashedPassword, role: body.email.endsWith('@royalflush.com') ? ERole.Admin : ERole.User })
  .then((user) => {
    const publicUser = user.toJSON();
    delete publicUser.password;
    return res.json({ token: jwt.sign({ email: user.email }, process.env.JWT_SECRET), user: publicUser });
  })
  .catch((e) => {
    console.error(e.message);
    res.status(500).json({ message: 'Something went wrong' });
  });
};

export const loginUser = async (req, res) => {
  const body = req.body;
  const user = await USER_REPOSITORY.findByPk(body.email);
  if (!user) {
    return res.status(404).json({ message: 'Invalid email or password' });
  }
  const comparePasswordHash = compareSync(body.password, user.password);
  if (!comparePasswordHash) {
    return res.status(404).json({ message: 'Invalid email or password' });
  }
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
  return res.status(200).json({ token });
};
