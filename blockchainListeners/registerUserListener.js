// import QoistipSign from '../../artifacts/localhost/QoistipSign.json';
import { readFile } from 'fs/promises';
import ethers, { provider } from './ethersProvider.js';

const QoistipSign = JSON.parse(await readFile(new URL('./artifacts/localhost/QoistipSign.json', import.meta.url)));

const contract = new ethers.Contract(QoistipSign.address, QoistipSign.abi, provider);
contract.on('NewUser', (from, to, value, event) => {
  let info = {
    from: from,
    to: to,
    value: ethers.utils.formatUnits(value, 6),
    data: event,
  };
  console.log(JSON.stringify(info, null, 4));
});
