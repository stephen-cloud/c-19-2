/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVehicle = /* GraphQL */ `
  subscription OnCreateVehicle {
    onCreateVehicle {
      id
      make
      model
      mileage
      owner {
        id
        name
        vehicles {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateVehicle = /* GraphQL */ `
  subscription OnUpdateVehicle {
    onUpdateVehicle {
      id
      make
      model
      mileage
      owner {
        id
        name
        vehicles {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteVehicle = /* GraphQL */ `
  subscription OnDeleteVehicle {
    onDeleteVehicle {
      id
      make
      model
      mileage
      owner {
        id
        name
        vehicles {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateOwner = /* GraphQL */ `
  subscription OnCreateOwner {
    onCreateOwner {
      id
      name
      vehicles {
        items {
          id
          make
          model
          mileage
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateOwner = /* GraphQL */ `
  subscription OnUpdateOwner {
    onUpdateOwner {
      id
      name
      vehicles {
        items {
          id
          make
          model
          mileage
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteOwner = /* GraphQL */ `
  subscription OnDeleteOwner {
    onDeleteOwner {
      id
      name
      vehicles {
        items {
          id
          make
          model
          mileage
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreatePart = /* GraphQL */ `
  subscription OnCreatePart {
    onCreatePart {
      id
      description
      price
      inventory
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdatePart = /* GraphQL */ `
  subscription OnUpdatePart {
    onUpdatePart {
      id
      description
      price
      inventory
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeletePart = /* GraphQL */ `
  subscription OnDeletePart {
    onDeletePart {
      id
      description
      price
      inventory
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateService = /* GraphQL */ `
  subscription OnCreateService {
    onCreateService {
      id
      name
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateService = /* GraphQL */ `
  subscription OnUpdateService {
    onUpdateService {
      id
      name
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteService = /* GraphQL */ `
  subscription OnDeleteService {
    onDeleteService {
      id
      name
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
