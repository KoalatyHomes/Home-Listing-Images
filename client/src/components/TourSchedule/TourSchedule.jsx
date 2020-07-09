import React from 'react';
import axios from 'axios';
import Calendar from '../Calendar/Calendar.jsx'
import styles from './TourSchedule.css';

class TourSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // True = Schedule a Tour
      // False = Request Info
      tab: true,
      type: 'InPerson',
      date: undefined,
    };

    this.switchTabs = this.switchTabs.bind(this);
    this.switchType = this.switchType.bind(this);
    this.dateSelect = this.dateSelect.bind(this);
    this.submit = this.submit.bind(this);
  }

  switchTabs() {
    this.setState({ tab: !this.state.tab });
  }

  switchType(selector) {
    if (this.state.type !== selector) {
      this.setState({ type: selector });
    }
  }

  dateSelect(selectedDate) {
    this.setState({ date: selectedDate });
  }

  submit() {
    const { tab, type, date } = this.state;
    let data = {};
    if (tab) {
      data.type = 'Schedule Tour';
      data.tourType = type;
      data.date = date;
      data.name = document.getElementsByTagName('input')[0].value;
      data.phone = document.getElementsByTagName('input')[1].value;
      data.email = document.getElementsByTagName('input')[2].value;
      data.financing = document.getElementsByTagName('input')[3].checked;
    } else {
      data.type = 'Request Info';
      data.tourType = type;
      data.name = document.getElementsByTagName('input')[0].value;
      data.phone = document.getElementsByTagName('input')[1].value;
      data.email = document.getElementsByTagName('input')[2].value;
      data.message = document.getElementsByTagName('textarea')[0].value;
    }
    axios.post('http://localhost:3001/api/schedule', data)
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { tab, type } = this.state;
    let type1;
    let type2;
    if (type === 'InPerson') {
      type1 = styles.TourTypeOn;
      type2 = styles.TourTypeOff;
    } else {
      type1 = styles.TourTypeOff;
      type2 = styles.TourTypeOn;
    }
    if (tab) {
      return (
        <div>
          <div>
            <button type="button" className={[styles.TourTab, styles.tabOn].join(' ')}>Schedule a Tour</button>
            <button type="button" className={[styles.TourTab, styles.tabOff].join(' ')} onClick={this.switchTabs}>Request Info</button>
          </div>
          <div className={styles.formdiv}>
            <form>
              <button type="button" className={[styles.typeRadio, styles.inPerson, type1].join(' ')} onClick={() => { this.switchType('InPerson'); }}>In-Person</button>
              <button type="button" className={[styles.typeRadio, styles.virtual, type2].join(' ')} onClick={() => { this.switchType('Virtual'); }}>Virtual</button>
              <Calendar dateSelect={this.dateSelect} />
              <input type="text" className={[styles.text, styles.input50, styles.left].join(' ')} placeholder="Name" />
              <input type="text" className={[styles.text, styles.input50, styles.right].join(' ')} placeholder="Phone" />
              <input type="text" className={[styles.text, styles.input100].join(' ')} placeholder="Email" />
              <div className={styles.checkboxDiv}>
                <input type="checkbox" className={styles.checkbox} />
                <label htmlFor="checkbox" className={styles.checkboxLabel}>I want to talk about financing</label>
              </div>
              <button type="button" className={[styles.schedule, styles.input100].join(' ')} onClick={this.submit}>Schedule a Tour</button>
              <div className={styles.disclaimer}>
                By pressing Schedule a Tour, you agree that Trulia and real estate professionals may contact you via phone/text about your inquiry, which may involve the use of automated means. You are not required to consent as a condition of purchasing any property, goods or services. Message/data rates may apply. You also agree to our
                <a target="_blank" rel="noreferrer" href="https://www.trulia.com/terms">Terms of Use.</a>
                Trulia does not endorse any real estate professionals.
              </div>
            </form>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div>
          <button type="button" className={[styles.TourTab, styles.tabOff].join(' ')} onClick={this.switchTabs}>Schedule a Tour</button>
          <button type="button" className={[styles.TourTab, styles.tabOn].join(' ')}>Request Info</button>
        </div>
        <div className={styles.formdiv}>
          <form>
            <input type="text" className={[styles.text, styles.input50, styles.left].join(' ')} placeholder="Name" />
            <input type="text" className={[styles.text, styles.input50, styles.right].join(' ')} placeholder="Phone" />
            <input type="text" className={[styles.text, styles.input100].join(' ')} placeholder="Email" />
            <div>
              <textarea className={styles.textarea} defaultValue={`I am interested in ${this.props.home.Address}`} />
            </div>
            <button type="button" className={[styles.schedule, styles.input100].join(' ')} onClick={this.submit}>Request Info</button>
            <div className={styles.disclaimer}>
              By pressing Request Info, you agree that Trulia and real estate professionals may contact you via phone/text about your inquiry, which may involve the use of automated means. You are not required to consent as a condition of purchasing any property, goods or services. Message/data rates may apply. You also agree to our
              <a target="_blank" rel="noreferrer" href="https://www.trulia.com/terms">Terms of Use.</a>
              Trulia does not endorse any real estate professionals.
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TourSchedule;
