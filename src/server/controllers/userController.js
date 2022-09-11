// import { prismaClient } from '../../services/prismaClient';
import { prismaClient } from '../../lib/prismaClient.js';
import { createApiError } from '../middlewares/error.js';

const find = async (req, res) => {
    const user = await prismaClient.user.findFirst({
        where: { id: req.user.user_metadata.id },
    });

    if (user) {
        return res.status(200).send({ user: user });
    } else {
        createApiError('Something went wrong.');
    }
};
export { find };
export default {
    find,
};
