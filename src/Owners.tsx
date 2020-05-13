import React from "react";
import AwesomeTable, { OverrideProps } from './AwesomeTable';
import { Column, Query, Action, Options } from 'material-table';
import { Owner } from './models';
import { ModelPredicate } from '@aws-amplify/datastore';
import { Button, Dialog, makeStyles, Card, CardHeader, CardContent, CardActions, Typography } from "@material-ui/core";
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import Vehicles from "./Vehicles";

const columns: Column<Owner>[] = [
    { title: 'Name', field: 'name' },
    { title: 'Vehicles', field: 'vehicles' },
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
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleClose = (value: any) => {
        setDialogOpen(false);
    };

    const openAction: Action<Owner> = {
        icon: () => <DirectionsCar />,
        onClick: (event, owner) => {
            setDialogOpen(true);
        }
    };

    const actions = [
        openAction
    ]

    const vehicleOverrides: Options = {
        selection: true
    }

    return (
        <div>
            <AwesomeTable
                model={Owner}
                columns={columns}
                searchCriteria={searchCriteria}
                instanceFor={instanceFor}
                updater={updater}
                actions={actions}
            />
            <Dialog open={dialogOpen} onClose={handleClose}>
                <Card>
                    <CardContent>
                        <Vehicles
                            options={vehicleOverrides}
                        />
                    </CardContent>
                    <CardActions color="blue" >
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose} variant="contained">Save</Button>
                    </CardActions>
                </Card>
            </Dialog>
        </div>
    );
}

export default Owners;
