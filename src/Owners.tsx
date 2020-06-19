import React from "react";
import AwesomeTable from './AwesomeTable';
import { Column, Query, Action, Options } from 'material-table';
import { Owner, Vehicle } from './models';
import { UnassignedOwner } from './Vehicles'
import { DataStore, ModelPredicate, MutableModel } from '@aws-amplify/datastore';
import { Button, Dialog, Card, CardContent, CardActions, CardHeader, Typography } from "@material-ui/core";
import DirectionsCar from '@material-ui/icons/DirectionsCar';

const columns: Column<Owner>[] = [
    { title: 'Name', field: 'name' },
    {
        title: 'Vehicles',
        field: 'vehicles',
        render: (owner: Owner) => renderVehicles(owner)
    },
];

function renderVehicles(owner: Owner) {
    console.log('renderVehicles for', owner);
    // DataStore
    //     .query(Vehicle, c => c.ownerID("eq", owner.id))
    //     .then(result => { owner.vehicles = result })
    //     .catch(reason => console.error(reason));

    // console.log('owner.vehicles', vehiclesByOwner);

    return (
        <Button>{"a"+JSON.stringify(owner?.vehicles)+"b"}</Button>
    );
}

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
        vehicles: newData.vehicles || []
    });
}

function mutator(draft: MutableModel<Owner>, newData: any) {
    draft.name = newData.name || '';
    draft.vehicles = newData.vehicles || [];
}

const Owners = () => {
    return (
        <div>
            <AwesomeTable
                model={Owner}
                columns={columns}
                searchCriteria={searchCriteria}
                instanceFor={instanceFor}
                mutator={mutator}
            />
        </div>
    );
}

export default Owners;
