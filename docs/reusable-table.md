The table's specific to vehicles. We have other screens like owners and parts. Let's make the table a component.

## Find all the places we're using `Vehicle`

We'll find those places and pull out the rest making the table reusable.

There's the import of course

```typescript
import { Vehicle } from './models';
```

The definition of the `Column`s is specific to a type.

```typescript hl_lines="1"
const columns: Column<Vehicle>[] = [
    { title: 'Make', field: 'make' },
    { title: 'Model', field: 'model' },
    { title: 'Mileage', field: 'mileage', type: "numeric", emptyValue: '' },
];
```

There's `useEffect`

```typescript hl_lines="2 5 25"
function Vehicles() {
    const tableRef = createRef<MaterialTableProps<Vehicle>>();

    useEffect(() => {
        function subscriber(subscription: SubscriptionMessage<Vehicle>) {
            console.log('subscription', subscription);

            if (tableRef.current) {
                const table = tableRef.current;

                if (table.onQueryChange) {
                    table.onQueryChange({
                        filters: [],
                        orderBy: {},
                        orderDirection: 'asc',
                        page: table.page || 0,
                        pageSize: table.options?.pageSize || 5,
                        search: table.options?.searchText || ''
                    });
                }
            }
        };

        const subscription = DataStore
            .observe(Vehicle)
            .subscribe(subscriber);

        return () => { subscription.unsubscribe(); };
    }, [tableRef]);
```

which is just type parameters. Looking like there's a plausible refactoring in there. Let's press on.

The `rowMapper()` is also just parametrized by type

```typescript hl_lines="1"
    function rowMapper(vehicles: Vehicle[]): Vehicle[] {
        return vehicles.map(vehicle => {
            return { ...vehicle }
        });
    }
```

The data query looks hard. Let's break it down.

```typescript hl_lines="1 8 9 10 11 12 13 16"
    function data(query: Query<Vehicle>): Promise<QueryResult<Vehicle>> {
        return new Promise((resolve, reject) => {
            const thisPage = {
                page: query.page,
                limit: query.pageSize
            };

            function searchCriteria(predicate: ModelPredicate<Vehicle>): ModelPredicate<Vehicle> {
                return predicate.or(or =>
                    or.make("contains", query.search)
                        .model("contains", query.search)
                        .mileage("ge", parseInt(query.search, 10)));
            }

            DataStore
                .query(Vehicle, searchCriteria, thisPage)
                .then(vehicles => {
                    resolve({
                        data: rowMapper(vehicles),
                        page: query.page,
                        totalCount: 1000000
                    });
                })
                .catch(reject);
        })
    }
```

The parameter and return types are just generics.

The function `searchCriteria()` needs criteria specific to the fields in each type. We'll need to pass the whole thing into our generic table.

The DataStore query needs the type. Now so hard. We probably want to change variable named `vehicle` and so on. Not a big deal.

In `onAddRow` we simply have a function that creates an new `Vehicle` from fields.

```typescript hl_lines="4 5 6 7 8"
    const onRowAdd = (newData: any) =>
        new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                const add = new Vehicle({
                    make: newData.make,
                    model: newData.model,
                    mileage: parseInt(newData.mileage, 10)
                });
                DataStore
                    .save(add)
                    .then(result => {
                        clearTimeout(timeout)

                        resolve(result);
                    })
                    .catch(reject)
            }, 1000);
        })
```

And similarly on `onRowDelete` and `onRowUpdate`.

## The best approach

We think we'll create a new React `Component` that has all the common table code, and pull out the highlighted code above incrementally until there are no more references to `Vehicle` left in the abstraction.

Let's do it.

Rename `Vehicles.tsx` to `AwesomeTable.tsx`. 

Replace the definition of `AwesomeTable` with

```typescript
export interface AwesomeTableProps {

}

const AwesomeTable = (props: AwesomeTableProps) => {
    const tableRef = createRef<MaterialTableProps<Vehicle>>();

    useEffect(() => {
```

Replace `Vehicles.tsx` with the trivial.

```typescript
import AwesomeTable from './AwesomeTable';

const Vehicles = () => {
    return AwesomeTable({})
}
```

Try it. Nice.

## Move column definitions

