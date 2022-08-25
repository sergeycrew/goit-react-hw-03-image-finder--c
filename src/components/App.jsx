import { Component } from 'react';
import authContext from '../service/context';
import { Loader } from './Loader/Loader';
import { SearchBar } from './SearchBar/SearchBar';
import { api } from '../service/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Message } from './Message/Message';
import '../index.css';

export class App extends Component {
  state = {
    query: '',
    isLoading: false,
    receivedImages: [],
    selectedImage: '',
    currentPage: 1,
    isModalOpen: false,
    tags: [],
    noDataFound: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;

    if (prevState.query !== query) {
      this.fetchPictures();
    }
    this.scroll();
  }

  fetchPictures = () => {
    const { query, currentPage } = this.state;
    this.setState({ isLoading: true, noDataFound: false });
    console.dir(Window);
    const scrollHeight = document.documentElement.scrollHeight;

    api({ query, currentPage })
      .then(data => {
        if (data.length === 0) {
          console.log('nothing has found, try again');
          this.setState({ noDataFound: true });
        }
        this.setState(prevState => ({
          receivedImages: [...prevState.receivedImages, ...data],
          currentPage: prevState.currentPage + 1,
          scroll: scrollHeight,
        }));
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleSubmit = receivedQuery => {
    this.setState({ query: receivedQuery, currentPage: 1, receivedImages: [] });
  };

  openModalImage = e => {
    const largeurl = e.target.dataset.largeurl;
    const alt = e.target.dataset.alt;
    //console.log(e);
    this.setState({ selectedImage: largeurl, tags: alt });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  scroll = () => {
    console.dir(window);
    console.log(document.documentElement.scrollHeight);

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const {
      query,
      tags,
      receivedImages,
      isModalOpen,
      isLoading,
      selectedImage,
      noDataFound,
    } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleSubmit} />
        {isLoading && (
          <div className="spinner">
            <Loader />
          </div>
        )}
        {noDataFound && <Message />}

        {/* the way I found how to pass props ancestor - children */}

        <authContext.Provider value={this.openModalImage}>
          <ImageGallery data={receivedImages} />
        </authContext.Provider>
        {isModalOpen && (
          <Modal
            onClose={this.toggleModal}
            selectedImage={selectedImage}
            tags={tags}
          />
        )}

        {query && receivedImages.length > 11 && (
          <LoadMore onClick={this.fetchPictures} />
        )}
      </>
    );
  }
}
