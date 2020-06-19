/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateOwnerInput = {
  id?: string | null,
  name: string,
  _version?: number | null,
};

export type ModelOwnerConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelOwnerConditionInput | null > | null,
  or?: Array< ModelOwnerConditionInput | null > | null,
  not?: ModelOwnerConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateOwnerInput = {
  id: string,
  name?: string | null,
  _version?: number | null,
};

export type DeleteOwnerInput = {
  id?: string | null,
  _version?: number | null,
};

export type CreateVehicleInput = {
  id?: string | null,
  ownerID?: string | null,
  make: string,
  model: string,
  mileage?: number | null,
  _version?: number | null,
};

export type ModelVehicleConditionInput = {
  ownerID?: ModelIDInput | null,
  make?: ModelStringInput | null,
  model?: ModelStringInput | null,
  mileage?: ModelIntInput | null,
  and?: Array< ModelVehicleConditionInput | null > | null,
  or?: Array< ModelVehicleConditionInput | null > | null,
  not?: ModelVehicleConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateVehicleInput = {
  id: string,
  ownerID?: string | null,
  make?: string | null,
  model?: string | null,
  mileage?: number | null,
  _version?: number | null,
};

export type DeleteVehicleInput = {
  id?: string | null,
  _version?: number | null,
};

export type CreatePartInput = {
  id?: string | null,
  description: string,
  price: number,
  inventory?: number | null,
  _version?: number | null,
};

export type ModelPartConditionInput = {
  description?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  inventory?: ModelIntInput | null,
  and?: Array< ModelPartConditionInput | null > | null,
  or?: Array< ModelPartConditionInput | null > | null,
  not?: ModelPartConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdatePartInput = {
  id: string,
  description?: string | null,
  price?: number | null,
  inventory?: number | null,
  _version?: number | null,
};

export type DeletePartInput = {
  id?: string | null,
  _version?: number | null,
};

export type CreateServiceInput = {
  id?: string | null,
  name: string,
  _version?: number | null,
};

export type ModelServiceConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelServiceConditionInput | null > | null,
  or?: Array< ModelServiceConditionInput | null > | null,
  not?: ModelServiceConditionInput | null,
};

export type UpdateServiceInput = {
  id: string,
  name?: string | null,
  _version?: number | null,
};

export type DeleteServiceInput = {
  id?: string | null,
  _version?: number | null,
};

export type ModelOwnerFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelOwnerFilterInput | null > | null,
  or?: Array< ModelOwnerFilterInput | null > | null,
  not?: ModelOwnerFilterInput | null,
};

export type ModelVehicleFilterInput = {
  id?: ModelIDInput | null,
  ownerID?: ModelIDInput | null,
  make?: ModelStringInput | null,
  model?: ModelStringInput | null,
  mileage?: ModelIntInput | null,
  and?: Array< ModelVehicleFilterInput | null > | null,
  or?: Array< ModelVehicleFilterInput | null > | null,
  not?: ModelVehicleFilterInput | null,
};

export type ModelPartFilterInput = {
  id?: ModelIDInput | null,
  description?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  inventory?: ModelIntInput | null,
  and?: Array< ModelPartFilterInput | null > | null,
  or?: Array< ModelPartFilterInput | null > | null,
  not?: ModelPartFilterInput | null,
};

export type ModelServiceFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelServiceFilterInput | null > | null,
  or?: Array< ModelServiceFilterInput | null > | null,
  not?: ModelServiceFilterInput | null,
};

export type CreateOwnerMutationVariables = {
  input: CreateOwnerInput,
  condition?: ModelOwnerConditionInput | null,
};

