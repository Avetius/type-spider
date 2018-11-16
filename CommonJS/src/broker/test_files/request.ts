import { Broker } from '../broker';

const broker = new Broker();

async function res(){
  const result = await broker.send('users', {header:'create', body: 'Bolyolyo'});
  const res = await result.getContent();
  // console.log('result -> ', result);
  console.log('res -> ', res);
  process.exit(1);
};

res();
