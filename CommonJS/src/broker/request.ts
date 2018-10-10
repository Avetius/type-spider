import { broker } from './broker';

async function res(){
  // const result = 
  await broker.send('users', {header:'create', body: 'Bolyolyo'});
  // const res = await result.getContent();
  // console.log('result -> ', result);
  // console.log('res -> ', res);
};

res();
