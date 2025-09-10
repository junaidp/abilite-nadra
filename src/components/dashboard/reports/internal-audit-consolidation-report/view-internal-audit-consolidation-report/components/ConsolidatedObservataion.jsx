import Chip from "@mui/material/Chip";
import FollowUpItem from "./FollowUpItem";
import LazyLoad from 'react-lazyload';

const Observations = ({ consolidatedObservations, reportObject }) => {
  const getSubLocationDescription = (subLocationId) =>
    reportObject?.subLocationList?.find(
      (s) => s?.id === subLocationId
    )?.description || "Unknown Sub-Location";

  return (
    <div>
      <div className="col-lg-12 mt-4">
        <div className="heading  fw-bold">Observations</div>
      </div>
      <div className="mt-3 mb-3">
        {consolidatedObservations.map((subLocationGroup, idx) => (
          <div key={idx}>
            <div>
              {/* Sub-location (bold and easy to scan) */}
              <div>
                <p className="mb-3 consolidatedTitle">
                  {getSubLocationDescription(subLocationGroup.subLocation)}
                </p>
              </div>

              {/* Areas inside this sub-location */}
              {subLocationGroup?.areas?.map((areaGroup, aIdx) => (
                <div key={aIdx} className="mb-3">
                  <div>
                    {/* Area label (bold) */}
                    <p className="mb-3 consolidatedTitle">{areaGroup?.area}</p>
                    {/* Each observation under the area */}
                    <div className="border rounded px-3 py-2 mb-3">
                      {areaGroup.observations.map((observation, oIdx) => (
                        <LazyLoad key={oIdx} height={window.innerHeight * 2} offset={300}>
                          <div>
                            <div className="d-flex items-center justify-content-between">
                              <div></div>
                              <Chip
                                label={
                                  reportObject?.subLocationList?.find(
                                    (subLocation) =>
                                      subLocation?.id === observation?.subLocation
                                  )?.description
                                }
                              />
                            </div>
                            <FollowUpItem
                              item={observation}
                              consolidatedObservationsItem={true}
                            />
                            <hr />
                          </div>
                        </LazyLoad>
                      ))}
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Observations;
