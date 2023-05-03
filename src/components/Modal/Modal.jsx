import { Component } from 'react'; 
import { createPortal } from 'react-dom'; 
import PropTypes from 'prop-types'; 
import css from './Modal.module.css'; 


const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

  static propTypes = { 
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyDown); 
  }

  keyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal(); 
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown); 
  }

  handleClose = (evt) => {
    if (evt.currentTarget === evt.target) {
      this.props.closeModal();
    }
  }

  render() {
    return createPortal(<div onClick={this.handleClose} className={css.Overlay}>
      <div className={css.Modal}>{this.props.children}</div>
    </div>, modalRoot)
  }
}