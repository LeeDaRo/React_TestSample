import React, { useState } from 'react';
import Modal from 'react-modal';
import styled, { css } from 'styled-components';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(80, 221, 92, 0.7)',
  }
};
// const Popup = styled.style`
// content: {
//   top: '50%';
//   left: '50%';
//   right: 'auto';
//   bottom: 'auto';
//   margin-right: '-50%';
//   transform: 'translate(-50%, -50%)';
//   };
// overlay: {
//   backgroundColor: 'rgba(184, 55, 55, 0.7)',
//   };
// `

const Modals = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal} 이것은 모달 창을 만들때 외부를 클릭하면 꺼지도록 해주는 기능입니다.
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input type={'text'} />
          <button>daf</button>
        </form>
      </Modal>
    </div >
  );
};

export default Modals;