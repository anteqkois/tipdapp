const main = async () => {
  await import('./src/eventListeners/registerUserListener');
  console.log('> Microservice listening smart contract events... ');
};

main().catch((error) => {
  console.log('ERROR', error);
});
