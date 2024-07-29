function Modal({ closeModal, name, chargerName, myCharger }: any) {
  return (
    <div className="modal">
      <div className="modal__content">
        <p className="graphic__span spacing__small_bottom">{name}</p>
        <span
          className="modal__close spacing__small_bottom"
          onClick={() => closeModal(false)}
        >
          &times;
        </span>
        <ul className="modal__list spacing__small_top">
          <li className="modal__item">
            <span className="graphic__span">Charger name</span>
            <span className="graphic__span">{chargerName}</span>
          </li>
          <li className="modal__item">
            <span className="graphic__span">My Charger</span>
            <span className="graphic__span">{myCharger}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Modal;
