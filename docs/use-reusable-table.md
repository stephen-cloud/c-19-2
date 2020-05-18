Let's replace the placeholders for `Owners`, `Parts`, and `Services` with their bespoke `AwesomeTable`.

This will also let us decide if the `DataStore`-backed table abstraction is any good.

## Define models

But first we need to define some more models.

Remember how we defined the model for `Vehicle`? It's this in `amplify/backend/api/yourapp/schema.graphql`.

```
type Vehicle @model {
  id: ID!
  make: String!
  model: String!
  mileage: Int
}
```

Let's make the rest, ignoring relationships between, say, owners and vehicles for now. Really super simple for now. We'll fix that later. Add this to the `schema.qraphql` file above.

```diff
type Owner @model {
  id: ID!
  name: String!
}

type Part @model {
  id: ID!
  description: String!
  price: Float!
  inventory: Int
}

type Service @model {
  id: ID!
  name: String!
}
```

## Generate models

Get ready to use the table abstraction by creating TypeScript classes for each model.

```shell
amplify codegen models
```

Then

```shell
amplify push
```

to create the corresponding DynamoDB tables.

## Owners

Create a file `Owners.tsx` with this. It's exactly the same pattern as `Vehicles.tsx`, of course.

Don't forget to change the menu components in `App.tsx`.

```typescript
      <div className={classes.content}>
        <main>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/vehicles" component={Vehicles} />
            <Route path="/owners" component={Owners} />
            <Route path="/services" component={Services} />
            <Route path="/parts" component={Parts} />
            <Route path="/workorders" component={Placeholder} />
          </Switch>
        </main>
      </div>
```

Here are the changes we made reusing `Vehicles.tsx` to make `Owners.tsx`. As you can see, there's not much that's not red or green. A good sign that our abstraction's working  well.

```diff
 import AwesomeTable from './AwesomeTable';
 import { Column, Query } from 'material-table';
-import { Vehicle } from './models';
+import { Owner } from './models';
 import { ModelPredicate } from '@aws-amplify/datastore';
 
-const columns: Column<Vehicle>[] = [
-    { title: 'Make', field: 'make' },
-    { title: 'Model', field: 'model' },
-    { title: 'Mileage', field: 'mileage', type: "numeric", emptyValue: '' },
+const columns: Column<Owner>[] = [
+    { title: 'Name', field: 'name' },
 ];
 
 function searchCriteria(
-    query: Query<Vehicle>,
-    predicate: ModelPredicate<Vehicle>
-): ModelPredicate<Vehicle> {
+    query: Query<Owner>,
+    predicate: ModelPredicate<Owner>
+): ModelPredicate<Owner> {
     return predicate.or(or =>
-        or.make("contains", query.search)
-            .model("contains", query.search)
-            .mileage("ge", parseInt(query.search, 10)));
+        or.name("contains", query.search))
 }
 
-function instanceFor(newData: any): Vehicle {
-    return new Vehicle({
-        make: newData.make,
-        model: newData.model,
-        mileage: parseInt(newData.mileage, 10)
+function instanceFor(newData: any): Owner {
+    return new Owner({
+        name: newData.name,
     });
 }
 
-function updater(original: Vehicle, newData: any) {
-    return Vehicle.copyOf(original, updated => {
-        updated.make = newData.make
-        updated.model = newData.model
-        updated.mileage = parseInt(newData.mileage, 10)
+function updater(original: Owner, newData: any) {
+    return Owner.copyOf(original, updated => {
+        updated.name = newData.name
     });
 }
 
-const Vehicles = () => {
-    return AwesomeTable<Vehicle>({
-        model: Vehicle,
+const Owners = () => {
+    return AwesomeTable<Owner>({
+        model: Owner,
         columns,
         searchCriteria,
         instanceFor,
         updater
     })
 }
 
-export default Vehicles;
+export default Owners;
```

So the complete `Owners.tsx` is 

```typescript
import AwesomeTable from './AwesomeTable';
import { Column, Query } from 'material-table';
import { Owner } from './models';
import { ModelPredicate } from '@aws-amplify/datastore';

const columns: Column<Owner>[] = [
    { title: 'Name', field: 'name' },
];

function searchCriteria(
    query: Query<Owner>,
    predicate: ModelPredicate<Owner>
): ModelPredicate<Owner> {
    return predicate.or(or =>
        or.name("contains", query.search))
}

function instanceFor(newData: any): Owner {
    return new Owner({
        name: newData.name,
    });
}

function updater(original: Owner, newData: any) {
    return Owner.copyOf(original, updated => {
        updated.name = newData.name
    });
}

const Owners = () => {
    return AwesomeTable<Owner>({
        model: Owner,
        columns,
        searchCriteria,
        instanceFor,
        updater
    })
}

export default Owners;
```

## Parts

```typescript
import AwesomeTable from './AwesomeTable';
import { Column, Query } from 'material-table';
import { Part } from './models';
import { ModelPredicate } from '@aws-amplify/datastore';

const columns: Column<Part>[] = [
    { title: 'Description', field: 'description' },
    { title: 'Price', field: 'price', type: "currency", emptyValue: "0.00" },
    { title: 'Inventory', field: 'inventory', type: "numeric", emptyValue: "0" },
];

function searchCriteria(
    query: Query<Part>,
    predicate: ModelPredicate<Part>
): ModelPredicate<Part> {
    return predicate.or(or =>
        or.description("contains", query.search)
            .price("ge", parseFloat(query.search))
            .inventory("ge", parseInt(query.search, 10)))
}

function instanceFor(newData: any): Part {
    console.log('newData', newData);

    const result = new Part({
        description: newData.description,
        price: parseFloat(newData.price),
        inventory: parseInt(newData.inventory, 10)
    });

    console.log('result', result);
    return result;
}

function updater(original: Part, newData: any) {
    return Part.copyOf(original,
        updated => {
            updated.description = newData.description;
            updated.price = parseFloat(newData.search);
            updated.inventory = parseInt(newData.search, 10);
        }
    );
}

const Parts = () => {
    return AwesomeTable<Part>({
        model: Part,
        columns,
        searchCriteria,
        instanceFor,
        updater
    })
}

export default Parts;
```

## Services

```typescript
import AwesomeTable from './AwesomeTable';
import { Column, Query } from 'material-table';
import { Service } from './models';
import { ModelPredicate } from '@aws-amplify/datastore';

const columns: Column<Service>[] = [
    { title: 'Name', field: 'name' },
];

function searchCriteria(
    query: Query<Service>,
    predicate: ModelPredicate<Service>
): ModelPredicate<Service> {
    return predicate.or(or =>
        or.name("contains", query.search))
}

function instanceFor(newData: any): Service {
    return new Service({
        name: newData.name,
    });
}

function updater(original: Service, newData: any) {
    return Service.copyOf(original, updated => {
        updated.name = newData.name
    });
}

const Services = () => {
    return AwesomeTable<Service>({
        model: Service,
        columns,
        searchCriteria,
        instanceFor,
        updater
    })
}

export default Services;
```

Try it. `AwesomeTable` is awesome.

## The upshot

We were able to leverage our reusable `AwesomeTable` to add CRUD functionality to the components `Owners.tsx`, `Parts.tsx`, and `Services.tsx`,

It was pretty easy so the work we did in the table abstraction really paid off. That code is bit involved because it's dealing with the `DataStore` abstraction for GraphQL: The component code is straightforward. A bit wordy. But workable.

Next up, we're going to add code to handle relations between models.
