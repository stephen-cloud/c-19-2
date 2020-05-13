// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Vehicle, Owner, Part, Service } = initSchema(schema);

export {
  Vehicle,
  Owner,
  Part,
  Service
};