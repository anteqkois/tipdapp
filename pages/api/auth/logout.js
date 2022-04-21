import { serialize } from 'cookie';
import { ApiError } from 'next/dist/server/api-utils';

export default function handler(req, res) {
  try {
    if (req.cookies.JWT) {
      res.setHeader('Set-Cookie', serialize('JWT', '', { path: '/', httpOnly: true, maxAge: 0 }));
      res.status(200).send({ message: 'You are succesfully logout.' });
    } else {
      res.status(422).send({ error: 'You have not logged in yet.' });
    }
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
}
