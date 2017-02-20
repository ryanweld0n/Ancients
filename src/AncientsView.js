import React, { PropTypes } from 'react';

import AncientsDetails from './AncientsDetails';

export default class AncientsView extends React.Component {

  constructor() {
    super();
    this.state = {
      search: true
    };
  }

  render() {
    const {
      ancients
    } = this.props;

    return (
      <div>
        <table className="table table-condensed table-hover table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Superpower</th>
              <th>End of an Era</th>
            </tr>
          </thead>
          <tbody>
            { (ancients.length > 0)
              ? (ancients).map(ancient => <AncientsDetails key={ancient.name} ancient={ancient} />)
              : <tr><td colSpan="3">No Ancients Here</td></tr> }
          </tbody>
        </table>
      </div>
    );
  }
}

AncientsView.propTypes = {
  ancients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    superpower: PropTypes.string.isRequired,
    end_of_an_era: PropTypes.string.isRequired
  }))
};

AncientsView.defaultProps = {
  ancients: []
};
