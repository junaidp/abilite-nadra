import logo from "../../../../../../assets/logo.png";
import moment from "moment";
import React from "react";
import font from "../../../../../../font/Poppins-Medium.ttf";

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
  page2: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    fontFamily: "Poppins",
    paddingTop: 120,
    paddingBottom: 20,
    paddingLeft: 35,
    paddingRight: 35,
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
  reportName: {
    textAlign: "center",
  },

  h4: {
    fontSize: 12,
  },
  contents: {
    marginBottom: 15,
    color: "#0a7386",
    fontSize: 14,
  },
  overviewWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  reportInfoViewItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
  },
  reportNameView: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  reportInfoTitle: {
    fontSize: 12,
    color: "#0a7386",
  },
  reportInfoSubTitle: {
    fontSize: 12,
  },
  locationWrap: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
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
    fontSize: 14,
    marginBottom: 7,
    color: "#0a7386",
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
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  indexNumber: {
    fontSize: 14,
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
    fontSize: 12,
    color: "#0a7386",
  },
  singleFindingsHeaderInfoPara: {
    fontSize: 10,
  },
  singleFindSummaryWrap: {
    flexDirection: "column",
    gap: 5,
  },
  singleFindSummaryHeader: {
    fontSize: 12,
    color: "#0a7386",
  },
  singleFindSummaryPara: {
    fontSize: 10,
  },
  findings: {
    marginTop: 15,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
});

