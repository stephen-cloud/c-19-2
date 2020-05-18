import React from 'react';
import AwesomeTable from './AwesomeTable';
import { Column, Query } from 'material-table';
import { Service } from './models';
import { ModelPredicate, MutableModel } from '@aws-amplify/datastore';

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

function mutator(draft: MutableModel<Service>, newData: any) {
    draft.name = newData.name || '';
}

const Services = () => {
    return <AwesomeTable
        model={Service}
        columns={columns}
        searchCriteria={searchCriteria}
        instanceFor={instanceFor}
        mutator={mutator}
    />
}

export default Services;
