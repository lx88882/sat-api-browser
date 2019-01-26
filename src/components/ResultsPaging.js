import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import ProgressButton from './ProgressButton';
import { fetchFilteredItems } from '../actions/queryActions';
import { getResultsTotal, getResultsDisplayed }
  from '../reducers/stylesheetSelectors';
import { getCurrentFilter, getQueryStatus } from '../reducers/querySelectors';
import { loading } from '../constants/applicationConstants';

const styles = theme => ({
  grid: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  chips: {
    textAlign: 'center'
  }
});

export const ResultsPaging = (props) => {
  const {
    classes,
    resultsTotal,
    resultsDisplayed,
    currentFilter,
    fetchFilteredItemsAction,
    status
  } = props;
  const moreResults = resultsTotal - resultsDisplayed;
  const getMoreResults = () => {
    const limit = process.env.REACT_APP_RESULT_LIMIT;
    const filter = currentFilter.toJS();
    filter.page = (resultsDisplayed / limit) + 1;
    fetchFilteredItemsAction(filter);
  };

  return (
    <Grid
      container
      justify="center"
      className={classes.grid}
    >
      <Grid item xs={8}>
        <div className={classes.chips}>
          <Chip
            color="primary"
            label={`Found - ${resultsTotal}`}
          />
          <Chip
            color="secondary"
            label={`Displaying - ${resultsDisplayed}`}
          />
          <ProgressButton
            disabled={resultsTotal === 0 || moreResults === 0 || status === loading}
            label="More Results"
            status={status}
            onClick={getMoreResults}
          />
        </div>
      </Grid>
    </Grid>
  );
};

ResultsPaging.propTypes = {
  classes: PropTypes.shape({}),
  resultsTotal: PropTypes.number.isRequired,
  resultsDisplayed: PropTypes.number.isRequired,
  currentFilter: PropTypes.shape({}),
  fetchFilteredItemsAction: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  resultsTotal: getResultsTotal(state),
  resultsDisplayed: getResultsDisplayed(state),
  currentFilter: getCurrentFilter(state),
  status: getQueryStatus(state)
});

const mapDispatchToProps = { fetchFilteredItemsAction: fetchFilteredItems };

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ResultsPaging));
