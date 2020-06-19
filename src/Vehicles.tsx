import React from "react";
import AwesomeTable, { OverrideProps } from './AwesomeTable';
import { Column, Query } from 'material-table';
import { Vehicle } from './models';
import { ModelPredicate, MutableModel } from '@aws-amplify/datastore';

export const UnassignedOwner = 'unassigned';

const columns: Column<Vehicle>[] = [
    { title: 'Make', field: 'make' },
    { title: 'Model', field: 'model' },
    { title: 'Mileage', field: 'mileage', type: "numeric", emptyValue: '' },
];

function searchCriteria(
    query: Query<Vehicle>,
    predicate: ModelPredicate<Vehicle>
): ModelPredicate<Vehicle> {
    return predicate.or(or => or
        .make("contains", query.search)
        .model("contains", query.search)
        .mileage("ge", parseInt(query.search, 10)));
}

function instanceFor(newData: any): Vehicle {
    return new Vehicle({
        make: newData.make,
        model: newData.model,
        mileage: parseInt(newData.mileage, 10),
        ownerID: newData.ownerID || UnassignedOwner
    });
}

function mutator(draft: MutableModel<Vehicle>, newData: any) {
    draft.make = newData.make || '';
    draft.model = newData.model || '';
    draft.mileage = newData.mileage;
    draft.ownerID = newData.ownerID || UnassignedOwner;
}

function Vehicles() {
    return (
        <AwesomeTable
            model={Vehicle}
            columns={columns}
            searchCriteria={searchCriteria}
            instanceFor={instanceFor}
            mutator={mutator}
        />
    );
}

export default Vehicles;