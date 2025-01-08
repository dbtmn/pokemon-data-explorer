import { MouseEvent, FunctionComponent } from 'react';
import _ from 'lodash';
import { Paper, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { Pokemon } from '../../store/pokemons/types';
import "./index.scss"

const columns = [
    { id: 'id', name: 'ID' },
    { id: 'name', name: 'Name' },
    { id: 'types', name: 'Types' },
    { id: 'image', name: 'Image' },
]

interface TableProps {
    page: any
    data: Pokemon[]
    activeFilter: string
    searchWord: string
    onPageChange: (event: MouseEvent<HTMLButtonElement> | null, page: number) => void
    onClick: (id: number) => void
}

const Table: FunctionComponent<TableProps> = ({ page, data, activeFilter, searchWord, onPageChange, onClick }) => {

    const rowperpage = 10

    const filterByType = (array: any[], typeName: string) => {
        return array.filter(item =>
            item.types.some((typeObj: any) => typeObj.type.name === typeName)
        );
    }
    let filteredPokemons: Pokemon[] = (activeFilter ? filterByType(data, activeFilter) : data)
    filteredPokemons = searchWord ? filteredPokemons.filter(pokemon => pokemon.name.includes(searchWord)) : filteredPokemons

    return (
        <Paper className='table' sx={{ width: '90%', marginLeft: '5%' }}>
            <TableContainer sx={{ height: 450 }}>
                <MuiTable stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id}>{column.name}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPokemons &&
                            (filteredPokemons.slice(page * 10 /*rowsPerPage*/, page * 10 /*rowsPerPage*/ + 10 /*rowsPerPage*/))
                                .map((row: any, i: any) => {
                                    return (
                                        <TableRow key={i} onClick={() => onClick(row.id)}>
                                            {columns && columns.map((column, i) => {
                                                let value: string | string[] = row[column.id];

                                                if (column.id === 'types') {
                                                    value = _.map(row[column.id], item => {
                                                        return (item.type.name)
                                                    })

                                                    if (typeof value !== 'string') {
                                                        value = value.toString()
                                                    }
                                                }


                                                return (
                                                    <TableCell padding='none' className='table__cell' key={i}>
                                                        {column.id === 'image' ?
                                                            <img className='table__image' src={row[column.id]} /> : value
                                                        }
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    )
                                })}
                    </TableBody>
                </MuiTable>
            </TableContainer>
            <TablePagination
                rowsPerPage={rowperpage}
                page={page}
                count={filteredPokemons.length}
                component="div"
                onPageChange={onPageChange}
                rowsPerPageOptions={[10]}
            >
            </TablePagination>
        </Paper>
    );
}

export default Table