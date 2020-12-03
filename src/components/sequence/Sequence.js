import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  },
});

const componentsColumns = [
  { id: 'id', label: 'ID', minWidth: 25 },
  { id: 'name', label: 'NAME', minWidth: 100 },
  { id: 'run_time', label: 'RUN TIME', minWidth: 100 },
  { id: 'operator', label: 'OPERATOR', minWidth: 100 },
];

function Sequence() {
  const classes = useStyles();
  const [sequences, setSequences] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url =
        'https://storage.googleapis.com/mantrabio-hiring-exercises/2020-fe-eng/api/hplc.json';
      const res = await axios(url);
      setSequences(res.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Sequence Table</h2>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key="run">RUN</TableCell>
              {componentsColumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody data-testid="sequence-rows">
            {sequences &&
              sequences.map((sequence) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={sequence.id}
                  >
                    <TableCell key="run">
                      <Link to={`/runs/${sequence.id}`}>View Run</Link>
                    </TableCell>
                    {componentsColumns.map((column) => {
                      const value = sequence[column.id];
                      return <TableCell key={column.id}>{value}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Sequence;
