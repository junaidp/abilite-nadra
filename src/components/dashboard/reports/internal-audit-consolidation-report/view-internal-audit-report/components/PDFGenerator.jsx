import logo from "../../../../../../assets/logo.png";
import moment from "moment";
import React from "react";
import font from "../../../../../../font/Poppins-Medium.ttf";
import Chip from "@mui/material/Chip";

import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
  Font,
} from "@react-pdf/renderer";
import { convert } from "html-to-text";
Font.register({
  family: "Poppins",
  src: font,
});
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    fontFamily: "Poppins",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 35,
    paddingRight: 35,
  },
  reportInfoView: {
    flexDirection: "column",
  },
  reportInfoViewItem: {
    flexDirection: "row",
    marginTop: 10,
  },
  plannedEndDateWrap: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#0a7386",
    padding: 10,
    textAlign: "center",
  },

  reportInfoTitle: {
    color: "#0a7386",
    fontSize: 15,
  },
  reportInfoSubTitle: {
    fontSize: 13,
    marginTop: 2,
    marginLeft: 2,
  },
  reportTitle: {
    fontSize: 10,
  },
  paragraph: {
    fontSize: 12,
  },
  summary: {
    flexDirection: "column",
    marginTop: 8,
  },
  annexureSummary: {
    flexDirection: "column",
    marginTop: 8,
    marginBottom: 10,
  },
  reportingView: {
    marginTop: 8,
    marginBottom: 12,
  },
  extraFieldsHeader: {
    fontSize: 18,
    marginBottom: 7,
    color: "#0a7386",
    marginTop: 12,
  },
  findingView: {
    marginTop: 8,
    marginBottom: 12,
  },
  summaryHeader: {
    fontSize: 18,
    marginBottom: 7,
    color: "#0a7386",
  },
  reportingNotFoundText: {
    fontSize: 13,
  },
  summaryPara: {
    fontSize: 13,
  },
  horizontalLine: {
    height: 2,
    width: "100%",
    backgroundColor: "#0a7386",
  },
  findHeader: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  summaryInfoWrap: {
    marginTop: 5,
  },
  indexNumber: {
    fontSize: 18,
    marginBottom: 3,
    color: "#0a7386",
    textDecoration: "underline",
  },
  findingsHeaderInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  singleFindingsHeaderInfo: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  pdfHeaderWrap: {
    color: "#0a7386",
    fontSize: 15,
    marginBottom: 10,
  },
  singleFindingsHeaderInfoHeader: {
    fontSize: 16,
    color: "#0a7386",
  },
  singleFindingsHeaderInfoPara: {
    fontSize: 13,
  },
  singleFindSummaryWrap: {
    flexDirection: "column",
    gap: 5,
    marginTop: 10,
  },
  singleFindSummaryHeader: {
    fontSize: 16,
    color: "#0a7386",
  },
  singleFindSummaryPara: {
    fontSize: 13,
  },
  findings: {
    marginTop: 15,
  },
});

