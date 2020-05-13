import React, { useEffect, createRef } from 'react';
import { Grid } from '@material-ui/core';
import { DataStore, SubscriptionMessage, ModelPredicate, PersistentModel, PersistentModelConstructor } from '@aws-amplify/datastore';
import MaterialTable, { Column, Query, QueryResult, MaterialTableProps, Options, Action } from 'material-table'
import { DirectionsCar } from '@material-ui/icons'

export interface AwesomeTableProps<T extends PersistentModel> {
    model: PersistentModelConstructor<T>,
    columns: Column<T>[];
    searchCriteria: (query: Query<T>, condition: ModelPredicate<T>) => ModelPredicate<T>
    instanceFor: (newData: any) => T;
    updater: (original: T, newData: any) => T;
    actions?: Action<T>[];
    overrides?: OverrideProps;
}

export interface OverrideProps {
    options?: Options;
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
    }, [tableRef, props.model]);

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

    const defaultOptions: Options = {
        showTitle: false,
        paginationType: "stepped",
        addRowPosition: "first",
        draggable: true,
        exportButton: true,
        filtering: true,
        padding: "dense",
        searchFieldAlignment: "left",
        toolbarButtonAlignment: "left",
        selection: true
    }
    const options: Options = { ...defaultOptions, ...props.overrides };

    console.log('defaultOptions', defaultOptions);
    console.log('props.overrides', props.overrides);
    console.log('options', options);

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
                    actions={props.actions}
                />
            </Grid>
        </Grid>
    );
}

export default AwesomeTable;
