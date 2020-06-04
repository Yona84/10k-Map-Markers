import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const propTypes = {
  text: PropTypes.string,
};

const carImgSrc = 'https://img.icons8.com/color/48/000000/car.png';

const CarComponent = ({ text }) => {
  return (
    <div className={styles.root}>
      <img src={carImgSrc} alt='car' width={30} height={30}/>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

const styles = {
  root: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  text: css({
    fontSize: 10,
  })
};

CarComponent.propTypes = propTypes;

export default CarComponent;
