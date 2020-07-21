/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import MainViewer from './components/MainViewer/MainViewer.jsx';
import Modal from './components/Modal/Modal.jsx';
import TourSchedule from './components/TourSchedule/TourSchedule.jsx';
import styles from './main.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      isLoaded: false,
      home: {
        GalleryCount: 0,
      },
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  getData() {
    const listing_id = `${window.location.pathname.slice(1)}` || '1';
    axios.get(`api/listings/${listing_id}`)
      .then((results) => {
        this.setState({
          isLoaded: true,
          home: results.data
        });
      }
    );
  }

  componentDidMount() {
    this.getData();
  }

  toggleModal() {
    this.setState((prevState) => ({ modal: !prevState.modal }));
  }

  render() {
    const modalView = this.state;
    if (modalView.modal) {
      return (
        <div>
          <div className={styles.modalContainer}>
            <Modal toggleModal={this.toggleModal} home={this.state.home} />
          </div>
          <div className={styles.centerCol}>
            <MainViewer home={this.state.home} />
            <div className={styles.wideDiv}>
              <div className={styles.tourbox}>
                {/* <TourSchedule home={this.state.home} /> */}
              </div>
            </div>
          </div>
        </div>
      );
    }
    const { isLoaded, home } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className={styles.centerCol}>
          <MainViewer toggleModal={this.toggleModal} home={this.state.home} />
          <div className={styles.wideDiv}>
            <div className={styles.description}>
              <img className={styles.descImg} src="https://homeimages-samm1337.s3-us-west-1.amazonaws.com/description.png" alt=""></img>
            </div>
            <div className={styles.tourbox}>
              <TourSchedule home={this.state.home} />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('TourSchedule'));
