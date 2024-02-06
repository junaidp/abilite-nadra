import React from "react";

const RiskScores = () => {
  return (
    <div className="row mb-3">
      <div className="col-lg-12">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Risk scores/ratings for auditable units.
        </label>

        <table className="table table-bordered table-hover rounded">
          <thead>
            <tr>
              <th className="sr-col" rowSpan="2">
                Sr. #
              </th>
              <th colSpan="1">Business Objective</th>
              <th colSpan="2">Risk 1</th>
              <th colSpan="2">Risk 2</th>
              <th colSpan="2">Risk 3</th>
              <th colSpan="2">Risk 4</th>
              <th colSpan="2">Risk 5</th>
              <th colSpan="2">Risk 6</th>
              <th colSpan="2">Risk 7</th>
              <th rowSpan="2">Total Score</th>
              <th rowSpan="2">Level</th>
            </tr>
            <tr>
              <th>L = Likelihood, I = Impact</th>
              <th>L</th>

              <th>I</th>
              <th>L</th>
              <th>I</th>
              <th>L</th>
              <th>I</th>
              <th>L</th>
              <th>I</th>
              <th>L</th>
              <th>I</th>
              <th>L</th>
              <th>I</th>
              <th>L</th>
              <th>I</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td className="w-300">
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry.
              </td>
              <td className="w-45">2</td>
              <td className="w-45">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="fw-bold width-50">40</td>
              <td className=" text-white width-50 text-center bg-lightYellow">
                M
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td className="w-300">
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry.
              </td>
              <td className="w-45">2</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="fw-bold width-50">30</td>
              <td className="bg-success  text-white width-50 text-center">L</td>
            </tr>

            <tr>
              <td>2</td>
              <td className="w-300">
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry.
              </td>
              <td className="w-45">2</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="fw-bold width-50">50</td>
              <td className=" text-white bg-orange text-center width-50">H</td>
            </tr>

            <tr>
              <td>2</td>
              <td className="w-300">
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry.
              </td>
              <td className="w-45">2</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="width-50">3</td>
              <td className="fw-bold width-50">60</td>
              <td className="bg-danger text-white bg-orange text-center width-50">
                E
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskScores;
