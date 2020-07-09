import React from 'react';
import moment from 'moment';
import svgPath from '../../utils/svgPaths';
import styles from './Calendar.css';

const days = [];

// formats dates from moment.js
for (let i = 0; i <= 7; i++) {
  let obj = {};
  let format = moment().add(i, 'days').format('dddd Do MMMM');
  format = format.split(' ');
  obj.day = format[0].slice(0, 3);
  obj.date = format[1].slice(0, format[1].length - 2);
  obj.month = format[2].slice(0, 3);
  days.push(obj);
}

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      selected: 0,
    };

    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.selectDate = this.selectDate.bind(this);
  }

  componentDidMount() {
    let init = document.getElementsByClassName(styles.calendarButton)[0];
    init.classList = [styles.calendarButton, styles.ButtonOn].join(' ');
  }

  selectDate(target) {
    if (document.getElementsByClassName(styles.ButtonOn).length > 0) {
      let turnoff = document.getElementsByClassName(styles.ButtonOn);
      turnoff[0].classList = [styles.calendarButton, styles.ButtonOff].join(' ');
    }
    target.classList = [styles.calendarButton, styles.ButtonOn].join(' ');
    this.setState({ selected: target.id });
    this.props.dateSelect(target.id);
  }

  scrollRight() {
    this.setState({ page: 1 });
  }

  scrollLeft() {
    this.setState({ page: 0 });
  }

  render() {
    if (this.state.page === 0) {
      return (
        <div className={styles.Calendar}>
          <div className={styles.calendarDiv}>
            <div className={styles.calendarBox}>
              {days.map((item, i) => <CalendarElement date={item} key={i} selectDate={this.selectDate} />)}
            </div>
          </div>
          <button type="button" className={styles.pageButtonRight} onClick={this.scrollRight}>
            <div>
              <svg viewBox="0 0 32 32" className={styles.arrowSvg}>
                <path d="M17.65 16.513l-7.147-7.055 1.868-1.893 9.068 8.951-9.069 8.927-1.866-1.896z" />
              </svg>
            </div>
          </button>
        </div>
      );
    }
    return (
      <div className={styles.Calendar}>
        <button type="button" className={styles.pageButtonLeft} onClick={this.scrollLeft}>
          <div>
            <svg viewBox="0 0 32 32" className={styles.arrowSvg}>
              <path d="M14.292 16.494l7.147 7.056-1.869 1.893-9.067-8.951 9.069-8.927 1.866 1.896z" />
            </svg>
          </div>
        </button>
        <div className={styles.calendarDiv}>
          <div className={styles.calendarScrolled}>
            {days.map((item, i) => <CalendarElement date={item} key={i} selectDate={this.selectDate} />)}
          </div>
        </div>
      </div>
    );
  }
}

const CalendarElement = ({ date, selectDate }) => (
  <div className={styles.calendarElement}>
    <button type="button" id={JSON.stringify(date)} className={[styles.calendarButton, styles.ButtonOff].join(' ')} onClick={(e) => { selectDate(e.currentTarget); }}>
      <div id="calendarDay">{date.day}</div>
      <div className={styles.calendarDate}>{date.date}</div>
      <div id="calendarMonth">{date.month}</div>
    </button>
  </div>
);

export default Calendar;
