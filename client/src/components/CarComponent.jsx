import React from 'react';
import { css } from 'emotion';

const carImgSrc = 'https://img.icons8.com/color/48/000000/car.png';

const CarComponent = () => {
  return (
    <div className={styles.root}>
      <img src={carImgSrc} alt='car' width={30} height={30}/>
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
