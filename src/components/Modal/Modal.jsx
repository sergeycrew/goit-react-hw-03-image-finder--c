import { Component } from 'react';
import { Overlay, ModalWindow, Image } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  closeModalHandler = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return (
      <Overlay onClick={this.closeModalHandler}>
        <ModalWindow>
          <Image src={this.props.selectedImage} alt={this.props.tags} />
        </ModalWindow>
      </Overlay>
    );
  }
}