const PDFGenerator = ({ reportObject }) => {
  return (
    <Document>
      <Page style={styles.page} size="A4">
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
        </View>
        <View style={styles.pdfHeaderWrap}>
          <Text style={styles.title}>Internal Audit Consolidation Report</Text>
        </View>
        <View style={styles.reportNameView}>
          <View style={styles.reportInfoViewItem}>
            <Text style={styles.reportInfoTitle}>Report Name:</Text>
            <Text style={styles.reportInfoSubTitle}>
              {reportObject?.reportName}
            </Text>
          </View>
          <View style={styles.reportInfoViewItem}>
            <Text style={styles.reportInfoTitle}>Report Date:</Text>
            <Text style={styles.reportInfoSubTitle}>
              {moment(reportObject?.reportDate).format("DD-MM-YYYY")}
            </Text>
          </View>
          <View style={styles.reportInfoViewItem}>
            <Text style={styles.reportInfoTitle}>Planned Start Date:</Text>
            <Text style={styles.reportInfoSubTitle}>
              {moment(reportObject?.plannedStartDate).format("DD-MM-YYYY")}
            </Text>
          </View>
          <View style={styles.plannedEndDateWrap}>
            <Text style={styles.reportInfoTitle}>Planned End Date:</Text>
            <Text style={styles.reportInfoSubTitle}>
              {moment(reportObject?.plannedEndDate).format("DD-MM-YYYY")}
            </Text>
          </View>
        </View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.summary}>
          <Text style={styles.summaryHeader}>Executive Summary</Text>
          <Text style={styles.summaryPara}>
            {convert(reportObject?.executiveSummary, { tables: true })}
          </Text>
        </View>
        <View style={styles.summary}>
          <Text style={styles.summaryHeader}>Audit Purpose</Text>
          <Text style={styles.summaryPara}>
            {convert(reportObject?.auditPurpose, { tables: true })}
          </Text>
        </View>
        <View style={styles.annexureSummary}>
          <Text style={styles.summaryHeader}>Annexure</Text>
          <Text style={styles.summaryPara}>
            {reportObject?.annexure
              ? convert(reportObject?.annexure, { tables: true })
              : "No Annexure Provided"}
          </Text>
        </View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.findingView}>
          <Text style={styles.summaryHeader}>All Findings</Text>
          {reportObject?.consolidatedIARKeyFindingsList?.map((item, index) => {
            return (
              <View style={styles.findings} key={index}>
                <Text style={styles.indexNumber}>Finding {index + 1}</Text>
                <View style={styles.summaryInfoWrap}>
                  <View style={styles.singleFindSummaryWrap}>
                    <Text style={styles.singleFindSummaryHeader}>
                      Summary Of Key Finding
                    </Text>
                    <Text style={styles.singleFindSummaryPara}>
                      {convert(item?.summaryOfKeyFinding, { tables: true })}
                    </Text>
                  </View>
                </View>
                <View style={styles.reportingView}>
                  <Text style={styles.summaryHeader}>
                    Reporting & Follow Up
                  </Text>
                  {!item?.reportingList || item?.reportingList?.length === 0 ? (
                    <Text style={styles.reportingNotFoundText}>
                      Reporting Not Available
                    </Text>
                  ) : (
                    item?.reportingList?.map((followUpItem, index) => {
                      return (
                        <View style={styles.findings}>
                          <Text style={styles.indexNumber}>
                            Reporting {index + 1}
                          </Text>
                          <View style={styles.summaryInfoWrap}>
                            <View style={styles.findingsHeaderInfo}>
                              <View style={styles.singleFindingsHeaderInfo}>
                                <Text
                                  style={styles.singleFindingsHeaderInfoHeader}
                                >
                                  Responsible Person:
                                </Text>
                                <Text
                                  style={styles.singleFindingsHeaderInfoPara}
                                >
                                  Management1
                                </Text>
                              </View>
                              <View style={styles.singleFindingsHeaderInfo}>
                                <Text
                                  style={styles.singleFindingsHeaderInfoHeader}
                                >
                                  Implementation Date:
                                </Text>
                                <Text
                                  style={styles.singleFindingsHeaderInfoPara}
                                >
                                  {moment(
                                    followUpItem?.implementationDate
                                  ).format("YYYY-MM-DD")}
                                </Text>
                              </View>
                            </View>
                            <View style={styles.singleFindSummaryWrap}>
                              <Text style={styles.singleFindSummaryHeader}>
                                Observation
                              </Text>
                              <Text style={styles.singleFindSummaryPara}>
                                {convert(followUpItem?.observationName, {
                                  tables: true,
                                })}
                              </Text>
                            </View>
                            <View style={styles.singleFindSummaryWrap}>
                              <Text style={styles.singleFindSummaryHeader}>
                                Implication
                              </Text>
                              <Text style={styles.singleFindSummaryPara}>
                                {followUpItem?.implication}
                              </Text>
                            </View>
                            <View style={styles.singleFindSummaryWrap}>
                              <Text style={styles.singleFindSummaryHeader}>
                                Management Comments
                              </Text>
                              <Text style={styles.singleFindSummaryPara}>
                                {followUpItem?.managementComments
                                  ? followUpItem?.managementComments
                                  : "No Management Comments Provided"}
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    })
                  )}
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.horizontalLine}></View>
        <Text style={styles.extraFieldsHeader}>Audit Extra Fields List</Text>
        {reportObject?.intAuditExtraFieldsList?.map((item, index) => {
          return (
            <View style={styles.findings}>
              <Text style={styles.indexNumber}>Field {index + 1}</Text>
              <View style={styles.summaryInfoWrap}>
                <View style={styles.singleFindSummaryWrap}>
                  <Text style={styles.singleFindSummaryHeader}>Heading</Text>
                  <Text style={styles.singleFindSummaryPara}>
                    {item?.heading}
                  </Text>
                </View>
                <View style={styles.singleFindSummaryWrap}>
                  <Text style={styles.singleFindSummaryHeader}>Data</Text>
                  <Text style={styles.singleFindSummaryPara}>{item?.data}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </Page>
    </Document>
  );
};

export default PDFGenerator;