Make `AwesomeTable` generic and define a properties parameter.

```typescript
export interface AwesomeTableProps<T extends object> {
    columns: Column<T>[];
}

function AwesomeTable<T extends object>(props: AwesomeTableProps<T>) {
    const tableRef = createRef<MaterialTableProps<Vehicle>>();

    ...
```

Replace `Vehicles.tsx` with

```typescript
import AwesomeTable from './AwesomeTable';
import { Column } from 'material-table';
import { Vehicle } from './models';

const columns: Column<Vehicle>[] = [
    { title: 'Make', field: 'make' },
    { title: 'Model', field: 'model' },
    { title: 'Mileage', field: 'mileage', type: "numeric", emptyValue: '' },
];

const Vehicles = () => {
    return AwesomeTable({
        columns
    });
}

export default Vehicles;
```

Try it. Nice.

## Making generics

We need a generic type for the properties and the same for `AwesomeTable`. You can do a ton of spelunking in the type system of `DataSource` and `MaterialTable`. But I've done it for you so you don't have to.

```typescript
import { DataStore, SubscriptionMessage, ModelPredicate, PersistentModel, PersistentModelConstructor } from '@aws-amplify/datastore';
```

`PersistentModel` is the base for all generated entity types. And the final properties we need to pass to `AwesomeTable` are

```typescript
export interface AwesomeTableProps<T extends PersistentModel> {
    model: PersistentModelConstructor<T>,
    columns: Column<T>[];
    searchCriteria: (query: Query<T>, condition: ModelPredicate<T>) => ModelPredicate<T>
    instanceFor: (newData: any) => T;
    updater: (original: T, newData: any) => T;
}
```

Let's unpack that.

`<T extends PersistentModel>` looks good. But we can't get the type of `T` at runtime, which we need to pass to `DataStore` functions so it knows the right model and DynamoDB table to use. That's why we have to pass the type as `model`. But we actually want to define the class by its constructor. `PersistentModelConstructor<T>` is the constructor we need.

!!! note
    This is all so we can replace `DataStore.query(Vehicle, ...)` with `DataStore.query(props.model, ...)`. It works, although not the first time let me tell you.

We already saw the columns. To complete the properties we need in order to replace references to `Vehicle`, we require functions to specific to a model, `Vehicle` in this case.

Once we have these functions and data, we can now make the code general-purpose using the properties.

## The complete `AwesomeTable`

Here's the file. Check the highlighted lines for the changes we had to make. 

