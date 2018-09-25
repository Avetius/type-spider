import { Broker } from './broker';

const broker = new Broker();
async function res(){
  const res = await broker.send('users', {header:'create', body: 'Bolyolyo'});
  console.log('res -> ', res);
};

res();
