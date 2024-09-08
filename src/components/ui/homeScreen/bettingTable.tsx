import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import BettingTableTabs from './bettingTableTabs';

interface Column {
    id: 'Match' | 'User' | 'Time' | 'BetAmount' | 'Multiplier' | 'Payout';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'Match', label: 'Game', minWidth: 100 },
    { id: 'User', label: 'User', minWidth: 100 },
    {
        id: 'Time',
        label: 'Time',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'BetAmount',
        label: 'Bet Amount',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'Multiplier',
        label: 'Multiplier',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'Payout',
        label: 'Payout',
        minWidth: 100,
        align: 'right',
    },
];

interface Data {
    Match: string;
    User: string;
    Time: number;
    BetAmount: number;
    Multiplier: number;
    Payout: number;
}

function createData(
    Match: string,
    User: string,
    Time: number,
    BetAmount: number,
    Multiplier: number,
    Payout: number,
): Data {
    return { Match, User, Time, BetAmount, Multiplier, Payout };
}

const rows = [
    createData('Plinko', 'Hidden', 14.52, 0.15899999, 4.00, 0.63599996),
    createData('Sweet Bonanza 1000', 'Hidden', 14.52, 200.00, 10.60, 2119.80),
    createData('Crash', 'Hidden', 14.52, 1178.00, 1.66, 1952.787980),
    createData('Wild West Gold Mega', 'Hidden', 14.52, 0.00542400, 6.30, 0.03417120),
    createData('Immersive Roulette', 'Hidden', 14.52, 1008.394660, 1.70, 1718.968103),
    createData('Salon Privé Blackjack', 'Hidden', 14.51, 7.15499963, 0.17, -5.96249969),
    createData('Salon Privé Blackjack', 'Hidden', 14.51, 2998.200180, 2.00, 5996.400360),
];

export default function BettingTable() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className=' flex flex-col justify-center items-center'>
            <BettingTableTabs />
            <div className='w-full flex items-center justify-center mx-auto mb-10'>
                <TableContainer sx={{ width: "75%", backgroundColor: '#ced4de', borderRadius: '8px', marginTop: '20px' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead sx={{ backgroundColor: '#242E3F' }}>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        sx={{ color: '#000000', fontWeight: 'bold', }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover


                                            key={row.User}
                                            sx={{

                                                backgroundColor: '#ffffff',
                                                '&:hover': {
                                                    backgroundColor: '#e4e7ed',
                                                },


                                            }}
                                        >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align} sx={{ color: '#000000' }}>
                                                        {column.id === 'User' ? (

                                                            <div className=' flex items-center'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082" />
                                                                </svg>

                                                                {value}
                                                            </div>

                                                        ) : (
                                                            value
                                                        )}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </div>
    );
}
