import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Paper } from '@material-ui/core';
import { useParams } from 'react-router';
import Run from './Run';

const useStyles = makeStyles({
  root: {
    margin: '24px',
    padding: '24px',
    backgroundColor: '#fafafa',
  },
  container: {
    maxHeight: 500,
    backgroundColor: '#fff',
  },
  runItem: {
    display: 'flex',
    alignItems: 'baseline',
    borderBottom: '1px solid #e0e0e0',
    padding: '16px;',
  },
  runData: {
    marginLeft: '8px',
    padding: '8px',
  },
});

function Runs() {
  const classes = useStyles();
  const [runs, setRuns] = useState([]);
  const [singleRun, setSingleRun] = useState({});
  const [chromatogramData, setChromatogramData] = useState([]);
  const { sequenceId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const url = `https://storage.googleapis.com/mantrabio-hiring-exercises/2020-fe-eng/api/hplc/${sequenceId}/runs.json`;
      const res = await axios(url);
      setRuns(res.data);
    }
    fetchData();
  }, []);

  const getSingleRunData = (run) => {
    const chromData = [];
    for (let i = 0; i < run.chromatogram.x.length; i += 1) {
      chromData.push({
        x: run.chromatogram.x[i],
        y: run.chromatogram.y[i],
      });
    }
    setChromatogramData(chromData);
    setSingleRun(run);
  };

  return (
    <Paper className={classes.root}>
      <Box>
        <h3>Runs for Sequence ID # {sequenceId}</h3>
        {runs.map((run) => {
          return (
            <Box key={run.id} className={classes.runItem}>
              <Button
                className={classes.runData}
                onClick={() => getSingleRunData(run)}
                variant="outlined"
                color="primary"
                disableElevation
                size="small"
              >
                See Details
              </Button>
              <Box className={classes.runData}>
                ID: <b>{run.id}</b>
              </Box>
              <Box className={classes.runData}>
                Name: <b>{run.name}</b>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Run chromatogramData={chromatogramData} run={singleRun} />
    </Paper>
  );
}

export default Runs;