const PDFGenerator = ({ reportObject }) => {
  return (
    <Document>
      <Page style={styles.page2} size="A4">
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
        </View>
        <View style={styles.pdfHeaderWrap}>
          <Text style={styles.title}>Internal Audit Report</Text>
        </View>
        <View>
          <Text style={styles.reportName}>{reportObject?.reportName}</Text>
        </View>
      </Page>
      <Page style={styles.page2} size="A4">
        <Text style={styles.contents}>Contents </Text>
        <View style={styles.overviewWrap}>
          <Text style={styles.h4}>
            OVERVIEW -------------------------------------------------------
          </Text>
          <Text style={styles.h4}>
            EXECUTIVE SUMMARY ----------------------------------------------
          </Text>
          <Text style={styles.h4}>
            AUDIT PURPOSE ---------------------------------------------------
          </Text>
          <Text style={styles.h4}>
            ANNEXURE -------------------------------------------------------
          </Text>
          <Text style={styles.h4}>
            Reporting & Follow Up
            -----------------------------------------------------
          </Text>
          <Text style={styles.h4}>
            Key Finding List
            -----------------------------------------------------
          </Text>
          <Text style={styles.h4}>
            Init Audit Extra Fields
            ----------------------------------------------
          </Text>
        </View>
      </Page>
      <Page style={styles.page2} size="A4">
        <Text style={styles.contents}>Contents </Text>
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
          <View style={styles.reportInfoViewItem}>
            <Text style={styles.reportInfoTitle}>Planned End Date:</Text>
            <Text style={styles.reportInfoSubTitle}>
              {moment(reportObject?.plannedEndDate).format("DD-MM-YYYY")}
            </Text>
          </View>
          <View style={styles.reportInfoViewItem}>
            <Text style={styles.reportInfoTitle}>Planned Hours:</Text>
            <Text style={styles.reportInfoSubTitle}>
              {reportObject?.plannedHours}
            </Text>
          </View>
          <View style={styles.reportInfoViewItem}>
            <Text style={styles.reportInfoTitle}>Risk Approach:</Text>
            <Text style={styles.reportInfoSubTitle}>
              {reportObject?.riskApproach}
            </Text>
          </View>
          <View style={styles.reportInfoViewItem}>
            <Text style={styles.reportInfoTitle}>Risk Rating:</Text>
            <Text style={styles.reportInfoSubTitle}>
              {reportObject?.riskRating}
            </Text>
          </View>
          <View style={styles.reportInfoViewItem}>
            <Text style={styles.reportInfoTitle}>Location:</Text>
            <View style={styles.locationWrap}>
              {[
                ...new Set(
                  reportObject?.subLocationList?.map(
                    (item) => item?.locationid?.description
                  )
                ),
              ]?.map((locationItem) => {
                return (
                  <Text style={styles.reportInfoSubTitle}>{locationItem}</Text>
                );
              })}
            </View>
          </View>
          <View style={styles.reportInfoViewItem}>
            <Text style={styles.reportInfoTitle}>Sub Location:</Text>
            <View style={styles.locationWrap}>
              {reportObject?.subLocationList?.map((item) => {
                return (
                  <Text style={styles.reportInfoSubTitle}>
                    {item?.description}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
      </Page>
      <Page style={styles.page} size="A4" wrap>
        <Text style={styles.contents}>EXECUTIVE SUMMARY </Text>
        <View>
          <Text style={styles.h4}>
            {convert(reportObject?.executiveSummary, { tables: true })}
          </Text>
        </View>
      </Page>
      <Page style={styles.page} size="A4" wrap>
        <Text style={styles.contents}>AUDIT PURPOSE </Text>
        <View>
          <Text style={styles.h4}>
            {convert(reportObject?.auditPurpose, { tables: true })}
          </Text>
        </View>
      </Page>
      <Page style={styles.page} size="A4" wrap>
        <Text style={styles.contents}>ANNEXURE </Text>
        <View>
          <Text style={styles.h4}>
            {convert(reportObject?.annexure, { tables: true })}
          </Text>
        </View>
      </Page>
      <Page style={styles.page} size="A4" wrap>
        <Text style={styles.contents}>Reporting & Follow Up </Text>
        {reportObject?.reportingAndFollowUp?.reportingList?.map(
          (followUpItem, index) => {
            return (
              <View style={styles.findings}>
                <Text style={styles.indexNumber}>Reporting {index + 1}</Text>
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
                <View style={styles.summaryInfoWrap}>
                  <View style={styles.singleFindingsHeaderInfo}>
                    <Text style={styles.singleFindingsHeaderInfoHeader}>
                      Implementation Date:
                    </Text>
                    <Text style={styles.singleFindingsHeaderInfoPara}>
                      {moment(followUpItem?.implementationDate).format(
                        "YYYY-MM-DD"
                      )}
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
                    <Text style={styles.singleFindSummaryHeader}>Auditee</Text>
                    <Text style={styles.singleFindSummaryPara}>
                      {followUpItem?.auditee?.name}
                    </Text>
                  </View>
                  <View style={styles.singleFindSummaryWrap}>
                    <Text style={styles.singleFindSummaryHeader}>
                      Test In Next Year
                    </Text>
                    <Text style={styles.singleFindSummaryPara}>
                      {followUpItem?.followUp?.recommendationsImplemented.toString() ===
                      "true"
                        ? "Yes"
                        : "No"}
                    </Text>
                  </View>
                  <View style={styles.singleFindSummaryWrap}>
                    <Text style={styles.singleFindSummaryHeader}>
                      Implication Rating
                    </Text>
                    <Text style={styles.singleFindSummaryPara}>
                      {followUpItem?.implicationRating === 1
                        ? "High"
                        : followUpItem?.implicationRating === 2
                        ? "Medium"
                        : followUpItem?.implicationRating === 3
                        ? "Low"
                        : ""}
                    </Text>
                  </View>
                  <View style={styles.singleFindSummaryWrap}>
                    <Text style={styles.singleFindSummaryHeader}>
                      Management Comments
                    </Text>
                    <Text style={styles.singleFindSummaryPara}>
                      {followUpItem?.managementComments}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }
        )}
      </Page>
      <Page style={styles.page} size="A4" wrap>
        <Text style={styles.contents}>All Findings</Text>
        {reportObject?.keyFindingsList?.map((item, index) => {
          return (
            <View style={styles.findings}>
              <Text style={styles.indexNumber}>Finding {index + 1}</Text>
              <View style={styles.summaryInfoWrap}>
                <View style={styles.singleFindSummaryWrap}>
                  <Text style={styles.singleFindSummaryPara}>
                    {convert(item?.summaryOfKeyFinding, {
                      tables: true,
                    })}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </Page>
      <Page style={styles.page} size="A4" wrap>
        <Text style={styles.contents}>Init Audit Extra Fields List</Text>
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
