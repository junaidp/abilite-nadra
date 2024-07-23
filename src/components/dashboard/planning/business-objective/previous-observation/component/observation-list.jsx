import React from "react";
import { useSelector } from "react-redux";

const ObservationList = ({ setValues, values }) => {
  const { previousObservations } = useSelector(
    (state) => state?.settingsPreviousObservation
  );
  const [list, setList] = React.useState([]);

  function handleChange(event, id) {
    setList((pre) =>
      pre?.map((item) =>
        item?.id === id ? { ...item, checked: event.target.checked } : item
      )
    );
  }

  React.useEffect(() => {
    setValues((pre) => {
      return {
        ...pre,
        observationsList: list?.filter((item) => item?.checked === true),
      };
    });
  }, [list]);

  React.useEffect(() => {
    if (previousObservations) {
      setList(
        previousObservations?.map((item) => {
          return {
            ...item,
            checked: false,
          };
        })
      );
    }
  }, [previousObservations]);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseFive"
          aria-expanded="false"
          aria-controls="flush-collapseFive"
        >
          {values?.observationsList &&
            values?.observationsList?.length !== 0 && (
              <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
            )}
          Observation List
        </button>
      </h2>
      <div
        id="flush-collapseFive"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExamp"
      >
        <div className="accordion-body">
          {list?.map((observation, index) => {
            return (
              <div className="row mb-2" key={index}>
                <p className="col-lg-10">{observation?.managementComments}</p>
                <div className="form-check col-lg-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    name="repeatJob"
                    onChange={(event) => handleChange(event, observation?.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ObservationList;
