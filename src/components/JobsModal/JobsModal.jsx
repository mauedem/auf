import PropTypes from "prop-types";
import ArrowRight from "../../../public/assets/icons/arrow-right.svg";

import './JobsModal.css';

export const JobsModal = ({ language, isOpen, jobsData, contactsData, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="jobs-modal" onClick={onClose}>
                <div className="jobs-modal__content" onClick={(e) => e.stopPropagation()}>
                    <h2 className="jobs-modal__title">
                        {contactsData[`title_${language}`]}
                    </h2>
                    <div className="jobs-modal__buttons">
                        <button
                            className="jobs-modal__button whatsapp"
                            onClick={() => window.open(jobsData[`whatsapp_contact_link`], '_blank')}
                        >

                            Whatsapp
                            <img src={ArrowRight} style={{marginLeft: '10px'}} alt=""/>
                        </button>
                        <button
                            className="jobs-modal__button telegram"
                            onClick={() => window.open(jobsData[`telegram_contact_link`], '_blank')}
                        >
                            Telegram
                            <img src={ArrowRight} style={{marginLeft: '10px'}} alt=""/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

JobsModal.propTypes = {
    language: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    jobsData: PropTypes.object.isRequired,
    contactsData: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};
