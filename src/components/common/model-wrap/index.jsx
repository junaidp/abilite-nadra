const ModalWrapper = ({ children }) => (
    <div className="model-parent d-flex justify-content-between items-center">
        <div className="model-wrap">{children}</div>
    </div>
);
export default ModalWrapper;