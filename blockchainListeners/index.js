const main = async () => {
  await import('./src/listeners/registerUserListener.js');
  console.log('> Microservice start listening smart contract events... ');
};

main().catch((error) => {
  console.log('ERROR', error);
});
