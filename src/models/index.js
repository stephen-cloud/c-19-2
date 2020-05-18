// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Owner, Vehicle, Part, Service } = initSchema(schema);

export {
  Owner,
  Vehicle,
  Part,
  Service
};