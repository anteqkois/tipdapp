export default function handler(req, res) {
  const { walletAddress, nonce, signature } = req.body;

  //check in db if exist

  if (!user) {
    //create user in db and create nonce
  } else {
    // redirect to login
  }

  res.status(200).json({ name: 'John Doe' });
}
