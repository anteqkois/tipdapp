import { prisma } from '../lib/db.js';
import { createApiError } from '../middlewares/error.js';

// const PAGE_SIZE = 2;
const findByAddress = async (req, res) => {
  // console.log(req.jwtData);
  const page = parseInt(req.query?.page ?? 1);
  const pageSize = parseInt(req.query?.pageSize ?? 20);
  const skip = (page - 1) * pageSize;
  // typeof req.query?.userAddress === 'undefined' && createApiError('Missing user address.');
  
    console.log('pagesize', pageSize);
    console.log('skip', skip);
    console.log('page', page);

  const count = await prisma.tip.count({
    where: {
      userAddress: req.jwtData.metadata.address,
      // userAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    },
  });
  
  const tips = await prisma.tip.findMany({
    skip,
    take: pageSize,
    where: {
      userAddress: req.jwtData.metadata.address,
      // userAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    },
    orderBy: {
      date: 'asc',
    },
    include: {
      token: {
        select: {
          name: true,
          symbol: true,
        },
      },
      tipper: {
        select: {
          nick: true,
        },
      },
      // user: true,
    },
  });

  if (tips) {
    // const lastTipsInResults = tips[1]; // Remember: zero-based index! :)
    // const cursor = lastTipsInResults.date; // Example: 29
    // createApiError('Test', 404);
    return res.status(200).send({ tips, count });
    // return res.status(200).send({ tips, count });
    // return res.status(200).send({ tips });
  } else {
    //TODO other error message
    createApiError('No tips found.', 404);
  }
};

export { findByAddress };
export default {
  findByAddress,
};
