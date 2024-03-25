import logo from "../../../../../../assets/logo.png";
import React from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  reportInfoView: {
    flexDirection: "column",
  },
  reportInfoViewItem: {
    flexDirection: "row",
    marginTop: 10,
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
    fontSize: 10,
  },
  reportInfoSubTitle: {
    fontSize: 8,
    marginTop: 1,
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
    marginTop: 14,
  },
  summaryHeader: {
    fontSize: 12,
    marginBottom: 3,
  },
  summaryPara: {
    fontSize: 10,
    color: "#0a7386",
  },
  findHeader: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  summaryInfoWrap: {
    marginTop: 15,
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
    marginTop: 10,
  },
  singleFindSummaryHeader: {
    fontSize: 14,
    color: "#0a7386",
  },
  singleFindSummaryPara: {
    fontSize: 10,
  },
  findings: {
    marginTop: 15,
  },
});

const PDFGenerator = () => {
  return (
    <Document>
      <Page style={styles.page} size="A4">
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <Text style={styles.title}>Internal Audit Report</Text>
        </View>
        <View style={styles.reportNameView}>
          <Text style={styles.reportTitle}>
            Internal Audit Report Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book.
          </Text>
        </View>
        <View style={styles.reportNameView}>
          <View style={styles.reportInfoViewItem}>
            <Text style={styles.reportInfoTitle}>Report Name:</Text>
            <Text style={styles.reportInfoSubTitle}>Dummy Name</Text>
          </View>
          <View style={styles.reportInfoViewItem}>
            <Text style={styles.reportInfoTitle}>Report Date:</Text>
            <Text style={styles.reportInfoSubTitle}>4-1-124</Text>
          </View>
          <View style={styles.reportInfoViewItem}>
            <Text style={styles.reportInfoTitle}>Planned Start Date:</Text>
            <Text style={styles.reportInfoSubTitle}>4-1-124</Text>
          </View>
          <View style={styles.reportInfoViewItem}>
            <Text style={styles.reportInfoTitle}>Planned End Date:</Text>
            <Text style={styles.reportInfoSubTitle}>4-1-124</Text>
          </View>
        </View>
        <View style={styles.summary}>
          <Text style={styles.summaryHeader}>Executive Summary</Text>
          <Text style={styles.summaryPara}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry.
          </Text>
        </View>
        <View style={styles.summary}>
          <Text style={styles.summaryHeader}>Audit Purpose</Text>
          <Text style={styles.summaryPara}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry.
          </Text>
        </View>
        <View style={styles.summary}>
          <Text style={styles.summaryHeader}>Annexure</Text>
          <Text style={styles.summaryPara}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry.
          </Text>
        </View>
        <Text style={styles.findHeader}>All Findings</Text>
        <View style={styles.findings}>
          <Text style={styles.summaryHeader}>Finding 1</Text>
          <View style={styles.summaryInfoWrap}>
            <View style={styles.findingsHeaderInfo}>
              <View style={styles.singleFindingsHeaderInfo}>
                <Text style={styles.singleFindingsHeaderInfoHeader}>
                  Responsible Person:
                </Text>
                <Text style={styles.singleFindingsHeaderInfoPara}>
                  Management1
                </Text>
              </View>
              <View style={styles.singleFindingsHeaderInfo}>
                <Text style={styles.singleFindingsHeaderInfoHeader}>
                  Implementation Date:
                </Text>
                <Text style={styles.singleFindingsHeaderInfoPara}>
                  2024-01-11
                </Text>
              </View>
            </View>
            <View style={styles.singleFindSummaryWrap}>
              <Text style={styles.singleFindSummaryHeader}>Observation</Text>
              <Text style={styles.singleFindSummaryPara}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </Text>
            </View>
            <View style={styles.singleFindSummaryWrap}>
              <Text style={styles.singleFindSummaryHeader}>Implication</Text>
              <Text style={styles.singleFindSummaryPara}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </Text>
            </View>
            <View style={styles.singleFindSummaryWrap}>
              <Text style={styles.singleFindSummaryHeader}>Recomendation</Text>
              <Text style={styles.singleFindSummaryPara}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </Text>
            </View>
            <View style={styles.singleFindSummaryWrap}>
              <Text style={styles.singleFindSummaryHeader}>
                Management Comments
              </Text>
              <Text style={styles.singleFindSummaryPara}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </Text>
            </View>
          </View>
        </View>
        <View break style={styles.findings}>
          <Text style={styles.summaryHeader}>Finding 2</Text>
          <View style={styles.summaryInfoWrap}>
            <View style={styles.findingsHeaderInfo}>
              <View style={styles.singleFindingsHeaderInfo}>
                <Text style={styles.singleFindingsHeaderInfoHeader}>
                  Responsible Person:
                </Text>
                <Text style={styles.singleFindingsHeaderInfoPara}>
                  Management1
                </Text>
              </View>
              <View style={styles.singleFindingsHeaderInfo}>
                <Text style={styles.singleFindingsHeaderInfoHeader}>
                  Implementation Date:
                </Text>
                <Text style={styles.singleFindingsHeaderInfoPara}>
                  2024-01-11
                </Text>
              </View>
            </View>
            <View style={styles.singleFindSummaryWrap}>
              <Text style={styles.singleFindSummaryHeader}>Observation</Text>
              <Text style={styles.singleFindSummaryPara}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </Text>
            </View>
            <View style={styles.singleFindSummaryWrap}>
              <Text style={styles.singleFindSummaryHeader}>Implication</Text>
              <Text style={styles.singleFindSummaryPara}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </Text>
            </View>
            <View style={styles.singleFindSummaryWrap}>
              <Text style={styles.singleFindSummaryHeader}>Recomendation</Text>
              <Text style={styles.singleFindSummaryPara}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </Text>
            </View>
            <View style={styles.singleFindSummaryWrap}>
              <Text style={styles.singleFindSummaryHeader}>
                Management Comments
              </Text>
              <Text style={styles.singleFindSummaryPara}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.findings}>
          <Text style={styles.summaryHeader}>Finding 3</Text>
          <View style={styles.summaryInfoWrap}>
            <View style={styles.findingsHeaderInfo}>
              <View style={styles.singleFindingsHeaderInfo}>
                <Text style={styles.singleFindingsHeaderInfoHeader}>
                  Responsible Person:
                </Text>
                <Text style={styles.singleFindingsHeaderInfoPara}>
                  Management1
                </Text>
              </View>
              <View style={styles.singleFindingsHeaderInfo}>
                <Text style={styles.singleFindingsHeaderInfoHeader}>
                  Implementation Date:
                </Text>
                <Text style={styles.singleFindingsHeaderInfoPara}>
                  2024-01-11
                </Text>
              </View>
            </View>
            <View style={styles.singleFindSummaryWrap}>
              <Text style={styles.singleFindSummaryHeader}>Observation</Text>
              <Text style={styles.singleFindSummaryPara}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </Text>
            </View>
            <View style={styles.singleFindSummaryWrap}>
              <Text style={styles.singleFindSummaryHeader}>Implication</Text>
              <Text style={styles.singleFindSummaryPara}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </Text>
            </View>
            <View style={styles.singleFindSummaryWrap}>
              <Text style={styles.singleFindSummaryHeader}>Recomendation</Text>
              <Text style={styles.singleFindSummaryPara}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </Text>
            </View>
            <View style={styles.singleFindSummaryWrap}>
              <Text style={styles.singleFindSummaryHeader}>
                Management Comments
              </Text>
              <Text style={styles.singleFindSummaryPara}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.findings}>
          <Text style={styles.summaryHeader}>Finding 4</Text>
          <View style={styles.summaryInfoWrap}>
            <View style={styles.findingsHeaderInfo}>
              <View style={styles.singleFindingsHeaderInfo}>
                <Text style={styles.singleFindingsHeaderInfoHeader}>
                  Responsible Person:
                </Text>
                <Text style={styles.singleFindingsHeaderInfoPara}>
                  Management1
                </Text>
              </View>
              <View style={styles.singleFindingsHeaderInfo}>
                <Text style={styles.singleFindingsHeaderInfoHeader}>
                  Implementation Date:
                </Text>
                <Text style={styles.singleFindingsHeaderInfoPara}>
                  2024-01-11
                </Text>
              </View>
            </View>
            <View style={styles.singleFindSummaryWrap}>
              <Text style={styles.singleFindSummaryHeader}>Observation</Text>
              <Text style={styles.singleFindSummaryPara}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </Text>
            </View>
            <View style={styles.singleFindSummaryWrap}>
              <Text style={styles.singleFindSummaryHeader}>Implication</Text>
              <Text style={styles.singleFindSummaryPara}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </Text>
            </View>
            <View style={styles.singleFindSummaryWrap}>
              <Text style={styles.singleFindSummaryHeader}>Recomendation</Text>
              <Text style={styles.singleFindSummaryPara}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </Text>
            </View>
            <View style={styles.singleFindSummaryWrap}>
              <Text style={styles.singleFindSummaryHeader}>
                Management Comments
              </Text>
              <Text style={styles.singleFindSummaryPara}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFGenerator;
