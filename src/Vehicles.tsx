import React from "react";
import AwesomeTable, { OverrideProps } from './AwesomeTable';
import { Column, Query, Options } from 'material-table';
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

function Vehicles(props: OverrideProps) {
    return (
        <AwesomeTable
            model={Vehicle}
            columns={columns}
            searchCriteria={searchCriteria}
            instanceFor={instanceFor}
            updater={updater}
            overrides={props}
        />
    );
}

export default Vehicles;