import React, { PropTypes } from 'react';

const AncientsDetails = ({ ancient }) => (
  <tr>
    <td className="name">{ancient.name.toUpperCase()}</td>
    <td className="superpower">{ancient.superpower.toUpperCase()}</td>
    <td className="era-end">{ancient.end_of_an_era}</td>
  </tr>
);


AncientsDetails.propTypes = {
  ancient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    superpower: PropTypes.string.isRequired,
    end_of_an_era: PropTypes.string.isRequired
  }).isRequired
};

export default AncientsDetails;
