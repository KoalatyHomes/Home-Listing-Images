import React from 'react';
import svgPath from '../../utils/svgPaths';
import TourSchedule from '../TourSchedule/TourSchedule.jsx';
import SaveButton from '../SaveButton/SaveButton.jsx';
import styles from './Modal.css';

const formatPrice = (num) => {
  const arr = num.split('').reverse();
  arr.splice(3, 0, ',');
  if (num.length > 6) {
    arr.splice(7, 0, ',');
  }
  return `$${arr.reverse().join('')}`;
};

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 0,
      gallery: this.props.home.rows.map(image => image.image_url),
    };

    this.cycleLeft = this.cycleLeft.bind(this);
    this.cycleRight = this.cycleRight.bind(this);
  }

  cycleRight() {
    if (this.state.image === this.props.home.rowCount) {
      this.setState({ image: 0 });
    } else {
      this.setState((prevState) => ({ image: prevState.image + 1 }));
    }
  }

  cycleLeft() {
    if (this.state.image === 0) {
      this.setState({ image: this.props.home.rowCount });
    } else {
      this.setState((prevState) => ({ image: prevState.image - 1 }));
    }
  }

  render() {

    return (
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <span>
            {`${this.props.home.rows[0].address} `}
          </span>
          <span>
            | {formatPrice(JSON.stringify(this.props.home.rows[0].price))}
          </span>
          <span> | 5 Bed 5 Bath</span>
          <div className={styles.modalButtons}>
            <SaveButton />
            <svg viewBox="0 0 32 32" className={styles.close} onClick={this.props.toggleModal}>
              <path d={svgPath.close} />
            </svg>
          </div>
        </div>
        <div className={styles.modalBody}>
          <button type="button" className={[styles.cycleButton, styles.leftCycle].join(' ')} onClick={this.cycleLeft}>
            <svg viewBox="0 0 32 32" className={styles.arrowSvg}>
              <path d="M14.292 16.494l7.147 7.056-1.869 1.893-9.067-8.951 9.069-8.927 1.866 1.896z" fill="#FFFFFF" />
            </svg>
          </button>
          <div className={styles.gallery}>
            <img className={styles.image} alt="" src={this.state.gallery[this.state.image]} />
          </div>
          <button type="button" className={[styles.cycleButton, styles.rightCycle].join(' ')} onClick={this.cycleRight}>
            <svg viewBox="0 0 32 32" className={styles.arrowSvg}>
              <path d="M17.65 16.513l-7.147-7.055 1.868-1.893 9.068 8.951-9.069 8.927-1.866-1.896z" fill="#FFFFFF" />
            </svg>
          </button>
          <div className={styles.tourscheduleContainer}>
            <TourSchedule home={this.props.home} />
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
