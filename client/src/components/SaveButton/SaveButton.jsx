import React from 'react';
import svgPath from '../../utils/svgPaths';
import styles from './SaveButton.css';

class SaveButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
    };

    this.save = this.save.bind(this);
  }

  save() {
    this.setState((prevState) => ({ saved: !prevState.saved }));
  }

  render() {
    const heart = this.state;
    let color;
    let fill;
    if (heart.saved) {
      color = styles.heartOn;
      fill = svgPath.heartOn;
    } else {
      color = styles.heartOff;
      fill = svgPath.heartOff;
    }
    return (
      <div className={styles.btnDiv}>
        <button type="button" className={styles.headerbtn} onClick={this.save}>
          <svg viewBox=" 0 0 32 32" className={[styles.headerSvg, color].join(' ')}>
            <path d={fill} />
          </svg>
          <div className={styles.btnText}>Save</div>
        </button>
        <button type="button" className={[styles.headerbtn, styles.shareBtn].join(' ')}>
          <svg viewBox="0 0 32 32" className={styles.headerSvg}>
            <path d={svgPath.share} />
          </svg>
          <div className={styles.btnText}>Share</div>
        </button>
      </div>
    );
  }
}

export default SaveButton;
