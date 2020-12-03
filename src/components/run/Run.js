import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Paper, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chromatogram from '../chromatogram/Chromatogram';

const useStyles = makeStyles({
  root: {
    width: 'max-content',
    margin: '24px',
    padding: '24px',
  },
  container: {
    maxHeight: 440,
  },
  title: {
    fontWeight: 'bold',
    fontSize: '20px',
    marginTop: '24px',
  },
});

const componentsColumns = [
  { id: 'id', label: 'ID', minWidth: 25 },
  { id: 'run_id', label: 'Run ID', minWidth: 100 },
  { id: 'component_name', label: 'Component Name', minWidth: 100 },
  {
    id: 'retention_time_seconds',
    label: 'Retention Time (sec)',
    minWidth: 100,
  },
  { id: 'peak_height_mau', label: 'Peak Height (mau)', minWidth: 100 },
  { id: 'concentration_um', label: 'Concentration (um)', minWidth: 100 },
];

function Run({ run, chromatogramData }) {
  const classes = useStyles();
  return (
    <Box>
      {chromatogramData.length !== 0 && (
        <Paper className={classes.root}>
          <Box>
            <Typography>Run ID : {run.id}</Typography>
            <Typography>Sequence ID : {run.sequence_id}</Typography>
            <Typography>Name : {run.name}</Typography>
          </Box>
          <Divider />
          <Box className={classes.title}>Components</Box>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
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
              <TableBody>
                {run.components &&
                  run.components.map((component) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={component.id}
                      >
                        {componentsColumns.map((column) => {
                          const value = component[column.id];
                          return <TableCell key={column.id}>{value}</TableCell>;
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <Chromatogram chromatogramData={chromatogramData} />
        </Paper>
      )}
    </Box>
  );
}

export default Run;
