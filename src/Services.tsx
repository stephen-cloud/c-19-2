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