export type CreateOwnerMutation = {
  createOwner:  {
    __typename: "Owner",
    id: string,
    name: string,
    vehicles:  {
      __typename: "ModelVehicleConnection",
      items:  Array< {
        __typename: "Vehicle",
        id: string,
        ownerID: string | null,
        make: string,
        model: string,
        mileage: number | null,
        _version: number,
        _deleted: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
      startedAt: number | null,
    } | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateOwnerMutationVariables = {
  input: UpdateOwnerInput,
  condition?: ModelOwnerConditionInput | null,
};

export type UpdateOwnerMutation = {
  updateOwner:  {
    __typename: "Owner",
    id: string,
    name: string,
    vehicles:  {
      __typename: "ModelVehicleConnection",
      items:  Array< {
        __typename: "Vehicle",
        id: string,
        ownerID: string | null,
        make: string,
        model: string,
        mileage: number | null,
        _version: number,
        _deleted: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
      startedAt: number | null,
    } | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteOwnerMutationVariables = {
  input: DeleteOwnerInput,
  condition?: ModelOwnerConditionInput | null,
};

export type DeleteOwnerMutation = {
  deleteOwner:  {
    __typename: "Owner",
    id: string,
    name: string,
    vehicles:  {
      __typename: "ModelVehicleConnection",
      items:  Array< {
        __typename: "Vehicle",
        id: string,
        ownerID: string | null,
        make: string,
        model: string,
        mileage: number | null,
        _version: number,
        _deleted: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
      startedAt: number | null,
    } | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateVehicleMutationVariables = {
  input: CreateVehicleInput,
  condition?: ModelVehicleConditionInput | null,
};

export type CreateVehicleMutation = {
  createVehicle:  {
    __typename: "Vehicle",
    id: string,
    ownerID: string | null,
    make: string,
    model: string,
    mileage: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateVehicleMutationVariables = {
  input: UpdateVehicleInput,
  condition?: ModelVehicleConditionInput | null,
};

export type UpdateVehicleMutation = {
  updateVehicle:  {
    __typename: "Vehicle",
    id: string,
    ownerID: string | null,
    make: string,
    model: string,
    mileage: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteVehicleMutationVariables = {
  input: DeleteVehicleInput,
  condition?: ModelVehicleConditionInput | null,
};

export type DeleteVehicleMutation = {
  deleteVehicle:  {
    __typename: "Vehicle",
    id: string,
    ownerID: string | null,
    make: string,
    model: string,
    mileage: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePartMutationVariables = {
  input: CreatePartInput,
  condition?: ModelPartConditionInput | null,
};

export type CreatePartMutation = {
  createPart:  {
    __typename: "Part",
    id: string,
    description: string,
    price: number,
    inventory: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePartMutationVariables = {
  input: UpdatePartInput,
  condition?: ModelPartConditionInput | null,
};

export type UpdatePartMutation = {
  updatePart:  {
    __typename: "Part",
    id: string,
    description: string,
    price: number,
    inventory: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePartMutationVariables = {
  input: DeletePartInput,
  condition?: ModelPartConditionInput | null,
};

export type DeletePartMutation = {
  deletePart:  {
    __typename: "Part",
    id: string,
    description: string,
    price: number,
    inventory: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateServiceMutationVariables = {
  input: CreateServiceInput,
  condition?: ModelServiceConditionInput | null,
};

export type CreateServiceMutation = {
  createService:  {
    __typename: "Service",
    id: string,
    name: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateServiceMutationVariables = {
  input: UpdateServiceInput,
  condition?: ModelServiceConditionInput | null,
};

export type UpdateServiceMutation = {
  updateService:  {
    __typename: "Service",
    id: string,
    name: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteServiceMutationVariables = {
  input: DeleteServiceInput,
  condition?: ModelServiceConditionInput | null,
};

export type DeleteServiceMutation = {
  deleteService:  {
    __typename: "Service",
    id: string,
    name: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type SyncOwnersQueryVariables = {
  filter?: ModelOwnerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncOwnersQuery = {
  syncOwners:  {
    __typename: "ModelOwnerConnection",
    items:  Array< {
      __typename: "Owner",
      id: string,
      name: string,
      vehicles:  {
        __typename: "ModelVehicleConnection",
        nextToken: string | null,
        startedAt: number | null,
      } | null,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type GetOwnerQueryVariables = {
  id: string,
};

export type GetOwnerQuery = {
  getOwner:  {
    __typename: "Owner",
    id: string,
    name: string,
    vehicles:  {
      __typename: "ModelVehicleConnection",
      items:  Array< {
        __typename: "Vehicle",
        id: string,
        ownerID: string | null,
        make: string,
        model: string,
        mileage: number | null,
        _version: number,
        _deleted: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
      startedAt: number | null,
    } | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListOwnersQueryVariables = {
  filter?: ModelOwnerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOwnersQuery = {
  listOwners:  {
    __typename: "ModelOwnerConnection",
    items:  Array< {
      __typename: "Owner",
      id: string,
      name: string,
      vehicles:  {
        __typename: "ModelVehicleConnection",
        nextToken: string | null,
        startedAt: number | null,
      } | null,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type SyncVehiclesQueryVariables = {
  filter?: ModelVehicleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncVehiclesQuery = {
  syncVehicles:  {
    __typename: "ModelVehicleConnection",
    items:  Array< {
      __typename: "Vehicle",
      id: string,
      ownerID: string | null,
      make: string,
      model: string,
      mileage: number | null,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type GetVehicleQueryVariables = {
  id: string,
};

export type GetVehicleQuery = {
  getVehicle:  {
    __typename: "Vehicle",
    id: string,
    ownerID: string | null,
    make: string,
    model: string,
    mileage: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListVehiclesQueryVariables = {
  filter?: ModelVehicleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVehiclesQuery = {
  listVehicles:  {
    __typename: "ModelVehicleConnection",
    items:  Array< {
      __typename: "Vehicle",
      id: string,
      ownerID: string | null,
      make: string,
      model: string,
      mileage: number | null,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type SyncPartsQueryVariables = {
  filter?: ModelPartFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncPartsQuery = {
  syncParts:  {
    __typename: "ModelPartConnection",
    items:  Array< {
      __typename: "Part",
      id: string,
      description: string,
      price: number,
      inventory: number | null,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type GetPartQueryVariables = {
  id: string,
};

export type GetPartQuery = {
  getPart:  {
    __typename: "Part",
    id: string,
    description: string,
    price: number,
    inventory: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPartsQueryVariables = {
  filter?: ModelPartFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPartsQuery = {
  listParts:  {
    __typename: "ModelPartConnection",
    items:  Array< {
      __typename: "Part",
      id: string,
      description: string,
      price: number,
      inventory: number | null,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type SyncServicesQueryVariables = {
  filter?: ModelServiceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncServicesQuery = {
  syncServices:  {
    __typename: "ModelServiceConnection",
    items:  Array< {
      __typename: "Service",
      id: string,
      name: string,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type GetServiceQueryVariables = {
  id: string,
};

export type GetServiceQuery = {
  getService:  {
    __typename: "Service",
    id: string,
    name: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListServicesQueryVariables = {
  filter?: ModelServiceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListServicesQuery = {
  listServices:  {
    __typename: "ModelServiceConnection",
    items:  Array< {
      __typename: "Service",
      id: string,
      name: string,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type OnCreateOwnerSubscription = {
  onCreateOwner:  {
    __typename: "Owner",
    id: string,
    name: string,
    vehicles:  {
      __typename: "ModelVehicleConnection",
      items:  Array< {
        __typename: "Vehicle",
        id: string,
        ownerID: string | null,
        make: string,
        model: string,
        mileage: number | null,
        _version: number,
        _deleted: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
      startedAt: number | null,
    } | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateOwnerSubscription = {
  onUpdateOwner:  {
    __typename: "Owner",
    id: string,
    name: string,
    vehicles:  {
      __typename: "ModelVehicleConnection",
      items:  Array< {
        __typename: "Vehicle",
        id: string,
        ownerID: string | null,
        make: string,
        model: string,
        mileage: number | null,
        _version: number,
        _deleted: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
      startedAt: number | null,
    } | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteOwnerSubscription = {
  onDeleteOwner:  {
    __typename: "Owner",
    id: string,
    name: string,
    vehicles:  {
      __typename: "ModelVehicleConnection",
      items:  Array< {
        __typename: "Vehicle",
        id: string,
        ownerID: string | null,
        make: string,
        model: string,
        mileage: number | null,
        _version: number,
        _deleted: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
      startedAt: number | null,
    } | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateVehicleSubscription = {
  onCreateVehicle:  {
    __typename: "Vehicle",
    id: string,
    ownerID: string | null,
    make: string,
    model: string,
    mileage: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateVehicleSubscription = {
  onUpdateVehicle:  {
    __typename: "Vehicle",
    id: string,
    ownerID: string | null,
    make: string,
    model: string,
    mileage: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteVehicleSubscription = {
  onDeleteVehicle:  {
    __typename: "Vehicle",
    id: string,
    ownerID: string | null,
    make: string,
    model: string,
    mileage: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePartSubscription = {
  onCreatePart:  {
    __typename: "Part",
    id: string,
    description: string,
    price: number,
    inventory: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePartSubscription = {
  onUpdatePart:  {
    __typename: "Part",
    id: string,
    description: string,
    price: number,
    inventory: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePartSubscription = {
  onDeletePart:  {
    __typename: "Part",
    id: string,
    description: string,
    price: number,
    inventory: number | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateServiceSubscription = {
  onCreateService:  {
    __typename: "Service",
    id: string,
    name: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateServiceSubscription = {
  onUpdateService:  {
    __typename: "Service",
    id: string,
    name: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteServiceSubscription = {
  onDeleteService:  {
    __typename: "Service",
    id: string,
    name: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
