import broker from './broker2';


async function res(){
  const result = await broker.send('users', {header:'create', body: 'Bolyolyo'});
  console.log('result -> ', result);
  process.exit(1);
};

res();

