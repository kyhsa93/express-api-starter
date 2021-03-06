import { users } from '../../controllers';

export default async (request, response) => {
  try {
    const { id } = request.user;
    const params = request.params.id;
    const { from, to, page } = request.query;

    if ((id * 1) !== (params * 1)) {
      return response.status(401).send('unauthorized').end();
    }

    if (!from || !to || !page || page < 1) {
      return response.status(400).send('invalid query');
    }

    if ((new Date(new Date().setMonth(new Date(to).getMonth() - 1)) > new Date(from))
      || (new Date(from) > new Date(to))) {
      return response.status(400).send('invalid date').end();
    }

    const { code, data } = await users.images({ id, ...request.query });

    return response.status(code).send(data).end();
  } catch (error) {
    return response.status(500).send('internal server error').end();
  }
};
