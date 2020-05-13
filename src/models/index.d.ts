import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Vehicle {
  readonly id: string;
  readonly make: string;
  readonly model: string;
  readonly mileage?: number;
  readonly owner?: Owner;
  constructor(init: ModelInit<Vehicle>);
  static copyOf(source: Vehicle, mutator: (draft: MutableModel<Vehicle>) => MutableModel<Vehicle> | void): Vehicle;
}

export declare class Owner {
  readonly id: string;
  readonly name: string;
  readonly vehicles?: Vehicle[];
  constructor(init: ModelInit<Owner>);
  static copyOf(source: Owner, mutator: (draft: MutableModel<Owner>) => MutableModel<Owner> | void): Owner;
}

export declare class Part {
  readonly id: string;
  readonly description: string;
  readonly price: number;
  readonly inventory?: number;
  constructor(init: ModelInit<Part>);
  static copyOf(source: Part, mutator: (draft: MutableModel<Part>) => MutableModel<Part> | void): Part;
}

export declare class Service {
  readonly id: string;
  readonly name: string;
  constructor(init: ModelInit<Service>);
  static copyOf(source: Service, mutator: (draft: MutableModel<Service>) => MutableModel<Service> | void): Service;
}