```typescript hl_lines="6 7 8 9 10 11 12 14 15 18 38 44 50 58 59 76 90 104 106"
import React, { useEffect, createRef } from 'react';
import { Grid } from '@material-ui/core';
import { DataStore, SubscriptionMessage, ModelPredicate, PersistentModel, PersistentModelConstructor } from '@aws-amplify/datastore';
import MaterialTable, { Column, Query, QueryResult, MaterialTableProps, Options } from 'material-table'

export interface AwesomeTableProps<T extends PersistentModel> {
    model: PersistentModelConstructor<T>,
    columns: Column<T>[];
    searchCriteria: (query: Query<T>, condition: ModelPredicate<T>) => ModelPredicate<T>
    instanceFor: (newData: any) => T;
    updater: (original: T, newData: any) => T;
}

function AwesomeTable<T extends PersistentModel>(props: AwesomeTableProps<T>) {
    const tableRef = createRef<MaterialTableProps<PersistentModelConstructor<T>>>();

    useEffect(() => {
        function subscriber(subscription: SubscriptionMessage<T>) {
            console.log('subscription', subscription);

            if (tableRef.current) {
                const table = tableRef.current;

                if (table.onQueryChange) {
                    table.onQueryChange({
                        filters: [],
                        orderBy: {},
                        orderDirection: 'asc',
                        page: table.page || 0,
                        pageSize: table.options?.pageSize || 5,
                        search: table.options?.searchText || ''
                    });
                }
            }
        };

        const subscription = DataStore
            .observe(props.model)
            .subscribe(subscriber);

        return () => { subscription.unsubscribe(); };
    }, [tableRef]);

    function rowMapper(rows: T[]): T[] {
        return rows.map(row => {
            return { ...row }
        });
    }

    function data(query: Query<T>): Promise<QueryResult<T>> {
        return new Promise((resolve, reject) => {
            const thisPage = {
                page: query.page,
                limit: query.pageSize
            };

            DataStore
                .query(props.model,
                    (predicate) => props.searchCriteria(query, predicate),
                    thisPage)
                .then(rows => {
                    resolve({
                        data: rowMapper(rows),
                        page: query.page,
                        totalCount: 1000000
                    });
                })
                .catch(reject);
        })
    }

    const onRowAdd = (newData: any) =>
        new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                DataStore
                    .save(props.instanceFor(newData))
                    .then(result => {
                        clearTimeout(timeout)

                        resolve(result);
                    })
                    .catch(reject)
            }, 1000);
        })

    const onRowDelete = (oldData: any) =>
        new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                DataStore
                    .delete(props.model, oldData.id)
                    .then(result => {
                        clearTimeout(timeout)

                        resolve(result);
                    })
                    .catch(reject)
            }, 1000);
        })

    const onRowUpdate = (newData: any, oldData: any) =>
        new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                DataStore
                    .query(props.model, oldData.id)
                    .then(original => {
                        return DataStore.save(props.updater(original, newData));
                    })
                    .then(result => {
                        clearTimeout(timeout)

                        resolve(result);
                    })
                    .catch(reject)
            }, 1000);
        })

    const editable = {
        onRowAdd,
        onRowDelete,
        onRowUpdate
    }

    const localization = {
        pagination: {
            labelDisplayedRows: '{from}-{to}'
        }
    }

    const options: Options = {
        showTitle: false,
        paginationType: "stepped",
        addRowPosition: "first",
        draggable: true,
        exportButton: true,
        filtering: true,
        padding: "dense",
        searchFieldAlignment: "left",
        toolbarButtonAlignment: "left"
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <MaterialTable
                    tableRef={tableRef}
                    data={data}
                    columns={props.columns}
                    editable={editable}
                    localization={localization}
                    options={options}
                />
            </Grid>
        </Grid>
    );
}

export default AwesomeTable;
```

This was in all honestly a pretty easy change once we could figure out the right type incantations. 

But is it any good?

Yes. Hold my keyboard.

Here's all we have to write now for `Vehicle`. It's just setting up and passing in configuration and functions that are specific to a `Vehicle`.

```typescript
import AwesomeTable from './AwesomeTable';
import { Column, Query } from 'material-table';
import { Vehicle } from './models';
import { ModelPredicate } from '@aws-amplify/datastore';

const columns: Column<Vehicle>[] = [
    { title: 'Make', field: 'make' },
    { title: 'Model', field: 'model' },
    { title: 'Mileage', field: 'mileage', type: "numeric", emptyValue: '' },
];

function searchCriteria(
    query: Query<Vehicle>,
    predicate: ModelPredicate<Vehicle>
): ModelPredicate<Vehicle> {
    return predicate.or(or =>
        or.make("contains", query.search)
            .model("contains", query.search)
            .mileage("ge", parseInt(query.search, 10)));
}

function instanceFor(newData: any): Vehicle {
    return new Vehicle({
        make: newData.make,
        model: newData.model,
        mileage: parseInt(newData.mileage, 10)
    });
}

function updater(original: Vehicle, newData: any) {
    return Vehicle.copyOf(original, updated => {
        updated.make = newData.make
        updated.model = newData.model
        updated.mileage = parseInt(newData.mileage, 10)
    });
}

const Vehicles = () => {
    return AwesomeTable<Vehicle>({
        model: Vehicle,
        columns,
        searchCriteria,
        instanceFor,
        updater
    })
}

export default Vehicles;
```

## The upshot

We made a version of the Material Table using generics. We were able to extract all the boilerplate to a new file, which makes the new `Vehicles.tsx` about as concise as we know how.

We're left with a table that...

* Is backed by remote data fetched from DynamoDB using the `DataStore` GraphQL abstraction.
* Fetches rows by the page rather than all the rows every time.
* Has Create, Read, Update, Delete (CRUD) functionality right there in the table itself. 
* Has sorting, searching, and filtering.
* Has a pagination UI, which we changed to the `stepped` variant.
* Can export and download data.
* Allows column dragging (did you see that one?)
