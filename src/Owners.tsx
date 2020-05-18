import React from "react";
import AwesomeTable from './AwesomeTable';
import { Column, Query, Action, Options } from 'material-table';
import { Owner, Vehicle } from './models';
import { DataStore, ModelPredicate, MutableModel } from '@aws-amplify/datastore';
import { Button, Dialog, Card, CardContent, CardActions, CardHeader, Typography } from "@material-ui/core";
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import Vehicles from "./Vehicles";

const columns: Column<Owner>[] = [
    { title: 'Name', field: 'name' },
    { title: 'Vehicles', field: 'vehicles', render: renderVehicles },
];

function renderVehicles(owner: Owner, type: "row" | "group") {
    console.log('owner.vehicles', owner?.vehicles);

    return (
        <div>
            {
                owner?.vehicles?.map(vehicle => {
                    return <Button>{vehicle.make} {vehicle.model}</Button>
                })
            }
        </div>
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
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [owner, setOwner] = React.useState<Owner>();

    const handleClose = (value: any) => {
        setDialogOpen(false);
    };

    const openAction: Action<Owner> = {
        icon: () => <DirectionsCar />,
        onClick: (event, selected: Owner | Owner[]) => {
            const actionOwner = selected as Owner; // TODO: This type is actually Owner | Owner[]. You're a monster Harrison. A monster.
            console.log('action new owner', actionOwner);

            setOwner(actionOwner);

            setDialogOpen(true);
        }
    };

    const actions = [
        openAction
    ]

    function ownsVehicle(owner: Owner, vehicle: Vehicle) {
        return owner &&
            owner.vehicles?.some((ownerVehicle, index, vehicles) => ownerVehicle === vehicle)
    }

    const vehicleOverrides: Options = {
        selection: true,
        selectionProps: (vehicle: Vehicle) => ({
            checked: owner && ownsVehicle(owner, vehicle),
            // color: "primary"
        })
    }

    function onSelectionChange(selected: Vehicle[]) {
        console.log('onSelectionChange selected', selected);
        if (owner) {
            console.log('onSelectionChange owner', owner);

            DataStore
                .query(Owner, owner.id)
                .then(ownerModel => {
                    console.log('ownerModel', ownerModel);

                    function mutate(draft: MutableModel<Owner>): MutableModel<Owner> {
                        return { ...draft, vehicles: selected }
                    }
                    const copyOf = Owner.copyOf(ownerModel, mutate);

                    setOwner(copyOf);

                    console.log('new owner', owner);

                    return DataStore.save(copyOf);
                })
                .then(result => console.log('onSelectionChange save result', result))
                .catch(console.error);
        };
    }

    return (
        <div>
            <AwesomeTable
                model={Owner}
                columns={columns}
                searchCriteria={searchCriteria}
                instanceFor={instanceFor}
                mutator={mutator}
                actions={actions}
            />
            <Dialog maxWidth="lg" open={dialogOpen} onClose={handleClose}>
                <Card>
                    <CardHeader>
                        <Typography variant="h4">{owner?.name}</Typography>
                    </CardHeader>
                    <CardContent>
                        <Vehicles
                            options={vehicleOverrides}
                            onSelectionChange={onSelectionChange}
                        />
                    </CardContent>
                    <CardActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose} variant="contained">Save</Button>
                    </CardActions>
                </Card>
            </Dialog>
        </div>
    );
}

export default Owners;
