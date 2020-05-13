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
