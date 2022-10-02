import QoistipSignJSON from '../artifacts/localhost/QoistipSign.json' assert { type: 'json' };
import ethers, { provider, signerAdmin } from './lib/ethersProvider.js';

const QoistipSign = new ethers.Contract(QoistipSignJSON.address, QoistipSignJSON.abi, provider);
QoistipSign.connect(signerAdmin.address);

export { QoistipSign };
