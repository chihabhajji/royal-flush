import { USER_REPOSITORY } from '../services/user.service';

export const getUsers = async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const result = await USER_REPOSITORY.findAll({
      limit,
      offset,
      mapToModel: true,
    });
    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    return res.json(result);
  } catch (e) {
    console.error(e.message);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const findUser = async (req, res, next) => {
  USER_REPOSITORY.findByPk(req.params.email)
    .then((post) => (post ? res.json(post) : res.status(404).json({ statusCode: 404 })))
    .catch(e => res.status(404).json(e));
};

export const createUser = async (req, res, next) => {
  USER_REPOSITORY.create(req.body)
    .then((post) => res.json(post))
    .catch(next);
};

export const updateUser = async (req, res, next) => {
  USER_REPOSITORY.update(req.body, { where: { id: req.params.id } })
    .then(([rowsUpdated]) => rowsUpdated ? res.json(true) : next({ statusCode: 404 }))
    .catch(next);
};

export const deleteUser = async (req, res, next) => {
  USER_REPOSITORY.destroy({ where: { id: req.params.id } })
    .then((rowsDeleted) => rowsDeleted ? res.json(true) : next({ statusCode: 404 }))
    .catch(next);
};
